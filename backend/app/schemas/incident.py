from pydantic import BaseModel
from datetime import datetime


class IncidentCreate(BaseModel):
    camera_id: int
    incident_type: str
    severity: str
    confidence: float
    snapshot_path: str | None = None
    video_path: str | None = None
    status: str = "Open"


class IncidentUpdate(BaseModel):
    incident_type: str | None = None
    severity: str | None = None
    confidence: float | None = None
    snapshot_path: str | None = None
    video_path: str | None = None
    status: str | None = None


class IncidentResponse(BaseModel):
    id: int
    camera_id: int
    incident_type: str
    severity: str
    confidence: float
    snapshot_path: str | None
    video_path: str | None
    status: str
    detected_at: datetime

    class Config:
        from_attributes = True