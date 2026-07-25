from sqlalchemy.orm import Session

from app.models.camera import Camera
from app.schemas.camera import CameraCreate, CameraUpdate

def create_camera(db: Session, camera: CameraCreate):
    db_camera = Camera(
        school_id=camera.school_id,
        camera_name=camera.camera_name,
        location=camera.location,
        rtsp_url=camera.rtsp_url,
        status=camera.status,
    )

    db.add(db_camera)
    db.commit()
    db.refresh(db_camera)

    return db_camera

def get_camera(db: Session, camera_id: int):
    return db.query(Camera).filter(Camera.id == camera_id).first()

def get_all_cameras(db: Session):
    return db.query(Camera).all()

def update_camera(db: Session, camera_id: int, camera_data: CameraUpdate):
    camera = db.query(Camera).filter(Camera.id == camera_id).first()

    if not camera:
        return None

    update_data = camera_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(camera, key, value)

    db.commit()
    db.refresh(camera)

    return camera

def delete_camera(db: Session, camera_id: int):
    camera = db.query(Camera).filter(Camera.id == camera_id).first()

    if not camera:
        return None

    db.delete(camera)
    db.commit()

    return camera