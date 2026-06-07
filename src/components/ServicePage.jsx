import { Link } from 'react-router-dom';

export default function ServicePage({ title, icon, description, topics, benefits }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero — uses global variables, no hardcoded color */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'var(--color-surface)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(var(--dot-color) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div style={{ fontSize: 80, marginBottom: 24 }}>{icon}</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-5" style={{ color: 'var(--color-text-heading)' }}>{title}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 17, maxWidth: 560, margin: '0 auto 32px' }}>{description}</p>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 28px', borderRadius: 16, fontWeight: 600, fontSize: 15,
            backgroundColor: 'var(--color-btn-primary-bg)',
            color: 'var(--color-btn-primary-text)',
            textDecoration: 'none', transition: 'all 0.2s',
          }}>
            Get Expert Help
          </Link>
        </div>
      </section>

      {/* Topics */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: 'var(--color-text-heading)' }}>Topics We Cover</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.map((topic) => (
              <div key={topic} style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 12, padding: 16, textAlign: 'center',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text)' }}>{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: 'var(--color-text-heading)' }}>Why Choose ZenEdify for {title}?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 16, padding: 24,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 8 }}>{b.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 13, lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>Ready to Get Started?</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32 }}>Connect with our {title} experts today and get the academic help you deserve.</p>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 16, fontWeight: 600, fontSize: 15,
            backgroundColor: 'var(--color-btn-primary-bg)',
            color: 'var(--color-btn-primary-text)',
            textDecoration: 'none', transition: 'all 0.2s',
          }}>
            Hire an Expert
          </Link>
        </div>
      </section>
    </div>
  );
}
