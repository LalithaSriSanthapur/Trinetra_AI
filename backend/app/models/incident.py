from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.models.base import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    camera_id = Column(Integer, ForeignKey("cameras.id"), nullable=False)

    incident_type = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)

    snapshot_path = Column(String)
    video_path = Column(String)

    status = Column(String, default="Open")

    detected_at = Column(DateTime, default=datetime.utcnow)

    camera = relationship("Camera", back_populates="incidents")