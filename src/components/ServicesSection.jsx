import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { services } from '../lib/contentData';

export default function ServicesSection() {
  return (
    <section className="py-20 bg-[var(--color-section-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4">What We Offer</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-text-heading)]">
            Our Popular Services
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-[560px] mx-auto text-[17px]">
            From essays to dissertations, coding to lab reports — ZenEdify covers every academic need with expert precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service) => (
            <div key={service.id} className="block">
              <Card className="p-5 h-full hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] transition-all duration-300">
                <div className="w-11 h-11 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center text-xl mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-[13px] mb-2 leading-snug">{service.name}</CardTitle>
                <CardDescription className="text-xs leading-normal">{service.desc}</CardDescription>
              </Card>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
