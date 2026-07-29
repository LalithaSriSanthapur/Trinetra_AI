from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.schemas.incident import IncidentCreate, IncidentUpdate

def create_incident(db: Session, incident: IncidentCreate):
    db_incident = Incident(
        camera_id=incident.camera_id,
        incident_type=incident.incident_type,
        severity=incident.severity,
        confidence=incident.confidence,
        snapshot_path=incident.snapshot_path,
        video_path=incident.video_path,
        status=incident.status,
    )

    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)

    return db_incident

def get_incident(db: Session, incident_id: int):
    return db.query(Incident).filter(Incident.id == incident_id).first()

def get_all_incidents(db: Session):
    return db.query(Incident).all()

def update_incident(db: Session, incident_id: int, incident_data: IncidentUpdate):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()

    if not incident:
        return None

    update_data = incident_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(incident, key, value)

    db.commit()
    db.refresh(incident)

    return incident

def delete_incident(db: Session, incident_id: int):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()

    if not incident:
        return None

    db.delete(incident)
    db.commit()

    