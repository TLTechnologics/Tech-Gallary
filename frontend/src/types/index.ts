export interface EventItem {
  id: string;
  name: string;
  date_display: string;
  date_iso: string;
  tagline?: string;
  description: string;
  eligibility: string;
  eligibility_type: 'internal_only' | 'open_all' | 'parents_only' | 'results_only';
  registration_status: 'open' | 'closed' | 'waitlist' | 'announced';
  rules?: string;
  venue?: string;
  timing?: string;
  is_hackathon: boolean;
  is_workshop: boolean;
  is_showcase: boolean;
  display_order: number;
  updated_at?: string;
}

export interface RegistrationPayload {
  full_name: string;
  email: string;
  phone: string;
  college_name: string;
  roll_number?: string;
  department: string;
  year_semester: string;
  event_id: string;
  registration_type?: 'visitor' | 'showcasing';
  team_name?: string;
  team_members?: string;
}

export interface RegistrationRecord {
  id: string;
  reg_code: string;
  full_name: string;
  email: string;
  phone: string;
  college_name: string;
  is_internal: boolean;
  roll_number?: string;
  department: string;
  year_semester: string;
  event_id: string;
  event_name: string;
  team_name?: string;
  team_members?: string;
  status: 'confirmed' | 'pending_approval' | 'approved' | 'cancelled' | 'waitlist';
  registration_type?: 'visitor' | 'showcasing';
  can_submit_project?: boolean;
  approval_token?: string;
  whatsapp_url?: string;
  whatsapp_message?: string;
  created_at: string;
}

export interface ProjectPayload {
  student_name: string;
  college_name: string;
  email: string;
  phone: string;
  project_name: string;
  category: 'Hardware' | 'Software';
  sub_category: string;
  description: string;
  technologies_used: string;
  num_team_members: number;
  team_member_names?: string;
  demo_video_url?: string;
  images?: string[];
}

export interface ProjectRecord {
  id: string;
  project_code: string;
  student_name: string;
  college_name: string;
  email: string;
  phone: string;
  project_name: string;
  category: 'Hardware' | 'Software';
  sub_category: string;
  description: string;
  technologies_used: string;
  num_team_members: number;
  team_member_names?: string;
  demo_video_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  images: { id: string; image_url: string; caption?: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'hardware' | 'software' | 'event' | 'workshop';
  image_url: string;
  description?: string;
  is_featured: boolean;
  is_placeholder: boolean;
  created_at: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  created_at: string;
}

export interface FestivalSettings {
  festival_name: string;
  tagline: string;
  start_date: string;
  end_date: string;
  our_college_name: string;
  official_email: string;
  phone: string;
  address: string;
  instagram_url: string;
}

export interface DashboardStats {
  total_registrations: number;
  internal_registrations: number;
  external_registrations: number;
  event_wise_registrations: Record<string, number>;
  total_projects: number;
  hardware_projects: number;
  software_projects: number;
  pending_projects: number;
  approved_projects: number;
  rejected_projects: number;
}

