import '@fontsource-variable/google-sans-flex';
import './globals.css';
import SiteLayout from '@/components/SiteLayout';

export const metadata = {
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
    canonical: 'https://www.acezon.app',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
