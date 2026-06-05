import { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── ABOUT PAGE ────────────────────────────────────────────────
export function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-700 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">About Zenedify</h1>
          <p className="text-indigo-200 text-lg">Your trusted academic partner, built on expertise and integrity.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-5">Our Story</span>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-5">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Zenedify was founded with a single mission: to provide students worldwide with access to world-class academic expertise. We believe every student deserves the support they need to reach their full potential.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our platform connects students with verified subject matter experts who provide personalized, high-quality academic assistance. Whether you're struggling with a complex engineering problem or need help polishing a dissertation, Zenedify has you covered.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With tutors from top universities across the globe and a commitment to academic excellence, we've helped thousands of students achieve the grades they deserve — on time, every time.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Our Mission', desc: 'Empower every student with expert academic support to unlock their true potential.' },
              { icon: '👁️', title: 'Our Vision', desc: 'Become the most trusted global platform for academic excellence and student success.' },
              { icon: '💎', title: 'Our Values', desc: 'Integrity, quality, confidentiality, and student-first thinking in everything we do.' },
              { icon: '🌍', title: 'Global Reach', desc: 'Serving students across 50+ countries with localized expertise and 24/7 support.' },
            ].map((item) => (
              <div key={item.title} className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-10">Our Expert Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['⚙️ Mechanical', '⚡ Electrical', '🧪 Chemical', '💻 CS & IT'].map((dept) => (
              <div key={dept} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{dept.split(' ')[0]}</div>
                <div className="font-semibold text-gray-900">{dept.split(' ').slice(1).join(' ')}</div>
                <div className="text-sm text-gray-500 mt-1">Department</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SAMPLES PAGE ──────────────────────────────────────────────
const samples = [
  { title: 'Thermodynamics Assignment', subject: 'Mechanical Eng.', pages: 12, grade: 'A+', icon: '⚙️' },
  { title: 'Circuit Analysis Lab Report', subject: 'Electrical Eng.', pages: 8, grade: 'A', icon: '⚡' },
  { title: 'Reaction Kinetics Assignment', subject: 'Chemical Eng.', pages: 15, grade: 'A+', icon: '🧪' },
  { title: 'Data Structures Project', subject: 'Computer Science', pages: 20, grade: 'A', icon: '💻' },
  { title: 'Literature Review Essay', subject: 'English', pages: 10, grade: 'A+', icon: '📝' },
  { title: 'Research Proposal', subject: 'Research Methods', pages: 18, grade: 'A', icon: '🔬' },
  { title: 'Dissertation Chapter', subject: 'Management', pages: 35, grade: 'A+', icon: '🎓' },
  { title: 'MATLAB Analysis', subject: 'Applied Math', pages: 9, grade: 'A', icon: '📊' },
  { title: 'Python ML Project', subject: 'Computer Science', pages: 25, grade: 'A+', icon: '🤖' },
];

export function SamplesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-700 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Work Samples</h1>
          <p className="text-indigo-200 text-lg">Browse examples of the high-quality academic work our experts deliver.</p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl">{s.icon}</div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-100 rounded-full px-3 py-1">{s.grade}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5 group-hover:text-indigo-700 transition-colors">{s.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{s.subject}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{s.pages} pages</span>
                  <Link to="/contact" className="text-indigo-600 font-semibold hover:underline">Get Similar →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ──────────────────────────────────────────────
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-700 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-indigo-200 text-lg">Get in touch and let our experts help you succeed.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-semibold text-gray-900 text-xl mb-2">Message Sent!</h3>
                <p className="text-gray-500">Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-indigo-600 font-semibold hover:underline">Send another message</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-sm transition-all"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-sm transition-all"
                      placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                  <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-sm transition-all"
                    placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-sm transition-all resize-none"
                    placeholder="Describe your assignment or question..." />
                </div>
                <button onClick={handleSubmit}
                  className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all">
                  Send Message
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600 leading-relaxed">Our team is available 24/7 to assist you with any academic query. Reach out through any channel below.</p>
            </div>
            {[
              { icon: '📍', title: 'UK Office', info: '124 City Road, London, England, EC1V 2NX' },
              { icon: '📍', title: 'Pakistan Office', info: '602 A, Meher Apartments, H-13 Islamabad' },
              { icon: '📧', title: 'Email Us', info: 'support@zenedify.com' },
              { icon: '💬', title: 'WhatsApp', info: 'Available 24/7 for instant help' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</div>
                  <div className="text-gray-500 text-sm">{item.info}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PORTFOLIO PAGE ────────────────────────────────────────────
const portfolioItems = [
  { title: 'FEA Analysis of Beam Structures', category: 'Mechanical', icon: '⚙️', stars: 5 },
  { title: 'Smart Grid Power Distribution System', category: 'Electrical', icon: '⚡', stars: 5 },
  { title: 'Chemical Plant Process Simulation', category: 'Chemical', icon: '🧪', stars: 5 },
  { title: 'Full-Stack E-Commerce Platform', category: 'CS', icon: '💻', stars: 5 },
  { title: 'Heat Exchanger Design Report', category: 'Chemical', icon: '🧪', stars: 5 },
  { title: 'Neural Network Image Classifier', category: 'CS', icon: '🤖', stars: 5 },
  { title: 'PLC Automation Control System', category: 'Electrical', icon: '⚡', stars: 5 },
  { title: 'Fluid Dynamics CFD Simulation', category: 'Mechanical', icon: '⚙️', stars: 5 },
  { title: 'Blockchain Smart Contract App', category: 'CS', icon: '🔗', stars: 5 },
];

const categories = ['All', 'Mechanical', 'Electrical', 'Chemical', 'CS'];

export function PortfolioPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? portfolioItems : portfolioItems.filter(p => p.category === active);

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-700 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Our Portfolio</h1>
          <p className="text-indigo-200 text-lg">A showcase of the exceptional academic work delivered by our experts.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${active === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className="h-36 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center text-5xl">
                  {item.icon}
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1">{item.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-3 mb-2 group-hover:text-indigo-700 transition-colors">{item.title}</h3>
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FAQS PAGE ─────────────────────────────────────────────────
const faqs = [
  { q: 'How do I place an order?', a: 'Simply click "Hire Expert", fill in your assignment details, and we will match you with the most qualified tutor for your subject.' },
  { q: 'Is my information kept confidential?', a: 'Absolutely. We follow strict data privacy policies. Your personal information and assignment details are never shared with third parties.' },
  { q: 'How fast can you complete my assignment?', a: 'We offer turnarounds from a few hours to several weeks depending on complexity. Express delivery is available for urgent deadlines.' },
  { q: 'What if I am not satisfied with the work?', a: 'We offer unlimited free revisions until you are completely satisfied. Your satisfaction is our top priority.' },
  { q: 'Do you cover all subjects?', a: 'We cover a vast range including Engineering, Computer Science, Business, Medicine, Law, Mathematics, Social Sciences, and many more.' },
  { q: 'Are your tutors qualified?', a: 'Yes. All our tutors are carefully vetted professionals holding advanced degrees (Masters or PhD) from accredited universities.' },
  { q: 'How do I communicate with my tutor?', a: 'You can communicate directly through our messaging system, available 24/7. You will receive real-time updates on your order progress.' },
  { q: 'Is the work plagiarism-free?', a: 'Yes. Every piece of work is original and written from scratch. We provide plagiarism reports upon request.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, PayPal, and other secure payment gateways for your convenience.' },
  { q: 'Can I get a refund?', a: 'We have a clear refund policy. If the work does not meet the agreed requirements after revisions, you may be eligible for a full or partial refund.' },
];

export function FAQsPage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-700 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-indigo-200 text-lg">Everything you need to know about Zenedify's services.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 overflow-hidden transition-all">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 text-indigo-500 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-indigo-50 rounded-3xl p-8 text-center border border-indigo-100">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 text-sm mb-5">Our support team is available 24/7 to help with any queries.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
