import { cn } from "@/lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl transition-all duration-200",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("font-semibold text-[var(--color-text-heading)] leading-snug", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-xs text-[var(--color-text-faint)] leading-relaxed", className)}
      {...props}
    />
  );
}

export { Card, CardTitle, CardDescription };
