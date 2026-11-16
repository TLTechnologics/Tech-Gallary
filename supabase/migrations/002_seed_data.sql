-- ==============================================================================
-- TECH GALLERY 2027: SEED DATA FOR SUPABASE
-- ==============================================================================

-- 1. Insert Events (Strictly 8 items for 18-24 Jan 2027)
INSERT INTO public.events (id, name, date_display, date_iso, tagline, description, eligibility, eligibility_type, registration_status, rules, venue, timing, is_workshop, is_hackathon, is_showcase, display_order)
VALUES
(
    'bhavesh-workshop',
    'Bhavesh Workshop',
    '18 January 2027',
    '2027-01-18',
    'Hands-on Technical Immersion',
    'An intensive technical workshop designed to deepen practical skills and explore cutting-edge methodologies. Final curriculum, hands-on labs, and prerequisites will be announced by the organizing faculty committee.',
    'Exclusive to our college students.',
    'internal_only',
    'open',
    '• Strictly restricted to enrolled students of our college.\n• College ID verification is mandatory at entry.\n• Bring your own laptop with required development environment.\n• Certificates awarded upon 100% completion of hands-on sessions.',
    'Campus Auditorium / Main Lab A',
    '09:30 AM - 04:30 PM',
    true, false, false, 1
),
(
    'thakkar-workshop',
    'Thakkar Workshop',
    '19 January 2027',
    '2027-01-19',
    'Advanced Systems & Architecture Workshop',
    'A high-impact technical workshop focused on architectural principles and engineering best practices. Details and workshop scope to be finalized and editable by organizers via the admin portal.',
    'Exclusive to our college students.',
    'internal_only',
    'open',
    '• Open exclusively to our college students.\n• Prior registration via this portal is mandatory.\n• Participants must carry their valid student identity card.\n• Interactive Q&A and practical challenges included.',
    'Seminar Hall 2 / Tech Wing',
    '09:30 AM - 04:30 PM',
    true, false, false, 2
),
(
    'bhavesh-hackathon',
    'Bhavesh Hackathon',
    '20 January 2027',
    '2027-01-20',
    'Rapid Prototyping & Code Sprint',
    'A 24-hour sprint of coding, design, and problem solving. Problem statements and evaluation criteria will be released on the day by the organizing leads. Keep checking the portal for updates.',
    'Exclusive to our college students.',
    'internal_only',
    'open',
    '• Exclusively for our college students.\n• External college students are NOT eligible.\n• Teams may consist of 2 to 4 members.\n• All code and prototypes must be built during the hackathon hours.\n• Results announced on 24 January 2027.',
    'Central Computing Center',
    '08:00 AM - Overnight',
    false, true, false, 3
),
(
    'tech-showcase-day-1',
    'Tech Showcase – Day 1',
    '21 January 2027',
    '2027-01-21',
    'Flagship Hardware & Software Exhibition',
    'Grand public exhibition of innovative hardware and software prototypes. Innovators from our college and external colleges demonstrate working projects to visiting industry leaders, academics, and peer students.',
    'Open to our college and external colleges.',
    'open_all',
    'open',
    '• Open to students from our college and all external colleges across the country.\n• Projects must fit into either Hardware (Robotics, IoT, Embedded, etc.) or Software (AI, ML, Web, Apps, etc.) categories.\n• Working prototype or live demonstration is required.\n• All project submissions must be pre-approved by the festival review committee.',
    'Innovation Exhibition Pavilion',
    '10:00 AM - 05:00 PM',
    false, false, true, 4
),
(
    'tech-showcase-day-2',
    'Tech Showcase – Day 2',
    '22 January 2027',
    '2027-01-22',
    'Advanced Prototype Demos & Industry Review',
    'Day two of the flagship Tech Showcase. Featuring live hardware testing, interactive software demos, and jury walkthroughs across both Hardware and Software categories.',
    'Open to our college and external colleges.',
    'open_all',
    'open',
    '• Open to students from our college and all external colleges.\n• Continuous live demo booths with hardware power & high-speed network support.\n• Peer feedback and industry evaluation sessions throughout the day.',
    'Innovation Exhibition Pavilion',
    '10:00 AM - 05:00 PM',
    false, false, true, 5
),
(
    'thakkar-hackathon',
    'Thakkar Hackathon',
    '23 January 2027',
    '2027-01-23',
    'Systems, Security & Engineering Challenge',
    'An intense engineering hackathon tackling challenging technical problem statements. Themes and evaluation metrics will be updated by festival administrators prior to launch.',
    'Exclusive to our college students.',
    'internal_only',
    'open',
    '• Strictly exclusive to enrolled students of our college.\n• External college students are not eligible.\n• Teams of 2 to 4 students allowed.\n• Results announced on 24 January 2027.',
    'Tech Innovation Lab & Server Hall',
    '08:00 AM - 10:00 PM',
    false, true, false, 6
),
(
    'ai-workshop-parents',
    'AI Workshop for Parents',
    '24 January 2027',
    '2027-01-24',
    'Demystifying AI for Families & Guardians',
    'A specially crafted, welcoming workshop designed for parents to understand modern Artificial Intelligence, online digital safety, and how emerging technologies shape career and educational pathways.',
    'The AI Workshop on 24 January is intended for parents.',
    'parents_only',
    'open',
    '• Intended specifically for parents and guardians of students.\n• No prior technical background required.\n• Plain-English, conversational sessions with real-world examples and safety tips.\n• Interactive demonstration and family Q&A session.',
    'Main College Auditorium',
    '10:00 AM - 01:00 PM',
    true, false, false, 7
),
(
    'both-hackathon-results',
    'Both Hackathon Results',
    '24 January 2027',
    '2027-01-24',
    'Grand Valedictory & Awards Ceremony',
    'Official announcement and celebration of the winners of both the Bhavesh Hackathon and the Thakkar Hackathon, followed by the Tech Gallery 2027 valedictory ceremony.',
    'Open to all attendees, participants, faculty, and parents.',
    'results_only',
    'announced',
    '• Both hackathon results will be officially unveiled at 03:00 PM.\n• All finalists and participants are requested to assemble in the auditorium.\n• Mementos and official participation certificates distributed.',
    'Grand Amphitheatre & Main Stage',
    '03:00 PM - 06:00 PM',
    false, false, false, 8
)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert FAQs
INSERT INTO public.faqs (question, answer, category, display_order)
VALUES
(
    'Who can attend Tech Gallery 2027?',
    'Tech Gallery 2027 welcomes students, faculty, industry guests, and parents. While certain internal competitions are restricted to our college students, exhibitions and general sessions are open to visitors.',
    'General', 1
),
(
    'Can external college students participate?',
    'Yes, but with specific rules: External college students can participate ONLY in the Tech Showcase (Day 1 & Day 2) by submitting their hardware or software projects. External college students are not eligible for the Bhavesh or Thakkar hackathons or workshops.',
    'Eligibility', 2
),
(
    'Who can participate in hackathons?',
    'Both the Bhavesh Hackathon (20 January) and the Thakkar Hackathon (23 January) are strictly exclusive to enrolled students of our college. External students cannot register for either hackathon.',
    'Hackathons', 3
),
(
    'Can students submit hardware projects?',
    'Yes! The Hardware Showcase is one of our flagship tracks. We welcome submissions in Robotics, IoT, ESP32/Arduino, Smart Home Automation, Embedded Systems, Electronic Prototypes, and Innovative Hardware Products from both our college and external colleges.',
    'Showcase', 4
),
(
    'Can students submit software projects?',
    'Yes! The Software Showcase welcomes projects in Artificial Intelligence, Machine Learning, Web Applications, Android Applications, AI Assistants, SaaS Products, Desktop Applications, and Automation Software from both our college and external institutions.',
    'Showcase', 5
),
(
    'How do I register?',
    'Use our central Registration page to register for workshops and hackathons, or click "Submit Your Project" in the Tech Showcase section to enter your hardware or software build. You will receive a unique Registration Code upon submission.',
    'Registration', 6
),
(
    'Is there a registration fee?',
    'Registration details and policies are managed by the festival organizing committee and displayed on the event portal. Any specific updates will be communicated through the official dashboard.',
    'Fees', 7
),
(
    'Will participation certificates be provided?',
    'Yes, official Tech Gallery 2027 participation certificates will be awarded to confirmed attendees and project presenters at the valedictory session on 24 January 2027.',
    'Certificates', 8
);

-- 3. Default Settings
INSERT INTO public.festival_settings (id, festival_name, tagline, start_date, end_date, our_college_name, official_email, phone, address, instagram_url)
VALUES (
    'default',
    'TECH GALLERY 2027',
    'Where Ideas Meet Innovation.',
    '2027-01-18',
    '2027-01-24',
    'Tech Gallery Engineering College',
    'contact@techgallery2027.edu',
    '+91 98765 43210',
    'Innovation Campus, Tech Gallery Block, University Road, Sector 5',
    'https://instagram.com/techgallery2027'
) ON CONFLICT (id) DO NOTHING;

-- 4. Initial Gallery Placeholders
INSERT INTO public.gallery (title, category, image_url, description, is_featured, is_placeholder)
VALUES
('Autonomous Rover Prototype', 'hardware', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', 'ESP32 & LiDAR based terrain mapping vehicle designed by student innovators.', true, true),
('Neural Edge Detection Suite', 'software', 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80', 'Real-time on-device machine vision pipeline running at 60 FPS.', true, true),
('Smart IoT Microgrid', 'hardware', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', 'Embedded sensor network monitoring solar distribution and efficiency.', false, true),
('Hackathon Collaborative Zone', 'event', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', 'Teams brainstorming and assembling technical prototypes during the sprint.', true, true),
('AI Parent Education Session', 'workshop', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', 'Interactive digital awareness and AI safety demonstration for families.', false, true),
('Robotic Arm Manipulator', 'hardware', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', '6-DOF inverse kinematics mechanical assembly with custom servo controllers.', false, true);

-- 5. Seed Admin User
INSERT INTO public.admin_users (email, full_name, role)
VALUES ('admin@techgallery2027.edu', 'Lead Fest Administrator', 'superadmin')
ON CONFLICT (email) DO NOTHING;

