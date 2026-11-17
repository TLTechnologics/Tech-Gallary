import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Boolean, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

def utc_now():
    return datetime.now(timezone.utc)

class Event(Base):
    __tablename__ = "events"

    id = Column(String(50), primary_key=True)  # e.g., 'bhavesh-workshop'
    name = Column(String(150), nullable=False)
    date_display = Column(String(50), nullable=False)  # '18 January 2027'
    date_iso = Column(String(20), nullable=False)  # '2027-01-18'
    tagline = Column(String(255), nullable=True)
    description = Column(Text, nullable=False)
    eligibility = Column(String(255), nullable=False)
    eligibility_type = Column(String(30), nullable=False)  # internal_only, open_all, parents_only, results_only
    registration_status = Column(String(20), default="open")  # open, closed, waitlist, announced
    rules = Column(Text, nullable=True)
    venue = Column(String(100), default="Campus Auditorium / Tech Hall")
    timing = Column(String(100), default="09:00 AM - 05:00 PM")
    is_hackathon = Column(Boolean, default=False)
    is_workshop = Column(Boolean, default=False)
    is_showcase = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    registrations = relationship("Registration", back_populates="event", cascade="all, delete-orphan")

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    reg_code = Column(String(30), unique=True, index=True, nullable=False)
    full_name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False, index=True)
    phone = Column(String(30), nullable=False, index=True)
    college_name = Column(String(200), nullable=False)
    is_internal = Column(Boolean, default=False)
    roll_number = Column(String(50), nullable=True)
    department = Column(String(100), nullable=False)
    year_semester = Column(String(50), nullable=False)
    event_id = Column(String(50), ForeignKey("events.id"), nullable=False)
    event_name = Column(String(150), nullable=False)
    team_name = Column(String(150), nullable=True)
    team_members = Column(Text, nullable=True)
    status = Column(String(20), default="confirmed")  # confirmed, pending_approval, approved, cancelled
    registration_type = Column(String(30), default="visitor")  # visitor, showcasing
    approval_token = Column(String(64), nullable=True, index=True)
    can_submit_project = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    event = relationship("Event", back_populates="registrations")

    __table_args__ = (
        UniqueConstraint('email', 'event_id', name='uq_email_event'),
        UniqueConstraint('phone', 'event_id', name='uq_phone_event'),
    )

class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_code = Column(String(30), unique=True, index=True, nullable=False)
    student_name = Column(String(150), nullable=False)
    college_name = Column(String(200), nullable=False)
    email = Column(String(150), nullable=False, index=True)
    phone = Column(String(30), nullable=False)
    project_name = Column(String(200), nullable=False)
    category = Column(String(50), nullable=False)  # 'Hardware' or 'Software'
    sub_category = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    technologies_used = Column(Text, nullable=False)
    num_team_members = Column(Integer, default=1)
    team_member_names = Column(Text, nullable=True)
    demo_video_url = Column(String(500), nullable=True)
    status = Column(String(20), default="pending")  # pending, approved, rejected
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    images = relationship("ProjectImage", back_populates="project", cascade="all, delete-orphan")

class ProjectImage(Base):
    __tablename__ = "project_images"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    image_url = Column(Text, nullable=False)
    caption = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    project = relationship("Project", back_populates="images")

class GalleryItem(Base):
    __tablename__ = "gallery"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(200), nullable=False)
    category = Column(String(50), nullable=False)  # hardware, software, event, workshop
    image_url = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    is_featured = Column(Boolean, default=False)
    is_placeholder = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)

class FAQ(Base):
    __tablename__ = "faqs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String(50), default="General")
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=utc_now)

class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(150), nullable=False)
    role = Column(String(30), default="admin")
    created_at = Column(DateTime(timezone=True), default=utc_now)

class FestivalSettings(Base):
    __tablename__ = "festival_settings"

    id = Column(String(20), primary_key=True, default="default")
    festival_name = Column(String(100), default="TECH GALLERY 2027")
    tagline = Column(String(255), default="Where Ideas Meet Innovation.")
    start_date = Column(String(20), default="2027-01-18")
    end_date = Column(String(20), default="2027-01-24")
    our_college_name = Column(String(200), default="LJCCA")
    official_email = Column(String(150), default="contact@techgallery2027.edu")
    phone = Column(String(50), default="+91 98765 43210")
    address = Column(Text, default="LJCCA, NEAR NEW, IIM Rd, Vastrapur, Ahmedabad, Gujarat 380015")
    instagram_url = Column(String(255), default="https://instagram.com/techgallery2027")
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

