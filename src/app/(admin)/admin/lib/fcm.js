// ─── FCM permission helpers ───────────────────────────────────────────────────
// Prompting is driven by the browser's Notification.permission state — not a
// permanent localStorage flag. That way if an admin revokes permission or their
// token is deleted, the popup can appear again once permission is back to
// "default". When permission is "denied", the browser blocks the dialog anyway.

const SESSION_PROMPT_KEY = 'acezon:fcm-prompted-session';

export function markFcmPromptHandledThisSession() {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SESSION_PROMPT_KEY, '1');
}

export function wasFcmPromptHandledThisSession() {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_PROMPT_KEY) === '1';
}

export async function requestNotificationPermission() {
  if (typeof window === 'undefined') return 'unsupported';
  if (!('Notification' in window)) return 'unsupported';

  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';

  try {
    return await Notification.requestPermission();
  } catch {
    return Notification.permission;
  }
}
