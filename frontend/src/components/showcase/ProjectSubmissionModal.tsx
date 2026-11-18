import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Code2, CheckCircle2, Sparkles, Plus, Trash2, KeyRound } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { ProjectPayload, RegistrationRecord } from '../../types';
import { useNotification } from '../../context/NotificationContext';
import { GlassSelect } from '../common/GlassSelect';

interface ProjectSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialRegistration?: RegistrationRecord | null;
}

const HARDWARE_CATS = [
  'Robotics',
  'IoT',
  'ESP32 and Arduino projects',
  'Smart Home Automation',
  'Embedded Systems',
  'Electronic Prototypes',
  'Innovative Hardware Products',
];

const SOFTWARE_CATS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Web Applications',
  'Android Applications',
  'AI Assistants',
  'SaaS Products',
  'Desktop Applications',
  'Automation Software',
];

export const ProjectSubmissionModal: React.FC<ProjectSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialRegistration,
}) => {
  const { showNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProject, setSubmittedProject] = useState<{ code: string; name: string } | null>(null);

  // Verification Gate state
  const [accessGranted, setAccessGranted] = useState(
    initialRegistration?.status === 'approved' || initialRegistration?.can_submit_project || false
  );
  const [regCodeInput, setRegCodeInput] = useState(initialRegistration?.reg_code || '');
  const [emailInput, setEmailInput] = useState(initialRegistration?.email || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
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
    team_member_names: string;
    demo_video_url: string;
    image_url_input: string;
    images: string[];
  }>({
    student_name: initialRegistration?.full_name || '',
    college_name: initialRegistration?.college_name || '',
    email: initialRegistration?.email || '',
    phone: initialRegistration?.phone || '',
    project_name: initialRegistration?.team_name || '',
    category: 'Hardware',
    sub_category: HARDWARE_CATS[0],
    description: '',
    technologies_used: '',
    num_team_members: 1,
    team_member_names: initialRegistration?.team_members || '',
    demo_video_url: '',
    image_url_input: '',
    images: [],
  });

  useEffect(() => {
    if (initialRegistration) {
      setAccessGranted(true);
      setRegCodeInput(initialRegistration.reg_code);
      setEmailInput(initialRegistration.email);
      setFormData((prev) => ({
        ...prev,
        student_name: initialRegistration.full_name || prev.student_name,
        college_name: initialRegistration.college_name || prev.college_name,
        email: initialRegistration.email || prev.email,
        phone: initialRegistration.phone || prev.phone,
        project_name: initialRegistration.team_name || prev.project_name,
        team_member_names: initialRegistration.team_members || prev.team_member_names,
      }));
    }
  }, [initialRegistration]);

  if (!isOpen) return null;

  const handleVerifyAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError(null);
    setIsVerifying(true);

    try {
      const reg = await api.getRegistrationByCode(regCodeInput.trim().toUpperCase());
      if (!reg) {
        throw new Error('Registration ID not found in system records.');
      }

      if (reg.email.toLowerCase() !== emailInput.trim().toLowerCase()) {
        throw new Error('Registered email does not match this Registration ID.');
      }

      if (reg.status !== 'approved' && !reg.can_submit_project) {
        throw new Error(
          'Your Project Showcasing registration is currently pending admin review. You will receive submission access once approved by festival chairs.'
        );
      }

      setAccessGranted(true);
      setFormData((prev) => ({
        ...prev,
        student_name: reg.full_name,
        college_name: reg.college_name,
        email: reg.email,
        phone: reg.phone,
        project_name: reg.team_name || prev.project_name,
        team_member_names: reg.team_members || prev.team_member_names,
      }));
      showNotification('success', 'Access Granted', 'Registration verified. You may now submit your project.');
    } catch (err: any) {
      setVerificationError(err.message || 'Verification failed');
      showNotification('error', 'Verification Failed', err.message || 'Please verify Registration ID & Email.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCategoryChange = (cat: 'Hardware' | 'Software') => {
    setFormData((prev) => ({
      ...prev,
      category: cat,
      sub_category: cat === 'Hardware' ? HARDWARE_CATS[0] : SOFTWARE_CATS[0],
    }));
  };

  const handleAddImage = () => {
    if (!formData.image_url_input.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, prev.image_url_input.trim()],
      image_url_input: '',
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.student_name || !formData.college_name || !formData.email || !formData.phone || !formData.project_name || !formData.description || !formData.technologies_used) {
      showNotification('warning', 'Missing Information', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: ProjectPayload = {
        student_name: formData.student_name,
        college_name: formData.college_name,
        email: formData.email,
        phone: formData.phone,
        project_name: formData.project_name,
        category: formData.category,
        sub_category: formData.sub_category,
        description: formData.description,
        technologies_used: formData.technologies_used,
        num_team_members: formData.num_team_members,
        team_member_names: formData.num_team_members > 1 ? formData.team_member_names : undefined,
        demo_video_url: formData.demo_video_url || undefined,
        images: formData.images.length > 0 ? formData.images : undefined,
      };

      const result = await api.submitProject(payload);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3155E7', '#FF7139', '#FFD85A'],
      });

      setSubmittedProject({
        code: result.project_code,
        name: result.project_name,
      });

      showNotification('success', 'Project Submitted!', `Project code: ${result.project_code}. Sent for admin review.`);
      onSuccess();
    } catch (err: any) {
      showNotification('error', 'Submission Failed', err.message || 'Unable to submit project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSubCats = formData.category === 'Hardware' ? HARDWARE_CATS : SOFTWARE_CATS;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202020]/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#FFFFFF] border-2 border-[#202020] shadow-[8px_8px_0px_#202020] rounded-sm p-6 sm:p-8 my-8 text-[#202020] max-h-[90vh] overflow-y-auto"
        >
          {/* Washi Tape Strip */}
          <div
            className="paper-tape"
            style={{
              top: '-12px',
              left: '15%',
              width: '70px',
              transform: 'rotate(-4deg)',
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#202020] hover:text-[#E94B50] p-1.5 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] shadow-[1.5px_1.5px_0px_#202020] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {submittedProject ? (
            /* Success confirmation */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-[#FFD85A] border-2 border-[#202020] shadow-[3px_3px_0px_#202020] rounded-sm flex items-center justify-center mx-auto text-[#202020]">
                <CheckCircle2 className="w-8 h-8 text-[#3155E7]" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#3155E7] font-bold block mb-2">
                  // Submission Received
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#202020] uppercase">
                  PROJECT REGISTERED SUCCESSFULLY
                </h3>
                <p className="text-[#5F5B52] font-mono text-sm max-w-md mx-auto mt-2 font-medium">
                  Your project <span className="text-[#202020] font-bold">"{submittedProject.name}"</span> has been logged into the Tech Gallery 2027 review queue.
                </p>
              </div>

              <div className="p-5 bg-[#FAF8F3] border-2 border-[#202020] rounded-sm shadow-[3px_3px_0px_#202020] max-w-sm mx-auto font-mono">
                <span className="text-xs text-[#625E56] font-bold block mb-1">PROJECT TRACKING CODE</span>
                <span className="text-xl sm:text-2xl font-black text-[#3155E7] tracking-widest">
                  {submittedProject.code}
                </span>
              </div>

              <p className="text-xs text-[#625E56] max-w-md mx-auto font-medium">
                Our festival technical evaluation jury will review your submission. Once approved, your project will be assigned an exhibition booth in the Tech Showcase Pavilion (21–22 January 2027).
              </p>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-sm font-mono font-bold text-xs text-white bg-[#3155E7] border-2 border-[#202020] shadow-[3.5px_3.5px_0px_#202020] hover:shadow-[5px_5px_0px_#202020] hover:-translate-y-0.5 transition-all"
              >
                Done
              </button>
            </div>
          ) : !accessGranted ? (
            /* Access Verification Gate */
            <div className="py-6 font-mono space-y-5">
              <div className="flex items-center gap-3 border-b-2 border-dashed border-[#202020]/25 pb-4">
                <div className="w-10 h-10 bg-[#FFD85A] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] rounded-sm flex items-center justify-center text-[#202020] flex-shrink-0">
                  <KeyRound className="w-5 h-5 text-[#3155E7]" />
                </div>
                <div>
                  <span className="text-[10px] text-[#3155E7] uppercase tracking-widest block font-bold">
                    Admin Approval Required
                  </span>
                  <h3 className="font-display font-black text-lg text-[#202020]">
                    Unlock Project Submission
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#5F5B52] leading-relaxed font-medium">
                Project submission is exclusively for registered <strong>Project Showcasing</strong> participants whose registrations have been approved by the festival admin. Please enter your Registration ID and registered email to unlock this form.
              </p>

              <form onSubmit={handleVerifyAccess} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-[11px] text-[#202020] uppercase font-bold mb-1">
                    Registration ID (e.g. TG27-REG-XXXXXX) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="TG27-REG-..."
                    value={regCodeInput}
                    onChange={(e) => setRegCodeInput(e.target.value.toUpperCase())}
                    className="w-full bg-[#FFFFFF] border-2 border-[#202020] px-3.5 py-2.5 text-xs text-[#202020] uppercase focus:border-[#3155E7] focus:outline-none rounded-sm shadow-[2px_2px_0px_#202020]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#202020] uppercase font-bold mb-1">
                    Registered Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@college.edu"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-[#FFFFFF] border-2 border-[#202020] px-3.5 py-2.5 text-xs text-[#202020] focus:border-[#3155E7] focus:outline-none rounded-sm shadow-[2px_2px_0px_#202020]"
                  />
                </div>

                {verificationError && (
                  <div className="p-3 bg-[#FFECEC] border-2 border-[#202020] text-[#E94B50] font-bold text-xs leading-relaxed shadow-[2px_2px_0px_#202020]">
                    {verificationError}
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-5 py-2.5 rounded-sm font-mono font-bold text-xs text-white bg-[#3155E7] border-2 border-[#202020] shadow-[3px_3px_0px_#202020] hover:shadow-[4.5px_4.5px_0px_#202020] transition-all"
                  >
                    {isVerifying ? 'Verifying...' : 'Unlock Project Submission →'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-sm font-mono font-bold text-xs text-[#202020] bg-[#FFFFFF] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] hover:bg-[#FAF8F3] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Submission Form */
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#3155E7]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#3155E7] font-bold">
                    Tech Showcase 2027 • Official Entry
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#202020] uppercase tracking-tight">
                  SUBMIT YOUR PROJECT
                </h3>
                <p className="text-xs font-mono text-[#5F5B52] font-medium mt-1">
                  Students from all colleges are welcome to submit their hardware and software projects for Tech Gallery 2027.
                </p>
              </div>

              {/* Welcoming Note */}
              <div className="p-3.5 bg-[#FFD85A] border-2 border-[#202020] rounded-sm text-xs font-mono font-bold text-[#202020] mb-6 shadow-[2.5px_2.5px_0px_#202020]">
                "Students from all colleges are welcome to submit their hardware and software projects for Tech Gallery 2027."
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category Selector Tabs */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] mb-2 font-bold">
                    Project Category *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleCategoryChange('Hardware')}
                      className={`p-3.5 border-2 border-[#202020] rounded-sm flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        formData.category === 'Hardware'
                          ? 'bg-[#FFD85A] text-[#202020] font-black shadow-[3.5px_3.5px_0px_#202020] -translate-y-0.5'
                          : 'bg-[#FAF8F3] text-[#625E56] hover:bg-[#FFFFFF]'
                      }`}
                    >
                      <Cpu className="w-4 h-4 text-[#3155E7]" />
                      <span>Hardware Showcase</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange('Software')}
                      className={`p-3.5 border-2 border-[#202020] rounded-sm flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        formData.category === 'Software'
                          ? 'bg-[#3155E7] text-white font-black shadow-[3.5px_3.5px_0px_#202020] -translate-y-0.5'
                          : 'bg-[#FAF8F3] text-[#625E56] hover:bg-[#FFFFFF]'
                      }`}
                    >
                      <Code2 className="w-4 h-4 text-[#FF7139]" />
                      <span>Software Showcase</span>
                    </button>
                  </div>
                </div>

                {/* Sub Category Dropdown */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                    Specific Track / Domain *
                  </label>
                  <GlassSelect
                    value={formData.sub_category}
                    onChange={(val) => setFormData({ ...formData, sub_category: val })}
                    options={currentSubCats}
                  />
                </div>

                {/* Project Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Autonomous Solar Rover / Neural Vision Suite"
                    value={formData.project_name}
                    onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                    className="w-full bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                  />
                </div>

                {/* Student & College info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                      Lead Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      className="w-full bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                      College / University Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MIT, IIT, National Engineering College"
                      value={formData.college_name}
                      onChange={(e) => setFormData({ ...formData, college_name: e.target.value })}
                      className="w-full bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                    />
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                    Project Description (Problem solved, methodology, working) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide a comprehensive summary of your project, architecture, components used, and novelty..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                  />
                </div>

                {/* Technologies Used */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                    Technologies Used *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ESP32, C++, ROS2, TensorFlow, React, FastAPI"
                    value={formData.technologies_used}
                    onChange={(e) => setFormData({ ...formData, technologies_used: e.target.value })}
                    className="w-full bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                  />
                </div>

                {/* Team Members */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                      Team Members Count
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={formData.num_team_members}
                      onChange={(e) => setFormData({ ...formData, num_team_members: parseInt(e.target.value) || 1 })}
                      className="w-full bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                      Team Member Names (if applicable)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alice Smith, Bob Johnson, Charlie Lee"
                      value={formData.team_member_names}
                      onChange={(e) => setFormData({ ...formData, team_member_names: e.target.value })}
                      className="w-full bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                    />
                  </div>
                </div>

                {/* Video Demo Link */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                    Demonstration Video Link (YouTube / Drive link, optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=... or Drive link"
                    value={formData.demo_video_url}
                    onChange={(e) => setFormData({ ...formData, demo_video_url: e.target.value })}
                    className="w-full bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                  />
                </div>

                {/* Project Images (URLs) */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#202020] font-bold mb-1.5">
                    Project Images (Image URLs / Screenshots)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/... or hosted image URL"
                      value={formData.image_url_input}
                      onChange={(e) => setFormData({ ...formData, image_url_input: e.target.value })}
                      className="flex-1 bg-[#FFFFFF] border-2 border-[#202020] rounded-sm px-3.5 py-2 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none shadow-[2px_2px_0px_#202020]"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="px-3.5 py-2 rounded-sm font-mono font-bold text-xs bg-[#FAF8F3] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] flex items-center gap-1 hover:bg-[#FFFFFF]"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#3155E7]" />
                      <span>Add</span>
                    </button>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-1.5 bg-[#FAF8F3] border-2 border-[#202020] text-[11px] font-mono rounded-sm shadow-[1.5px_1.5px_0px_#202020]"
                        >
                          <span className="max-w-[200px] truncate text-[#202020] font-bold">{img}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="text-[#E94B50] hover:text-[#C82E33] p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-dashed border-[#202020]/25">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#202020] hover:bg-[#FAF8F3] border-2 border-[#202020] rounded-sm shadow-[2px_2px_0px_#202020] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-sm font-mono font-bold text-xs text-white bg-[#3155E7] border-2 border-[#202020] shadow-[3.5px_3.5px_0px_#202020] hover:shadow-[5px_5px_0px_#202020] hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Project</span>
                        <Sparkles className="w-4 h-4 text-[#FFD85A]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
