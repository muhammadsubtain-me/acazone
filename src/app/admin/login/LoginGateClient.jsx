'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/Logo';
import { Shield, Loader2, Eye, EyeOff } from 'lucide-react';

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
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.04),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Logo className="w-9 h-9" />
          <div>
            <div className="text-white font-bold text-xl tracking-[-0.02em]">Acezon</div>
            <div className="text-[var(--color-text-muted)] text-xs font-medium tracking-wide uppercase">Admin Panel</div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
          <div className="flex items-center justify-center w-14 h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl mx-auto mb-6">
            <Shield className="w-6 h-6 text-[var(--color-text-muted)]" />
          </div>

          <h1 className="font-display text-2xl font-bold text-center text-[var(--color-text-heading)] mb-2">
            Team Login
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm text-center mb-8">
            Sign in with your Acezon team account.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all"
            />

            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="Password"
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

            {error && (
              <p className="text-xs text-red-400 text-center bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-[11px] text-[var(--color-text-faint)] mt-6">
            Only Acezon team members can access this panel.
          </p>
        </div>
      </div>
    </div>
  );
}
