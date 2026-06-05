import { Link } from 'react-router-dom';

const subjects = [
  'Computer Science', 'Applied Sciences', 'Social Sciences', 'Mathematics', 'Programming',
  'Business', 'Management', 'Engineering', 'Physics', 'Chemistry',
  'English', 'Biology', 'History', 'Finance', 'Statistics',
  'Law', 'Accounting', 'Electronics', 'Psychology', 'Numerical Methods',
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-md">
                <span className="text-white font-display font-bold text-lg leading-none">Z</span>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">Zenedify</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Expert academic assistance to help students achieve the grades they deserve. Available 24/7.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-indigo-400 mt-0.5">🇬🇧</span>
                <span>124 City Road, London, England, EC1V 2NX</span>
              </div>
              <div className="flex gap-2">
                <span className="text-indigo-400 mt-0.5">🇵🇰</span>
                <span>602 A, Meher Apartments, H-13 Islamabad</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'FAQs', path: '/faqs' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Samples', path: '/samples' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Hire Expert', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-indigo-400 transition-colors flex items-center gap-1.5 group">
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Mechanical Engineering', path: '/services/mechanical' },
                { name: 'Electrical Engineering', path: '/services/electrical' },
                { name: 'Chemical Engineering', path: '/services/chemical' },
                { name: 'Computer Science', path: '/services/computer-science' },
              ].map((s) => (
                <li key={s.name}>
                  <Link to={s.path} className="text-sm hover:text-indigo-400 transition-colors flex items-center gap-1.5 group">
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Subjects We Cover</h4>
            <div className="flex flex-wrap gap-2">
              {subjects.map((sub) => (
                <span
                  key={sub}
                  className="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 hover:border-indigo-500 hover:text-indigo-300 transition-colors cursor-default"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2024 Zenedify. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            {[
              { name: 'Facebook', icon: 'f', href: '#' },
              { name: 'Instagram', icon: '📷', href: '#' },
              { name: 'Twitter', icon: '𝕏', href: '#' },
              { name: 'LinkedIn', icon: 'in', href: '#' },
              { name: 'YouTube', icon: '▶', href: '#' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all"
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
