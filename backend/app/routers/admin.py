import io
import csv
from datetime import timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Response, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import Registration, Project, Event, FAQ, GalleryItem, FestivalSettings, AdminUser
from app.schemas import (
    AdminLogin, Token, DashboardStats, RegistrationOut, ProjectOut,
    ProjectStatusUpdate, EventUpdate, EventOut, FAQCreate, FAQUpdate, FAQOut,
    GalleryCreate, GalleryOut, SettingsUpdate, SettingsOut
)
from app.auth import verify_password, create_access_token, get_current_admin
from app.config import settings

router = APIRouter(prefix="/api/admin", tags=["Admin Portal"])

@router.post("/login", response_model=Token)
def admin_login(payload: AdminLogin, db: Session = Depends(get_db)):
    # 1. Check environment root admin
    if payload.email.strip().lower() == settings.ADMIN_EMAIL.lower() and payload.password == settings.ADMIN_PASSWORD:
        token = create_access_token({"sub": settings.ADMIN_EMAIL, "role": "superadmin"})
        return Token(
            access_token=token,
            admin_email=settings.ADMIN_EMAIL,
            admin_name="Lead Fest Administrator",
            role="superadmin"
        )
    
    # 2. Check AdminUser table
    admin = db.query(AdminUser).filter(AdminUser.email == payload.email.strip().lower()).first()
    if admin and verify_password(payload.password, admin.hashed_password):
        token = create_access_token({"sub": admin.email, "role": admin.role})
        return Token(
            access_token=token,
            admin_email=admin.email,
            admin_name=admin.full_name,
            role=admin.role
        )

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid administrator credentials"
    )

@router.get("/me")
def get_current_admin_info(current_admin: dict = Depends(get_current_admin)):
    return current_admin

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    total_regs = db.query(Registration).count()
    internal_regs = db.query(Registration).filter(Registration.is_internal == True).count()
    external_regs = total_regs - internal_regs

    # Event-wise registrations
    event_counts = db.query(
        Registration.event_name, func.count(Registration.id)
    ).group_by(Registration.event_name).all()
    event_wise = {row[0]: row[1] for row in event_counts}

    total_projects = db.query(Project).count()
    hardware_projects = db.query(Project).filter(Project.category == "Hardware").count()
    software_projects = db.query(Project).filter(Project.category == "Software").count()
    pending_projects = db.query(Project).filter(Project.status == "pending").count()
    approved_projects = db.query(Project).filter(Project.status == "approved").count()
    rejected_projects = db.query(Project).filter(Project.status == "rejected").count()

    return DashboardStats(
        total_registrations=total_regs,
        internal_registrations=internal_regs,
        external_registrations=external_regs,
        event_wise_registrations=event_wise,
        total_projects=total_projects,
        hardware_projects=hardware_projects,
        software_projects=software_projects,
        pending_projects=pending_projects,
        approved_projects=approved_projects,
        rejected_projects=rejected_projects
    )

@router.get("/registrations", response_model=List[RegistrationOut])
def get_admin_registrations(
    event_id: Optional[str] = None,
    search: Optional[str] = None,
    is_internal: Optional[bool] = None,
    limit: int = 200,
    offset: int = 0,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    query = db.query(Registration)
    if event_id and event_id != "all":
        query = query.filter(Registration.event_id == event_id)
    if is_internal is not None:
        query = query.filter(Registration.is_internal == is_internal)
    if search:
        s = f"%{search.strip()}%"
        query = query.filter(
            (Registration.full_name.ilike(s)) |
            (Registration.email.ilike(s)) |
            (Registration.reg_code.ilike(s)) |
            (Registration.college_name.ilike(s)) |
            (Registration.phone.ilike(s))
        )
    return query.order_by(Registration.created_at.desc()).offset(offset).limit(limit).all()

@router.get("/registrations/export-csv")
def export_registrations_csv(
    event_id: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    query = db.query(Registration)
    if event_id and event_id != "all":
        query = query.filter(Registration.event_id == event_id)
    records = query.order_by(Registration.created_at.desc()).all()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "Registration Code",
        "Full Name",
        "Email",
        "Phone",
        "College Name",
        "Participant Type",
        "Department",
        "Year/Semester",
        "Event ID",
        "Event Name",
        "Team Name",
        "Team Members",
        "Status",
        "Registered At (UTC)"
    ])

    for r in records:
        writer.writerow([
            r.reg_code,
            r.full_name,
            r.email,
            r.phone,
            r.college_name,
            "Internal" if r.is_internal else "External",
            r.department,
            r.year_semester,
            r.event_id,
            r.event_name,
            r.team_name or "N/A",
            r.team_members or "N/A",
            r.status,
            r.created_at.isoformat() if r.created_at else ""
        ])

    csv_data = output.getvalue()
    filename = f"techgallery2027_registrations_{event_id or 'all'}.csv"

    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

@router.post("/registrations/{reg_id}/approve", response_model=RegistrationOut)
def approve_registration(
    reg_id: str,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    reg = db.query(Registration).filter(Registration.id == reg_id).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    reg.status = "approved"
    reg.can_submit_project = True
    db.commit()
    db.refresh(reg)
    return reg

@router.get("/projects", response_model=List[ProjectOut])
def get_admin_projects(
    status: Optional[str] = None,
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    query = db.query(Project)
    if status and status != "all":
        query = query.filter(Project.status == status)
    if category and category != "all":
        query = query.filter(Project.category.ilike(category))
    if search:
        s = f"%{search.strip()}%"
        query = query.filter(
            (Project.project_name.ilike(s)) |
            (Project.student_name.ilike(s)) |
            (Project.college_name.ilike(s)) |
            (Project.project_code.ilike(s))
        )
    return query.order_by(Project.created_at.desc()).all()

@router.patch("/projects/{project_id}/status", response_model=ProjectOut)
def update_project_status(
    project_id: str,
    payload: ProjectStatusUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project.status = payload.status
    if payload.admin_notes is not None:
        project.admin_notes = payload.admin_notes

    db.commit()
    db.refresh(project)
    return project

@router.post("/gallery", response_model=GalleryOut, status_code=status.HTTP_201_CREATED)
def add_gallery_item(
    payload: GalleryCreate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    item = GalleryItem(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/gallery/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gallery_item(
    item_id: str,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    db.delete(item)
    db.commit()
    return None

@router.post("/faqs", response_model=FAQOut, status_code=status.HTTP_201_CREATED)
def create_faq(
    payload: FAQCreate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    faq = FAQ(**payload.model_dump())
    db.add(faq)
    db.commit()
    db.refresh(faq)
    return faq

@router.put("/faqs/{faq_id}", response_model=FAQOut)
def update_faq(
    faq_id: str,
    payload: FAQUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(faq, key, value)
    
    db.commit()
    db.refresh(faq)
    return faq

@router.delete("/faqs/{faq_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_faq(
    faq_id: str,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    db.delete(faq)
    db.commit()
    return None

@router.put("/settings", response_model=SettingsOut)
def update_festival_settings(
    payload: SettingsUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    settings_obj = db.query(FestivalSettings).filter(FestivalSettings.id == "default").first()
    if not settings_obj:
        settings_obj = FestivalSettings(id="default")
        db.add(settings_obj)
    
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(settings_obj, key, value)
    
    db.commit()
    db.refresh(settings_obj)
    return settings_obj

