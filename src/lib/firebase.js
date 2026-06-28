import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyC09EqgqEC_y1wQdZXqaPv3a9eGVIUfYII",
  authDomain: "acezon.firebaseapp.com",
  projectId: "acezon",
  storageBucket: "acezon.firebasestorage.app",
  messagingSenderId: "271626695276",
  appId: "1:271626695276:web:f1b143f66553b006d5de49",
  measurementId: "G-2FWFSNFG0Z"
};

// Prevent duplicate app initialization in Next.js hot reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { app };

// getMessaging must only run in the browser
export function getFirebaseMessaging() {
  if (typeof window === 'undefined') return null;
  return getMessaging(app);
}

export { getToken, onMessage };
