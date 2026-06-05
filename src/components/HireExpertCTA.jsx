import { Link } from 'react-router-dom';

export default function HireExpertCTA() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-900/50 border border-indigo-800 rounded-full px-4 py-1.5 mb-5">
              Get Started Today
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Hire an Expert Right Now
            </h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Find excellent quality homework help from our subject experts for your assignments! Zenedify wants to build a solid foundation that supports students as they take off into the success sky.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              We understand that you might not always have access to homework assistance. This is why we give students step-by-step solutions from competent tutors with immediate, dependable support.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
            >
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
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-white text-sm mb-1.5">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
