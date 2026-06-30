import { cn } from '@/lib/utils';
import { containers } from '@/lib/responsive';

const VARIANTS = {
  default: containers.default,
  narrow: containers.narrow,
  hero: containers.hero,
  medium: containers.medium,
};

export default function Container({
  children,
  className,
  variant = 'default',
  as: Tag = 'div',
}) {
  return (
    <Tag className={cn(VARIANTS[variant] ?? containers.default, className)}>
      {children}
    </Tag>
  );
}
