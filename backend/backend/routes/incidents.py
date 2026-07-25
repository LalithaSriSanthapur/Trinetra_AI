from fastapi import APIRouter, status, HTTPException
from schemas.incident import IncidentCreate, IncidentStatusUpdate
from services.incident_service import (
    save_incident,
    get_all_incidents,
    get_incident_by_id,
    update_incident_status,
    get_analytics,
)

router = APIRouter(
    tags=["Incidents"]
)


@router.post("/incidents", status_code=status.HTTP_201_CREATED)
def create_incident(incident: IncidentCreate):

    save_incident(incident)

    return {
        "message": "Incident created successfully",
        "incident": incident.model_dump()
    }


@router.get("/incidents")
def get_incidents():

    incidents = get_all_incidents()

    return {
        "total": len(incidents),
        "incidents": incidents
    }


@router.get("/incidents/{incident_id}")
def get_incident(incident_id: int):

    incident = get_incident_by_id(incident_id)

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return incident


@router.patch("/incidents/{incident_id}/status")
def update_status(
    incident_id: int,
    status_update: IncidentStatusUpdate
):

    incident = update_incident_status(
        incident_id,
        status_update.status
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return {
        "message": "Incident status updated successfully",
        "incident": incident
    }


@router.get("/analytics")
def analytics():

    return get_analytics()