from datetime import datetime
from pydantic import BaseModel


class IncidentCreate(BaseModel):
    camera: str
    incident: str
    confidence: float
    severity: str
    timestamp: datetime
    evidence_path: str
    status: str = "new"


class IncidentStatusUpdate(BaseModel):
    status: str


class LoginRequest(BaseModel):
    email: str
    password: str