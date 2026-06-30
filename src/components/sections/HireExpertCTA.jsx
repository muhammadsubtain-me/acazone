import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Container from '@/components/layout/Container';
import { hireExpertBenefits, hireExpertCopy } from '@/lib/data';
import { grids, sections, typography } from '@/lib/responsive';

export default function HireExpertCTA() {
  return (
    <section className={`${sections.default} bg-[var(--color-surface)] relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:30px_30px]" />
      <Container className="relative">
        <div className={`${grids.split} ${grids.gap} items-center`}>
          <div>
            <Badge className="mb-4 sm:mb-5">Get Started Today</Badge>
            <h2 className={`${typography.sectionTitle} mb-4 sm:mb-5`}>
              Hire an Expert Right Now
            </h2>
            {hireExpertCopy.map((para, i) => (
              <p key={i} className={`${typography.body} mb-4 sm:mb-5 last:mb-6 sm:last:mb-8`}>{para}</p>
            ))}
            <Button asChild>
              <Link href="/order" className="inline-flex items-center gap-2">
                Hire Expert Now <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className={`${grids.cards2} ${grids.gap}`}>
            {hireExpertBenefits.map((item) => (
              <Card key={item.title} className="p-4 sm:p-5 bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-3)]">
                <div className="w-10 h-10 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center mb-3 text-xl">
                  {item.icon}
                </div>
                <CardTitle className="text-[13px] mb-1.5">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
