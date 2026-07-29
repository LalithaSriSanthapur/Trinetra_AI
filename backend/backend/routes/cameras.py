from fastapi import APIRouter
from services.incident_service import get_all_cameras

router = APIRouter(
    tags=["Cameras"]
)


@router.get("/cameras")
def get_cameras():

    return {
        "total": len(get_all_cameras()),
        "cameras": get_all_cameras()
    }