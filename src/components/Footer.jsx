import { Link } from 'react-router-dom';

const subjects = [
  'Computer Science', 'Applied Sciences', 'Social Sciences', 'Mathematics', 'Programming',
  'Business', 'Management', 'Engineering', 'Physics', 'Chemistry',
  'English', 'Biology', 'History', 'Finance', 'Statistics',
  'Law', 'Accounting', 'Electronics', 'Psychology', 'Numerical Methods',
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-footer-bg)', color: 'var(--color-footer-text)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit" style={{ textDecoration: 'none' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'var(--color-footer-head)', fontWeight: 800, fontSize: 18 }}>Z</span>
              </div>
              <span style={{ color: 'var(--color-footer-head)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>ZenEdify</span>
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              Expert academic assistance to help students achieve the grades they deserve. Available 24/7.
            </p>
            <div style={{ fontSize: 14, lineHeight: 2 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <span>🇬🇧</span>
                <span>124 City Road, London, England, EC1V 2NX</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span>🇵🇰</span>
                <span>602 A, Meher Apartments, H-13 Islamabad</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--color-footer-head)', marginBottom: 20, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'FAQs', path: '/faqs' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Samples', path: '/samples' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Hire Expert', path: '/contact' },
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: 10 }}>
                  <Link to={link.path} style={{
                    fontSize: 14, color: 'var(--color-footer-text)',
                    textDecoration: 'none', transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-footer-text)'}
                  >{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--color-footer-head)', marginBottom: 20, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Our Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Mechanical Engineering', path: '/services/mechanical' },
                { name: 'Electrical Engineering', path: '/services/electrical' },
                { name: 'Chemical Engineering', path: '/services/chemical' },
                { name: 'Computer Science', path: '/services/computer-science' },
              ].map((s) => (
                <li key={s.name} style={{ marginBottom: 10 }}>
                  <Link to={s.path} style={{
                    fontSize: 14, color: 'var(--color-footer-text)',
                    textDecoration: 'none', transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-footer-text)'}
                  >{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--color-footer-head)', marginBottom: 20, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Subjects We Cover</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {subjects.map((sub) => (
                <span key={sub} style={{
                  fontSize: 11,
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8, padding: '4px 10px',
                  color: 'var(--color-footer-text)',
                  cursor: 'default', transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-footer-text)'; }}
                >{sub}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--color-border)', marginTop: 48, paddingTop: 32,
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <p style={{ fontSize: 14, margin: 0 }}>© 2024 ZenEdify. All Rights Reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {[
              { name: 'Facebook', icon: 'f', href: '#' },
              { name: 'Instagram', icon: '📷', href: '#' },
              { name: 'Twitter', icon: '𝕏', href: '#' },
              { name: 'LinkedIn', icon: 'in', href: '#' },
              { name: 'YouTube', icon: '▶', href: '#' },
            ].map((social) => (
              <a key={social.name} href={social.href} aria-label={social.name} style={{
                width: 32, height: 32, borderRadius: 8,
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: 'var(--color-footer-text)',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface-3)'; e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.color = 'var(--color-text-heading)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface)'; e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-footer-text)'; }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
