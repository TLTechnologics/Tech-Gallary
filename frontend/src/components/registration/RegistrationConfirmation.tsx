import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, Printer, Clock, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { RegistrationRecord } from '../../types';
import { copyToClipboard } from '../../utils/helpers';
import { useNotification } from '../../context/NotificationContext';

interface RegistrationConfirmationProps {
  registration: RegistrationRecord;
  onReset: () => void;
  onOpenSubmission?: (registration: RegistrationRecord) => void;
}

export const RegistrationConfirmation: React.FC<RegistrationConfirmationProps> = ({
  registration,
  onReset,
  onOpenSubmission,
}) => {
  const { showNotification } = useNotification();
  const isShowcasing = registration.registration_type === 'showcasing';
  const isPending = registration.status === 'pending_approval';
  const isApproved = registration.status === 'approved' || registration.can_submit_project;

  const handleCopyCode = async () => {
    const success = await copyToClipboard(registration.reg_code);
    if (success) {
      showNotification('success', 'Copied!', 'Registration ID copied to clipboard.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `⚡ TECH WIZARD 2027 HOGWARTS ADMISSION CONFIRMED!\n\nName: ${registration.full_name}\nPass Code: ${registration.reg_code}\nDates: 18–24 January 2027\nVenue: LJCCA Campus, Ahmedabad\n\nAccess portal: ${window.location.origin}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 sm:p-8 max-w-2xl mx-auto relative rounded-sm border-2 border-[#D6B36A] bg-[#1A1626] shadow-[0_16px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(214,179,106,0.25),6px_6px_0px_#100D18] text-[#F4EBDD]"
    >
      {/* Crimson & Gold Wax Seal Ribbon Accent */}
      <div
        className="absolute -top-3.5 left-14 px-4 py-1 bg-gradient-to-r from-[#762E42] to-[#4A1525] border-x border-b border-[#D6B36A] shadow-[0_2px_8px_rgba(0,0,0,0.6)] z-10 flex items-center gap-1.5"
        style={{ transform: 'rotate(-2deg)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#F3D58A]" />
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#F3D58A] font-bold">
          ADMISSION VERIFIED
        </span>
      </div>

      {/* Header Badge */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-sm bg-[#1E192D] border-2 border-[#D6B36A] shadow-[0_0_12px_rgba(214,179,106,0.25),2px_2px_0px_#100D18] flex items-center justify-center text-[#F3D58A]">
          {isPending ? <Clock className="w-6 h-6 text-[#F3D58A]" /> : <Sparkles className="w-6 h-6 text-[#D6B36A]" />}
        </div>
        <div>
          <span className="font-mono font-bold text-xs tracking-wider text-[#D6B36A] uppercase block">
            {isPending
              ? 'ADMISSION PENDING FACULTY APPROVAL'
              : isApproved
              ? 'HOGWARTS SHOWCASING PASS APPROVED'
              : 'CONFIRMED HOGWARTS VISITOR PASS (100% FREE)'}
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F4EBDD]">
            {isPending ? 'Admission Dispatched' : 'Hogwarts Pass Enrolled'}
          </h3>
        </div>
      </div>

      {/* Description Advisory */}
      <p className="font-mono text-xs text-[#C2BDCA] mb-6 leading-relaxed font-normal">
        {isPending ? (
          <span>
            Your request for <strong className="text-[#F4EBDD]">Project Showcasing</strong> has been sent to the festival administrators for review. Once verified, you will receive project submission access.
          </span>
        ) : isApproved ? (
          <span className="text-[#F3D58A] font-bold">
            Congratulations! Your registration has been approved. You can now submit your hardware or software project for Tech Wizard 2027.
          </span>
        ) : (
          <span>
            Your Visitor Pass is reserved with <strong className="text-[#F4EBDD]">Free Entry</strong>. Please save your Registration ID below or open WhatsApp confirmation.
          </span>
        )}
      </p>

      {/* Pass Box Card: Enchanted Dossier Ticket Aesthetics */}
      <div className="bg-[#1E192D] border-2 border-[#D6B36A] p-5 sm:p-6 mb-6 rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.5),3.5px_3.5px_0px_#100D18]">
        <div className="flex justify-between items-center pb-4 border-b-2 border-dashed border-[#D6B36A]/25 flex-wrap gap-3">
          <div>
            <span className="font-mono text-[10px] text-[#D6B36A] font-bold tracking-widest uppercase block">
              OFFICIAL REGISTRATION ID
            </span>
            <span 
              className="font-display text-2xl sm:text-3xl font-black text-[#F3D58A] tracking-wider"
              style={{ textShadow: '0 0 15px rgba(243, 213, 138, 0.4)' }}
            >
              {registration.reg_code}
            </span>
          </div>

          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#1A1626] border-1.5 border-[#D6B36A] text-xs font-mono font-bold text-[#F4EBDD] hover:text-[#F3D58A] shadow-[1.5px_1.5px_0px_#100D18] cursor-pointer"
          >
            <Copy size={13} className="text-[#D6B36A]" />
            <span>Copy ID</span>
          </button>
        </div>

        {/* Participant Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 font-mono text-xs text-[#C2BDCA]">
          <div>
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold block">PARTICIPANT NAME</span>
            <span className="font-bold text-[#F4EBDD] text-sm">{registration.full_name}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold block">COLLEGE AFFILIATION</span>
            <span className="font-bold text-[#F4EBDD] text-sm">{registration.college_name}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold block">REGISTERED EMAIL</span>
            <span className="font-bold text-[#F4EBDD]">{registration.email}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold block">PASS TYPE</span>
            <span className="font-bold text-[#F3D58A] uppercase">
              {isShowcasing ? 'Project Showcasing' : 'Visitor Pass'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#D6B36A]/20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#1E192D] border-2 border-[#D6B36A] text-xs font-mono font-bold text-[#F4EBDD] hover:bg-[#251F36] shadow-[2px_2px_0px_#100D18] cursor-pointer"
          >
            <Printer size={14} className="text-[#D6B36A]" />
            <span>Print Pass</span>
          </button>

          <button
            onClick={shareWhatsApp}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#25D366] border-2 border-[#100D18] text-xs font-mono font-bold text-[#100D18] shadow-[2px_2px_0px_#100D18] hover:shadow-[3.5px_3.5px_0px_#100D18] cursor-pointer"
          >
            <Share2 size={14} />
            <span>WhatsApp Dispatch</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {isApproved && onOpenSubmission && (
            <button
              onClick={() => onOpenSubmission(registration)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-sm bg-[#762E42] border-2 border-[#D6B36A] text-xs font-mono font-bold text-[#F4EBDD] shadow-[0_0_15px_rgba(118,46,66,0.35),2px_2px_0px_#100D18] hover:bg-[#8E3850] cursor-pointer"
            >
              <span>Submit Project</span>
              <ArrowRight size={14} />
            </button>
          )}

          <button
            onClick={onReset}
            className="px-3 py-2 text-xs font-mono font-bold text-[#C2BDCA] hover:text-[#F4EBDD] transition-colors"
          >
            New Registration
          </button>
        </div>
      </div>
    </motion.div>
  );
};
