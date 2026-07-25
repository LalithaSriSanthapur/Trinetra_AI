from app.database import SessionLocal

from app.schemas.school import SchoolCreate
from app.schemas.camera import CameraCreate, CameraUpdate

from app.crud.school import create_school
from app.crud.camera import (
    create_camera,
    get_camera,
    get_all_cameras,
    update_camera,
    delete_camera,
)

db = SessionLocal()

# -----------------------------
# Create School
# -----------------------------

school = SchoolCreate(
    name="XYZ School",
    email="xyzschool@gmail.com",   # Change if this already exists
    address="New Delhi",
    phone="9876543210"
)

new_school = create_school(db, school)

print(f"✅ School Created: {new_school.id}")

# -----------------------------
# Create Camera
# -----------------------------

camera = CameraCreate(
    school_id=new_school.id,
    camera_name="Main Gate",
    location="Front Gate",
    rtsp_url="rtsp://camera1",
    status="Active"
)

new_camera = create_camera(db, camera)

print(f"✅ Camera Created: {new_camera.id}")

# -----------------------------
# Get One Camera
# -----------------------------

camera = get_camera(db, new_camera.id)

print("\n📷 Camera Details")
print(camera.id)
print(camera.camera_name)
print(camera.location)

# -----------------------------
# Get All Cameras
# -----------------------------

print("\n📋 All Cameras")

cameras = get_all_cameras(db)

for cam in cameras:
    print(cam.id, cam.camera_name, cam.location)

# -----------------------------
# Update Camera
# -----------------------------

camera_update = CameraUpdate(
    location="Back Gate",
    status="Inactive"
)

updated_camera = update_camera(
    db,
    new_camera.id,
    camera_update
)

print("\n✏ Camera Updated")
print(updated_camera.location)
print(updated_camera.status)

# -----------------------------
# Delete Camera
# -----------------------------

delete_camera(db, new_camera.id)

deleted = get_camera(db, new_camera.id)

print("\n🗑 Camera Deleted Successfully:", deleted is None)

db.close()