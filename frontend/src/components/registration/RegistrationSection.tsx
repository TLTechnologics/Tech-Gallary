import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { EventItem, RegistrationPayload, RegistrationRecord } from '../../types';
import { RegistrationConfirmation } from './RegistrationConfirmation';
import { useNotification } from '../../context/NotificationContext';
import { GlassSelect } from '../common/GlassSelect';
import { MapPin, ArrowRight } from 'lucide-react';

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

  const showcaseEvents = registrableEvents.filter((e) => e.is_showcase);
  const availableEvents =
    !isInternalCollege || selectedPass === 'showcasing'
      ? showcaseEvents
      : registrableEvents;

  useEffect(() => {
    const validEvents =
      !isInternalCollege || selectedPass === 'showcasing'
        ? showcaseEvents
        : registrableEvents;

    setSelectedEventId((prev) => {
      // If a preselected event was provided and it's valid for this student type, use it
      if (preselectedEventId && validEvents.some((e) => e.id === preselectedEventId)) {
        return preselectedEventId;
      }
      // If current selection is still valid among the available events, keep it
      if (prev && validEvents.some((e) => e.id === prev)) {
        return prev;
      }
      // Otherwise fallback to the first valid event
      return validEvents[0]?.id || '';
    });
  }, [preselectedEventId, registrableEvents, selectedPass, isInternalCollege]);

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
      if (!showcaseEvents.some((e) => e.id === selectedEventId)) {
        if (showcaseEvents.length > 0) {
          setSelectedEventId(showcaseEvents[0].id);
        }
      }
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
    if (!isInternalCollege && !currentEvent?.is_showcase) {
      const msg = `External college students can only select from Tech Showcase days. Please select Day 1 or Day 2 of the Tech Showcase.`;
      setFormFeedback({ isError: true, message: msg });
      showNotification('error', 'Participation Restricted', msg);
      return;
    }

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
    <section className="relative py-24 px-4 sm:px-6 md:px-8 bg-[#F8F5EC] overflow-hidden" id="register">
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#202020 1px, transparent 1px), linear-gradient(90deg, #202020 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2.5px_2.5px_0px_#202020] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3155E7]" />
            <span className="font-mono text-xs text-[#202020] tracking-widest uppercase font-bold">
              REGISTRATION PORTAL // 100% FREE PASSES
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#202020] tracking-tight leading-tight">
            Reserve Your <span className="text-[#3155E7] underline decoration-[#FFD85A] decoration-wavy decoration-2">Place.</span>
          </h2>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Choose Pass Tier & Guidance (Perforated Pass Cards) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <h3 className="font-display text-2xl font-black text-[#202020] mb-2">
                  Select Your Festival Pass
                </h3>
                <p className="font-body text-sm text-[#5F5B52] leading-relaxed font-medium">
                  Both passes grant 100% free admission to the festival grounds at LJCCA, Vastrapur, Ahmedabad.
                </p>
              </div>

              {/* Pass Tier Selection Cards: Perforated Paper Passes */}
              <div className="space-y-4">
                {/* Tier 1: Visitor */}
                <div
                  onClick={() => setSelectedPass('visitor')}
                  className={`p-5 rounded-sm border-2 border-[#202020] transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 ${
                    selectedPass === 'visitor'
                      ? 'bg-[#FFD85A] shadow-[5px_5px_0px_#202020] -translate-y-1'
                      : 'bg-[#FFFFFF] shadow-[3px_3px_0px_#202020] hover:shadow-[4.5px_4.5px_0px_#202020]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <input
                        type="radio"
                        name="pass-type"
                        value="visitor"
                        checked={selectedPass === 'visitor'}
                        onChange={() => setSelectedPass('visitor')}
                        className="accent-[#3155E7] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="font-display font-black text-lg text-[#202020]">
                        Visitor Pass
                      </div>
                      <div className="font-body text-xs text-[#5F5B52] font-medium mt-1">
                        Access to open talks, demonstration exhibits, and public viewing
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded-sm bg-[#FFFFFF] text-[#202020] border-1.5 border-[#202020] shadow-[1.5px_1.5px_0px_#202020]">
                    FREE
                  </span>
                </div>

                {/* Tier 2: Project Showcasing */}
                <div
                  onClick={() => setSelectedPass('showcasing')}
                  className={`p-5 rounded-sm border-2 border-[#202020] transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 ${
                    selectedPass === 'showcasing'
                      ? 'bg-[#FFD85A] shadow-[5px_5px_0px_#202020] -translate-y-1'
                      : 'bg-[#FFFFFF] shadow-[3px_3px_0px_#202020] hover:shadow-[4.5px_4.5px_0px_#202020]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <input
                        type="radio"
                        name="pass-type"
                        value="showcasing"
                        checked={selectedPass === 'showcasing'}
                        onChange={() => setSelectedPass('showcasing')}
                        className="accent-[#3155E7] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="font-display font-black text-lg text-[#202020]">
                        Project Showcasing Pass
                      </div>
                      <div className="font-body text-xs text-[#5F5B52] font-medium mt-1">
                        Hardware &amp; Software booth exhibition stall (Requires Admin Verification)
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded-sm bg-[#FFFFFF] text-[#202020] border-1.5 border-[#202020] shadow-[1.5px_1.5px_0px_#202020]">
                    FREE
                  </span>
                </div>
              </div>

              {/* Location Reference Badge */}
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#625E56] bg-[#FFFFFF] p-3 rounded-sm border-2 border-[#202020] shadow-[2.5px_2.5px_0px_#202020]">
                <MapPin className="w-4 h-4 text-[#FF7139]" />
                <span>LJCCA, Vastrapur, Ahmedabad · 18–24 Jan 2027</span>
              </div>

              {/* Showcasing Workflow Advisory */}
              <div className="p-5 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] shadow-[3px_3px_0px_#202020] font-mono text-xs text-[#5F5B52]">
                <div className="font-black text-[#202020] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3155E7]" />
                  <span>How Project Showcasing Works:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 leading-relaxed font-medium">
                  <li>Select <strong>Project Showcasing</strong> and submit your team details.</li>
                  <li>Festival review administrators verify your submission via admin portal.</li>
                  <li>Upon approval, you receive a direct link to submit prototype specifications.</li>
                  <li>Real-time confirmation dispatch is sent to your WhatsApp number.</li>
                </ol>
              </div>
            </div>

            {/* Right Column: Registration Form in Pure Paper Dossier */}
            <form onSubmit={handleSubmit} noValidate className="lg:col-span-7 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] p-6 sm:p-8 shadow-[6px_6px_0px_#202020] relative">
              {/* Washi Tape Strip */}
              <div
                className="paper-tape"
                style={{
                  top: '-12px',
                  right: '15%',
                  width: '65px',
                  transform: 'rotate(4deg)',
                }}
              />

              <h3 className="font-display font-black text-2xl text-[#202020] mb-6">
                Enter Registration Details
              </h3>

              {/* Festival Event Dropdown */}
              <div className="mb-5">
                <label className="block font-mono text-xs text-[#202020] mb-2 font-bold uppercase tracking-wider">
                  Selected Festival Event *
                </label>
                <GlassSelect
                  value={selectedEventId}
                  onChange={setSelectedEventId}
                  options={availableEvents.map((ev) => ({
                    value: ev.id,
                    label: ev.name,
                    sublabel: ev.date_display,
                    badge: ev.eligibility_type === 'internal_only' ? 'College Only' : ev.eligibility_type === 'parents_only' ? 'Parents' : 'All Colleges',
                  }))}
                />
                {!isInternalCollege && (
                  <span className="block font-mono text-[11px] text-[#625E56] font-medium mt-1.5">
                    External college students can only select from Tech Showcase days (Day 1 &amp; Day 2).
                  </span>
                )}
              </div>

              {/* College Affiliation Selector */}
              <div className="mb-5">
                <label className="block font-mono text-xs text-[#202020] mb-2 font-bold uppercase tracking-wider">
                  Student Affiliation *
                </label>
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => handleCollegeToggle(true)}
                    className={`py-2.5 px-4 rounded-sm border-2 border-[#202020] font-black transition-all ${
                      isInternalCollege
                        ? 'bg-[#3155E7] text-white shadow-[3px_3px_0px_#202020]'
                        : 'bg-[#FAF8F3] text-[#202020] hover:bg-[#FFFFFF]'
                    }`}
                  >
                    Our College Student
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCollegeToggle(false)}
                    className={`py-2.5 px-4 rounded-sm border-2 border-[#202020] font-black transition-all ${
                      !isInternalCollege
                        ? 'bg-[#3155E7] text-white shadow-[3px_3px_0px_#202020]'
                        : 'bg-[#FAF8F3] text-[#202020] hover:bg-[#FFFFFF]'
                    }`}
                  >
                    External College Student
                  </button>
                </div>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-mono text-xs text-[#202020] mb-1.5 font-bold uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] text-[#202020] font-body text-sm focus:outline-none focus:border-[#3155E7] transition-colors shadow-[2px_2px_0px_#202020]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#202020] mb-1.5 font-bold uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] text-[#202020] font-body text-sm focus:outline-none focus:border-[#3155E7] transition-colors shadow-[2px_2px_0px_#202020]"
                  />
                </div>
              </div>

              {/* Phone (WhatsApp) & College Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-mono text-xs text-[#202020] mb-1.5 font-bold uppercase tracking-wider">
                    Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] text-[#202020] font-body text-sm focus:outline-none focus:border-[#3155E7] transition-colors shadow-[2px_2px_0px_#202020]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#202020] mb-1.5 font-bold uppercase tracking-wider">
                    College Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="College / University Name"
                    readOnly={isInternalCollege}
                    className={`w-full px-4 py-2.5 rounded-sm border-2 border-[#202020] text-[#202020] font-body text-sm focus:outline-none transition-colors shadow-[2px_2px_0px_#202020] ${
                      isInternalCollege
                        ? 'bg-[#FAF8F3] text-[#625E56] cursor-not-allowed'
                        : 'bg-[#FFFFFF] focus:border-[#3155E7]'
                    }`}
                  />
                </div>
              </div>

              {/* Roll Number (for internal) & Department & Semester */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {isInternalCollege && (
                  <div>
                    <label className="block font-mono text-xs text-[#202020] mb-1.5 font-bold uppercase tracking-wider">
                      Roll Number (LJCCA) *
                    </label>
                    <input
                      type="text"
                      required
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="e.g. 23BCA101"
                      className="w-full px-4 py-2.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] text-[#202020] font-body text-sm focus:outline-none focus:border-[#3155E7] transition-colors shadow-[2px_2px_0px_#202020]"
                    />
                  </div>
                )}

                <div className={!isInternalCollege ? 'sm:col-span-1' : ''}>
                  <label className="block font-mono text-xs text-[#202020] mb-1.5 font-bold uppercase tracking-wider">
                    Department {isInternalCollege ? '(Locked to BCA)' : ''}
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Science"
                    readOnly={isInternalCollege}
                    className={`w-full px-4 py-2.5 rounded-sm border-2 border-[#202020] text-[#202020] font-body text-sm focus:outline-none transition-colors shadow-[2px_2px_0px_#202020] ${
                      isInternalCollege
                        ? 'bg-[#FAF8F3] text-[#625E56] cursor-not-allowed'
                        : 'bg-[#FFFFFF] focus:border-[#3155E7]'
                    }`}
                  />
                </div>

                <div className={!isInternalCollege ? 'sm:col-span-2' : ''}>
                  <label className="block font-mono text-xs text-[#202020] mb-1.5 font-bold uppercase tracking-wider">
                    Year / Semester *
                  </label>
                  <GlassSelect
                    value={yearSemester}
                    onChange={setYearSemester}
                    options={YEAR_SEMESTER_OPTIONS}
                  />
                </div>
              </div>

              {/* Team Name for Showcasing or Hackathons */}
              {(selectedPass === 'showcasing' || isHackathon) && (
                <div className="border-t-2 border-dashed border-[#202020]/25 pt-4 mt-4 space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-[#202020] mb-1.5 font-bold uppercase tracking-wider">
                      Team / Project Name {selectedPass === 'showcasing' ? '(Optional)' : '*'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Quantum Innovators"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] text-[#202020] font-body text-sm focus:outline-none focus:border-[#3155E7] transition-colors shadow-[2px_2px_0px_#202020]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#202020] mb-1.5 font-bold uppercase tracking-wider">
                      Team Member Names (if group project)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alice Smith, Bob Chen"
                      value={teamMembers}
                      onChange={(e) => setTeamMembers(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] text-[#202020] font-body text-sm focus:outline-none focus:border-[#3155E7] transition-colors shadow-[2px_2px_0px_#202020]"
                    />
                  </div>
                </div>
              )}

              {/* Conditional Parent Checkbox */}
              {isParentWorkshop && (
                <div className="my-4 p-4 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] shadow-[2.5px_2.5px_0px_#202020] flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="parent-check"
                    checked={isParentAttendee}
                    onChange={(e) => setIsParentAttendee(e.target.checked)}
                    className="accent-[#E94B50] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="parent-check" className="font-body text-xs sm:text-sm text-[#202020] font-bold cursor-pointer">
                    I confirm that I am attending as a parent or guardian of a student.
                  </label>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-4 px-6 rounded-sm font-mono font-bold text-sm text-white bg-[#3155E7] border-2 border-[#202020] shadow-[4.5px_4.5px_0px_#202020] hover:shadow-[6px_6px_0px_#202020] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {isSubmitting
                    ? 'PROCESSING REGISTRATION...'
                    : selectedPass === 'showcasing'
                    ? 'REQUEST PROJECT SHOWCASING PASS (FREE) →'
                    : 'RESERVE VISITOR PASS (FREE) →'}
                </span>
              </button>

              {/* Form Feedback Alert Box */}
              {formFeedback && (
                <div
                  role="status"
                  className={`mt-4 p-4 rounded-sm border-2 border-[#202020] font-mono text-xs font-bold leading-relaxed shadow-[3px_3px_0px_#202020] ${
                    formFeedback.isError
                      ? 'bg-[#FFECEC] text-[#E94B50]'
                      : 'bg-[#FFD85A] text-[#202020]'
                  }`}
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
