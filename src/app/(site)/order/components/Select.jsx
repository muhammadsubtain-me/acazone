import { ChevronDown } from 'lucide-react';

// Styled wrapper around a native <select> so it matches the form's inputs.
export default function Select({ className = '', children, ...props }) {
  return (
    <div className="relative w-full">
      <select
        className={`flex w-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 pr-10 text-sm text-[var(--color-text)] outline-none transition-all focus:border-[var(--color-border-focus)] disabled:cursor-not-allowed disabled:opacity-50 rounded-xl appearance-none cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--color-text-muted)]">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}
