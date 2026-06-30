import '@fontsource-variable/google-sans-flex';
import './globals.css';
import { siteInfo } from '@/lib/data';

export const metadata = {
  metadataBase: new URL(siteInfo.url),
  title: {
    default: 'Acezon | Professional Academic Assistance & Tutoring',
    template: '%s | Acezon',
  },
  description:
    'Acezon provides expert, round-the-clock academic assistance, subject tutoring, solved assignment samples, and technical report writing services across engineering and computer science fields.',
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    canonical: siteInfo.url,
  },
  // ─── Open Graph (Facebook, LinkedIn, WhatsApp previews) ──────────────────────
  openGraph: {
    title: 'Acezon | Professional Academic Assistance & Tutoring',
    description:
      'Expert academic assistance available 24/7. Homework, assignments, lab reports, coding help, and more — across Mechanical, Electrical, Chemical Engineering, and Computer Science.',
    url: siteInfo.url,
    siteName: 'Acezon',
    type: 'website',
    locale: 'en_US',
  },
  // ─── Twitter / X Card ────────────────────────────────────────────────────────
  twitter: {
    card: 'summary',
    title: 'Acezon | Professional Academic Assistance & Tutoring',
    description:
      'Expert academic assistance available 24/7. Homework, assignments, lab reports, coding help, and more.',
    site: '@acezon',
  },
  // ─── Crawler directives ───────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
