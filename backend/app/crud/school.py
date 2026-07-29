from sqlalchemy.orm import Session

from app.models.school import School
from app.schemas.school import SchoolCreate


def create_school(db: Session, school: SchoolCreate):
    db_school = School(
        name=school.name,
        email=school.email,
        address=school.address,
        phone=school.phone,
    )

    db.add(db_school)
    db.commit()
    db.refresh(db_school)

    return db_school

from app.models.school import School

def get_school(db: Session, school_id: int):
    return db.query(School).filter(School.id == school_id).first()

def get_all_schools(db: Session):
    return db.query(School).all()

from app.schemas.school import SchoolUpdate

def update_school(db: Session, school_id: int, school_data: SchoolUpdate):
    school = db.query(School).filter(School.id == school_id).first()

    if not school:
        return None

    update_data = school_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(school, key, value)

    db.commit()
    db.refresh(school)

    return school

def delete_school(db: Session, school_id: int):
    school = db.query(School).filter(School.id == school_id).first()

    if not school:
        return None

    db.delete(school)
    db.commit()

    return school