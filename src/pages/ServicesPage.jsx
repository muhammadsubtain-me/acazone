import useSEO from '@/hooks/useSEO';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { services } from '@/lib/data';

export default function ServicesPage() {
  useSEO(
    'Academic Tutoring & Technical Writing Services',
    "Explore Acezon's custom academic solutions, including homework writing, subject tutoring, programming help, lab tasks, semester projects, and thesis writing."
  );

  return (
    <div className="min-h-screen">
      <section className="-mt-16 pt-36 pb-20 bg-[var(--color-surface)] text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none bg-[radial-gradient(ellipse,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 flex flex-col items-center">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl 3xl:text-7xl font-bold mb-4 text-[var(--color-text-heading)]">
            Our Services
          </h1>
          <p className="text-[var(--color-text-muted)] text-[17px] mb-6 font-medium">
            Expert academic help, delivered on time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--color-text-muted)]">
            <span className="px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full flex items-center gap-1.5 shadow-sm">
              ⚙️ Mechanical
            </span>
            <span className="text-white/20 select-none hidden md:inline">·</span>
            <span className="px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full flex items-center gap-1.5 shadow-sm">
              ⚡ Electrical
            </span>
            <span className="text-white/20 select-none hidden md:inline">·</span>
            <span className="px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full flex items-center gap-1.5 shadow-sm">
              ⚗️ Chemical
            </span>
            <span className="text-white/20 select-none hidden md:inline">·</span>
            <span className="px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full flex items-center gap-1.5 shadow-sm">
              💻 Computer Science
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-border)]" />
      </section>

      <section className="py-20 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 3xl:max-w-[1680px] 4xl:max-w-[2200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-4 md:gap-5 xl:gap-6 3xl:gap-8">
            {services.map((service) => (
              <div key={service.id} className="block">
                <Card className="p-6 h-full hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] transition-all duration-300 shadow-sm border border-white/[0.06] bg-white/[0.01]">
                  <div className="w-12 h-12 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center text-2xl mb-5">
                    {service.icon}
                  </div>
                  <CardTitle className="text-base mb-3 leading-snug text-[var(--color-text-heading)]">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                    {service.desc}
                  </CardDescription>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
