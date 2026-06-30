'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
  getFirebaseMessaging,
  getToken,
  onMessage,
  isMessagingSupported,
} from '@/lib/firebase';

const VAPID_KEY = process.env.NEXT_PUBLIC_FCM_VAPID_KEY;

// Manages the FCM lifecycle for the admin dashboard: service-worker
// registration, token persistence, and notification permission.
//
// Permission is NEVER requested automatically on mount — browsers auto-block a
// site that prompts repeatedly. Instead the dashboard surfaces an explicit
// "Enable notifications" control that calls `enableNotifications()` from a real
// user gesture. If permission was already granted previously, the token is
// re-registered silently.
//
// Returns:
//   permission           — 'default' | 'granted' | 'denied' | 'unsupported'
//   enableNotifications  — request permission + register (call from a click)
export function useFcmNotifications(userEmail) {
  const [permission, setPermission] = useState('default');

  // Register the SW, mint a token, and upsert it so the notify-new-order edge
  // function can push to this device. Safe to call repeatedly (idempotent upsert).
  const registerToken = useCallback(async () => {
    const supported = await isMessagingSupported();
    const messaging = supported ? getFirebaseMessaging() : null;
    if (!messaging) {
      setPermission('unsupported');
      return;
    }

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    if (!token) return;

    await supabase.from('fcm_tokens').upsert(
      { user_email: userEmail, token, updated_at: new Date().toISOString() },
      { onConflict: 'user_email' }
    );

    // New orders are already reflected in-app via Supabase realtime, so
    // foreground messages are intentionally ignored to avoid duplicates.
    onMessage(messaging, () => {});
  }, [userEmail]);

  // On mount, reflect the current permission and silently re-register if the
  // user had already granted it. No prompt is shown here.
  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPermission('unsupported');
      return;
    }
    setPermission(Notification.permission);
    if (Notification.permission === 'granted') {
      registerToken().catch((err) => console.error('[FCM] Registration error:', err));
    }
  }, [registerToken]);

  // Triggered by a user gesture (button click).
  const enableNotifications = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPermission('unsupported');
      return;
    }
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') await registerToken();
    } catch (err) {
      console.error('[FCM] Enable error:', err);
    }
  }, [registerToken]);

  return { permission, enableNotifications };
}
