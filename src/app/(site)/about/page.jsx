import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import PageHero from '@/components/layout/PageHero';
import Container from '@/components/layout/Container';
import { aboutStory, aboutValues, founders } from '@/lib/data';
import { grids, sections, typography } from '@/lib/responsive';

export const metadata = {
  title: 'About Acezon | Verified Tutors & Academic Advisers',
  description:
    "Meet Acezon's expert academic tutoring team. Discover our mission, student-first values, and quality assurance workflows across major technical disciplines.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="About Acezon" subtitle="Your trusted academic partner, built on expertise and integrity." />

      <section className={`${sections.compact} bg-[var(--color-bg)]`}>
        <Container className={`${grids.split} ${grids.gap} items-center`}>
          <div>
            <Badge className="mb-4 sm:mb-5">Our Story</Badge>
            <h2 className={`${typography.subsectionTitle} mb-4 sm:mb-5`}>Who We Are</h2>
            {aboutStory.map((p) => (
              <p key={p} className={`${typography.body} mb-3 sm:mb-4 last:mb-0`}>{p}</p>
            ))}
          </div>
          <div className={`${grids.cards2} ${grids.gap}`}>
            {aboutValues.map((item) => (
              <Card key={item.title} className="p-4 sm:p-5">
                <div className="w-10 h-10 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center mb-3 text-xl">
                  {item.icon}
                </div>
                <CardTitle className="mb-2">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className={`${sections.compact} bg-[var(--color-section-alt)]`}>
        <Container className="text-center">
          <Badge className="mb-4 sm:mb-5">Our Founders</Badge>
          <h2 className={`${typography.subsectionTitle} mb-2 sm:mb-3`}>Meet the Team Behind Acezon</h2>
          <p className={`${typography.bodyCenter} mb-8 sm:mb-10 lg:mb-12`}>
            Our founding team brings together verified expertise from one of Pakistan's most prestigious institutions.
          </p>
          <div className={`${grids.cards3} ${grids.gap}`}>
            {founders.map((member) => (
                <Card key={member.degree} className="p-6 sm:p-8 flex flex-col items-center text-center gap-4 hover:border-[var(--color-border-hover)] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
                    {member.icon}
                  </div>

                  <div className="font-bold text-base sm:text-lg text-[var(--color-text-heading)] leading-snug">{member.degree}</div>

                  <div className="w-full h-px bg-[var(--color-border)]" />

                  <div className="flex flex-col gap-1.5 text-sm text-[var(--color-text-muted)]">
                    <div><span className="text-[var(--color-text)]">{member.specialization}</span></div>
                    <div>{member.experience}</div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mt-1">
                    {member.tags.map(tag => (
                      <span key={tag} className="text-[11px] bg-[var(--color-surface-3)] border border-[var(--color-border)] px-2.5 py-1 rounded-lg text-[var(--color-text-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
