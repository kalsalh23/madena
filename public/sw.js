/* Service Worker — إشعارات الدفع لبوابة المدينة */

// قيم عامة بطبيعتها (المفتاح العام VAPID + مفتاح anon) لإعادة الاشتراك الذاتي
const VAPID_PUBLIC_KEY =
  'BJZJ59AsouCy6zq2L8h-BGYRSTeQqTgiL5MHCWTfMngVHWz8pHL8j83bOwuJwKvuxD6SR9XnQ-A-vZTX6h51UWk';
const SUPABASE_URL = 'https://jnzvvishbzzuuvdpewjy.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuenp2dmlzaGJ6enV1dmRwZXdqeSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzg1NjExNzQ1LCJleHAiOjIxMDExODc3NDV9.cQ-vGdzAyDzsFn8IpfArAvNiu2t-WFEdmt054hqEoy8';

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {};
  }

  const title = data.title || "بوابة المدينة";
  const options = {
    body: data.body || "",
    icon: "/logo.png",
    badge: "/badge.png",
    image: data.image || undefined,
    data: { url: data.url || "/" },
    vibrate: [200, 100, 200],
    renotify: true,
    tag: data.tag || "madena-notify",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const raw = event.notification.data?.url || "/";
  // تحويل الرابط إلى رابط مطلق يعمل خارج الموقع (نسبي أو خارجي)
  let target;
  try {
    target = new URL(raw, self.location.origin).href;
  } catch {
    target = self.location.origin + raw;
  }

  event.waitUntil(
    (async () => {
      const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of all) {
        if (client.url && new URL(client.url).origin === new URL(target).origin) {
          await client.navigate(target);
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(target);
      }
    })()
  );
});

/* إعادة الاشتراك تلقائياً عندما يجدّد المتصفح الاشتراك أو يبطل القديم
   — هذا ما يمنع توقف الإشعارات بعد أيام من التفعيل */
self.addEventListener("pushsubscriptionchange", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const oldEndpoint = event.oldSubscription?.endpoint;
        const sub = await self.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
        const { endpoint, keys } = sub.toJSON();
        if (!keys?.p256dh || !keys?.auth) return;

        // حفظ الاشتراك الجديد (يستبدل القديم بنفس endpoint أو يضيفه)
        await fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates",
          },
          body: JSON.stringify({
            endpoint,
            p256dh: keys.p256dh,
            auth: keys.auth,
            user_agent: navigator.userAgent,
            last_seen_at: new Date().toISOString(),
          }),
        });

        // حذف سجل الاشتراك القديم إن اختلف endpoint
        if (oldEndpoint && oldEndpoint !== endpoint) {
          await fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(oldEndpoint)}`, {
            method: "DELETE",
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          });
        }
      } catch {
        /* فشل صامت — سيتعافى عند الزيارة القادمة عبر المزامنة */
      }
    })()
  );
});

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
