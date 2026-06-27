'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, Eye, EyeOff } from 'lucide-react';

/* ─── Inline Logo (white squircle + black arch) ─────────────────────────── */
function AcezonLogo({ size = 48 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 48 48">
      <defs>
        <filter id="lgl-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="9" fill="#FFFFFF" filter="url(#lgl-shadow)" />
      <g transform="translate(-2,-2.78) scale(0.52)">
        <path
          d="M 21,77 C 17,83 24,85 27.5,79.5 C 35,69 42,49 50,49 C 58,49 65,69 72.5,79.5 C 76,85 83,83 79,77 C 72,61 63,20 50,20 C 37,20 28,61 21,77 Z"
          fill="#000000"
        />
      </g>
    </svg>
  );
}

/* ─── Decorative illustration panel ─────────────────────────────────────── */
function IllustrationPanel() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center flex-1 p-12 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,255,255,0.04),transparent)]" />

      {/* Central monitor illustration */}
      <svg viewBox="0 0 320 280" className="w-72 h-auto relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ambient blob left */}
        <ellipse cx="80" cy="160" rx="65" ry="65" fill="rgba(255,255,255,0.04)" />
        {/* Ambient blob right */}
        <ellipse cx="240" cy="100" rx="50" ry="50" fill="rgba(255,255,255,0.03)" />

        {/* Monitor body */}
        <rect x="60" y="40" width="200" height="150" rx="14" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5" />
        {/* Screen */}
        <rect x="74" y="54" width="172" height="122" rx="8" fill="#111111" />

        {/* Screen content – document lines */}
        <rect x="90" y="72" width="90" height="8" rx="3" fill="#2a2a2a" />
        <rect x="90" y="88" width="140" height="5" rx="2.5" fill="#222222" />
        <rect x="90" y="100" width="120" height="5" rx="2.5" fill="#222222" />
        <rect x="90" y="112" width="100" height="5" rx="2.5" fill="#222222" />
        <rect x="90" y="124" width="130" height="5" rx="2.5" fill="#222222" />
        <rect x="90" y="136" width="80" height="5" rx="2.5" fill="#222222" />

        {/* Check badge */}
        <circle cx="218" cy="130" r="22" fill="#1f1f1f" stroke="#2a2a2a" strokeWidth="1.5" />
        <circle cx="218" cy="130" r="16" fill="#ffffff" opacity="0.08" />
        {/* Checkmark */}
        <polyline points="210,130 215,136 227,122" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Monitor stand */}
        <rect x="148" y="190" width="24" height="24" rx="2" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <rect x="128" y="212" width="64" height="8" rx="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />

        {/* User avatar below */}
        <circle cx="160" cy="232" r="18" fill="#1f1f1f" stroke="#2a2a2a" strokeWidth="1.5" />
        {/* Head */}
        <circle cx="160" cy="226" r="6" fill="#333333" />
        {/* Body arc */}
        <path d="M 148,244 Q 160,238 172,244" stroke="#333333" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Lock badge */}
        <circle cx="172" cy="240" r="9" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.2" />
        <rect x="169" y="240" width="6" height="5" rx="1" fill="#555555" />
        <path d="M 169.5,240 Q 169.5,236.5 172,236.5 Q 174.5,236.5 174.5,240" stroke="#555555" strokeWidth="1.2" fill="none" />

        {/* Floating dots */}
        <circle cx="50" cy="80" r="4" fill="rgba(255,255,255,0.12)" />
        <circle cx="275" cy="200" r="3" fill="rgba(255,255,255,0.08)" />
        <circle cx="290" cy="60" r="2.5" fill="rgba(255,255,255,0.06)" />
        <circle cx="40" cy="210" r="2" fill="rgba(255,255,255,0.08)" />

        {/* Dashed orbit */}
        <circle cx="160" cy="135" r="108" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5 7" />
      </svg>

      <p className="relative z-10 mt-8 text-center text-sm text-[var(--color-text-faint)] max-w-[220px] leading-relaxed">
        Secure access to the Acezon admin workspace
      </p>
    </div>
  );
}

/* ─── Main login component ───────────────────────────────────────────────── */
export default function LoginGateClient() {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError('Invalid email or password. Please try again.');
      return;
    }
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4 py-8">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.04),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-3xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-[var(--shadow-lg)] flex">

        {/* Left — illustration */}
        <IllustrationPanel />

        {/* Divider */}
        <div className="hidden lg:block w-px bg-[var(--color-border)] self-stretch" />

        {/* Right — form */}
        <div className="w-full lg:w-[360px] shrink-0 flex flex-col items-center justify-center p-8 lg:p-10">

          {/* Logo */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <AcezonLogo size={52} />
            <div className="text-center">
              <div className="text-white font-bold text-lg tracking-[-0.02em] leading-none">Acezon</div>
              <div className="text-[var(--color-text-faint)] text-[11px] font-medium tracking-widest uppercase mt-0.5">Admin Panel</div>
            </div>
          </div>

          {/* Heading */}
          <div className="w-full mb-6">
            <div className="w-5 h-[2px] bg-white/40 rounded mb-3" />
            <h1 className="font-display text-xl font-bold text-[var(--color-text-heading)] leading-snug">
              Login as an Admin User
            </h1>
          </div>

          {/* Form */}
          <div className="w-full flex flex-col gap-3">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                required
                placeholder="admin@acezon.app"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl px-4 py-3 pr-11 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl px-4 py-3 pr-11 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-white transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-400 text-center bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full mt-1 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-[11px] text-[var(--color-text-faint)] text-center leading-relaxed">
            Only Acezon team members can access this panel.
          </p>
        </div>
      </div>
    </div>
  );
}
