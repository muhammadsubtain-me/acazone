import { useState } from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/PageHero';
import { portfolioItems, categories } from '@/lib/contentData';

export default function PortfolioPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? portfolioItems : portfolioItems.filter(p => p.category === active);

  return (
    <div className="min-h-screen">
      <PageHero title="Our Portfolio" subtitle="A showcase of the exceptional academic work delivered by our experts." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={active === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActive(cat)}
              >{cat}</Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <Card key={item.title} className="overflow-hidden hover:border-[var(--color-border-hover)] hover:-translate-y-1">
                <div className="h-36 bg-[var(--color-surface-2)] flex items-center justify-center text-[48px]">
                  {item.icon}
                </div>
                <div className="p-5">
                  <Badge variant="secondary">{item.category}</Badge>
                  <h3 className="font-semibold text-[var(--color-text-heading)] mt-3 mb-2">{item.title}</h3>
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-[var(--color-star)]" />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
