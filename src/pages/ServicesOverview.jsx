import { Link } from 'react-router-dom';

const serviceCategories = [
  {
    title: 'Mechanical Engineering',
    path: '/services/mechanical',
    icon: '⚙️',
    color: 'from-slate-600 to-gray-800',
    desc: 'Thermodynamics, fluid mechanics, CAD/CAM, robotics, and more.',
    topics: ['Thermodynamics', 'Fluid Mechanics', 'Robotics', 'Materials Science'],
  },
  {
    title: 'Electrical Engineering',
    path: '/services/electrical',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-600',
    desc: 'Circuit analysis, power systems, digital electronics, and signal processing.',
    topics: ['Circuit Analysis', 'Power Systems', 'VLSI Design', 'Embedded Systems'],
  },
  {
    title: 'Chemical Engineering',
    path: '/services/chemical',
    icon: '🧪',
    color: 'from-emerald-500 to-teal-700',
    desc: 'Reaction kinetics, process design, mass transfer, and thermodynamics.',
    topics: ['Reaction Kinetics', 'Process Design', 'Mass Transfer', 'Separation Processes'],
  },
  {
    title: 'Computer Science',
    path: '/services/computer-science',
    icon: '💻',
    color: 'from-indigo-600 to-blue-700',
    desc: 'Algorithms, machine learning, web development, databases, and AI.',
    topics: ['Data Structures', 'Machine Learning', 'Web Development', 'Cybersecurity'],
  },
];

export default function ServicesOverview() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-700 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
        />
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-200 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            Expert Assistance
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">Our Services</h1>
          <p className="text-indigo-200 text-lg">
            Zenedify provides specialized academic assistance across four core engineering and technology disciplines. Select your field below.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {serviceCategories.map((service) => (
              <Link
                key={service.title}
                to={service.path}
                className="group bg-white rounded-3xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card header */}
                <div className={`bg-gradient-to-br ${service.color} p-8 relative overflow-hidden`}>
                  <div className="absolute -right-6 -top-6 text-8xl opacity-20">{service.icon}</div>
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h2 className="font-display text-2xl font-bold text-white">{service.title}</h2>
                </div>
                {/* Card body */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.topics.map((topic) => (
                      <span key={topic} className="text-xs font-medium bg-gray-100 text-gray-600 rounded-lg px-3 py-1.5 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm group-hover:gap-3 transition-all">
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
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Can't find your subject?</h2>
          <p className="text-gray-600 mb-8">We cover many more disciplines beyond our core engineering services. Contact us and we'll connect you with the right expert.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
