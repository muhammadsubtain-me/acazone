'use client';

import { Suspense } from 'react';
import PageHero from '@/components/layout/PageHero';
import Container from '@/components/layout/Container';
import OrderForm from './OrderForm';
import { sections } from '@/lib/responsive';

export default function OrderClient() {
  return (
    <div className="min-h-screen">
      <PageHero title="Hire Expert" subtitle="Submit your requirements below and get a free quote within 15 minutes." />
      <section className={`${sections.compact} bg-[var(--color-bg)]`}>
        <Container variant="narrow">
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-[var(--color-text-muted)]">Loading form...</div>}>
            <OrderForm />
          </Suspense>
        </Container>
      </section>
    </div>
  );
}
