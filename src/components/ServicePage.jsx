import { Link } from 'react-router-dom';

export default function ServicePage({ title, icon, color, description, topics, benefits }) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className={`py-20 ${color} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-7xl mb-6">{icon}</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">{title}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">{description}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
          >
            Get Expert Help
          </Link>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">Topics We Cover</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.map((topic) => (
              <div key={topic} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all text-center">
                <span className="text-sm font-medium text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">Why Choose Zenedify for {title}?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-200 mb-8">Connect with our {title} experts today and get the academic help you deserve.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold bg-white text-indigo-600 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Hire an Expert
          </Link>
        </div>
      </section>
    </div>
  );
}
