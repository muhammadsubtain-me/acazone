import { useState, useRef } from 'react';
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
  const timeoutRef = useRef(null);
  const location = useLocation();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shadow-md group-hover:shadow-indigo-200 transition-all">
              <span className="text-white font-display font-bold text-lg leading-none">Z</span>
            </div>
            <span className="font-display font-bold text-xl text-gray-900 tracking-tight">
              Zenedify
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      location.pathname.startsWith('/services')
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    Services
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                      dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="p-2">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          to={service.path}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all group"
                        >
                          <span className="text-base">{service.icon}</span>
                          <span className="font-medium">{service.name}</span>
                          <svg className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all"
            >
              Hire Expert
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
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
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                to={link.path}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
              {link.hasDropdown && (
                <div className="ml-4 space-y-1 mt-1">
                  {services.map((s) => (
                    <Link
                      key={s.name}
                      to={s.path}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{s.icon}</span>{s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-2">
            <Link
              to="/contact"
              className="block text-center px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
              onClick={() => setMobileOpen(false)}
            >
              Hire Expert
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
