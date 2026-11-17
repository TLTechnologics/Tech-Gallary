from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Event
from app.schemas import EventOut, EventUpdate
from app.auth import get_current_admin

router = APIRouter(prefix="/api/events", tags=["Events"])

@router.get("", response_model=List[EventOut])
def get_all_events(db: Session = Depends(get_db)):
    events = db.query(Event).order_by(Event.display_order.asc()).all()
    return events

@router.get("/{event_id}", response_model=EventOut)
def get_event_by_id(event_id: str, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.put("/{event_id}", response_model=EventOut)
def update_event(
    event_id: str,
    payload: EventUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(event, key, value)
    
    db.commit()
    db.refresh(event)
    return event

