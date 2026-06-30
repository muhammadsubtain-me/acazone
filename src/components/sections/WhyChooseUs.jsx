import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Container from '@/components/layout/Container';
import { features, whyChooseUsCopy } from '@/lib/data';
import { grids, sections, typography } from '@/lib/responsive';

export default function WhyChooseUs() {
  return (
    <section className={`${sections.default} bg-[var(--color-bg)]`}>
      <Container>
        <div className={`${grids.split} ${grids.gap} items-center`}>
          <div>
            <Badge className="mb-4 sm:mb-5">Why Choose Us</Badge>
            <h2 className={`${typography.sectionTitle} mb-4 sm:mb-5`}>
              Acezon –{' '}
              <span className="text-[var(--color-accent-muted)]">Place of Experts</span>
            </h2>
            {whyChooseUsCopy.map((para, i) => (
              <p key={i} className={`${typography.body} mb-4 sm:mb-5 last:mb-6 sm:last:mb-8`}>{para}</p>
            ))}
            <Button asChild>
              <Link href="/about" className="inline-flex items-center gap-2">
                About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className={`${grids.cards2} ${grids.gap}`}>
            {features.map((f) => (
              <Card key={f.title} className="p-4 sm:p-5 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)]">
                <div className="w-10 h-10 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center text-xl mb-3">
                  {f.icon}
                </div>
                <CardTitle className="text-[13px] mb-1.5">{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
