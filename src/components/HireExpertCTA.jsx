import { Link } from 'react-router-dom';

export default function HireExpertCTA() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(var(--dot-color) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--color-text-muted)',
              background: 'var(--color-accent-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 20,
            }}>Get Started Today</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5 leading-tight" style={{ color: 'var(--color-text-heading)' }}>
              Hire an Expert Right Now
            </h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
              Find excellent quality homework help from our subject experts for your assignments! ZenEdify wants to build a solid foundation that supports students as they take off into the success sky.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
              We understand that you might not always have access to homework assistance. This is why we give students step-by-step solutions from competent tutors with immediate, dependable support.
            </p>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 16, fontWeight: 600, fontSize: 15,
              backgroundColor: 'var(--color-btn-primary-bg)',
              color: 'var(--color-btn-primary-text)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}>
              Hire Expert Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Targeted Help', desc: 'Subject-specific solutions matched to your course requirements.' },
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Express delivery options available for urgent assignments.' },
              { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock assistance whenever you need guidance.' },
              { icon: '💯', title: 'Grade Guarantee', desc: 'Work crafted to help you achieve the grades you deserve.' },
            ].map((item) => (
              <div key={item.title} style={{
                backgroundColor: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 16, padding: 20,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; }}
              >
                <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                <h4 style={{ fontWeight: 600, color: 'var(--color-text-heading)', fontSize: 13, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ color: 'var(--color-text-faint)', fontSize: 12, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
