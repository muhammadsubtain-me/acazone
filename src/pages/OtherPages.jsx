import { useState } from 'react';
import { Link } from 'react-router-dom';

/* ── Shared hero banner ─────────────────────────────────────────────────────── */
function PageHero({ title, subtitle }) {
  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: 'var(--color-surface)',
      textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(var(--dot-color) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />
      <div className="relative max-w-3xl mx-auto px-4">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>{title}</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 17 }}>{subtitle}</p>
      </div>
    </section>
  );
}

/* ── ABOUT ──────────────────────────────────────────────────────────────────── */
export function AboutPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <PageHero title="About ZenEdify" subtitle="Your trusted academic partner, built on expertise and integrity." />

      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--color-text-muted)',
              background: 'var(--color-accent-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 20,
            }}>Our Story</span>
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--color-text-heading)' }}>Who We Are</h2>
            {[
              'ZenEdify was founded with a single mission: to provide students worldwide with access to world-class academic expertise. We believe every student deserves the support they need to reach their full potential.',
              'Our platform connects students with verified subject matter experts who provide personalized, high-quality academic assistance. Whether you\'re struggling with a complex engineering problem or need help polishing a dissertation, ZenEdify has you covered.',
              'With tutors from top universities across the globe and a commitment to academic excellence, we\'ve helped thousands of students achieve the grades they deserve — on time, every time.',
            ].map((p, i) => (
              <p key={i} style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 16 }}>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Our Mission', desc: 'Empower every student with expert academic support to unlock their true potential.' },
              { icon: '👁️', title: 'Our Vision', desc: 'Become the most trusted global platform for academic excellence and student success.' },
              { icon: '💎', title: 'Our Values', desc: 'Integrity, quality, confidentiality, and student-first thinking in everything we do.' },
              { icon: '🌍', title: 'Global Reach', desc: 'Serving students across 50+ countries with localized expertise and 24/7 support.' },
            ].map((item) => (
              <div key={item.title} style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 16, padding: 20,
              }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                <h4 style={{ fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 8 }}>{item.title}</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-10" style={{ color: 'var(--color-text-heading)' }}>Our Expert Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['⚙️ Mechanical', '⚡ Electrical', '🧪 Chemical', '💻 CS & IT'].map((dept) => (
              <div key={dept} style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 16, padding: 24,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>{dept.split(' ')[0]}</div>
                <div style={{ fontWeight: 600, color: 'var(--color-text-heading)' }}>{dept.split(' ').slice(1).join(' ')}</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 4 }}>Department</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── SAMPLES ────────────────────────────────────────────────────────────────── */
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
    <div style={{ minHeight: '100vh' }}>
      <PageHero title="Work Samples" subtitle="Browse examples of the high-quality academic work our experts deliver." />
      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((s) => (
              <div key={s.title} style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 16, padding: 24,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    backgroundColor: 'var(--color-surface-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>{s.icon}</div>
                  <span style={{
                    fontSize: 12, fontWeight: 700, color: '#4ade80',
                    backgroundColor: 'rgba(74,222,128,0.1)',
                    border: '1px solid rgba(74,222,128,0.2)',
                    borderRadius: 100, padding: '4px 12px',
                  }}>{s.grade}</span>
                </div>
                <h3 style={{ fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 12 }}>{s.subject}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--color-text-faint)' }}>
                  <span>{s.pages} pages</span>
                  <Link to="/contact" style={{ color: 'var(--color-accent-muted)', fontWeight: 600, textDecoration: 'none' }}>Get Similar →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── CONTACT ────────────────────────────────────────────────────────────────── */
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)',
    color: 'var(--color-text)', fontSize: 14,
    outline: 'none', transition: 'all 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <PageHero title="Contact Us" subtitle="Get in touch and let our experts help you succeed." />
      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 24, padding: 32,
          }}>
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--color-text-heading)' }}>Send a Message</h2>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontWeight: 600, color: 'var(--color-text-heading)', fontSize: 20, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} style={{
                  marginTop: 24, color: 'var(--color-accent-muted)', fontWeight: 600,
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: 14,
                }}>Send another message</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: 6 }}>Full Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="Your full name" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: 6 }}>Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: 6 }}>Subject</label>
                  <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={inputStyle} placeholder="How can we help?" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: 6 }}>Message</label>
                  <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'none' }} placeholder="Describe your assignment or question..." />
                </div>
                <button onClick={() => setSent(true)} style={{
                  padding: '14px', borderRadius: 12, fontWeight: 600, fontSize: 14,
                  backgroundColor: 'var(--color-btn-primary-bg)',
                  color: 'var(--color-btn-primary-text)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                }}>Send Message</button>
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>Get in Touch</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>Our team is available 24/7 to assist you with any academic query. Reach out through any channel below.</p>
            </div>
            {[
              { icon: '📍', title: 'UK Office', info: '124 City Road, London, England, EC1V 2NX' },
              { icon: '📍', title: 'Pakistan Office', info: '602 A, Meher Apartments, H-13 Islamabad' },
              { icon: '📧', title: 'Email Us', info: 'support@ZenEdify.com' },
              { icon: '💬', title: 'WhatsApp', info: 'Available 24/7 for instant help' },
            ].map((item) => (
              <div key={item.title} style={{
                display: 'flex', gap: 16,
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 16, padding: 20,
              }}>
                <div style={{ fontSize: 24 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-heading)', fontSize: 14, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>{item.info}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── PORTFOLIO ──────────────────────────────────────────────────────────────── */
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
    <div style={{ minHeight: '100vh' }}>
      <PageHero title="Our Portfolio" subtitle="A showcase of the exceptional academic work delivered by our experts." />
      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 40 }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding: '8px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                border: '1px solid',
                cursor: 'pointer', transition: 'all 0.2s',
                backgroundColor: active === cat ? 'var(--color-btn-primary-bg)' : 'var(--color-surface)',
                color: active === cat ? 'var(--color-btn-primary-text)' : 'var(--color-text-muted)',
                borderColor: active === cat ? 'transparent' : 'var(--color-border)',
              }}>{cat}</button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.title} style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 16, overflow: 'hidden',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  height: 144, backgroundColor: 'var(--color-surface-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48,
                }}>
                  {item.icon}
                </div>
                <div style={{ padding: 20 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    backgroundColor: 'var(--color-surface-3)',
                    borderRadius: 100, padding: '4px 10px',
                  }}>{item.category}</span>
                  <h3 style={{ fontWeight: 600, color: 'var(--color-text-heading)', marginTop: 12, marginBottom: 8 }}>{item.title}</h3>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--color-star)' }}>
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

/* ── FAQs ───────────────────────────────────────────────────────────────────── */
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
    <div style={{ minHeight: '100vh' }}>
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know about ZenEdify's services." />
      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 16, overflow: 'hidden',
                transition: 'all 0.2s',
              }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                  padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-heading)', fontSize: 14 }}>{faq.q}</span>
                  <svg style={{
                    width: 16, height: 16, color: 'var(--color-text-muted)', flexShrink: 0,
                    transition: 'transform 0.3s', transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {open === i && (
                  <div style={{ padding: '0 24px 20px', color: 'var(--color-text-muted)', fontSize: 14, lineHeight: 1.7, borderTop: '1px solid var(--color-border)', paddingTop: 16 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 48,
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 24, padding: 32, textAlign: 'center',
          }}>
            <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--color-text-heading)' }}>Still have questions?</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 14, marginBottom: 20 }}>Our support team is available 24/7 to help with any queries.</p>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14,
              backgroundColor: 'var(--color-btn-primary-bg)',
              color: 'var(--color-btn-primary-text)',
              textDecoration: 'none',
            }}>Contact Support</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
