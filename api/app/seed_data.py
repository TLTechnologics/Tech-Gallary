from sqlalchemy.orm import Session
from app.models import Event, FAQ, FestivalSettings, GalleryItem, AdminUser
from app.auth import get_password_hash
from app.config import settings

INITIAL_EVENTS = [
    {
        "id": "bhavesh-workshop",
        "name": "Bhavesh Workshop",
        "date_display": "18 January 2027",
        "date_iso": "2027-01-18",
        "tagline": "Hands-on Technical Immersion",
        "description": "An intensive technical workshop designed to deepen practical skills and explore cutting-edge methodologies. Final curriculum, hands-on labs, and prerequisites will be announced by the organizing faculty committee.",
        "eligibility": "Exclusive to our college students.",
        "eligibility_type": "internal_only",
        "registration_status": "open",
        "rules": "• Strictly restricted to enrolled students of our college.\n• College ID verification is mandatory at entry.\n• Bring your own laptop with required development environment.\n• Certificates awarded upon 100% completion of hands-on sessions.",
        "venue": "Campus Auditorium / Main Lab A",
        "timing": "09:30 AM - 04:30 PM",
        "is_workshop": True,
        "is_hackathon": False,
        "is_showcase": False,
        "display_order": 1,
    },
    {
        "id": "thakkar-workshop",
        "name": "Thakkar Workshop",
        "date_display": "19 January 2027",
        "date_iso": "2027-01-19",
        "tagline": "Advanced Systems & Architecture Workshop",
        "description": "A high-impact technical workshop focused on architectural principles and engineering best practices. Details and workshop scope to be finalized and editable by organizers via the admin portal.",
        "eligibility": "Exclusive to our college students.",
        "eligibility_type": "internal_only",
        "registration_status": "open",
        "rules": "• Open exclusively to our college students.\n• Prior registration via this portal is mandatory.\n• Participants must carry their valid student identity card.\n• Interactive Q&A and practical challenges included.",
        "venue": "Seminar Hall 2 / Tech Wing",
        "timing": "09:30 AM - 04:30 PM",
        "is_workshop": True,
        "is_hackathon": False,
        "is_showcase": False,
        "display_order": 2,
    },
    {
        "id": "bhavesh-hackathon",
        "name": "Bhavesh Hackathon",
        "date_display": "20 January 2027",
        "date_iso": "2027-01-20",
        "tagline": "Rapid Prototyping & Code Sprint",
        "description": "A 24-hour sprint of coding, design, and problem solving. Problem statements and evaluation criteria will be released on the day by the organizing leads. Keep checking the portal for updates.",
        "eligibility": "Exclusive to our college students.",
        "eligibility_type": "internal_only",
        "registration_status": "open",
        "rules": "• Exclusively for our college students.\n• External college students are NOT eligible.\n• Teams may consist of 2 to 4 members.\n• All code and prototypes must be built during the hackathon hours.\n• Results announced on 24 January 2027.",
        "venue": "Central Computing Center",
        "timing": "08:00 AM - Overnight",
        "is_workshop": False,
        "is_hackathon": True,
        "is_showcase": False,
        "display_order": 3,
    },
    {
        "id": "tech-showcase-day-1",
        "name": "Tech Showcase – Day 1",
        "date_display": "21 January 2027",
        "date_iso": "2027-01-21",
        "tagline": "Flagship Hardware & Software Exhibition",
        "description": "Grand public exhibition of innovative hardware and software prototypes. Innovators from our college and external colleges demonstrate working projects to visiting industry leaders, academics, and peer students.",
        "eligibility": "Open to our college and external colleges.",
        "eligibility_type": "open_all",
        "registration_status": "open",
        "rules": "• Open to students from our college and all external colleges across the country.\n• Projects must fit into either Hardware (Robotics, IoT, Embedded, etc.) or Software (AI, ML, Web, Apps, etc.) categories.\n• Working prototype or live demonstration is required.\n• All project submissions must be pre-approved by the festival review committee.",
        "venue": "Innovation Exhibition Pavilion",
        "timing": "10:00 AM - 05:00 PM",
        "is_workshop": False,
        "is_hackathon": False,
        "is_showcase": True,
        "display_order": 4,
    },
    {
        "id": "tech-showcase-day-2",
        "name": "Tech Showcase – Day 2",
        "date_display": "22 January 2027",
        "date_iso": "2027-01-22",
        "tagline": "Advanced Prototype Demos & Industry Review",
        "description": "Day two of the flagship Tech Showcase. Featuring live hardware testing, interactive software demos, and jury walkthroughs across both Hardware and Software categories.",
        "eligibility": "Open to our college and external colleges.",
        "eligibility_type": "open_all",
        "registration_status": "open",
        "rules": "• Open to students from our college and all external colleges.\n• Continuous live demo booths with hardware power & high-speed network support.\n• Peer feedback and industry evaluation sessions throughout the day.",
        "venue": "Innovation Exhibition Pavilion",
        "timing": "10:00 AM - 05:00 PM",
        "is_workshop": False,
        "is_hackathon": False,
        "is_showcase": True,
        "display_order": 5,
    },
    {
        "id": "thakkar-hackathon",
        "name": "Thakkar Hackathon",
        "date_display": "23 January 2027",
        "date_iso": "2027-01-23",
        "tagline": "Systems, Security & Engineering Challenge",
        "description": "An intense engineering hackathon tackling challenging technical problem statements. Themes and evaluation metrics will be updated by festival administrators prior to launch.",
        "eligibility": "Exclusive to our college students.",
        "eligibility_type": "internal_only",
        "registration_status": "open",
        "rules": "• Strictly exclusive to enrolled students of our college.\n• External college students are not eligible.\n• Teams of 2 to 4 students allowed.\n• Results announced on 24 January 2027.",
        "venue": "Tech Innovation Lab & Server Hall",
        "timing": "08:00 AM - 10:00 PM",
        "is_workshop": False,
        "is_hackathon": True,
        "is_showcase": False,
        "display_order": 6,
    },
    {
        "id": "ai-workshop-parents",
        "name": "AI Workshop for Parents",
        "date_display": "24 January 2027",
        "date_iso": "2027-01-24",
        "tagline": "Demystifying AI for Families & Guardians",
        "description": "A specially crafted, welcoming workshop designed for parents to understand modern Artificial Intelligence, online digital safety, and how emerging technologies shape career and educational pathways.",
        "eligibility": "The AI Workshop on 24 January is intended for parents.",
        "eligibility_type": "parents_only",
        "registration_status": "open",
        "rules": "• Intended specifically for parents and guardians of students.\n• No prior technical background required.\n• Plain-English, conversational sessions with real-world examples and safety tips.\n• Interactive demonstration and family Q&A session.",
        "venue": "Main College Auditorium",
        "timing": "10:00 AM - 01:00 PM",
        "is_workshop": True,
        "is_hackathon": False,
        "is_showcase": False,
        "display_order": 7,
    },
    {
        "id": "both-hackathon-results",
        "name": "Both Hackathon Results",
        "date_display": "24 January 2027",
        "date_iso": "2027-01-24",
        "tagline": "Grand Valedictory & Awards Ceremony",
        "description": "Official announcement and celebration of the winners of both the Bhavesh Hackathon and the Thakkar Hackathon, followed by the Tech Gallery 2027 valedictory ceremony.",
        "eligibility": "Open to all attendees, participants, faculty, and parents.",
        "eligibility_type": "results_only",
        "registration_status": "announced",
        "rules": "• Both hackathon results will be officially unveiled at 03:00 PM.\n• All finalists and participants are requested to assemble in the auditorium.\n• Mementos and official participation certificates distributed.",
        "venue": "Grand Amphitheatre & Main Stage",
        "timing": "03:00 PM - 06:00 PM",
        "is_workshop": False,
        "is_hackathon": False,
        "is_showcase": False,
        "display_order": 8,
    },
]

INITIAL_FAQS = [
    {
        "question": "Who can attend Tech Gallery 2027?",
        "answer": "Tech Gallery 2027 welcomes students, faculty, industry guests, and parents. While certain internal competitions are restricted to our college students, exhibitions and general sessions are open to visitors.",
        "category": "General",
        "display_order": 1,
    },
    {
        "question": "Can external college students participate?",
        "answer": "Yes, but with specific rules: External college students can participate ONLY in the Tech Showcase (Day 1 & Day 2) by submitting their hardware or software projects. External college students are not eligible for the Bhavesh or Thakkar hackathons or workshops.",
        "category": "Eligibility",
        "display_order": 2,
    },
    {
        "question": "Who can participate in hackathons?",
        "answer": "Both the Bhavesh Hackathon (20 January) and the Thakkar Hackathon (23 January) are strictly exclusive to enrolled students of our college. External students cannot register for either hackathon.",
        "category": "Hackathons",
        "display_order": 3,
    },
    {
        "question": "Can students submit hardware projects?",
        "answer": "Yes! The Hardware Showcase is one of our flagship tracks. We welcome submissions in Robotics, IoT, ESP32/Arduino, Smart Home Automation, Embedded Systems, Electronic Prototypes, and Innovative Hardware Products from both our college and external colleges.",
        "category": "Showcase",
        "display_order": 4,
    },
    {
        "question": "Can students submit software projects?",
        "answer": "Yes! The Software Showcase welcomes projects in Artificial Intelligence, Machine Learning, Web Applications, Android Applications, AI Assistants, SaaS Products, Desktop Applications, and Automation Software from both our college and external institutions.",
        "category": "Showcase",
        "display_order": 5,
    },
    {
        "question": "How do I register?",
        "answer": "Use our central Registration page to register for workshops and hackathons, or click 'Submit Your Project' in the Tech Showcase section to enter your hardware or software build. You will receive a unique Registration Code upon submission.",
        "category": "Registration",
        "display_order": 6,
    },
    {
        "question": "Is there a registration fee?",
        "answer": "Registration details and policies are managed by the festival organizing committee and displayed on the event portal. Any specific updates will be communicated through the official dashboard.",
        "category": "Fees",
        "display_order": 7,
    },
    {
        "question": "Will participation certificates be provided?",
        "answer": "Yes, official Tech Gallery 2027 participation certificates will be awarded to confirmed attendees and project presenters at the valedictory session on 24 January 2027.",
        "category": "Certificates",
        "display_order": 8,
    },
]

INITIAL_GALLERY = [
    {
        "title": "Autonomous Rover Prototype",
        "category": "hardware",
        "image_url": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        "description": "ESP32 & LiDAR based terrain mapping vehicle designed by student innovators.",
        "is_featured": True,
        "is_placeholder": True,
    },
    {
        "title": "Neural Edge Detection Suite",
        "category": "software",
        "image_url": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
        "description": "Real-time on-device machine vision pipeline running at 60 FPS.",
        "is_featured": True,
        "is_placeholder": True,
    },
    {
        "title": "Smart IoT Microgrid",
        "category": "hardware",
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        "description": "Embedded sensor network monitoring solar distribution and efficiency.",
        "is_featured": False,
        "is_placeholder": True,
    },
    {
        "title": "Hackathon Collaborative Zone",
        "category": "event",
        "image_url": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
        "description": "Teams brainstorming and assembling technical prototypes during the sprint.",
        "is_featured": True,
        "is_placeholder": True,
    },
    {
        "title": "AI Parent Education Session",
        "category": "workshop",
        "image_url": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
        "description": "Interactive digital awareness and AI safety demonstration for families.",
        "is_featured": False,
        "is_placeholder": True,
    },
    {
        "title": "Robotic Arm Manipulator",
        "category": "hardware",
        "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        "description": "6-DOF inverse kinematics mechanical assembly with custom servo controllers.",
        "is_featured": False,
        "is_placeholder": True,
    },
]

def seed_database(db: Session):
    # 1. Seed Events
    for event_data in INITIAL_EVENTS:
        existing = db.query(Event).filter(Event.id == event_data["id"]).first()
        if not existing:
            event = Event(**event_data)
            db.add(event)
    
    # 2. Seed FAQs
    if db.query(FAQ).count() == 0:
        for faq_data in INITIAL_FAQS:
            faq = FAQ(**faq_data)
            db.add(faq)

    # 3. Seed Festival Settings
    settings_obj = db.query(FestivalSettings).filter(FestivalSettings.id == "default").first()
    if not settings_obj:
        settings_obj = FestivalSettings(
            id="default",
            festival_name="TECH GALLERY 2027",
            tagline="Where Ideas Meet Innovation.",
            start_date="2027-01-18",
            end_date="2027-01-24",
            our_college_name="LJCCA",
            official_email="contact@techgallery2027.edu",
            phone="+91 98765 43210",
            address="LJCCA, NEAR NEW, IIM Rd, Vastrapur, Ahmedabad, Gujarat 380015",
            instagram_url="https://instagram.com/techgallery2027"
        )
        db.add(settings_obj)

    # 4. Seed Gallery
    if db.query(GalleryItem).count() == 0:
        for g_data in INITIAL_GALLERY:
            g_item = GalleryItem(**g_data)
            db.add(g_item)

    # 5. Seed Admin User
    admin = db.query(AdminUser).filter(AdminUser.email == settings.ADMIN_EMAIL).first()
    if not admin:
        admin = AdminUser(
            email=settings.ADMIN_EMAIL,
            hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
            full_name="Festival Administrator",
            role="superadmin"
        )
        db.add(admin)

    db.commit()

