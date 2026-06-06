import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white min-h-[90vh] flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gray-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-200/20 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-gray-100 backdrop-blur-sm border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-700 font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Expert Academic Assistance Available Now
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Get Help From{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              Academic
            </span>{' '}
            Experts
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Get academic assistance from Zenedify to earn the grades you desire. We have top professionals in academic assignment writing, essay writing, dissertation proposals, homework, exam preparation and lab task practical services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
            >
              Hire Expert
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/samples"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-gray-700 bg-gray-100 backdrop-blur-sm border border-gray-300 hover:bg-gray-200 transition-all"
            >
              View Samples
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
            {[
              { value: '5000+', label: 'Happy Clients' },
              { value: '200+', label: 'Expert Tutors' },
              { value: '10K+', label: 'Projects Done' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-gray-900 font-display">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Main card */}
            <div className="w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-indigo-50 to-blue-50 backdrop-blur-sm border border-gray-300 rounded-3xl flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <div className="text-8xl mb-4">🎓</div>
                <div className="font-display font-bold text-gray-900 text-2xl">Zenedify</div>
                <div className="text-gray-600 text-sm mt-1">Place of Experts</div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="text-xl">⭐</span>
              <div>
                <div className="text-xs font-bold text-gray-800">Top Rated</div>
                <div className="text-xs text-gray-500">4.9/5 Rating</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-2 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <span className="text-xl">✅</span>
              <div>
                <div className="text-xs font-bold text-gray-800">Verified</div>
                <div className="text-xs text-gray-500">Expert Tutors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
