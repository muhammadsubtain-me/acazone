import { Card } from '@/components/ui/card';
import PageHero from '@/components/layout/PageHero';
import Container from '@/components/layout/Container';
import { contactMethods } from '@/lib/data';
import { grids, sections } from '@/lib/responsive';

export const metadata = {
  title: 'Contact Us | 24/7 Academic Support & Helpdesk',
  description:
    'Have questions or need assistance? Reach out to Acezon support via email or phone call. Our academic advisors are available round-the-clock.',
};

export default function ContactPage() {
  const [emailMethod, phoneMethod, addressMethod] = contactMethods;

  return (
    <div className="min-h-screen">
      <PageHero title="Contact Us" subtitle="Get in touch with us. We are available 24/7." />
      <section className={`${sections.compact} bg-[var(--color-bg)]`}>
        <Container variant="medium" className={`flex flex-col ${grids.gap}`}>

          <div className={`${grids.cards2} ${grids.gap}`}>
            {[emailMethod, phoneMethod].map((method) => (
              <Card key={method.id} className="p-6 sm:p-8 flex flex-col items-center text-center bg-[var(--color-surface-2)] shadow-sm hover:border-[var(--color-border-hover)] transition-all duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center mb-4 sm:mb-5 text-2xl sm:text-3xl">
                  {method.icon}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[var(--color-text-heading)]">
                  {method.title}
                </h3>
                <p className="text-sm font-medium text-[var(--color-text-muted)] leading-relaxed">
                  {method.value}
                </p>
              </Card>
            ))}
          </div>

          <Card className="p-8 sm:p-10 flex flex-col items-center text-center bg-[var(--color-surface-2)] shadow-sm hover:border-[var(--color-border-hover)] transition-all duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center mb-4 sm:mb-5 text-2xl sm:text-3xl">
              {addressMethod.icon}
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[var(--color-text-heading)]">
              {addressMethod.title}
            </h3>
            <div className="text-sm font-medium text-[var(--color-text-muted)] flex flex-col gap-2 leading-relaxed">
              <p>{addressMethod.value}</p>
            </div>
          </Card>

        </Container>
      </section>
    </div>
  );
}
