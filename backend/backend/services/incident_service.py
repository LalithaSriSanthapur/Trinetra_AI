from datetime import datetime

def save_incident(incident):
    print("Saving incident to database...")
    print(incident.model_dump())

def get_all_incidents():
    return [
        {
            "id": 1,
            "camera": "Camera 3",
            "incident": "Fire / Smoke Detected",
            "confidence": 0.9,
            "severity": "Critical",
            "timestamp": "2026-07-25T11:24:36",
            "evidence_path": "evidence/fire.jpg",
            "status": "new"
        }
    ]

def get_incident_by_id(incident_id: int):
    incidents = get_all_incidents()
    for incident in incidents:
        if incident["id"] == incident_id:
            return incident
    return None

def update_incident_status(incident_id: int, status: str):
    incident = get_incident_by_id(incident_id)
    if incident:
        incident["status"] = status
        return incident
    return None

def get_analytics():
    return {
        "total_incidents": 1,
        "critical": 1,
        "high": 0,
        "medium": 0,
        "low": 0
    }

def get_all_cameras():
    return [
        {
            "id": 1,
            "name": "Camera 1",
            "location": "School Entrance",
            "status": "Online"
        },
        {
            "id": 2,
            "name": "Camera 2",
            "location": "Main Corridor",
            "status": "Online"
        },
        {
            "id": 3,
            "name": "Camera 3",
            "location": "Science Lab",
            "status": "Offline"
        }
    ]

def login_user(email: str, password: str):
    if email == "admin@sentineledu.com" and password == "admin123":
        return {
            "message": "Login successful",
            "token": "dummy_jwt_token_12345"
        }
    return None