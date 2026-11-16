import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, Share2, Printer, ArrowRight, Clock, Cpu } from 'lucide-react';
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
      className="tech-card bg-dark-900 p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden"
      style={{
        border: '1px solid var(--line)',
        borderTop: isPending ? '4px solid #EAB308' : '4px solid var(--lime)',
        background: 'var(--card)',
      }}
    >
      {/* Header Badge */}
      <div className="flex items-center gap-4 mb-6">
        <div
          style={{
            width: '48px',
            height: '48px',
            background: isPending ? '#EAB30815' : 'var(--bg)',
            border: isPending ? '1px solid #EAB308' : '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isPending ? '#EAB308' : 'var(--accent-text)',
          }}
        >
          {isPending ? <Clock className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
        </div>
        <div>
          <span
            className="mono"
            style={{
              color: isPending ? '#EAB308' : 'var(--accent-text)',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            {isPending
              ? 'REGISTRATION PENDING ADMIN APPROVAL'
              : isApproved
              ? 'SHOWCASING REGISTRATION APPROVED'
              : 'CONFIRMED VISITOR PASS (FREE)'}
          </span>
          <h3
            style={{
              margin: '0.2rem 0 0',
              fontFamily: 'var(--h)',
              fontSize: '1.4rem',
              color: 'var(--ink)',
            }}
          >
            {isPending ? 'Request Received' : 'Pass Reserved Successfully'}
          </h3>
        </div>
      </div>

      {/* Description Advisory */}
      <p className="mono" style={{ fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        {isPending ? (
          <span>
            Your request for <strong>Project Showcasing</strong> has been sent to the festival administrators for review. Once verified, you will receive project submission access.
          </span>
        ) : isApproved ? (
          <span style={{ color: 'var(--ink)' }}>
            Congratulations! Your registration has been approved. You can now submit your hardware or software project for Tech Gallery 2027.
          </span>
        ) : (
          <span>
            Your Visitor Pass is reserved with <strong>Free Entry</strong>. Please save your Registration ID below or open WhatsApp confirmation.
          </span>
        )}
      </p>

      {/* Pass Box Card */}
      <div
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--line)',
          padding: '1.2rem 1.4rem',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '0.8rem',
            borderBottom: '1px solid var(--line)',
            flexWrap: 'wrap',
            gap: '0.6rem',
          }}
        >
          <div>
            <span className="mono" style={{ fontSize: '0.75rem', display: 'block' }}>
              OFFICIAL REGISTRATION ID
            </span>
            <span
              style={{
                fontFamily: 'var(--h)',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--accent-text)',
                letterSpacing: '0.04em',
              }}
            >
              {registration.reg_code}
            </span>
          </div>

          <button
            onClick={handleCopyCode}
            className="chip"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem' }}
          >
            <Copy className="w-3.5 h-3.5 inline mr-1" />
            Copy ID
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.8rem 1.2rem',
            paddingTop: '0.8rem',
            fontSize: '0.88rem',
          }}
        >
          <div>
            <span className="mono" style={{ fontSize: '0.72rem', display: 'block' }}>
              PARTICIPANT NAME
            </span>
            <strong style={{ color: 'var(--ink)' }}>{registration.full_name}</strong>
          </div>

          <div>
            <span className="mono" style={{ fontSize: '0.72rem', display: 'block' }}>
              PASS TYPE &amp; COST
            </span>
            <strong style={{ color: 'var(--ink)' }}>
              {isShowcasing ? 'Project Showcasing (Free)' : 'Visitor Pass (Free)'}
            </strong>
          </div>

          <div>
            <span className="mono" style={{ fontSize: '0.72rem', display: 'block' }}>
              INSTITUTION
            </span>
            <span style={{ color: 'var(--mute)' }}>{registration.college_name}</span>
            {registration.roll_number && (
              <span className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-text)', marginTop: '0.15rem' }}>
                Roll: {registration.roll_number}
              </span>
            )}
          </div>

          <div>
            <span className="mono" style={{ fontSize: '0.72rem', display: 'block' }}>
              REGISTERED EVENT
            </span>
            <span style={{ color: 'var(--mute)' }}>{registration.event_name}</span>
          </div>

          <div>
            <span className="mono" style={{ fontSize: '0.72rem', display: 'block' }}>
              PHONE (WHATSAPP)
            </span>
            <span style={{ color: 'var(--mute)' }}>{registration.phone}</span>
          </div>

          <div>
            <span className="mono" style={{ fontSize: '0.72rem', display: 'block' }}>
              STATUS
            </span>
            <span
              style={{
                color: isPending ? '#EAB308' : 'var(--accent-text)',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {registration.status}
            </span>
          </div>
        </div>
      </div>

      {/* Prominent Action for Approved Showcasing */}
      {isApproved && onOpenSubmission && (
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => onOpenSubmission(registration)}
            className="btn fill"
            style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem' }}
          >
            <Cpu className="w-4 h-4 mr-1.5" />
            Submit Your Project Details Now →
          </button>
        </div>
      )}

      {/* Confirmation Actions Strip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.8rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* WhatsApp Direct Confirmation Button */}
          {registration.whatsapp_url && (
            <a
              href={registration.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: '#25D366',
                color: '#FFFFFF',
                borderColor: '#25D366',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
              }}
            >
              <span>📱 Open WhatsApp Confirmation</span>
            </a>
          )}

          <button
            onClick={handlePrint}
            className="chip"
            style={{ padding: '0.5rem 1rem' }}
          >
            <Printer className="w-3.5 h-3.5 inline mr-1" />
            Print Pass
          </button>
        </div>

        <button
          onClick={onReset}
          className="btn"
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          <span>Register another</span>
          <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
        </button>
      </div>
    </motion.div>
  );
};
