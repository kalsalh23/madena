/* Service Worker — إشعارات الدفع لبوابة المدينة */
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
    icon: "/logo.jpg",
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
