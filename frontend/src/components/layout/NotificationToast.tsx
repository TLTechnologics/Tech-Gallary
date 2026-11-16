import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useNotification, NotificationType } from '../../context/NotificationContext';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-brand-lime flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-brand-blue flex-shrink-0" />;
    }
  };

  const getBorderColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'border-brand-lime/40 bg-dark-900/95';
      case 'warning':
        return 'border-amber-400/40 bg-dark-900/95';
      case 'error':
        return 'border-rose-500/40 bg-dark-900/95';
      default:
        return 'border-brand-blue/40 bg-dark-900/95';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto border p-4 shadow-2xl backdrop-blur-md flex items-start justify-between gap-3 ${getBorderColor(n.type)}`}
          >
            <div className="flex items-start gap-3">
              {getIcon(n.type)}
              <div>
                <p className="text-sm font-semibold text-neutral-100 font-mono tracking-wide">{n.title}</p>
                {n.message && <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{n.message}</p>}
              </div>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-neutral-400 hover:text-white p-0.5 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

