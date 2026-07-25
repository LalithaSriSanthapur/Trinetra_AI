from fastapi import APIRouter, HTTPException
from schemas.incident import LoginRequest
from services.incident_service import login_user

router = APIRouter(
    tags=["Authentication"]
)


@router.post("/login")
def login(login_data: LoginRequest):

    result = login_user(
        login_data.email,
        login_data.password
    )

    if result is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return result