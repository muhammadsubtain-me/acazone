import { useState } from 'react';

const testimonials = [
  {
    name: 'Maha Al Sulaiti', role: 'Student', avatar: '👩‍🎓',
    text: 'When I was writing my dissertation, I used ZenEdify for the first time. I had run out of time and only needed to finish it. They helped my friend with her homework and essays, so she forwarded the information. Since then, we have collaborated quite a bit, and I cannot imagine not using their services.',
    rating: 5,
  },
  {
    name: 'Mahmoud Elgad', role: 'Student', avatar: '👨‍🎓',
    text: 'My friend recommended this website, and I am glad I tried it. I had three days to complete an essay assignment. I am grateful for the wonderful experience — the quality exceeded what I expected for such a tight deadline.',
    rating: 5,
  },
  {
    name: 'Alicia Patrick', role: 'Student', avatar: '👩‍💻',
    text: 'It was the end of the semester, and I needed help with my project. It is a coincidence that I stumbled upon this website. The quality of the project they delivered was beyond my expectations! Highly recommend them.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--color-text-muted)',
            background: 'var(--color-accent-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 16,
          }}>Testimonials</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text-heading)' }}>
            What Clients Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 24, padding: '40px 40px',
            position: 'relative', marginBottom: 32,
          }}>
            <div style={{ fontSize: 56, color: 'var(--color-border-hover)', fontWeight: 800, lineHeight: 1, marginBottom: 16 }}>"</div>
            <p style={{ color: 'var(--color-text)', fontSize: 17, lineHeight: 1.75, marginBottom: 24 }}>
              {testimonials[active].text}
            </p>
            <div className="flex items-center gap-4">
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                backgroundColor: 'var(--color-surface-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              }}>
                {testimonials[active].avatar}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-text-heading)' }}>{testimonials[active].name}</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{testimonials[active].role}</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--color-star)' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                border: 'none', cursor: 'pointer', borderRadius: 100,
                transition: 'all 0.3s',
                width: i === active ? 32 : 12, height: 12,
                backgroundColor: i === active ? 'var(--color-accent)' : 'var(--color-border-hover)',
              }} />
            ))}
          </div>

          {/* Thumbnail avatars */}
          <div className="flex justify-center gap-4 mt-6">
            {testimonials.map((t, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: 48, height: 48, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                backgroundColor: i === active ? 'var(--color-surface-3)' : 'var(--color-surface)',
                outline: i === active ? '2px solid var(--color-accent)' : 'none',
                outlineOffset: 2,
                transform: i === active ? 'scale(1.1)' : 'scale(1)',
                opacity: i === active ? 1 : 0.5,
              }}>
                {t.avatar}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
