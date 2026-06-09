import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [location.pathname]);

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setDropdownOpen(true); };
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150); };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-black/30 backdrop-blur-[24px] backdrop-saturate-[180%] border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      {/* Liquid glass shimmer line — visible only when scrolled */}
      <div
        className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-500 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_30%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0.2)_70%,transparent_100%)] ${scrolled ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center no-underline">
            <span className="text-[var(--color-text-heading)] font-bold text-xl tracking-[-0.02em]">
              Zen<span className="text-[var(--color-accent-muted)]">Edify</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <button className={`flex items-center px-4 py-2 text-sm font-medium border-none cursor-pointer transition-all duration-150 bg-transparent ${
                    location.pathname.startsWith('/services')
                      ? 'text-white'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}>
                    Services
                  </button>
                  <div className={`absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden transition-all duration-200 bg-[rgba(10,10,10,0.75)] backdrop-blur-[20px] backdrop-saturate-[160%] border border-[rgba(255,255,255,0.1)] shadow-[0_16px_48px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] ${
                    dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                  >
                    <div className="p-2">
                      {services.map((service) => (
                        <Link key={service.name} to={service.path} onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text)] no-underline transition-all duration-150 hover:bg-white/10 hover:text-white"
                        >
                          <span>{service.icon}</span>
                          <span className="font-medium">{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.name} to={link.path}
                  className={`px-4 py-2 text-sm font-medium no-underline transition-all duration-150 ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
            <Button asChild size="sm" className="ml-3">
              <Link to="/contact">Hire Expert</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden ml-auto w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
              scrolled ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="border-t border-white/[0.08] px-4 pb-4 pt-2 bg-[rgba(5,5,5,0.85)] backdrop-blur-[24px] backdrop-saturate-[180%]"
        >
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link to={link.path} onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium no-underline transition-all duration-150 ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-[var(--color-text-muted)] hover:text-white'
                }`}
              >
                {link.name}
              </Link>
              {link.hasDropdown && (
                <div className="ml-4 mt-1">
                  {services.map((s) => (
                    <Link key={s.name} to={s.path} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--color-text-muted)] no-underline hover:text-white hover:bg-white/[0.07] transition-all duration-150"
                    >
                      <span>{s.icon}</span>{s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-2">
            <Button asChild className="w-full">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>Hire Expert</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
