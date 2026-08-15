import { supabase } from '@/lib/supabase';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

/* إرسال إشعار للمواطنين عبر Edge Function */
export async function sendPushNotification({ title, body = '', url = '/' }) {
  return supabase.functions.invoke('send-push', { body: { title, body, url } });
}

export const isPushSupported = () =>
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  'PushManager' in window &&
  Boolean(VAPID_PUBLIC_KEY);

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return null;
  const reg = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;
  return reg;
}

/* قراءة حالة الاشتراك المخزّنة محلياً */
export function isSubscribedLocally() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('push-enabled') === 'true';
}

/* إجراء الاشتراك الكامل: إذن + اشتراك + حفظ في Supabase */
export async function enablePushNotifications() {
  if (!isPushSupported()) {
    throw new Error('الإشعارات غير مدعومة في هذا المتصفح');
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('لم يتم منح إذن الإشعارات');
  }

  const reg = await registerServiceWorker();
  if (!reg) throw new Error('تعذر تسجيل عامل الخدمة');

  // إزالة اشتراك قديم قبل إنشاء جديد
  const existing = await reg.pushManager.getSubscription();
  if (existing) await existing.unsubscribe();

  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  const { endpoint, keys } = subscription.toJSON();
  const { error } = await supabase.from('push_subscriptions').upsert(
    {
      endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
      user_agent: navigator.userAgent,
      last_seen_at: new Date().toISOString(),
    },
    { onConflict: 'endpoint' }
  );

  if (error) throw error;
  localStorage.setItem('push-enabled', 'true');
  return true;
}

/* إلغاء الاشتراك */
export async function disablePushNotifications() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const reg = await navigator.serviceWorker.getRegistration('/sw.js');
    const sub = reg ? await reg.pushManager.getSubscription() : null;
    if (sub) {
      const { endpoint } = sub.toJSON();
      await sub.unsubscribe();
      // حذف من قاعدة البيانات
      await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint);
    }
  }
  localStorage.removeItem('push-enabled');
}

/* إعادة تفعيل تلقائي عند فتح الموقع إن كان مفعّلاً سابقاً */
export async function syncPushSubscription() {
  if (!isPushSupported() || !isSubscribedLocally()) return;
  try {
    const reg = await navigator.serviceWorker.getRegistration('/sw.js');
    if (!reg) return;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) {
      const { error } = await enablePushNotifications();
      if (error) throw error;
    }
  } catch {
    /* تجاهل — الموقع الجديد قد يتطلب إذناً مجدداً */
  }
}

/* تحويل مفتاح VAPID base64url إلى Uint8Array */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
