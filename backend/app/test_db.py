from app.database import engine
from app.models.school import School
from app.models.camera import Camera
from app.models.incident import Incident 
from app.models.user import User
from app.models.base import Base

Base.metadata.create_all(bind=engine)

print("✅ Tables created successfully!")
