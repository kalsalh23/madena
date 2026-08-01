import { cn } from '@/lib/utils';

export default function Spinner({ className }) {
  return (
    <span
      className={cn(
        'inline-block h-5 w-5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-800',
        className
      )}
    />
  );
}
