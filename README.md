# TECH GALLERY 2027 🚀
> **Where Ideas Meet Innovation.**
> **Dates: 18 January – 24 January 2027**

Production-ready, responsive website for the annual college technology festival **TECH GALLERY 2027**, featuring full registration verification, hardware & software project submissions, live countdown timer, interactive event scheduling, and a role-based admin dashboard.

---

## 📅 Official Festival Schedule (18–24 January 2027)

1. **18 January 2027**: Bhavesh Workshop *(Exclusive to our college students)*
2. **19 January 2027**: Thakkar Workshop *(Exclusive to our college students)*
3. **20 January 2027**: Bhavesh Hackathon *(Exclusive to our college students)*
4. **21 January 2027**: Tech Showcase – Day 1 *(Open to our college and external colleges)*
5. **22 January 2027**: Tech Showcase – Day 2 *(Open to our college and external colleges)*
6. **23 January 2027**: Thakkar Hackathon *(Exclusive to our college students)*
7. **24 January 2027**: AI Workshop for Parents *(Intended for parents)*
8. **24 January 2027**: Both Hackathon Results *(Announced on 24 January)*

### 🔒 Participation Rules & Enforcement
* **Workshops & Hackathons (Bhavesh & Thakkar)**: Strictly reserved for enrolled students of our college. External students are prevented from registering on frontend and backend.
* **Tech Showcase (Day 1 & Day 2)**: National-level exhibition open to our college and all external colleges. External students can participate **ONLY** in the Tech Showcase by submitting hardware or software projects.
* **AI Workshop for Parents**: Designed in plain conversational English specifically for parents and guardians.
* **Hackathon Results**: Announced at the grand valedictory ceremony on 24 January.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS (Cyber-dark `#0a0a0c`, Electric Lime `#ccff00`, Electric Blue `#00f0ff`)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Supabase Client**: `@supabase/supabase-js`

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **ORM / DB Layer**: SQLAlchemy 2.0 (Dual-mode: Supabase PostgreSQL in production, local SQLite fallback)
- **Validation**: Pydantic v2 with custom eligibility and phone/email sanitization
- **Auth**: JWT Bearer token authentication + Supabase Auth verification
- **Exporting**: Python `csv` streaming for registration records

### Database
- **Engine**: Supabase PostgreSQL
- **Security**: Row Level Security (RLS) policies, UUID primary keys, unique constraint on `(email, event_id)` and `(phone, event_id)` to prevent duplicates.

---

## 📁 Project Structure

```
TechGallery/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py              # Environment configuration & CORS
│   │   ├── database.py            # SQLAlchemy engine & session manager
│   │   ├── models.py              # PostgreSQL database models
│   │   ├── schemas.py             # Pydantic v2 schemas & validations
│   │   ├── auth.py                # Admin authentication & JWT verification
│   │   ├── seed_data.py           # Starter seeds for 8 events, FAQs & gallery
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── events.py          # Events API endpoints
│   │   │   ├── registrations.py   # Registration API with strict eligibility checks
│   │   │   ├── projects.py        # Tech Showcase hardware/software submissions
│   │   │   ├── gallery.py         # Gallery items endpoint
│   │   │   ├── faqs.py            # FAQs endpoints
│   │   │   ├── contact.py         # Festival contact & settings
│   │   │   └── admin.py           # Admin portal (Stats, Approvals, CSV export)
│   │   └── main.py                # FastAPI app initialization & lifespan
│   ├── requirements.txt
│   ├── .env.example
│   ├── .env
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/            # Navbar, Footer, NotificationToast
│   │   │   ├── home/              # Hero, CountdownTimer, TechBackground
│   │   │   ├── about/             # AboutSection & 5 Pillars
│   │   │   ├── events/            # EventsTimeline, EventCard, EventDetailModal
│   │   │   ├── showcase/          # TechShowcaseSection, ProjectSubmissionModal
│   │   │   ├── workshops/         # WorkshopsHackathonsSection
│   │   │   ├── registration/      # RegistrationSection, RegistrationConfirmation
│   │   │   ├── gallery/           # GallerySection
│   │   │   ├── faq/               # FAQSection
│   │   │   ├── contact/           # ContactSection
│   │   │   └── admin/             # AdminDashboard, ProjectsManager, RegistrationsManager, etc.
│   │   ├── context/               # AuthContext, NotificationContext
│   │   ├── services/              # API client & Supabase configuration
│   │   ├── types/                 # TypeScript interfaces
│   │   ├── utils/                 # Helpers & WhatsApp sharing utilities
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql # PostgreSQL DDL, Indexes, RLS Policies
│   │   └── 002_seed_data.sql      # Official 8 Events, FAQs & Settings
│   └── README.md
├── README.md
└── .env.example
```

---

## ⚡ Quick Start & Local Setup

### 1. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python run.py
```
> The FastAPI backend starts at `http://localhost:8000` with interactive Swagger docs at `http://localhost:8000/docs`.
> Initial database tables are created and seeded automatically with the 8 official events and FAQs on first run.

### 2. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
> The frontend launches at `http://localhost:5173`.

---

## 🔑 Administrator Access

- **Admin Login Modal**: Accessible via the Shield icon in the top Navbar or Footer.
- **Default Credentials**:
  - **Email**: `admin@techgallery2027.edu`
  - **Password**: `admintech2027`
- **Capabilities**:
  1. Real-time KPI cards (Registrations, Internal vs External, Project Approvals)
  2. Search, filter & export registrations to CSV
  3. Review, approve or reject hardware and software project submissions with jury notes
  4. Toggle registration gates (open / waitlist / closed) & update event descriptions
  5. Upload new gallery artifacts & remove outdated previews
  6. Edit FAQs and answers
  7. Update institutional contact info & college name anchor

---

## 🌐 Supabase Integration & Production Deployment

### Database Migrations
1. Open your [Supabase Dashboard](https://supabase.com).
2. Go to **SQL Editor** -> **New query**.
3. Run `supabase/migrations/001_initial_schema.sql` to generate all tables, foreign keys, and Row Level Security policies.
4. Run `supabase/migrations/002_seed_data.sql` to populate official festival data.
5. In your backend `.env`, set `DATABASE_URL` to your Supabase PostgreSQL connection string.

### Production Hosting
- **Frontend**: Deploy to Vercel or Netlify with `VITE_API_URL=https://your-api.com`.
- **Backend**: Deploy to Render, Railway, or AWS with standard Python runtime (`uvicorn app.main:app --host 0.0.0.0 --port $PORT`).

