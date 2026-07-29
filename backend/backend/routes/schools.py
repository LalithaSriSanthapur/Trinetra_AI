from fastapi import APIRouter

router = APIRouter(prefix="/schools", tags=["Schools"])


@router.get("/")
def get_schools():
    return [{"school_id": 1, "name": "Sample School"}]