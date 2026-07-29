from app.database import SessionLocal

from app.schemas.school import SchoolCreate
from app.schemas.camera import CameraCreate
from app.schemas.incident import IncidentCreate, IncidentUpdate

from app.crud.school import create_school
from app.crud.camera import create_camera
from app.crud.incident import (
    create_incident,
    get_incident,
    get_all_incidents,
    update_incident,
    delete_incident,
)

db = SessionLocal()

# -----------------------------
# Create School
# -----------------------------
school = SchoolCreate(
    name="Sentinel School",
    email="sentinel@gmail.com",
    address="Delhi",
    phone="9999999999"
)

new_school = create_school(db, school)

# -----------------------------
# Create Camera
# -----------------------------
camera = CameraCreate(
    school_id=new_school.id,
    camera_name="Main Gate",
    location="Front Entrance",
    rtsp_url="rtsp://camera1",
    status="Active"
)

new_camera = create_camera(db, camera)

# -----------------------------
# Create Incident
# -----------------------------
incident = IncidentCreate(
    camera_id=new_camera.id,
    incident_type="Bullying",
    severity="High",
    confidence=0.96,
    snapshot_path="snapshots/bullying1.jpg",
    video_path="videos/bullying1.mp4",
)

new_incident = create_incident(db, incident)

print("✅ Incident Created:", new_incident.id)

# -----------------------------
# Read Incident
# -----------------------------
i = get_incident(db, new_incident.id)

print("📖 Incident:", i.incident_type)

# -----------------------------
# Read All Incidents
# -----------------------------
incidents = get_all_incidents(db)

print("📋 Total Incidents:", len(incidents))

# -----------------------------
# Update Incident
# -----------------------------
updated = update_incident(
    db,
    new_incident.id,
    IncidentUpdate(
        severity="Critical",
        status="Resolved"
    )
)

print("✏ Updated:", updated.severity, updated.status)

# -----------------------------
# Delete Incident
# -----------------------------
delete_incident(db, new_incident.id)

print("🗑 Deleted:", get_incident(db, new_incident.id) is None)

db.close()