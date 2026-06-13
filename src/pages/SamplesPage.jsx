import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import PageHero from '@/components/PageHero';
import { samples } from '@/lib/contentData';

export default function SamplesPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="Work Samples" subtitle="Browse examples of the high-quality academic work our experts deliver." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((s) => (
              <Card key={s.title} className="p-6 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center text-2xl">
                    {s.icon}
                  </div>
                  <Badge variant="grade">{s.grade}</Badge>
                </div>
                <CardTitle className="mb-1.5">{s.title}</CardTitle>
                <p className="text-[13px] text-[var(--color-text-muted)] mb-3">{s.subject}</p>
                <div className="flex justify-between text-xs text-[var(--color-text-faint)]">
                  <span>{s.pages} pages</span>
                  <Link to="/contact" className="text-[var(--color-accent-muted)] font-semibold no-underline">Get Similar →</Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
