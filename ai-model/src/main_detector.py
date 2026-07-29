"""Run SentinelEdu safety checks against one video file or RTSP camera stream.

Example:
    python src/main_detector.py --source videos/demo.mp4 --camera "Main Gate"
"""

import argparse
import json
import os
from datetime import datetime
from itertools import combinations
from pathlib import Path

import cv2
import torch
from dotenv import load_dotenv
from ultralytics import YOLO

from alert_client import send_incident

torch.backends.mkldnn.enabled = False
torch.set_num_threads(1)

EVIDENCE_DIR = Path("evidence")
TEMP_DIR = Path("temp_frames")


def parse_zone(value: str) -> tuple[float, float, float, float]:
    """Parse a normalized zone: x1,y1,x2,y2, with each value between 0 and 1."""
    try:
        zone = tuple(float(item) for item in value.split(","))
    except ValueError as error:
        raise argparse.ArgumentTypeError("Zone must be x1,y1,x2,y2") from error

    if len(zone) != 4 or any(item < 0 or item > 1 for item in zone):
        raise argparse.ArgumentTypeError("Zone values must be between 0 and 1")
    if zone[0] >= zone[2] or zone[1] >= zone[3]:
        raise argparse.ArgumentTypeError("Zone must satisfy x1 < x2 and y1 < y2")
    return zone


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="SentinelEdu unified AI detector")
    parser.add_argument("--source", required=True, help="Video path or RTSP stream URL")
    parser.add_argument("--camera", default="Camera 1", help="Camera name in alerts")
    parser.add_argument(
        "--output",
        default="evidence/unified_detection.mp4",
        help="Annotated video output path",
    )
    parser.add_argument(
        "--zone",
        type=parse_zone,
        default=(0.35, 0.25, 0.65, 0.85),
        help="Restricted zone as normalized x1,y1,x2,y2",
    )
    parser.add_argument("--no-show", action="store_true", help="Do not open a preview window")
    parser.add_argument(
        "--disable-fire-check",
        action="store_true",
        help="Skip the hosted Roboflow Fire/Smoke check",
    )
    return parser


def save_and_send(camera: str, incident: dict, frame, sent_events: set[str]) -> None:
    """Save evidence and send each unique incident once."""
    event_key = incident.pop("event_key")
    if event_key in sent_events:
        return

    sent_events.add(event_key)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    incident_name = incident["incident"].lower().replace(" ", "_").replace("/", "_")
    evidence_path = EVIDENCE_DIR / f"{incident_name}_{timestamp}.jpg"
    cv2.imwrite(str(evidence_path), frame)

    incident.update(
        {
            "camera": camera,
            "timestamp": datetime.now().isoformat(),
            "evidence_path": str(evidence_path).replace("\\", "/"),
            "status": "new",
        }
    )

    print(json.dumps(incident, indent=2))
    send_incident(incident)


def main() -> None:
    args = build_parser().parse_args()
    EVIDENCE_DIR.mkdir(exist_ok=True)
    TEMP_DIR.mkdir(exist_ok=True)
    load_dotenv()

    video = cv2.VideoCapture(args.source)
    if not video.isOpened():
        raise RuntimeError(f"Could not open source: {args.source}")

    fps = video.get(cv2.CAP_PROP_FPS) or 25
    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    if width <= 0 or height <= 0:
        raise RuntimeError("Could not determine source video dimensions")

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    writer = cv2.VideoWriter(
        str(output_path),
        cv2.VideoWriter_fourcc(*"mp4v"),
        fps,
        (width, height),
    )

    zone_x1 = int(width * args.zone[0])
    zone_y1 = int(height * args.zone[1])
    zone_x2 = int(width * args.zone[2])
    zone_y2 = int(height * args.zone[3])

    model = YOLO("yolo11n.pt")
    fire_client = None
    if not args.disable_fire_check:
        api_key = os.getenv("ROBOFLOW_API_KEY")
        if api_key:
            from inference_sdk import InferenceHTTPClient

            fire_client = InferenceHTTPClient(
                api_url="https://serverless.roboflow.com", api_key=api_key
            )
        else:
            print("ROBOFLOW_API_KEY not found; Fire/Smoke check is disabled.")

    frame_number = 0
    previous_centers: dict[int, tuple[int, int]] = {}
    fall_start_times: dict[int, float] = {}
    interaction_start_times: dict[tuple[int, int], float] = {}
    sent_events: set[str] = set()
    fire_streak = 0

    while True:
        success, frame = video.read()
        if not success:
            break

        frame_number += 1
        current_time = frame_number / fps
        annotated = frame.copy()
        active_alerts: list[str] = []

        results = model.track(
            frame,
            persist=True,
            tracker="bytetrack.yaml",
            classes=[0],
            conf=0.45,
            imgsz=640,
            device="cpu",
            verbose=False,
        )

        cv2.rectangle(annotated, (zone_x1, zone_y1), (zone_x2, zone_y2), (0, 165, 255), 2)
        cv2.putText(
            annotated,
            "RESTRICTED AREA",
            (zone_x1, max(25, zone_y1 - 8)),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.55,
            (0, 165, 255),
            2,
        )

        people = {}
        boxes = results[0].boxes
        if boxes.id is not None:
            track_ids = boxes.id.int().cpu().tolist()
            coordinates = boxes.xyxy.int().cpu().tolist()
            confidences = boxes.conf.cpu().tolist()

            for track_id, (x1, y1, x2, y2), confidence in zip(track_ids, coordinates, confidences):
                x1, y1 = max(0, x1), max(0, y1)
                x2, y2 = min(width, x2), min(height, y2)
                center_x = (x1 + x2) // 2
                center_y = (y1 + y2) // 2
                person_width = max(1, x2 - x1)
                person_height = max(1, y2 - y1)
                aspect_ratio = person_width / person_height

                previous = previous_centers.get(track_id, (center_x, center_y))
                movement = ((center_x - previous[0]) ** 2 + (center_y - previous[1]) ** 2) ** 0.5
                previous_centers[track_id] = (center_x, center_y)

                people[track_id] = {
                    "box": (x1, y1, x2, y2),
                    "center": (center_x, center_y),
                    "width": person_width,
                    "confidence": float(confidence),
                    "movement": movement,
                }

                color = (0, 255, 0)
                label = f"Person ID {track_id}"

                # Restricted-area intrusion.
                in_restricted_zone = zone_x1 <= center_x <= zone_x2 and zone_y1 <= center_y <= zone_y2
                if in_restricted_zone:
                    color = (0, 0, 255)
                    label = f"ID {track_id} - INTRUDER"
                    active_alerts.append("RESTRICTED AREA INTRUSION")
                    save_and_send(
                        args.camera,
                        {
                            "event_key": f"intrusion:{track_id}",
                            "incident": "Restricted Area Intrusion",
                            "confidence": round(float(confidence), 2),
                            "severity": "Medium",
                            "track_id": track_id,
                        },
                        annotated,
                        sent_events,
                    )

                # Possible fall: a horizontal person sustained for 0.3 seconds.
                if aspect_ratio > 0.55:
                    fall_start_times.setdefault(track_id, current_time)
                    fall_duration = current_time - fall_start_times[track_id]
                    if fall_duration >= 0.3:
                        color = (0, 0, 255)
                        label = f"POSSIBLE FALL - ID {track_id}"
                        active_alerts.append("POSSIBLE FALL")
                        save_and_send(
                            args.camera,
                            {
                                "event_key": f"fall:{track_id}",
                                "incident": "Possible Fall / Medical Emergency",
                                "confidence": round(float(confidence), 2),
                                "severity": "High",
                                "track_id": track_id,
                            },
                            annotated,
                            sent_events,
                        )
                else:
                    fall_start_times.pop(track_id, None)

                cv2.rectangle(annotated, (x1, y1), (x2, y2), color, 2)
                cv2.putText(
                    annotated,
                    label,
                    (x1, max(30, y1 - 10)),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.55,
                    color,
                    2,
                )

        # Suspected unsafe interaction: two tracked people remain very close.
        for first_id, second_id in combinations(people.keys(), 2):
            first, second = people[first_id], people[second_id]
            distance = (
                (first["center"][0] - second["center"][0]) ** 2
                + (first["center"][1] - second["center"][1]) ** 2
            ) ** 0.5
            close_distance = ((first["width"] + second["width"]) / 2) * 4.0
            pair_id = tuple(sorted((first_id, second_id)))

            if distance < close_distance:
                interaction_start_times.setdefault(pair_id, current_time)
                if current_time - interaction_start_times[pair_id] >= 0.3:
                    x1 = min(first["box"][0], second["box"][0])
                    y1 = min(first["box"][1], second["box"][1])
                    x2 = max(first["box"][2], second["box"][2])
                    y2 = max(first["box"][3], second["box"][3])
                    cv2.rectangle(annotated, (x1, y1), (x2, y2), (0, 0, 255), 3)
                    cv2.putText(
                        annotated,
                        "SUSPECTED UNSAFE INTERACTION",
                        (x1, max(30, y1 - 10)),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.5,
                        (0, 0, 255),
                        2,
                    )
                    active_alerts.append("UNSAFE INTERACTION")
                    save_and_send(
                        args.camera,
                        {
                            "event_key": f"interaction:{pair_id}",
                            "incident": "Suspected Unsafe Interaction",
                            "confidence": round((first["confidence"] + second["confidence"]) / 2, 2),
                            "severity": "High",
                            "track_ids": list(pair_id),
                        },
                        annotated,
                        sent_events,
                    )
            else:
                interaction_start_times.pop(pair_id, None)

        # Hosted Fire/Smoke model is checked every tenth frame to control API usage.
        if fire_client and frame_number % 10 == 0:
            temp_path = TEMP_DIR / "unified_frame.jpg"
            cv2.imwrite(str(temp_path), frame)
            try:
                prediction_result = fire_client.infer(
                    str(temp_path), model_id="fire-and-smoke-segmentation/11"
                )
                fire_predictions = [
                    prediction
                    for prediction in prediction_result.get("predictions", [])
                    if prediction.get("class", "").lower() in {"fire", "smoke"}
                    and float(prediction.get("confidence", 0)) >= 0.50
                ]

                if fire_predictions:
                    fire_streak += 1
                    for prediction in fire_predictions:
                        x, y = int(prediction["x"]), int(prediction["y"])
                        box_width, box_height = int(prediction["width"]), int(prediction["height"])
                        x1, y1 = x - box_width // 2, y - box_height // 2
                        x2, y2 = x + box_width // 2, y + box_height // 2
                        cv2.rectangle(annotated, (x1, y1), (x2, y2), (0, 0, 255), 3)
                        cv2.putText(
                            annotated,
                            prediction.get("class", "SMOKE").upper(),
                            (x1, max(30, y1 - 10)),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.7,
                            (0, 0, 255),
                            2,
                        )

                    if fire_streak >= 2:
                        active_alerts.append("FIRE / SMOKE")
                        save_and_send(
                            args.camera,
                            {
                                "event_key": "fire-smoke",
                                "incident": "Fire / Smoke Detected",
                                "confidence": round(
                                    max(float(item.get("confidence", 0)) for item in fire_predictions), 2
                                ),
                                "severity": "Critical",
                            },
                            annotated,
                            sent_events,
                        )
                else:
                    fire_streak = 0
            except Exception as error:
                print(f"Roboflow inference error: {error}")

        if active_alerts:
            banner = " | ".join(sorted(set(active_alerts)))
            cv2.rectangle(annotated, (10, 10), (width - 10, 50), (0, 0, 255), -1)
            cv2.putText(
                annotated,
                banner[:55],
                (20, 38),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.55,
                (255, 255, 255),
                2,
            )

        writer.write(annotated)
        if not args.no_show:
            cv2.imshow("SentinelEdu - Unified Detection", annotated)
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break

    video.release()
    writer.release()
    cv2.destroyAllWindows()
    print(f"Done. Saved annotated output to: {output_path}")


if __name__ == "__main__":
    main()
