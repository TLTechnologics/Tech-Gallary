from typing import List, Optional, Literal, Union
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field, field_validator, field_serializer
from datetime import datetime, date

# --- Events ---
class EventBase(BaseModel):
    id: str
    name: str
    date_display: str
    date_iso: str
    tagline: Optional[str] = None
    description: str
    eligibility: str
    eligibility_type: Literal["internal_only", "open_all", "parents_only", "results_only"]
    registration_status: Literal["open", "closed", "waitlist", "announced"] = "open"
    rules: Optional[str] = None
    venue: Optional[str] = "Campus Auditorium / Tech Hall"
    timing: Optional[str] = "09:00 AM - 05:00 PM"
    is_hackathon: bool = False
    is_workshop: bool = False
    is_showcase: bool = False
    display_order: int = 0

class EventUpdate(BaseModel):
    name: Optional[str] = None
    tagline: Optional[str] = None
    description: Optional[str] = None
    eligibility: Optional[str] = None
    registration_status: Optional[Literal["open", "closed", "waitlist", "announced"]] = None
    rules: Optional[str] = None
    venue: Optional[str] = None
    timing: Optional[str] = None

class EventOut(EventBase):
    updated_at: Optional[datetime] = None
    class Config:
        from_attributes = True

# --- Registrations ---
class RegistrationCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=150)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    college_name: str = Field(..., min_length=2, max_length=200)
    roll_number: Optional[str] = None
    department: str = Field(..., min_length=2, max_length=100)
    year_semester: str = Field(..., min_length=1, max_length=50)
    event_id: str
    registration_type: Literal["visitor", "showcasing"] = "visitor"
    team_name: Optional[str] = None
    team_members: Optional[str] = None

    @field_validator('phone')
    @classmethod
    def clean_phone(cls, v: str) -> str:
        cleaned = "".join([c for c in v if c.isdigit() or c == '+'])
        digits = [c for c in cleaned if c.isdigit()]
        if len(digits) < 10:
            raise ValueError("Phone number must have at least 10 digits")
        return cleaned

class RegistrationOut(BaseModel):
    id: Union[str, UUID]
    reg_code: str
    full_name: str
    email: str
    phone: str
    college_name: str
    is_internal: bool
    roll_number: Optional[str] = None
    department: str
    year_semester: str
    event_id: str
    event_name: str
    team_name: Optional[str] = None
    team_members: Optional[str] = None
    status: str
    registration_type: str = "visitor"
    can_submit_project: bool = False
    approval_token: Optional[str] = None
    whatsapp_url: Optional[str] = None
    whatsapp_message: Optional[str] = None
    created_at: datetime

    @field_serializer('id')
    def serialize_id(self, v: Union[str, UUID]) -> str:
        return str(v)

    class Config:
        from_attributes = True

# --- Projects ---
class ProjectImageBase(BaseModel):
    image_url: str
    caption: Optional[str] = None

class ProjectImageOut(ProjectImageBase):
    id: Union[str, UUID]
    created_at: datetime

    @field_serializer('id')
    def serialize_id(self, v: Union[str, UUID]) -> str:
        return str(v)

    class Config:
        from_attributes = True

class ProjectCreate(BaseModel):
    student_name: str = Field(..., min_length=2, max_length=150)
    college_name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    project_name: str = Field(..., min_length=2, max_length=200)
    category: Literal["Hardware", "Software"]
    sub_category: str = Field(..., min_length=2, max_length=100)
    description: str = Field(..., min_length=10)
    technologies_used: str = Field(..., min_length=2)
    num_team_members: int = Field(default=1, ge=1, le=10)
    team_member_names: Optional[str] = None
    demo_video_url: Optional[str] = None
    images: Optional[List[str]] = None

class ProjectStatusUpdate(BaseModel):
    status: Literal["pending", "approved", "rejected"]
    admin_notes: Optional[str] = None

class ProjectOut(BaseModel):
    id: Union[str, UUID]
    project_code: str
    student_name: str
    college_name: str
    email: str
    phone: str
    project_name: str
    category: str
    sub_category: str
    description: str
    technologies_used: str
    num_team_members: int
    team_member_names: Optional[str] = None
    demo_video_url: Optional[str] = None
    status: str
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    images: List[ProjectImageOut] = []

    @field_serializer('id')
    def serialize_id(self, v: Union[str, UUID]) -> str:
        return str(v)

    class Config:
        from_attributes = True

# --- Gallery ---
class GalleryCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=200)
    category: Literal["hardware", "software", "event", "workshop"]
    image_url: str
    description: Optional[str] = None
    is_featured: bool = False
    is_placeholder: bool = False

class GalleryOut(GalleryCreate):
    id: Union[str, UUID]
    created_at: datetime

    @field_serializer('id')
    def serialize_id(self, v: Union[str, UUID]) -> str:
        return str(v)

    class Config:
        from_attributes = True

# --- FAQ ---
class FAQCreate(BaseModel):
    question: str = Field(..., min_length=5)
    answer: str = Field(..., min_length=5)
    category: Optional[str] = "General"
    display_order: Optional[int] = 0

class FAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[str] = None
    display_order: Optional[int] = None

class FAQOut(FAQCreate):
    id: Union[str, UUID]
    created_at: datetime

    @field_serializer('id')
    def serialize_id(self, v: Union[str, UUID]) -> str:
        return str(v)

    class Config:
        from_attributes = True

# --- Settings ---
class SettingsUpdate(BaseModel):
    festival_name: Optional[str] = None
    tagline: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    our_college_name: Optional[str] = None
    official_email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    instagram_url: Optional[str] = None

class SettingsOut(BaseModel):
    festival_name: str
    tagline: str
    start_date: Union[str, date]
    end_date: Union[str, date]
    our_college_name: str
    official_email: str
    phone: str
    address: str
    instagram_url: str

    @field_serializer('start_date', 'end_date')
    def serialize_date(self, v: Union[str, date]) -> str:
        return str(v)

    class Config:
        from_attributes = True

# --- Auth ---
class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    admin_email: str
    admin_name: str
    role: str

# --- Stats ---
class DashboardStats(BaseModel):
    total_registrations: int
    internal_registrations: int
    external_registrations: int
    event_wise_registrations: dict
    total_projects: int
    hardware_projects: int
    software_projects: int
    pending_projects: int
    approved_projects: int
    rejected_projects: int

