export default function PageHero({ title, subtitle }) {
  return (
    <section className="-mt-16 pt-36 pb-20 bg-[var(--color-surface)] text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none bg-[radial-gradient(ellipse,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
      <div className="relative max-w-3xl mx-auto px-4">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text-heading)]">{title}</h1>
        <p className="text-[var(--color-text-muted)] text-[17px]">{subtitle}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-border)]" />
    </section>
  );
}
