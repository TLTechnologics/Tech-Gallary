from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import events, registrations, projects, gallery, faqs, contact, admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Schema and tables are initialized on-demand via database.py ensure_tables()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Official API for TECH GALLERY 2027 – College Technology Festival (18–24 Jan 2027)",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for flexible preview & local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(events.router)
app.include_router(registrations.router)
app.include_router(projects.router)
app.include_router(gallery.router)
app.include_router(faqs.router)
app.include_router(contact.router)
app.include_router(admin.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "festival": "TECH GALLERY 2027",
        "tagline": "Where Ideas Meet Innovation.",
        "dates": "18 January – 24 January 2027",
        "docs_url": "/docs"
    }

@app.get("/health")
@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "techgallery-api"}

