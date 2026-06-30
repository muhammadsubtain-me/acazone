'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import Container from '@/components/layout/Container';
import { stats } from '@/lib/data';
import { grids, sections, typography } from '@/lib/responsive';

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, 16);

        return () => clearInterval(timer);
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={containerRef}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className={`${sections.default} bg-[var(--color-surface)] relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:30px_30px]" />
      <Container className="relative">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <h2 className={`${typography.sectionTitle} mb-2 sm:mb-3`}>
            Our Track Record of Student Success
          </h2>
          <p className={typography.body}>Numbers that speak to our commitment and excellence</p>
        </div>
        <div className={`${grids.cards4} ${grids.gap}`}>
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="p-5 sm:p-6 text-center bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-3)]"
            >
              <div className="text-2xl sm:text-[28px] mb-2">{stat.icon}</div>
              <div className="font-display text-3xl sm:text-4xl font-bold mb-1 text-[var(--color-text-heading)]">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[var(--color-text-muted)] text-xs sm:text-[13px] font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
