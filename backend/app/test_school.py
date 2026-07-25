from app.database import SessionLocal
from app.schemas.school import SchoolCreate, SchoolUpdate
from app.crud.school import (
    create_school,
    get_school,
    get_all_schools,
    update_school,
    delete_school,
)

db = SessionLocal()

# -----------------------------
# CREATE
# -----------------------------
school = SchoolCreate(
    name="DPS",
    email="admin2@dps.com",
    address="New Delhi",
    phone="9876543210",
)

new_school = create_school(db, school)

print("✅ Created School:", new_school.id)

# -----------------------------
# READ ONE
# -----------------------------
school = get_school(db, new_school.id)

print("📖 School:", school.name)

# -----------------------------
# READ ALL
# -----------------------------
schools = get_all_schools(db)

print("\n📚 All Schools")

for s in schools:
    print(s.id, s.name)

# -----------------------------
# UPDATE
# -----------------------------
updated = SchoolUpdate(
    name="DPS RK Puram"
)

updated_school = update_school(
    db,
    new_school.id,
    updated
)

print("\n✏ Updated:", updated_school.name)

# -----------------------------
# DELETE
# -----------------------------
delete_school(db, new_school.id)

print("\n🗑 School Deleted")

# -----------------------------
# VERIFY DELETE
# -----------------------------
deleted = get_school(db, new_school.id)

print("Verification:", deleted)

db.close()