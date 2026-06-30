import { Button } from '@/components/ui/button';

// Confirmation screen shown after a successful order submission.
export default function OrderSuccess({ name, subject, serviceLabel, dial, phone, onReset }) {
  return (
    <div className="text-center py-10 animate-fade-in">
      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
        ✓
      </div>
      <h3 className="font-display text-2xl font-bold mb-3 text-[var(--color-text-heading)]">
        Order Request Received!
      </h3>
      <p className="text-[var(--color-text-muted)] text-[15px] leading-relaxed max-w-md mx-auto mb-8">
        Thank you, <strong className="text-white">{name}</strong>. Our expert support team has received your request for <strong className="text-white">{subject}</strong> ({serviceLabel}) and is matching you with a specialist.
      </p>
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[var(--color-text-faint)] max-w-sm mx-auto mb-8">
        We will reach out to you on <span className="text-white font-semibold">{dial} {phone}</span> within 15 minutes.
      </div>
      <Button onClick={onReset}>Place Another Order</Button>
    </div>
  );
}
