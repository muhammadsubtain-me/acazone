'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { logError } from '@/lib/logger';

// Route-level error boundary. Catches render/runtime errors in any page below
// the root layout and shows a branded fallback instead of a blank crash.
export default function Error({ error, reset }) {
  useEffect(() => {
    // Surface the error for debugging / future monitoring hook-up.
    logError('route-error', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-text-heading)] mb-4">
          Something went wrong
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg mb-8 max-w-md mx-auto">
          An unexpected error occurred. You can try again, or head back to the homepage.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
