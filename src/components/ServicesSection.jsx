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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-4">
            What We Offer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Popular Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From essays to dissertations, coding to lab reports — Zenedify covers every academic need with expert precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl mb-4 group-hover:bg-indigo-100 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2 leading-snug">{service.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-indigo-600 bg-white border-2 border-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
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
