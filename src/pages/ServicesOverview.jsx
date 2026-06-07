import { Link } from 'react-router-dom';

const serviceCategories = [
  {
    title: 'Mechanical Engineering', path: '/services/mechanical', icon: '⚙️',
    desc: 'Thermodynamics, fluid mechanics, CAD/CAM, robotics, and more.',
    topics: ['Thermodynamics', 'Fluid Mechanics', 'Robotics', 'Materials Science'],
  },
  {
    title: 'Electrical Engineering', path: '/services/electrical', icon: '⚡',
    desc: 'Circuit analysis, power systems, digital electronics, and signal processing.',
    topics: ['Circuit Analysis', 'Power Systems', 'VLSI Design', 'Embedded Systems'],
  },
  {
    title: 'Chemical Engineering', path: '/services/chemical', icon: '🧪',
    desc: 'Reaction kinetics, process design, mass transfer, and thermodynamics.',
    topics: ['Reaction Kinetics', 'Process Design', 'Mass Transfer', 'Separation Processes'],
  },
  {
    title: 'Computer Science', path: '/services/computer-science', icon: '💻',
    desc: 'Algorithms, machine learning, web development, databases, and AI.',
    topics: ['Data Structures', 'Machine Learning', 'Web Development', 'Cybersecurity'],
  },
];

export default function ServicesOverview() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'var(--color-surface)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(var(--dot-color) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />
        <div className="relative max-w-3xl mx-auto px-4">
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--color-text-muted)',
            background: 'var(--color-accent-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 20,
          }}>Expert Assistance</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-5" style={{ color: 'var(--color-text-heading)' }}>Our Services</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 17 }}>
            ZenEdify provides specialized academic assistance across four core engineering and technology disciplines. Select your field below.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {serviceCategories.map((service) => (
              <Link key={service.title} to={service.path} style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 24, overflow: 'hidden',
                textDecoration: 'none', transition: 'all 0.3s', display: 'block',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Card header */}
                <div style={{
                  padding: 32, position: 'relative', overflow: 'hidden',
                  backgroundColor: 'var(--color-surface-2)',
                  borderBottom: '1px solid var(--color-border)',
                }}>
                  <div style={{ position: 'absolute', right: -24, top: -24, fontSize: 96, opacity: 0.08 }}>{service.icon}</div>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>{service.icon}</div>
                  <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--color-text-heading)' }}>{service.title}</h2>
                </div>
                {/* Card body */}
                <div style={{ padding: 24 }}>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{service.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                    {service.topics.map((topic) => (
                      <span key={topic} style={{
                        fontSize: 12, fontWeight: 500,
                        backgroundColor: 'var(--color-surface-3)',
                        color: 'var(--color-text-muted)',
                        borderRadius: 8, padding: '6px 12px',
                      }}>{topic}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-muted)', fontWeight: 600, fontSize: 14 }}>
                    Explore {service.title}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-section-alt)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>Can't find your subject?</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32 }}>We cover many more disciplines beyond our core engineering services. Contact us and we'll connect you with the right expert.</p>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 16, fontWeight: 600, fontSize: 15,
            backgroundColor: 'var(--color-btn-primary-bg)',
            color: 'var(--color-btn-primary-text)',
            textDecoration: 'none',
          }}>Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
