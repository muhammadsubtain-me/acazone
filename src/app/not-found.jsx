import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/layout/Container';
import { typography } from '@/lib/responsive';

export default function NotFound() {
  return (
    <div className="min-h-[100svh] flex items-center justify-center text-center">
      <Container variant="narrow">
        <h1 className={`${typography.heroTitle} mb-3 sm:mb-4`}>404</h1>
        <p className={`${typography.body} mb-6 sm:mb-8`}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </Container>
    </div>
  );
}
