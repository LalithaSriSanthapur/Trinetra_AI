from pydantic import BaseModel


class UserCreate(BaseModel):
    school_id: int
    name: str
    email: str
    password_hash: str
    role: str


class UserUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    password_hash: str | None = None
    role: str | None = None


class UserResponse(BaseModel):
    id: int
    school_id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True