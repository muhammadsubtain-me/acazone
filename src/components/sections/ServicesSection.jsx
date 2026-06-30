import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Container from '@/components/layout/Container';
import { services } from '@/lib/data';
import { grids, sections, typography } from '@/lib/responsive';

export default function ServicesSection() {
  const homeServices = services.slice(0, 6);

  return (
    <section className={`${sections.default} bg-[var(--color-section-alt)]`}>
      <Container>
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
          <Badge className="mb-3 sm:mb-4">What We Offer</Badge>
          <h2 className={`${typography.sectionTitle} mb-3 sm:mb-4`}>
            Our Popular Services
          </h2>
          <p className={typography.bodyCenter}>
            From essays to dissertations, coding to lab reports — Acezon covers every academic need with expert precision.
          </p>
        </div>

        <div className={`${grids.cards3} ${grids.gap}`}>
          {homeServices.map((service) => (
            <div key={service.id} className="block">
              <Card className="p-5 sm:p-6 h-full hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] transition-all duration-300 shadow-sm flex flex-col justify-center items-center text-center">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-[13px] sm:text-[14px] leading-snug text-[var(--color-text-heading)] font-semibold">
                  {service.name}
                </CardTitle>
              </Card>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/services" className="inline-flex items-center gap-2">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
