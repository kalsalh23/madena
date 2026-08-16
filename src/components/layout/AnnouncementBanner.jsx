import { useQuery } from '@tanstack/react-query';
import { X, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '@/services';

const DISMISS_KEY = 'announcement-dismissed-id';

export default function AnnouncementBanner() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: latest } = useQuery({
    queryKey: ['announcements', 'latest'],
    queryFn: () =>
      api
        .list('announcements', { filters: { is_active: true }, order: 'created_at', orderAsc: false, perPage: 1, page: 1 })
        .then((r) => r.data[0] || null),
  });

  // إظهار البانر فوق الشريط مباشرة مهما كانت الصفحة
  const dismissedId = localStorage.getItem(DISMISS_KEY);
  if (!latest || latest.id === dismissedId) return null;

  const isExternal = latest.url?.startsWith('http');
  const go = () => {
    if (isExternal) {
      window.open(latest.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(latest.url && latest.url !== '/' ? latest.url : '/');
    }
  };

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        onClick={go}
        className="group relative z-[60] block w-full cursor-pointer bg-gold-500 px-4 py-2.5 text-right text-brand-950 transition-colors hover:bg-gold-400"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm font-bold sm:text-base">
            <Megaphone className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            {latest.title}
          </span>
          <span className="hidden text-xs font-semibold opacity-80 sm:block">{latest.body}</span>
          <span className="shrink-0 rounded-lg bg-brand-950 px-3 py-1 text-xs font-bold text-gold-400 group-hover:bg-brand-900">
            المزيد
          </span>
        </div>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            localStorage.setItem(DISMISS_KEY, latest.id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              localStorage.setItem(DISMISS_KEY, latest.id);
            }
          }}
          className="absolute left-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-brand-950/70 transition-colors hover:bg-brand-950/10 hover:text-brand-950"
          aria-label="إغلاق الإشعار"
        >
          <X className="h-4 w-4" />
        </span>
      </motion.button>
    </AnimatePresence>
  );
}