'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/layout/Container';
import { logError } from '@/lib/logger';
import { typography } from '@/lib/responsive';

export default function Error({ error, reset }) {
  useEffect(() => {
    logError('route-error', error);
  }, [error]);

  return (
    <div className="min-h-[100svh] flex items-center justify-center text-center">
      <Container variant="narrow">
        <h1 className={`${typography.pageTitle} mb-3 sm:mb-4`}>
          Something went wrong
        </h1>
        <p className={`${typography.body} mb-6 sm:mb-8 max-w-md mx-auto`}>
          An unexpected error occurred. You can try again, or head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
