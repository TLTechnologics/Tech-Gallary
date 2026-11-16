import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { EventItem, RegistrationPayload, RegistrationRecord } from '../../types';
import { RegistrationConfirmation } from './RegistrationConfirmation';
import { useNotification } from '../../context/NotificationContext';

const YEAR_SEMESTER_OPTIONS = [
  '1st Year / Semester 1',
  '1st Year / Semester 2',
  '2nd Year / Semester 3',
  '2nd Year / Semester 4',
  '3rd Year / Semester 5',
  '3rd Year / Semester 6',
  '4th Year / Semester 7',
  '4th Year / Semester 8',
];

interface RegistrationSectionProps {
  events: EventItem[];
  preselectedEventId?: string | null;
  ourCollegeName?: string;
  onOpenSubmission: (registration?: RegistrationRecord) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  events,
  preselectedEventId,
  ourCollegeName = 'LJCCA',
  onOpenSubmission,
}) => {
  const { showNotification } = useNotification();
  // Strictly 2 types of registrations: 'visitor' and 'showcasing' (Both 100% Free)
  const [selectedPass, setSelectedPass] = useState<'visitor' | 'showcasing'>('visitor');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRegistration, setConfirmedRegistration] = useState<RegistrationRecord | null>(null);
  const [formFeedback, setFormFeedback] = useState<{ isError: boolean; message: string } | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeName, setCollegeName] = useState('LJCCA');
  const [isInternalCollege, setIsInternalCollege] = useState(true);
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('BCA');
  const [yearSemester, setYearSemester] = useState(YEAR_SEMESTER_OPTIONS[0]);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [isParentAttendee, setIsParentAttendee] = useState(false);

  const registrableEvents = events.filter(
    (e) => e.registration_status !== 'announced' && e.eligibility_type !== 'results_only'
  );

  useEffect(() => {
    if (selectedPass === 'showcasing') {
      const showcaseEvent = registrableEvents.find((e) => e.is_showcase);
      if (showcaseEvent) {
        setSelectedEventId(showcaseEvent.id);
        return;
      }
    }

    if (preselectedEventId && registrableEvents.some((e) => e.id === preselectedEventId)) {
      setSelectedEventId(preselectedEventId);
    } else if (registrableEvents.length > 0 && !selectedEventId) {
      setSelectedEventId(registrableEvents[0].id);
    }
  }, [preselectedEventId, registrableEvents, selectedPass]);

  const currentEvent = events.find((e) => e.id === selectedEventId);
  const isInternalOnly = currentEvent?.eligibility_type === 'internal_only';
  const isHackathon = currentEvent?.is_hackathon;
  const isParentWorkshop = currentEvent?.eligibility_type === 'parents_only';

  const handleCollegeToggle = (isInternal: boolean) => {
    setIsInternalCollege(isInternal);
    if (isInternal) {
      setCollegeName('LJCCA');
      setDepartment('BCA');
    } else {
      setCollegeName('');
      setDepartment('Computer Science & Engineering');
      setRollNumber('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    if (!fullName.trim() || !email.trim() || !phone.trim() || !collegeName.trim()) {
      setFormFeedback({
        isError: true,
        message: 'Please fill in all mandatory fields: Full Name, Email, Phone, and College Name.',
      });
      return;
    }

    if (isInternalCollege && !rollNumber.trim()) {
      setFormFeedback({
        isError: true,
        message: 'Please enter your Roll Number for LJCCA verification.',
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormFeedback({
        isError: true,
        message: 'Please enter a valid email address.',
      });
      return;
    }

    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      setFormFeedback({
        isError: true,
        message: 'Please enter a valid 10-digit phone number for WhatsApp confirmation.',
      });
      return;
    }

    // Strict Eligibility Rule Enforcement
    if (isInternalOnly && !isInternalCollege) {
      const msg = `${currentEvent?.name || 'This event'} is strictly reserved for students of our college. External students can participate ONLY in the Tech Showcase.`;
      setFormFeedback({ isError: true, message: msg });
      showNotification('error', 'Participation Restricted', msg);
      return;
    }

    if (isHackathon && !teamName.trim()) {
      setFormFeedback({
        isError: true,
        message: 'A Team Name is required for Hackathon registrations.',
      });
      return;
    }

    if (isParentWorkshop && !isParentAttendee) {
      setFormFeedback({
        isError: true,
        message: 'Please confirm that you are registering as a parent or guardian.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: RegistrationPayload = {
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        college_name: isInternalCollege ? 'LJCCA' : collegeName.trim(),
        roll_number: isInternalCollege ? rollNumber.trim() : undefined,
        department: isInternalCollege ? 'BCA' : department.trim(),
        year_semester: yearSemester.trim(),
        event_id: selectedEventId,
        registration_type: selectedPass,
        team_name: isHackathon || selectedPass === 'showcasing' ? teamName.trim() : undefined,
        team_members: isHackathon || selectedPass === 'showcasing' ? teamMembers.trim() : undefined,
      };

      const res = await api.createRegistration(payload);
      setConfirmedRegistration(res);

      if (selectedPass === 'showcasing') {
        setFormFeedback({
          isError: false,
          message: `Registration received for ${res.full_name}! Registration ID: ${res.reg_code}. The administrator has been notified by email for approval. Once approved, you will receive project submission access.`,
        });
        showNotification('success', 'Showcasing Request Sent', `ID: ${res.reg_code}`);
      } else {
        setFormFeedback({
          isError: false,
          message: `Visitor pass reserved for ${res.full_name}! Registration ID: ${res.reg_code}. Free Entry.`,
        });
        showNotification('success', 'Visitor Pass Confirmed', `ID: ${res.reg_code}`);
      }
    } catch (err: any) {
      const detail = err.response?.data?.detail || err.message || 'Registration failed. Please verify your details.';
      setFormFeedback({ isError: true, message: detail });
      showNotification('error', 'Registration Error', detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="s" id="register">
      <div className="wrap">
        <div className="sh">
          <span className="mono">Registration</span>
          <h2>Save your place.</h2>
        </div>

        {confirmedRegistration ? (
          <RegistrationConfirmation
            registration={confirmedRegistration}
            onReset={() => {
              setConfirmedRegistration(null);
              setFormFeedback(null);
            }}
            onOpenSubmission={(reg) => onOpenSubmission(reg)}
          />
        ) : (
          <div className="reg">
            {/* Left Column: 2 Types of Free Passes */}
            <div>
              <h3>Choose a pass</h3>
              <div className="tiers" id="tiers">
                {/* Type 1: Visitor */}
                <label className="tier">
                  <input
                    type="radio"
                    name="pass"
                    value="visitor"
                    checked={selectedPass === 'visitor'}
                    onChange={() => setSelectedPass('visitor')}
                  />
                  <div>
                    <b>Visitor</b>
                    <span>Showcase exhibition and open talks</span>
                  </div>
                  <em>Free</em>
                </label>

                {/* Type 2: Project Showcasing */}
                <label className="tier">
                  <input
                    type="radio"
                    name="pass"
                    value="showcasing"
                    checked={selectedPass === 'showcasing'}
                    onChange={() => setSelectedPass('showcasing')}
                  />
                  <div>
                    <b>Project Showcasing</b>
                    <span>Hardware &amp; Software stall (Requires Admin Approval)</span>
                  </div>
                  <em>Free</em>
                </label>
              </div>

              <p className="mono" style={{ marginBottom: '1.5rem' }}>
                All festival registrations are 100% Free · Main Campus 18–24 Jan 2027.
              </p>

              {/* Workflow Notice */}
              <div
                style={{
                  border: '1px solid var(--line)',
                  padding: '1.2rem',
                  background: 'var(--card)',
                  fontSize: '0.85rem',
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--ink)' }}>
                  How Project Showcasing Works:
                </div>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--mute)', lineHeight: '1.6' }}>
                  <li>Select <strong>Project Showcasing</strong> and submit your details.</li>
                  <li>The festival administrator receives an email notification with your credentials.</li>
                  <li>Upon admin approval, your registration is confirmed and you receive the option to submit your project details.</li>
                  <li>A confirmation and status update is sent directly to your WhatsApp number.</li>
                </ol>
              </div>
            </div>

            {/* Right Column: Registration Form */}
            <form onSubmit={handleSubmit} noValidate>
              <h3>Your details</h3>

              {/* Event Dropdown */}
              <label className="field">
                <span>Selected Festival Event *</span>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  disabled={selectedPass === 'showcasing'}
                  className="glass-select"
                >
                  {selectedPass === 'showcasing' ? (
                    <option value={selectedEventId}>Tech Showcase – Flagship Project Exhibition</option>
                  ) : (
                    registrableEvents.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.date_display} — {ev.name} ({ev.eligibility})
                      </option>
                    ))
                  )}
                </select>
              </label>

              {/* College Affiliation Selector */}
              <div style={{ marginBottom: '1.1rem' }}>
                <span className="mono" style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                  Student Affiliation *
                </span>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={isInternalCollege}
                    onClick={() => handleCollegeToggle(true)}
                  >
                    Our College Student
                  </button>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={!isInternalCollege}
                    onClick={() => handleCollegeToggle(false)}
                  >
                    External College Student
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <label className="field">
                <span>Full name *</span>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>

              {/* Email */}
              <label className="field">
                <span>Email address *</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              {/* Phone Number (Explicit WhatsApp confirmation indicator) */}
              <label className="field">
                <span>Phone number (WhatsApp for Confirmation) *</span>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <span className="mono" style={{ fontSize: '0.75rem', marginTop: '0.3rem', color: 'var(--mute)' }}>
                  We will send your pass confirmation and approval updates via WhatsApp.
                </span>
              </label>

              {/* College Name */}
              <label className="field">
                <span>College name *</span>
                <input
                  type="text"
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="College / University Name"
                  readOnly={isInternalCollege}
                  style={isInternalCollege ? { opacity: 0.9, cursor: 'not-allowed', background: 'rgba(255,255,255,0.04)' } : undefined}
                />
                {isInternalCollege && (
                  <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--mute)', marginTop: '0.25rem' }}>
                    Locked to host institution (LJCCA).
                  </span>
                )}
              </label>

              {/* Roll Number (Shown and required when Our College / LJCCA is selected) */}
              {isInternalCollege && (
                <label className="field">
                  <span>Roll number (LJCCA) *</span>
                  <input
                    type="text"
                    required
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g. 23BCA101 or Roll No."
                    autoComplete="off"
                  />
                  <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--mute)', marginTop: '0.25rem' }}>
                    Required for student identity verification at campus entry.
                  </span>
                </label>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label className="field">
                  <span>Department {isInternalCollege ? '(Locked to BCA)' : ''}</span>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. BCA or Computer Science"
                    readOnly={isInternalCollege}
                    style={isInternalCollege ? { opacity: 0.9, cursor: 'not-allowed', background: 'rgba(255,255,255,0.04)' } : undefined}
                  />
                </label>

                <label className="field">
                  <span>Year / Semester *</span>
                  <select
                    value={yearSemester}
                    onChange={(e) => setYearSemester(e.target.value)}
                    required
                    className="glass-select"
                  >
                    {YEAR_SEMESTER_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Team Name for Showcasing or Hackathons */}
              {(selectedPass === 'showcasing' || isHackathon) && (
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <label className="field">
                    <span>Team / Project Name {selectedPass === 'showcasing' ? '(Optional)' : '*'}</span>
                    <input
                      type="text"
                      placeholder="e.g. Quantum Innovators"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </label>

                  <label className="field">
                    <span>Team member names (if group project)</span>
                    <input
                      type="text"
                      placeholder="e.g. Alice Smith, Bob Chen"
                      value={teamMembers}
                      onChange={(e) => setTeamMembers(e.target.value)}
                    />
                  </label>
                </div>
              )}

              {/* Conditional Parent Checkbox */}
              {isParentWorkshop && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isParentAttendee}
                    onChange={(e) => setIsParentAttendee(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--ink)' }}
                  />
                  <span style={{ fontSize: '0.9rem' }}>
                    I confirm that I am attending as a parent or guardian.
                  </span>
                </label>
              )}

              {/* Submit Button */}
              <button
                className="btn fill"
                type="submit"
                disabled={isSubmitting}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {isSubmitting
                  ? 'Submitting registration...'
                  : selectedPass === 'showcasing'
                  ? 'Request Project Showcasing Pass (Free) →'
                  : 'Reserve Visitor Pass (Free) →'}
              </button>

              {/* Feedback alert box */}
              {formFeedback && (
                <div
                  className="ok show"
                  role="status"
                  style={{
                    background: formFeedback.isError ? 'var(--card)' : 'var(--lime)',
                    color: formFeedback.isError ? '#D6331F' : 'var(--limeink)',
                    borderColor: formFeedback.isError ? '#D6331F' : 'var(--ink)',
                  }}
                >
                  {formFeedback.message}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
