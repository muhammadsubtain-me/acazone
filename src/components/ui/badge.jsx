import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border transition-colors",
  {
    variants: {
      variant: {
        default:
          "text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-muted)] bg-[var(--color-accent-bg)] border-[var(--color-border)] px-4 py-1.5 rounded-full",
        secondary:
          "text-[11px] font-bold text-[var(--color-text-muted)] bg-[var(--color-surface-3)] border-transparent px-2.5 py-1 rounded-full",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
