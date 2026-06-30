import Container from '@/components/layout/Container';
import { typography } from '@/lib/responsive';

export default function PageHero({ title, subtitle }) {
  return (
    <section className="-mt-14 sm:-mt-16 pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16 md:pb-20 lg:pb-24 bg-[var(--color-surface)] text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:30px_30px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(600px,90vw)] h-[200px] sm:h-[300px] rounded-full blur-[80px] sm:blur-[100px] pointer-events-none bg-[radial-gradient(ellipse,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
      <Container variant="narrow" className="relative flex flex-col items-center gap-3 sm:gap-4">
        <h1 className={typography.pageTitle}>
          {title}
        </h1>
        {typeof subtitle === 'string' ? (
          <p className={typography.body}>{subtitle}</p>
        ) : (
          subtitle
        )}
      </Container>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-border)]" />
    </section>
  );
}
