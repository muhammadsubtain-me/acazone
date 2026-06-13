import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { domains, services, contentData } from '@/lib/contentData';

export default function ServicePageDetail({ serviceId: propServiceId }) {
  const { serviceId: paramServiceId } = useParams();
  const serviceId = propServiceId || paramServiceId;

  // Find the selected service
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center p-6 text-center pt-24">
        <div className="text-6xl mb-6 animate-pulse">🔍</div>
        <h1 className="font-display text-3xl font-bold mb-3 text-[var(--color-text-heading)]">
          Service Not Found
        </h1>
        <p className="text-[var(--color-text-muted)] text-[15px] max-w-md mb-8 leading-relaxed">
          The service you are looking for does not exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">Go back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero Section */}
      <section className="-mt-16 pt-36 pb-16 bg-[var(--color-surface)] relative overflow-hidden border-b border-[var(--color-border)] text-center">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none bg-[radial-gradient(ellipse,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="text-[64px] mb-4 select-none animate-bounce" style={{ animationDuration: '3s' }}>
            {service.icon}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text-heading)]">
            {service.name}
          </h1>
          <p className="text-[var(--color-text-muted)] text-[17px] max-w-[640px] mx-auto">
            {service.desc}
          </p>
        </div>
      </section>

      {/* Grid of Subject Areas */}
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-3">Subjects Supported</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-heading)]">
              Select Your Academic Subject
            </h2>
            <p className="text-[var(--color-text-muted)] text-[15px] mt-2">
              Select a subject below to view topics covered and get a free quote.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {domains.map((domain) => {
              const domainContent = contentData[domain.id]?.[service.id] || {
                title: `${service.name} Help`,
                desc: 'Professional academic assistance tailored to your requirements.',
                topics: [],
                benefits: []
              };

              return (
                <Card key={domain.id} className="p-6 md:p-8 flex flex-col justify-between border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.02] hover:border-[var(--color-border-hover)] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{domain.icon}</span>
                      <h3 className="font-display text-xl font-bold text-[var(--color-text-heading)]">
                        {domain.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                      {domainContent.desc}
                    </p>

                    {/* Topics covered as clean visual tags */}
                    {domainContent.topics.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-wider mb-3">
                          Topics Covered
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {domainContent.topics.map((topic, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] text-xs text-[var(--color-text-muted)] rounded-full"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Call to Action Button */}
                  <div className="mt-4 pt-4 border-t border-white/[0.05]">
                    <Button className="w-full cursor-pointer font-semibold" asChild>
                      <Link to={`/order?service=${service.id}&domain=${domain.id}`} className="inline-flex items-center justify-center gap-2">
                        Hire {domain.name} Expert <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Unified Service Benefits Section */}
      <section className="py-16 bg-[var(--color-section-alt)] border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-3">ZenEdify Quality Guarantee</Badge>
          <h2 className="font-display text-3xl font-bold mb-10 text-[var(--color-text-heading)]">
            Why Students Trust ZenEdify
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <Card className="p-6 border border-white/[0.06] bg-white/[0.01]">
              <div className="w-12 h-12 bg-white/[0.04] rounded-xl flex items-center justify-center text-2xl mb-4">⚙️</div>
              <CardTitle className="text-base mb-2">Subject Tutors</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Direct guidance from vetted experts holding advanced degrees (Masters & PhDs) in engineering and computing.
              </CardDescription>
            </Card>

            <Card className="p-6 border border-white/[0.06] bg-white/[0.01]">
              <div className="w-12 h-12 bg-white/[0.04] rounded-xl flex items-center justify-center text-2xl mb-4">✅</div>
              <CardTitle className="text-base mb-2">Plagiarism-Free</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Every project and report is built from scratch, checked for original work, and delivered with code logs.
              </CardDescription>
            </Card>

            <Card className="p-6 border border-white/[0.06] bg-white/[0.01]">
              <div className="w-12 h-12 bg-white/[0.04] rounded-xl flex items-center justify-center text-2xl mb-4">⏱️</div>
              <CardTitle className="text-base mb-2">On-Time Delivery</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                We respect your deadlines. Get high-quality solutions back on time, even for urgent requests under 24 hours.
              </CardDescription>
            </Card>

            <Card className="p-6 border border-white/[0.06] bg-white/[0.01]">
              <div className="w-12 h-12 bg-white/[0.04] rounded-xl flex items-center justify-center text-2xl mb-4">💬</div>
              <CardTitle className="text-base mb-2">24/7 Support Desk</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Our support team is online around the clock to assist you, resolve questions, and keep you updated on progress.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
