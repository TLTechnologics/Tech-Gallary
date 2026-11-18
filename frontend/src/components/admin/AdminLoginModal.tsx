import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { login, isLoading } = useAuth();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('admin@techgallery2027.edu');
  const [password, setPassword] = useState('admintech2027');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      showNotification('success', 'Authenticated', 'Welcome to Tech Gallery Admin Control Center.');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid administrator credentials');
      showNotification('error', 'Login Failed', err.message || 'Invalid credentials');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202020]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative max-w-md w-full bg-[#FFFFFF] border-2 border-[#202020] p-6 sm:p-8 shadow-[8px_8px_0px_#202020] rounded-sm text-[#202020]"
        >
          {/* Washi Tape */}
          <div
            className="paper-tape"
            style={{
              top: '-12px',
              left: '15%',
              width: '60px',
              transform: 'rotate(-4deg)',
            }}
          />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#202020] hover:text-[#E94B50] p-1.5 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] shadow-[1.5px_1.5px_0px_#202020] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#FAF8F3] border-2 border-[#202020] text-[#3155E7] rounded-sm shadow-[2px_2px_0px_#202020]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#3155E7] font-bold block">
                AUTHENTICATED ACCESS
              </span>
              <h3 className="font-display font-black text-xl text-[#202020] uppercase tracking-tight">
                ADMIN PORTAL LOGIN
              </h3>
            </div>
          </div>

          <p className="text-xs font-mono text-[#5F5B52] mb-6 leading-relaxed font-medium">
            Restricted to Tech Gallery 2027 faculty committee, technical juries, and festival chairs.
          </p>

          {error && (
            <div className="p-3 mb-4 bg-[#FFECEC] border-2 border-[#202020] text-xs font-mono font-bold text-[#E94B50] flex items-center gap-2 shadow-[2px_2px_0px_#202020]">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-[#202020] mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#625E56] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FFFFFF] border-2 border-[#202020] pl-10 pr-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none rounded-sm shadow-[2px_2px_0px_#202020]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-bold text-[#202020] mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#625E56] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FFFFFF] border-2 border-[#202020] pl-10 pr-3.5 py-2.5 text-xs text-[#202020] font-mono focus:border-[#3155E7] focus:outline-none rounded-sm shadow-[2px_2px_0px_#202020]"
                />
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F3] border-2 border-[#202020] text-[11px] font-mono text-[#5F5B52] rounded-sm shadow-[2px_2px_0px_#202020]">
              <span className="text-[#3155E7] font-bold block mb-0.5">Quick Demo Credentials:</span>
              Email: <code>admin@techgallery2027.edu</code> | Pass: <code>admintech2027</code>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-sm font-mono font-bold text-xs text-white bg-[#3155E7] border-2 border-[#202020] shadow-[3.5px_3.5px_0px_#202020] hover:shadow-[5px_5px_0px_#202020] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Verifying Access...' : 'Authenticate & Enter'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
