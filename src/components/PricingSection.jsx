import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Button } from './ui/button';

const pricingTiers = [
  {
    name: 'Standard Tier',
    price: '12',
    period: 'page',
    desc: 'Perfect for general essays, literature reviews, and standard homework assignments.',
    features: [
      'Verified Subject Specialist',
      'Flexible 5+ Days Deadline',
      'Standard Structural Formatting',
      'Unlimited Free Revisions',
      'Plagiarism Check Report',
    ],
    cta: 'Get Standard Quote',
    popular: false,
  },
  {
    name: 'Professional Tier',
    price: '18',
    period: 'page',
    desc: 'Designed for advanced lab reports, programming code, and mathematical models.',
    features: [
      'Postgraduate (MSc) Tutor',
      'Express 3+ Days Deadline',
      'Step-by-Step Methodology Logs',
      'Commented Code & Calculations',
      'Free Turnitin Originality PDF',
    ],
    cta: 'Get Professional Quote',
    popular: true,
  },
  {
    name: 'Expert Tier',
    price: '25',
    period: 'page',
    desc: 'Built for complex dissertations, final-year design projects, and research papers.',
    features: [
      'Verified PhD Specialist Tutors',
      'Urgent 24-Hour Express Options',
      'In-Depth Qualitative & CFD Models',
      'Complete Dissertation Formatting',
      'Direct Support Coordinator Access',
    ],
    cta: 'Get Expert Quote',
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 bg-[var(--color-bg)] relative overflow-hidden border-t border-[var(--color-border)]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none bg-[radial-gradient(ellipse,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4">Transparent Pricing</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-text-heading)]">
            Simple, Honest Pricing Plans
          </h2>
          <p className="text-[var(--color-text-muted)] text-[16px] max-w-2xl mx-auto">
            No hidden fees. Revisions and Turnitin plagiarism checks are always included free. Prices vary depending on complexity, page count, and deadline urgency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col justify-between p-8 bg-[var(--color-surface-2)] transition-all duration-300 relative ${
                tier.popular
                  ? 'border-[var(--color-accent-muted)] shadow-[0_16px_48px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.1)] scale-[1.02]'
                  : 'hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-3)]'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black bg-white rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="font-display text-lg font-bold text-[var(--color-text-heading)] mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-xs min-h-[48px]">
                    {tier.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 mb-8 border-b border-white/[0.06] pb-6">
                  <span className="text-sm font-semibold text-[var(--color-text-muted)]">From</span>
                  <span className="text-4xl font-extrabold text-[var(--color-text-heading)] font-display">
                    ${tier.price}
                  </span>
                  <span className="text-xs text-[var(--color-text-faint)]">/{tier.period}</span>
                </div>

                <ul className="flex flex-col gap-3.5 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-[13px] text-[var(--color-text)]">
                      <div className="w-4.5 h-4.5 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-neutral-300" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                asChild
                variant={tier.popular ? 'default' : 'outline'}
                className="w-full font-semibold inline-flex items-center justify-center gap-2 mt-auto"
              >
                <Link to="/contact">
                  {tier.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs text-[var(--color-text-faint)] mt-12">
          * Note: 1 page is approximately equal to 300 words (double-spaced) or 1 specific math/code sub-task. For custom software projects or semester-long design tasks, please contact us for custom milestones.
        </p>
      </div>
    </section>
  );
}
