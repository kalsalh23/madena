import { cn } from '@/lib/utils';

export default function Container({ className, children }) {
  return <div className={cn('container-site', className)}>{children}</div>;
}
