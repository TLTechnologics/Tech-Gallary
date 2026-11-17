import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Code2, Upload, Video, Users, CheckCircle2, AlertCircle, Sparkles, Plus, Trash2, KeyRound } from 'lucide-react';
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

    if (!regCodeInput.trim() || !emailInput.trim()) {
      setVerificationError('Please enter both your Registration ID and registered email address.');
      return;
    }

    setIsVerifying(true);
    try {
      const data = await api.checkSubmissionAccess(regCodeInput.trim(), emailInput.trim());
      setAccessGranted(true);
      setFormData((prev) => ({
        ...prev,
        student_name: data.full_name,
        college_name: data.college_name,
        email: data.email,
        phone: data.phone,
        project_name: data.team_name || prev.project_name,
        team_member_names: data.team_members || prev.team_member_names,
      }));
      showNotification('success', 'Access Unlocked', `Welcome ${data.full_name}! You can now submit your project.`);
    } catch (err: any) {
      setVerificationError(err.message || 'Unable to verify registration access.');
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
        colors: ['#ccff00', '#00f0ff', '#ffffff'],
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-dark-900 border border-neutral-700 shadow-2xl p-6 sm:p-8 my-8 text-neutral-100 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 border border-neutral-800 hover:border-neutral-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {submittedProject ? (
            /* Success confirmation */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-brand-lime/10 border-2 border-brand-lime flex items-center justify-center mx-auto text-brand-lime">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-brand-lime block mb-2">
                  // Submission Received
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                  PROJECT REGISTERED SUCCESSFULLY
                </h3>
                <p className="text-neutral-400 font-mono text-sm max-w-md mx-auto mt-2">
                  Your project <span className="text-white font-bold">"{submittedProject.name}"</span> has been logged into the Tech Gallery 2027 review queue.
                </p>
              </div>

              <div className="p-5 bg-dark-850 border border-neutral-800 max-w-sm mx-auto font-mono">
                <span className="text-xs text-neutral-400 block mb-1">PROJECT TRACKING CODE</span>
                <span className="text-xl sm:text-2xl font-black text-brand-lime tracking-widest">
                  {submittedProject.code}
                </span>
              </div>

              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Our festival technical evaluation jury will review your submission. Once approved, your project will be assigned an exhibition booth in the Tech Showcase Pavilion (21–22 January 2027).
              </p>

              <button
                onClick={onClose}
                className="btn-primary px-8 py-3 text-xs"
              >
                Done
              </button>
            </div>
          ) : !accessGranted ? (
            /* Access Verification Gate */
            <div className="py-6 font-mono space-y-5">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                <div className="w-10 h-10 bg-brand-lime/10 border border-brand-lime flex items-center justify-center text-brand-lime flex-shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-lime uppercase tracking-widest block font-bold">
                    Admin Approval Required
                  </span>
                  <h3 className="font-display font-bold text-lg text-white">
                    Unlock Project Submission
                  </h3>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Project submission is exclusively for registered <strong>Project Showcasing</strong> participants whose registrations have been approved by the festival admin. Please enter your Registration ID and registered email to unlock this form.
              </p>

              <form onSubmit={handleVerifyAccess} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-[11px] text-neutral-400 uppercase mb-1">
                    Registration ID (e.g. TG27-REG-XXXXXX) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="TG27-REG-..."
                    value={regCodeInput}
                    onChange={(e) => setRegCodeInput(e.target.value.toUpperCase())}
                    className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-white uppercase focus:border-brand-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 uppercase mb-1">
                    Registered Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@college.edu"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:border-brand-lime focus:outline-none"
                  />
                </div>

                {verificationError && (
                  <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-400 text-xs leading-relaxed">
                    {verificationError}
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="btn-primary text-xs py-2.5 px-5"
                  >
                    {isVerifying ? 'Verifying...' : 'Unlock Project Submission →'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-secondary text-xs py-2.5 px-4"
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
                  <span className="w-2 h-2 bg-brand-blue animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-blue">
                    Tech Showcase 2027 • Official Entry
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  SUBMIT YOUR PROJECT
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Students from all colleges are welcome to submit their hardware and software projects for Tech Gallery 2027.
                </p>
              </div>

              {/* Welcoming Note */}
              <div className="p-3.5 bg-brand-blue/10 border-l-4 border-brand-blue text-xs font-mono text-brand-blue mb-6">
                "Students from all colleges are welcome to submit their hardware and software projects for Tech Gallery 2027."
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selector Tabs */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2 font-bold">
                    Project Category *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleCategoryChange('Hardware')}
                      className={`p-3.5 border flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider transition-all ${
                        formData.category === 'Hardware'
                          ? 'border-brand-lime bg-brand-lime/10 text-brand-lime font-bold'
                          : 'border-neutral-800 bg-dark-850 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Cpu className="w-4 h-4" />
                      <span>Hardware Showcase</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange('Software')}
                      className={`p-3.5 border flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider transition-all ${
                        formData.category === 'Software'
                          ? 'border-brand-blue bg-brand-blue/10 text-brand-blue font-bold'
                          : 'border-neutral-800 bg-dark-850 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Code2 className="w-4 h-4" />
                      <span>Software Showcase</span>
                    </button>
                  </div>
                </div>

                {/* Sub Category Dropdown */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Autonomous Solar Rover / Neural Vision Suite"
                    value={formData.project_name}
                    onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                    className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                  />
                </div>

                {/* Student & College info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Lead Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      College / University Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MIT, IIT, National Engineering College"
                      value={formData.college_name}
                      onChange={(e) => setFormData({ ...formData, college_name: e.target.value })}
                      className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                    />
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Project Description (Problem solved, methodology, working) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide a comprehensive summary of your project, architecture, components used, and novelty..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                  />
                </div>

                {/* Technologies Used */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Technologies Used *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ESP32, C++, ROS2, TensorFlow, React, FastAPI"
                    value={formData.technologies_used}
                    onChange={(e) => setFormData({ ...formData, technologies_used: e.target.value })}
                    className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                  />
                </div>

                {/* Team Members */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Number of Team Members
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={formData.num_team_members}
                      onChange={(e) => setFormData({ ...formData, num_team_members: parseInt(e.target.value) || 1 })}
                      className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Team Member Names (if applicable)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alice Smith, Bob Johnson, Charlie Lee"
                      value={formData.team_member_names}
                      onChange={(e) => setFormData({ ...formData, team_member_names: e.target.value })}
                      className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                    />
                  </div>
                </div>

                {/* Video Demo Link */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Demonstration Video Link (YouTube / Drive link, optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=... or Drive link"
                    value={formData.demo_video_url}
                    onChange={(e) => setFormData({ ...formData, demo_video_url: e.target.value })}
                    className="w-full bg-dark-850 border border-neutral-700 px-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                  />
                </div>

                {/* Project Images (URLs) */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Project Images (Image URLs / Screenshots)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/... or hosted image URL"
                      value={formData.image_url_input}
                      onChange={(e) => setFormData({ ...formData, image_url_input: e.target.value })}
                      className="flex-1 bg-dark-850 border border-neutral-700 px-3.5 py-2 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="btn-secondary text-xs px-3 py-2 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-1.5 bg-dark-850 border border-neutral-700 text-[11px] font-mono"
                        >
                          <span className="max-w-[200px] truncate text-neutral-300">{img}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="text-rose-400 hover:text-rose-300 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Project</span>
                        <Sparkles className="w-4 h-4" />
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

