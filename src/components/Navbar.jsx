import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const services = [
  { name: 'Mechanical', path: '/services/mechanical', icon: '⚙️' },
  { name: 'Electrical', path: '/services/electrical', icon: '⚡' },
  { name: 'Chemical', path: '/services/chemical', icon: '🧪' },
  { name: 'Computer Science', path: '/services/computer-science', icon: '💻' },
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services', hasDropdown: true },
  { name: 'Samples', path: '/samples' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'FAQs', path: '/faqs' },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setDropdownOpen(true); };
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150); };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      transition: 'box-shadow 0.4s ease',
      backgroundColor: '#000000',
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border-hover)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'var(--color-text-heading)', fontWeight: 800, fontSize: 18 }}>Z</span>
            </div>
            <span style={{ color: 'var(--color-text-heading)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>
              ZenEdify
            </span>
          </Link>


          {/* Desktop Nav + CTA */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                    border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                    backgroundColor: location.pathname.startsWith('/services') ? 'var(--color-surface-2)' : 'transparent',
                    color: location.pathname.startsWith('/services') ? 'var(--color-text-heading)' : 'var(--color-text-muted)',
                  }}>Services</button>
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, marginTop: 4,
                    width: 224,
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 16, overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                    transition: 'all 0.2s',
                    opacity: dropdownOpen ? 1 : 0,
                    transform: dropdownOpen ? 'translateY(0)' : 'translateY(-8px)',
                    pointerEvents: dropdownOpen ? 'auto' : 'none',
                  }}>
                    <div style={{ padding: 8 }}>
                      {services.map((service) => (
                        <Link key={service.name} to={service.path} onClick={() => setDropdownOpen(false)} style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '10px 12px', borderRadius: 10, fontSize: 14,
                          color: 'var(--color-text)', textDecoration: 'none',
                          transition: 'all 0.15s',
                        }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; e.currentTarget.style.color = 'var(--color-text-heading)'; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text)'; }}
                        >
                          <span>{service.icon}</span>
                          <span style={{ fontWeight: 500 }}>{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.name} to={link.path} style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                  textDecoration: 'none', transition: 'all 0.15s',
                  backgroundColor: location.pathname === link.path ? 'var(--color-surface-2)' : 'transparent',
                  color: location.pathname === link.path ? 'var(--color-text-heading)' : 'var(--color-text-muted)',
                }}>
                  {link.name}
                </Link>
              )
            )}
            <Link to="/contact" style={{
              padding: '8px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
              marginLeft: 12,
              backgroundColor: 'var(--color-btn-primary-bg)',
              color: 'var(--color-btn-primary-text)',
              textDecoration: 'none', transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(255,255,255,0.15)',
            }}>
              Hire Expert
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ padding: 8, borderRadius: 8, border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: 'var(--color-text-muted)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px 16px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link to={link.path} onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '10px 16px', borderRadius: 10, fontSize: 14,
                fontWeight: 500, color: 'var(--color-text)', textDecoration: 'none',
              }}>
                {link.name}
              </Link>
              {link.hasDropdown && (
                <div style={{ marginLeft: 16, marginTop: 4 }}>
                  {services.map((s) => (
                    <Link key={s.name} to={s.path} onClick={() => setMobileOpen(false)} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 16px', borderRadius: 10, fontSize: 14,
                      color: 'var(--color-text-muted)', textDecoration: 'none',
                    }}>
                      <span>{s.icon}</span>{s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ paddingTop: 8 }}>
            <Link to="/contact" onClick={() => setMobileOpen(false)} style={{
              display: 'block', textAlign: 'center', padding: '10px 20px', borderRadius: 10,
              fontSize: 14, fontWeight: 600,
              backgroundColor: 'var(--color-btn-primary-bg)',
              color: 'var(--color-btn-primary-text)', textDecoration: 'none',
            }}>
              Hire Expert
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
