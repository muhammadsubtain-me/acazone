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
  const title = payload.data?.title || 'Acezon — New Order!';
  const body  = payload.data?.body  || 'A new order has been placed.';
  const url   = payload.data?.url   || '/admin';

  // MUST return the full promise chain so Chrome knows a notification was shown.
  // Without return, Chrome thinks nothing was shown and fires its own
  // "This site has been updated in the background" fallback notification.
  return self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      if (client.url.includes('/admin') && client.visibilityState === 'visible') {
        return; // tab is open & focused — no notification needed
      }
    }

    // MUST return showNotification so the promise resolves only after
    // the notification is actually shown
    return self.registration.showNotification(title, {
      body,
      icon: '/favicon-withBackground.png',
      badge: '/favicon-noBackground.png',
      tag: 'new-order',
      renotify: true,
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
