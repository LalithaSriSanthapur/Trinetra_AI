from app.database import SessionLocal

from app.schemas.school import SchoolCreate
from app.schemas.user import UserCreate, UserUpdate

from app.crud.school import create_school
from app.crud.user import (
    create_user,
    get_user,
    get_all_users,
    update_user,
    delete_user,
)

db = SessionLocal()

# -----------------------------
# Create School
# -----------------------------
school = SchoolCreate(
    name="Green Valley School",
    email="greenvalley@gmail.com",
    address="Delhi",
    phone="9999999999"
)

new_school = create_school(db, school)

# -----------------------------
# Create User
# -----------------------------
user = UserCreate(
    school_id=new_school.id,
    name="Admin User",
    email="adminuser@gmail.com",
    password_hash="hashed_password",
    role="School Admin"
)

new_user = create_user(db, user)

print("✅ User Created:", new_user.id)

# -----------------------------
# Read User
# -----------------------------
u = get_user(db, new_user.id)
print("📖", u.name)

# -----------------------------
# Read All Users
# -----------------------------
users = get_all_users(db)
print("👥 Total Users:", len(users))

# -----------------------------
# Update User
# -----------------------------
updated = update_user(
    db,
    new_user.id,
    UserUpdate(role="Principal")
)

print("✏ Updated Role:", updated.role)

# -----------------------------
# Delete User
# -----------------------------
delete_user(db, new_user.id)

print("🗑 User Deleted:", get_user(db, new_user.id) is None)

db.close()