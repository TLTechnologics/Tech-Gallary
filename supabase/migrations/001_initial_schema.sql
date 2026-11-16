-- ==============================================================================
-- TECH GALLERY 2027: SUPABASE POSTGRESQL INITIAL SCHEMA & SECURITY POLICIES
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'attendee' CHECK (role IN ('attendee', 'student', 'admin', 'superadmin')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY, -- e.g. 'bhavesh-workshop', 'tech-showcase-day-1'
    name TEXT NOT NULL,
    date_display TEXT NOT NULL,
    date_iso DATE NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    eligibility_type TEXT NOT NULL CHECK (eligibility_type IN ('internal_only', 'open_all', 'parents_only', 'results_only')),
    registration_status TEXT DEFAULT 'open' CHECK (registration_status IN ('open', 'closed', 'waitlist', 'announced')),
    rules TEXT,
    venue TEXT DEFAULT 'Campus Auditorium / Tech Hall',
    timing TEXT DEFAULT '09:00 AM - 05:00 PM',
    is_hackathon BOOLEAN DEFAULT FALSE,
    is_workshop BOOLEAN DEFAULT FALSE,
    is_showcase BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Registrations Table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reg_code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college_name TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    roll_number TEXT,
    department TEXT NOT NULL,
    year_semester TEXT NOT NULL,
    event_id TEXT NOT NULL REFERENCES public.events(id) ON DELETE RESTRICT,
    event_name TEXT NOT NULL,
    team_name TEXT,
    team_members TEXT,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending_approval', 'approved', 'cancelled', 'waitlist')),
    registration_type TEXT DEFAULT 'visitor' CHECK (registration_type IN ('visitor', 'showcasing')),
    approval_token TEXT,
    can_submit_project BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_email_event UNIQUE (email, event_id),
    CONSTRAINT uq_phone_event UNIQUE (phone, event_id)
);

-- 4. Projects Table (Tech Showcase)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_code TEXT UNIQUE NOT NULL,
    student_name TEXT NOT NULL,
    college_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    project_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Hardware', 'Software')),
    sub_category TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies_used TEXT NOT NULL,
    num_team_members INT DEFAULT 1 CHECK (num_team_members >= 1 AND num_team_members <= 10),
    team_member_names TEXT,
    demo_video_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Project Images Table
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Gallery Items Table
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('hardware', 'software', 'event', 'workshop')),
    image_url TEXT NOT NULL,
    description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_placeholder BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Admin Users Table (For authorized administrative roles)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'jury')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Festival Settings Table
CREATE TABLE IF NOT EXISTS public.festival_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    festival_name TEXT NOT NULL DEFAULT 'TECH GALLERY 2027',
    tagline TEXT NOT NULL DEFAULT 'Where Ideas Meet Innovation.',
    start_date DATE NOT NULL DEFAULT '2027-01-18',
    end_date DATE NOT NULL DEFAULT '2027-01-24',
    our_college_name TEXT NOT NULL DEFAULT 'Tech Gallery Engineering College',
    official_email TEXT NOT NULL DEFAULT 'contact@techgallery2027.edu',
    phone TEXT NOT NULL DEFAULT '+91 98765 43210',
    address TEXT NOT NULL DEFAULT 'Innovation Campus, Tech Gallery Block, University Road, Sector 5',
    instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/techgallery2027',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON public.registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_code ON public.registrations(reg_code);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_code ON public.projects(project_code);
CREATE INDEX IF NOT EXISTS idx_events_order ON public.events(display_order);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festival_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Helper check function for admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE email = auth.jwt() ->> 'email'
    ) OR (
        auth.jwt() ->> 'role' = 'service_role'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Events: Public read, Admin write
CREATE POLICY "Public can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Admins can update events" ON public.events FOR ALL USING (public.is_admin());

-- 2. Registrations: Public can insert their own registration, only admins can view all
CREATE POLICY "Anyone can register" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view registrations" ON public.registrations FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage registrations" ON public.registrations FOR ALL USING (public.is_admin());

-- 3. Projects: Anyone can submit, Public can view approved, Admins manage all
CREATE POLICY "Anyone can submit project" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view approved projects" ON public.projects FOR SELECT USING (status = 'approved' OR public.is_admin());
CREATE POLICY "Admins can manage projects" ON public.projects FOR ALL USING (public.is_admin());

-- 4. Project Images:
CREATE POLICY "Public can view project images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Anyone can insert project images" ON public.project_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage project images" ON public.project_images FOR ALL USING (public.is_admin());

-- 5. Gallery: Public read, Admin manage
CREATE POLICY "Public can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON public.gallery FOR ALL USING (public.is_admin());

-- 6. FAQs: Public read, Admin manage
CREATE POLICY "Public can view FAQs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Admins can manage FAQs" ON public.faqs FOR ALL USING (public.is_admin());

-- 7. Festival Settings: Public read, Admin manage
CREATE POLICY "Public can view settings" ON public.festival_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update settings" ON public.festival_settings FOR ALL USING (public.is_admin());

