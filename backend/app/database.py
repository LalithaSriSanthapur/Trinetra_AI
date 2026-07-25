from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.base import Base

DATABASE_URL = "postgresql+psycopg://postgres:Trinetra%40123@localhost:5432/trinetra_ai"

engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()