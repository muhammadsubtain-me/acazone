import { Link } from 'react-router-dom';

const services = [
  { icon: '📝', title: 'Essay Writing Services', desc: 'Professional essay writing across all academic disciplines and formats.' },
  { icon: '🎓', title: 'Dissertation Writing', desc: 'Comprehensive dissertation support from proposal to final submission.' },
  { icon: '🔍', title: 'Proofreading & Editing', desc: 'Meticulous editing to polish grammar, structure, and academic tone.' },
  { icon: '🧪', title: 'Lab Task Practical', desc: 'Hands-on practical lab reports and experimental analysis support.' },
  { icon: '💻', title: 'Coding & Programming', desc: 'Expert help with assignments across all major programming languages.' },
  { icon: '📊', title: 'Research Proposal Writing', desc: 'Well-structured research proposals that set the foundation for success.' },
  { icon: '📚', title: 'Exam Preparation', desc: 'Targeted study plans and mock tests to maximize exam performance.' },
  { icon: '👨‍🏫', title: 'Subject Tutoring', desc: 'One-on-one tutoring sessions tailored to your learning pace.' },
  { icon: '🏗️', title: 'Semester Projects', desc: 'End-to-end support for semester-long projects and presentations.' },
  { icon: '📋', title: 'HomeWorks & Assignments', desc: 'Timely, accurate homework solutions across all subjects.' },
];

export default function ServicesSection() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-section-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--color-text-muted)',
            background: 'var(--color-accent-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 16,
          }}>What We Offer</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>
            Our Popular Services
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: 560, margin: '0 auto', fontSize: 17 }}>
            From essays to dissertations, coding to lab reports — ZenEdify covers every academic need with expert precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service) => (
            <div key={service.title} style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 16, padding: 20,
              transition: 'all 0.25s', cursor: 'pointer',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-hover)';
                e.currentTarget.style.backgroundColor = 'var(--color-surface-2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                backgroundColor: 'var(--color-surface-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, marginBottom: 16,
              }}>
                {service.icon}
              </div>
              <h3 style={{ fontWeight: 600, color: 'var(--color-text-heading)', fontSize: 13, marginBottom: 8, lineHeight: 1.4 }}>{service.title}</h3>
              <p style={{ color: 'var(--color-text-faint)', fontSize: 12, lineHeight: 1.6 }}>{service.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/services" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', borderRadius: 12, fontWeight: 600, fontSize: 14,
            color: 'var(--color-text-heading)',
            backgroundColor: 'transparent',
            border: '1px solid var(--color-border-hover)',
            textDecoration: 'none', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'var(--color-border-hover)'; }}
          >
            Explore All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
