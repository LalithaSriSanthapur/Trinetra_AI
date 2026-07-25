from app.database import SessionLocal
from app.schemas.school import SchoolCreate
from app.crud.school import create_school

db = SessionLocal()

school = SchoolCreate(
    name="Delhi Public School",
    email="admin@dps.com",
    address="New Delhi",
    phone="9876543210",
)

new_school = create_school(db, school)

print(f"✅ School created with ID: {new_school.id}")

db.close()