import { Link } from 'react-router-dom';

const features = [
  { icon: '🏅', title: 'World-Class Experts', desc: 'Our tutors are vetted professionals with advanced degrees in their fields.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: 'We guarantee timely submissions, no matter how tight the deadline.' },
  { icon: '🔒', title: '100% Confidential', desc: 'Your privacy is our priority — all interactions remain strictly secure.' },
  { icon: '✏️', title: 'Original Work', desc: 'Every submission is custom-written and plagiarism-free, guaranteed.' },
  { icon: '💰', title: 'Affordable Pricing', desc: 'Premium academic help that fits every student budget without compromise.' },
  { icon: '🔄', title: 'Unlimited Revisions', desc: 'We refine your work until you are completely satisfied with the outcome.' },
];

export default function WhyChooseUs() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--color-text-muted)',
              background: 'var(--color-accent-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 20,
            }}>Why Choose Us</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5 leading-tight" style={{ color: 'var(--color-text-heading)' }}>
              ZenEdify –{' '}
              <span style={{ color: 'var(--color-accent-muted)' }}>Place of Experts</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
              Our world-class academic advisers enable professionals and students to succeed by offering top-quality academic solutions. Our experienced team members are skilled tutors who use their expertise to produce a fantastic paper for you.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
              ZenEdify provides the best in coursework, dissertation, lab tasks, exam preparations, programming assignments and essays. There are no restrictions on what we may offer — bring any assignment and our professional academic tutors will do their best to assist you.
            </p>
            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 12, fontWeight: 600, fontSize: 14,
              backgroundColor: 'var(--color-btn-primary-bg)',
              color: 'var(--color-btn-primary-text)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}>
              About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Right grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 16, padding: 20,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  backgroundColor: 'var(--color-surface-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, marginBottom: 12,
                }}>{f.icon}</div>
                <h4 style={{ fontWeight: 600, color: 'var(--color-text-heading)', fontSize: 13, marginBottom: 6 }}>{f.title}</h4>
                <p style={{ color: 'var(--color-text-faint)', fontSize: 12, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
