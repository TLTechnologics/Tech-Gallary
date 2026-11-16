import {
  EventItem, RegistrationPayload, RegistrationRecord,
  ProjectPayload, ProjectRecord, GalleryItem, FAQItem,
  FestivalSettings, DashboardStats
} from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || '';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem('tg27_admin_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch {
      // ignore json parse error
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null as unknown as T;
  }

  return response.json();
}

export const api = {
  // Public Events
  getEvents: () => request<EventItem[]>('/api/events'),
  getEventById: (id: string) => request<EventItem>(`/api/events/${id}`),

  // Public Registrations
  createRegistration: (data: RegistrationPayload) => 
    request<RegistrationRecord>('/api/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getRegistrationByCode: (code: string) => 
    request<RegistrationRecord>(`/api/registrations/${code}`),

  // Public Projects
  submitProject: (data: ProjectPayload) =>
    request<ProjectRecord>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getPublicProjects: (category?: string) =>
    request<ProjectRecord[]>(`/api/projects/public${category ? `?category=${category}` : ''}`),
  getCategories: () =>
    request<{ Hardware: string[]; Software: string[] }>('/api/projects/categories'),

  // Public Gallery & FAQs & Settings
  getGallery: (category?: string) =>
    request<GalleryItem[]>(`/api/gallery${category ? `?category=${category}` : ''}`),
  getFAQs: () => request<FAQItem[]>('/api/faqs'),
  getSettings: () => request<FestivalSettings>('/api/settings'),

  // Admin APIs
  adminLogin: (credentials: { email: string; password: string }) =>
    request<{ access_token: string; admin_email: string; admin_name: string; role: string }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  getMe: () => request<{ email: string; role: string; full_name: string }>('/api/admin/me'),
  getStats: () => request<DashboardStats>('/api/admin/stats'),
  getAdminRegistrations: (params?: { event_id?: string; search?: string; is_internal?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.event_id) q.append('event_id', params.event_id);
    if (params?.search) q.append('search', params.search);
    if (params?.is_internal !== undefined) q.append('is_internal', String(params.is_internal));
    return request<RegistrationRecord[]>(`/api/admin/registrations?${q.toString()}`);
  },
  approveAdminRegistration: (regId: string) =>
    request<RegistrationRecord>(`/api/admin/registrations/${regId}/approve`, {
      method: 'POST',
    }),
  checkSubmissionAccess: (regCode: string, email: string) =>
    request<{
      allowed: boolean;
      reg_code: string;
      full_name: string;
      email: string;
      phone: string;
      college_name: string;
      department: string;
      team_name?: string;
      team_members?: string;
    }>(
      `/api/registrations/check-submission-access?reg_code=${encodeURIComponent(regCode)}&email=${encodeURIComponent(email)}`
    ),
  exportRegistrationsCsvUrl: (eventId?: string) =>
    `${BASE_URL}/api/admin/registrations/export-csv${eventId ? `?event_id=${eventId}` : ''}`,
  getAdminProjects: (params?: { status?: string; category?: string; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.status) q.append('status', params.status);
    if (params?.category) q.append('category', params.category);
    if (params?.search) q.append('search', params.search);
    return request<ProjectRecord[]>(`/api/admin/projects?${q.toString()}`);
  },
  updateProjectStatus: (projectId: string, status: 'pending' | 'approved' | 'rejected', adminNotes?: string) =>
    request<ProjectRecord>(`/api/admin/projects/${projectId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, admin_notes: adminNotes }),
    }),
  updateEvent: (eventId: string, data: Partial<EventItem>) =>
    request<EventItem>(`/api/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  addGalleryItem: (data: Omit<GalleryItem, 'id' | 'created_at'>) =>
    request<GalleryItem>('/api/admin/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  deleteGalleryItem: (id: string) =>
    request<void>(`/api/admin/gallery/${id}`, {
      method: 'DELETE',
    }),
  addFAQ: (data: { question: string; answer: string; category?: string; display_order?: number }) =>
    request<FAQItem>('/api/admin/faqs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateFAQ: (id: string, data: Partial<FAQItem>) =>
    request<FAQItem>(`/api/admin/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteFAQ: (id: string) =>
    request<void>(`/api/admin/faqs/${id}`, {
      method: 'DELETE',
    }),
  updateSettings: (data: Partial<FestivalSettings>) =>
    request<FestivalSettings>('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

