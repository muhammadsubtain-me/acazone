import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function HeroDots() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const COLORS = [
      'rgba(255, 255, 255, VAL)',
      'rgba(220, 220, 220, VAL)',
      'rgba(180, 180, 180, VAL)',
      'rgba(140, 140, 140, VAL)',
      'rgba(255, 255, 255, VAL)',
    ];

    let W, H, dots, raf;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function makeDot() {
      const r = 1.5 + Math.random() * 3;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const alpha = 0.2 + Math.random() * 0.5;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r,
        color: color.replace('VAL', alpha),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.006 + Math.random() * 0.012,
        baseR: r,
        alpha,
      };
    }

    function init() {
      resize();
      const count = Math.floor((W * H) / 12000);
      dots = Array.from({ length: count }, makeDot);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Connection lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Dots
      dots.forEach(d => {
        d.pulse += d.pulseSpeed;
        const scale = 1 + Math.sin(d.pulse) * 0.2;
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -20) d.x = W + 20;
        if (d.x > W + 20) d.x = -20;
        if (d.y < -20) d.y = H + 20;
        if (d.y > H + 20) d.y = -20;

        const R = d.baseR * scale;

        // Outer wide glow
        const outerGrd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, R * 12);
        outerGrd.addColorStop(0, `rgba(255,255,255,${d.alpha * 0.18})`);
        outerGrd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(d.x, d.y, R * 12, 0, Math.PI * 2);
        ctx.fillStyle = outerGrd;
        ctx.fill();

        // Inner tight glow
        const innerGrd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, R * 6);
        innerGrd.addColorStop(0, `rgba(255,255,255,${d.alpha * 0.45})`);
        innerGrd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(d.x, d.y, R * 6, 0, Math.PI * 2);
        ctx.fillStyle = innerGrd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(d.x, d.y, R, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

export default function Hero() {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      backgroundColor: 'var(--color-hero-bg)',
      minHeight: '90vh', display: 'flex', alignItems: 'center',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Subtle white glow blobs */}
        <div style={{
          position: 'absolute', top: -160, right: -100, width: 440, height: 440,
          background: 'rgba(255,255,255,0.03)', borderRadius: '50%', filter: 'blur(90px)',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -80, width: 360, height: 360,
          background: 'rgba(255,255,255,0.02)', borderRadius: '50%', filter: 'blur(80px)',
        }} />
        <HeroDots />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32 flex flex-col items-center text-center">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: 'var(--color-text-heading)' }}>
            Get Help From{' '}
            <span style={{ color: 'var(--color-accent-muted)' }}>Academic</span>{' '}
            Experts
          </h1>

          <p style={{ color: 'var(--color-text-muted)', fontSize: 18, lineHeight: 1.7, marginBottom: 32, maxWidth: 560, textAlign: 'center' }} className="mx-auto">
            Get academic assistance from ZenEdify to earn the grades you desire. We have top professionals in academic assignment writing, essay writing, dissertation proposals, homework, exam preparation and lab task practical services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 12, fontWeight: 600, fontSize: 15,
              backgroundColor: 'var(--color-btn-primary-bg)',
              color: 'var(--color-btn-primary-text)',
              textDecoration: 'none', transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(255,255,255,0.15)',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(255,255,255,0.28)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'none'; }}
            >
              Hire Expert
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link to="/samples" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 12, fontWeight: 600, fontSize: 15,
              backgroundColor: 'transparent',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border-hover)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#888'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.color = 'var(--color-text)'; }}
            >
              View Samples
            </Link>
          </div>


        </div>
      </div>
      {/* Curved bottom divider */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 100 }}>
          <defs>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Fill */}
          <path d="M0,100 C360,50 1080,50 1440,100 L1440,100 L0,100 Z" fill="#111111" />
          {/* Glowing curve line */}
          <path d="M0,100 C360,50 1080,50 1440,100" fill="none"
            stroke="rgba(255,255,255,0.45)" strokeWidth="3" filter="url(#glowFilter)" />
        </svg>
      </div>
    </section>
  );
}