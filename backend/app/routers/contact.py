from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import FestivalSettings
from app.schemas import SettingsOut

router = APIRouter(prefix="/api/settings", tags=["Festival Settings & Contact"])

@router.get("", response_model=SettingsOut)
def get_festival_settings(db: Session = Depends(get_db)):
    settings_obj = db.query(FestivalSettings).filter(FestivalSettings.id == "default").first()
    if not settings_obj:
        return SettingsOut(
            festival_name="TECH GALLERY 2027",
            tagline="Where Ideas Meet Innovation.",
            start_date="2027-01-18",
            end_date="2027-01-24",
            our_college_name="Tech Gallery Engineering College",
            official_email="contact@techgallery2027.edu",
            phone="+91 98765 43210",
            address="Innovation Campus, Tech Gallery Block, University Road, Sector 5",
            instagram_url="https://instagram.com/techgallery2027"
        )
    return settings_obj

