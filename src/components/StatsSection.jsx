import { useState, useEffect, useRef } from 'react';

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Clients', icon: '😊' },
  { value: 4800, suffix: '+', label: 'Feedbacks', icon: '💬' },
  { value: 200, suffix: '+', label: 'Expert Tutors', icon: '👩‍🏫' },
  { value: 10000, suffix: '+', label: 'Completed Projects', icon: '🏆' },
];

export default function StatsSection() {
  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: 'var(--color-surface)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(var(--dot-color) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-heading)' }}>
            Better Strategy With Quality Business
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 17 }}>Numbers that speak to our commitment and excellence</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} style={{
              textAlign: 'center',
              backgroundColor: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 16, padding: 24,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
              <div className="font-display text-4xl font-bold mb-1" style={{ color: 'var(--color-text-heading)' }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 13, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
