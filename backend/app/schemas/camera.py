from pydantic import BaseModel


class CameraCreate(BaseModel):
    school_id: int
    camera_name: str
    location: str
    rtsp_url: str
    status: str = "Active"


class CameraUpdate(BaseModel):
    camera_name: str | None = None
    location: str | None = None
    rtsp_url: str | None = None
    status: str | None = None


class CameraResponse(BaseModel):
    id: int
    school_id: int
    camera_name: str
    location: str
    rtsp_url: str
    status: str

    class Config:
        from_attributes = True