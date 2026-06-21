import useSEO from '@/hooks/useSEO';
import { Card } from '@/components/ui/card';
import PageHero from '@/components/PageHero';

export default function ContactPage() {
  useSEO(
    'Contact Us | 24/7 Academic Support & Helpdesk',
    'Have questions or need assistance? Reach out to Acezon support via email or phone call. Our academic advisors are available round-the-clock.'
  );

  return (
    <div className="min-h-screen">
      <PageHero title="Contact Us" subtitle="Get in touch with us. We are available 24/7." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
          
          {/* Top Row: Email and Phone Call Support */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Card */}
            <Card className="p-8 flex flex-col items-center text-center bg-[var(--color-surface-2)] shadow-sm hover:border-[var(--color-border-hover)] transition-all duration-300">
              <div className="w-16 h-16 bg-white/[0.03] border border-white/[0.08] text-[var(--color-accent-muted)] rounded-2xl flex items-center justify-center text-3xl mb-5">
                📬
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-[#f97316]">
                Email for Customers:
              </h3>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">
                support@acezon.com
              </p>
            </Card>

            {/* Call Support Card */}
            <Card className="p-8 flex flex-col items-center text-center bg-[var(--color-surface-2)] shadow-sm hover:border-[var(--color-border-hover)] transition-all duration-300">
              <div className="w-16 h-16 bg-white/[0.03] border border-white/[0.08] text-[var(--color-accent-muted)] rounded-2xl flex items-center justify-center text-3xl mb-5">
                💬
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-[#f97316]">
                Call Support:
              </h3>
              <p className="text-sm font-medium text-[var(--color-text-muted)] leading-relaxed">
                +92 300 0464321 | +44 7706 659724
              </p>
            </Card>
          </div>

          {/* Bottom Row: Address (Full Width) */}
          <Card className="p-10 flex flex-col items-center text-center bg-[var(--color-surface-2)] shadow-sm hover:border-[var(--color-border-hover)] transition-all duration-300">
            <div className="w-16 h-16 bg-white/[0.03] border border-white/[0.08] text-[var(--color-accent-muted)] rounded-2xl flex items-center justify-center text-3xl mb-5">
              📍
            </div>
            <h3 className="font-display text-xl font-bold mb-4 text-[#f97316]">
              Address:
            </h3>
            <div className="text-sm font-medium text-[var(--color-text-muted)] flex flex-col gap-2 leading-relaxed">
              <p>UK: Acezon Ltd., 124 City Road, London, England, EC1V 2NX</p>
              <p>Pakistan: 602 A, Meher Apartments, H-13 Islamabad.</p>
            </div>
          </Card>

        </div>
      </section>
    </div>
  );
}
