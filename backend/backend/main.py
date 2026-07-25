from fastapi import FastAPI
from routes.incidents import router as incident_router
from routes.cameras import router as camera_router
from routes.auth import router as auth_router

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Backend is running!"}


app.include_router(incident_router)
app.include_router(camera_router)
app.include_router(auth_router)