from pydantic import BaseModel


class SchoolCreate(BaseModel):
    name: str
    email: str
    address: str
    phone: str

class SchoolUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    address: str | None = None
    phone: str | None = None

class SchoolResponse(BaseModel):
    id: int
    name: str
    email: str
    address: str
    phone: str

    class Config:
        from_attributes = True