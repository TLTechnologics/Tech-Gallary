import secrets
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Project, ProjectImage
from app.schemas import ProjectCreate, ProjectOut

router = APIRouter(prefix="/api/projects", tags=["Projects"])

HARDWARE_SUB_CATEGORIES = [
    "Robotics",
    "IoT",
    "ESP32 and Arduino projects",
    "Smart Home Automation",
    "Embedded Systems",
    "Electronic Prototypes",
    "Innovative Hardware Products",
    "Other Hardware"
]

SOFTWARE_SUB_CATEGORIES = [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Applications",
    "Android Applications",
    "AI Assistants",
    "SaaS Products",
    "Desktop Applications",
    "Automation Software",
    "Other Software"
]

@router.post("", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
def submit_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    # 1. Validate Category
    if payload.category not in ["Hardware", "Software"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project category must be either 'Hardware' or 'Software'."
        )

    # 2. Generate unique project code
    random_hex = secrets.token_hex(3).upper()
    project_code = f"TG27-PRJ-{random_hex}"
    while db.query(Project).filter(Project.project_code == project_code).first():
        random_hex = secrets.token_hex(3).upper()
        project_code = f"TG27-PRJ-{random_hex}"

    # 3. Create Project Record
    project = Project(
        project_code=project_code,
        student_name=payload.student_name.strip(),
        college_name=payload.college_name.strip(),
        email=payload.email.strip().lower(),
        phone=payload.phone.strip(),
        project_name=payload.project_name.strip(),
        category=payload.category,
        sub_category=payload.sub_category.strip(),
        description=payload.description.strip(),
        technologies_used=payload.technologies_used.strip(),
        num_team_members=payload.num_team_members,
        team_member_names=payload.team_member_names.strip() if payload.team_member_names else None,
        demo_video_url=payload.demo_video_url.strip() if payload.demo_video_url else None,
        status="pending"
    )

    db.add(project)
    db.flush()

    # 4. Save Images if provided
    if payload.images:
        for img_url in payload.images:
            if img_url.strip():
                img_record = ProjectImage(
                    project_id=project.id,
                    image_url=img_url.strip()
                )
                db.add(img_record)

    db.commit()
    db.refresh(project)
    return project

@router.get("/public", response_model=List[ProjectOut])
def get_public_projects(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Project).filter(Project.status == "approved")
    if category and category.lower() in ["hardware", "software"]:
        query = query.filter(Project.category.ilike(category))
    return query.order_by(Project.created_at.desc()).all()

@router.get("/categories")
def get_categories():
    return {
        "Hardware": HARDWARE_SUB_CATEGORIES,
        "Software": SOFTWARE_SUB_CATEGORIES
    }

@router.get("/{project_code}", response_model=ProjectOut)
def get_project_by_code(project_code: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_code == project_code.strip().upper()).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

