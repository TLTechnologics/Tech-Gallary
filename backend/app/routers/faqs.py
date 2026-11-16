from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import FAQ
from app.schemas import FAQOut

router = APIRouter(prefix="/api/faqs", tags=["FAQs"])

@router.get("", response_model=List[FAQOut])
def get_faqs(db: Session = Depends(get_db)):
    return db.query(FAQ).order_by(FAQ.display_order.asc(), FAQ.created_at.asc()).all()

