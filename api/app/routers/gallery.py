from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import GalleryItem
from app.schemas import GalleryOut

router = APIRouter(prefix="/api/gallery", tags=["Gallery"])

@router.get("", response_model=List[GalleryOut])
def get_gallery_items(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(GalleryItem)
    if category and category.lower() != "all":
        query = query.filter(GalleryItem.category == category.lower())
    return query.order_by(GalleryItem.created_at.desc()).all()

