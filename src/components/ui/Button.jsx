import { cn } from '@/lib/utils';

const variants = {
  primary: 'btn-primary',
  gold: 'btn-gold',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const sizes = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };
  return (
    <button
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
