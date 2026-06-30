'use client';

import { Suspense } from 'react';
import PageHero from '@/components/layout/PageHero';
import OrderForm from './OrderForm';

export default function OrderClient() {
  return (
    <div className="min-h-screen">
      <PageHero title="Hire Expert" subtitle="Submit your requirements below and get a free quote within 15 minutes." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-3xl xl:max-w-4xl 3xl:max-w-5xl mx-auto px-4 md:px-6 xl:px-8">
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-[var(--color-text-muted)]">Loading form...</div>}>
            <OrderForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
