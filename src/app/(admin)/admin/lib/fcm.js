// ─── FCM permission helpers ───────────────────────────────────────────────────
// Tracks whether we've already asked this admin for notification permission on
// this browser. The browser popup is shown once after first login (or on the
// first dashboard visit if they were already signed in).

function promptKey(email) {
  return `acezon:fcm-prompted:${email.trim().toLowerCase()}`;
}

export function hasBeenPromptedForNotifications(email) {
  if (typeof window === 'undefined' || !email) return true;
  return localStorage.getItem(promptKey(email)) === '1';
}

export function markNotificationsPrompted(email) {
  if (typeof window === 'undefined' || !email) return;
  localStorage.setItem(promptKey(email), '1');
}

// Shows the native browser permission dialog when permission is still "default"
// and we haven't asked this admin on this device before.
export async function promptNotificationsIfFirstLogin(email) {
  if (typeof window === 'undefined' || !email) return 'unsupported';
  if (!('Notification' in window)) return 'unsupported';
  if (hasBeenPromptedForNotifications(email)) return Notification.permission;

  markNotificationsPrompted(email);

  if (Notification.permission !== 'default') return Notification.permission;

  try {
    return await Notification.requestPermission();
  } catch {
    return Notification.permission;
  }
}
