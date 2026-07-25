from sqlalchemy import Column, Integer, String
from app.models.base import Base
from sqlalchemy.orm import relationship


class School(Base):
    __tablename__ = "schools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    address = Column(String)
    phone = Column(String)

    cameras = relationship(
    "Camera",
    back_populates="school",
    cascade="all, delete-orphan"
)

    users = relationship(
    "User",
    back_populates="school",
    cascade="all, delete-orphan"
)