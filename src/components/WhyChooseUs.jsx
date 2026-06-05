import { Link } from 'react-router-dom';

const features = [
  { icon: '🏅', title: 'World-Class Experts', desc: 'Our tutors are vetted professionals with advanced degrees in their fields.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: 'We guarantee timely submissions, no matter how tight the deadline.' },
  { icon: '🔒', title: '100% Confidential', desc: 'Your privacy is our priority — all interactions remain strictly secure.' },
  { icon: '✏️', title: 'Original Work', desc: 'Every submission is custom-written and plagiarism-free, guaranteed.' },
  { icon: '💰', title: 'Affordable Pricing', desc: 'Premium academic help that fits every student budget without compromise.' },
  { icon: '🔄', title: 'Unlimited Revisions', desc: 'We refine your work until you are completely satisfied with the outcome.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-5">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Zenedify –{' '}
              <span className="text-indigo-600">Place of Experts</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Our world-class academic advisers enable professionals and students to succeed by offering top-quality academic solutions. Our experienced team members are skilled tutors who use their expertise to produce a fantastic paper for you.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Zenedify provides the best in coursework, dissertation, lab tasks, exam preparations, programming assignments and essays. There are no restrictions on what we may offer — bring any assignment and our professional academic tutors will do their best to assist you.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all"
            >
              About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Right grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl mb-3 group-hover:bg-indigo-100 transition-colors">
                  {f.icon}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1.5">{f.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
