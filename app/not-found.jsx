import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="font-display text-6xl font-bold text-[var(--color-text-heading)] mb-4">404</h1>
        <p className="text-[var(--color-text-muted)] text-lg mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
