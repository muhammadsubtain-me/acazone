import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { layout } from '@/lib/responsive';

export default function SiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-1 ${layout.mainOffset}`}>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
