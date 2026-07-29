from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.models.base import Base


class Camera(Base):
    __tablename__ = "cameras"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id"), nullable=False)

    camera_name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    rtsp_url = Column(String, nullable=False)
    status = Column(String, default="Active")

    school = relationship("School", back_populates="cameras")

    incidents = relationship(
    "Incident",
    back_populates="camera",
    cascade="all, delete-orphan"
)