import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import PageHero from '@/components/layout/PageHero';
import Container from '@/components/layout/Container';
import { domains, services } from '@/lib/data';
import { grids, sections, typography } from '@/lib/responsive';

export const metadata = {
  title: 'Academic Tutoring & Technical Writing Services',
  description:
    "Explore Acezon's custom academic solutions, including homework writing, subject tutoring, programming help, lab tasks, semester projects, and thesis writing.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="Our Services"
        subtitle={
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <p className={`${typography.body} font-medium`}>
              Expert academic help, delivered on time.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[var(--color-text-muted)]">
              {domains.map((domain, i) => (
                <span key={domain.id} className="flex items-center gap-2">
                  <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full flex items-center gap-1.5 shadow-sm">
                    {domain.icon} {domain.shortName}
                  </span>
                  {i < domains.length - 1 && (
                    <span className="text-white/20 select-none hidden md:inline">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        }
      />

      <section className={`${sections.default} bg-[var(--color-bg)]`}>
        <Container>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 ${grids.gap}`}>
            {services.map((service) => (
              <Card
                key={service.id}
                className="p-5 sm:p-6 h-full hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] transition-all duration-300 shadow-sm border border-white/[0.06] bg-white/[0.01]"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5">
                  {service.icon}
                </div>
                <CardTitle className="text-sm sm:text-base mb-2 sm:mb-3 leading-snug text-[var(--color-text-heading)]">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                  {service.desc}
                </CardDescription>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
