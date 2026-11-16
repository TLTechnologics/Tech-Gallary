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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative max-w-md w-full bg-dark-900 border border-neutral-700 p-6 sm:p-8 shadow-2xl text-neutral-100"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 border border-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-brand-lime/10 border border-brand-lime/40 text-brand-lime">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-lime block">
                AUTHENTICATED ACCESS
              </span>
              <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                ADMIN PORTAL LOGIN
              </h3>
            </div>
          </div>

          <p className="text-xs font-mono text-neutral-400 mb-6 leading-relaxed">
            Restricted to Tech Gallery 2027 faculty committee, technical juries, and festival chairs.
          </p>

          {error && (
            <div className="p-3 mb-4 bg-rose-500/10 border-l-2 border-rose-500 text-xs font-mono text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-850 border border-neutral-700 pl-10 pr-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-850 border border-neutral-700 pl-10 pr-3.5 py-2.5 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-dark-850 border border-neutral-800 text-[11px] font-mono text-neutral-400">
              <span className="text-brand-lime block mb-0.5">Quick Demo Credentials:</span>
              Email: <code>admin@techgallery2027.edu</code> | Pass: <code>admintech2027</code>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full text-xs py-3 flex items-center justify-center gap-2"
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

