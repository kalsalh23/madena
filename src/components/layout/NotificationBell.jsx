import { useEffect, useState } from 'react';
import { Bell, BellRing, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import {
  isPushSupported,
  enablePushNotifications,
  disablePushNotifications,
  isSubscribedLocally,
} from '@/lib/pushNotifications';

export default function NotificationBell({ dark, className }) {
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toast, error } = useToast();

  useEffect(() => {
    setEnabled(isSubscribedLocally());
  }, []);

  const toggle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (enabled) {
        await disablePushNotifications();
        setEnabled(false);
        toast('تم إيقاف الإشعارات');
      } else {
        await enablePushNotifications();
        setEnabled(true);
        toast('تم تفعيل الإشعارات بنجاح ✓');
      }
    } catch (err) {
      const msg =
        err?.message ||
        'تعذر تفعيل الإشعارات — تأكد من اتصال Supabase أو أعد المحاولة';
      error(msg);
    } finally {
      setBusy(false);
    }
  };

  if (!isPushSupported()) return null;

  return (
    <button
      onClick={toggle}
      title={enabled ? 'إيقاف الإشعارات' : 'تفعيل الإشعارات'}
      aria-label={enabled ? 'إيقاف الإشعارات' : 'تفعيل الإشعارات'}
      className={cn(
        'flex items-center justify-center rounded-full p-2 transition-colors',
        dark ? 'text-cream/85 hover:bg-white/10 hover:text-white' : 'text-brand-800 hover:bg-brand-50',
        className
      )}
    >
      {busy ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : enabled ? (
        <BellRing className="h-5 w-5" />
      ) : (
        <Bell className="h-5 w-5" />
      )}
    </button>
  );
}
