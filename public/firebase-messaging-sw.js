importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC09EqgqEC_y1wQdZXqaPv3a9eGVIUfYII",
  authDomain: "acezon.firebaseapp.com",
  projectId: "acezon",
  storageBucket: "acezon.firebasestorage.app",
  messagingSenderId: "271626695276",
  appId: "1:271626695276:web:f1b143f66553b006d5de49",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Since we now send data-only messages, payload.data carries our fields.
  // payload.notification will be undefined — FCM won't auto-show anything.
  const title = payload.data?.title || 'Acezon — New Order!';
  const body  = payload.data?.body  || 'A new order has been placed.';
  const url   = payload.data?.url   || '/admin';

  // ✅ Check if the admin tab is already open and visible — skip if so.
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      if (client.url.includes('/admin') && client.visibilityState === 'visible') {
        return; // tab is open & focused — no notification needed
      }
    }

    self.registration.showNotification(title, {
      body,
      icon: '/favicon-withBackground.png',
      badge: '/favicon-noBackground.png',
      tag: 'new-order',   // replaces any previous unread notification
      renotify: true,     // still plays sound/vibrate even on replace
      data: { url },
    });
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/admin';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/admin') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
