import { createContext, useContext, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

const icons = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  error: <AlertCircle className="h-5 w-5 text-wine-600" />,
  info: <Info className="h-5 w-5 text-brand-700" />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const error = useCallback((err) => {
    const msg = err?.message || 'حدث خطأ غير متوقع';
    toast(msg, 'error');
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, error }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[2000] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="pointer-events-auto flex items-center gap-3 rounded-xl2 border border-[#E5E7EB] bg-white px-4 py-3 shadow-lift"
            >
              {icons[t.type] || icons.info}
              <p className="text-sm font-semibold text-ink-900">{t.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
