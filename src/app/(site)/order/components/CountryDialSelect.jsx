'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { countryCodes } from '@/lib/data';

// Self-contained country dial-code picker: owns its own open/search state and
// outside-click handling. Controlled only by `value` (iso) + `onChange(iso)`.
export default function CountryDialSelect({ value, onChange }) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  const selected = countryCodes.find(c => c.iso === value) ?? countryCodes[0];
  const filtered = countryCodes
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (iso) => {
    onChange(iso);
    setOpen(false);
    setSearch('');
  };

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="h-full flex items-center gap-2 pl-3 pr-2 bg-white/[0.04] border-r border-[var(--color-border)] rounded-l-xl hover:bg-white/[0.07] transition-colors cursor-pointer"
      >
        <img
          src={`https://flagcdn.com/w20/${selected.iso}.png`}
          srcSet={`https://flagcdn.com/w40/${selected.iso}.png 2x`}
          width="20" height="14"
          alt={selected.name}
          className="rounded-[2px] object-cover"
        />
        <span className="text-xs text-[var(--color-text-muted)] font-mono">{selected.dial}</span>
        <ChevronDown className={`w-3 h-3 text-[var(--color-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 w-56 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-[var(--color-border)]">
            <input
              autoFocus
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-xs text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)]"
            />
          </div>
          <div className="overflow-y-auto max-h-52 py-1">
            {filtered.length === 0 && (
              <p className="text-xs text-[var(--color-text-faint)] text-center py-3">No results</p>
            )}
            {filtered.map((c) => (
              <button
                key={c.iso}
                type="button"
                onClick={() => handleSelect(c.iso)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors hover:bg-white/[0.06] ${
                  value === c.iso ? 'bg-white/[0.08]' : ''
                }`}
              >
                <img
                  src={`https://flagcdn.com/w20/${c.iso}.png`}
                  srcSet={`https://flagcdn.com/w40/${c.iso}.png 2x`}
                  width="20" height="14"
                  alt={c.name}
                  className="rounded-[2px] object-cover shrink-0"
                />
                <span className="flex-1 text-[var(--color-text)] truncate">{c.name}</span>
                <span className="text-xs text-[var(--color-text-muted)] font-mono shrink-0">{c.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
