import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, Printer, ArrowRight, Clock, Cpu } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 sm:p-8 max-w-2xl mx-auto relative rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[8px_8px_0px_#202020] text-[#202020]"
    >
      {/* Washi Tape Accent */}
      <div
        className="paper-tape"
        style={{
          top: '-12px',
          left: '20%',
          width: '75px',
          transform: 'rotate(-3deg)',
        }}
      />

      {/* Header Badge */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-sm bg-[#FAF8F3] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] flex items-center justify-center text-[#3155E7]">
          {isPending ? <Clock className="w-6 h-6 text-[#FF7139]" /> : <CheckCircle2 className="w-6 h-6 text-[#3155E7]" />}
        </div>
        <div>
          <span className="font-mono font-bold text-xs tracking-wider text-[#3155E7] uppercase block">
            {isPending
              ? 'REGISTRATION PENDING ADMIN APPROVAL'
              : isApproved
              ? 'SHOWCASING REGISTRATION APPROVED'
              : 'CONFIRMED VISITOR PASS (100% FREE)'}
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#202020]">
            {isPending ? 'Request Received' : 'Festival Pass Reserved'}
          </h3>
        </div>
      </div>

      {/* Description Advisory */}
      <p className="font-mono text-xs text-[#5F5B52] mb-6 leading-relaxed font-medium">
        {isPending ? (
          <span>
            Your request for <strong className="text-[#202020]">Project Showcasing</strong> has been sent to the festival administrators for review. Once verified, you will receive project submission access.
          </span>
        ) : isApproved ? (
          <span className="text-[#202020] font-bold">
            Congratulations! Your registration has been approved. You can now submit your hardware or software project for Tech Gallery 2027.
          </span>
        ) : (
          <span>
            Your Visitor Pass is reserved with <strong className="text-[#202020]">Free Entry</strong>. Please save your Registration ID below or open WhatsApp confirmation.
          </span>
        )}
      </p>

      {/* Pass Box Card: Perforated Ticket Aesthetics */}
      <div className="bg-[#FAF8F3] border-2 border-[#202020] p-5 sm:p-6 mb-6 rounded-sm shadow-[3.5px_3.5px_0px_#202020]">
        <div className="flex justify-between items-center pb-4 border-b-2 border-dashed border-[#202020]/25 flex-wrap gap-3">
          <div>
            <span className="font-mono text-[10px] text-[#625E56] font-bold tracking-widest uppercase block">
              OFFICIAL REGISTRATION ID
            </span>
            <span className="font-display text-2xl sm:text-3xl font-black text-[#3155E7] tracking-wider">
              {registration.reg_code}
            </span>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-sm font-mono text-xs font-bold bg-[#FFFFFF] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] text-[#202020] hover:bg-[#FAF8F2] flex items-center gap-1.5 transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy ID</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono">
          <div>
            <span className="text-[10px] text-[#625E56] font-bold uppercase block">
              PARTICIPANT NAME
            </span>
            <strong className="text-[#202020] font-bold text-sm">{registration.full_name}</strong>
          </div>

          <div>
            <span className="text-[10px] text-[#625E56] font-bold uppercase block">
              PASS TYPE &amp; COST
            </span>
            <strong className="text-[#3155E7] font-bold text-sm">
              {isShowcasing ? 'Project Showcasing (Free)' : 'Visitor Pass (Free)'}
            </strong>
          </div>

          <div>
            <span className="text-[10px] text-[#625E56] font-bold uppercase block">
              INSTITUTION
            </span>
            <span className="text-[#202020] font-bold">{registration.college_name}</span>
            {registration.roll_number && (
              <span className="block text-[11px] text-[#FF7139] font-bold mt-0.5">
                Roll: {registration.roll_number}
              </span>
            )}
          </div>

          <div>
            <span className="text-[10px] text-[#625E56] font-bold uppercase block">
              REGISTERED EVENT
            </span>
            <span className="text-[#202020] font-bold">{registration.event_name}</span>
          </div>

          <div>
            <span className="text-[10px] text-[#625E56] font-bold uppercase block">
              PHONE (WHATSAPP)
            </span>
            <span className="text-[#202020] font-bold">{registration.phone}</span>
          </div>

          <div>
            <span className="text-[10px] text-[#625E56] font-bold uppercase block">
              STATUS
            </span>
            <span
              className={`font-black uppercase ${
                isPending ? 'text-[#FF7139]' : 'text-[#3155E7]'
              }`}
            >
              {registration.status}
            </span>
          </div>
        </div>
      </div>

      {/* Action for Approved Showcasing */}
      {isApproved && onOpenSubmission && (
        <div className="mb-6">
          <button
            onClick={() => onOpenSubmission(registration)}
            className="w-full justify-center p-4 text-sm font-mono font-bold text-white bg-[#3155E7] border-2 border-[#202020] shadow-[4px_4px_0px_#202020] hover:shadow-[5.5px_5.5px_0px_#202020] hover:-translate-y-0.5 transition-all flex items-center gap-2 rounded-sm"
          >
            <Cpu className="w-4 h-4 mr-1.5" />
            Submit Your Project Details Now →
          </button>
        </div>
      )}

      {/* Confirmation Actions Strip */}
      <div className="flex justify-between items-center flex-wrap gap-4 pt-4 border-t-2 border-dashed border-[#202020]/25">
        <div className="flex gap-3 flex-wrap">
          {/* WhatsApp Direct Confirmation Button */}
          {registration.whatsapp_url && (
            <a
              href={registration.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-mono font-bold text-xs text-white bg-[#25D366] border-2 border-[#202020] shadow-[2.5px_2.5px_0px_#202020] hover:shadow-[3.5px_3.5px_0px_#202020] transition-all"
            >
              <span>📱 Open WhatsApp Pass</span>
            </a>
          )}

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-sm font-mono font-bold text-xs text-[#202020] bg-[#FFFFFF] border-2 border-[#202020] shadow-[2.5px_2.5px_0px_#202020] hover:shadow-[3.5px_3.5px_0px_#202020] transition-all flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>
        </div>

        <button
          onClick={onReset}
          className="px-4 py-2 rounded-sm font-mono font-bold text-xs text-[#202020] bg-[#FFD85A] border-2 border-[#202020] shadow-[2.5px_2.5px_0px_#202020] hover:shadow-[3.5px_3.5px_0px_#202020] transition-all flex items-center gap-1.5"
        >
          <span>Register Another</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
