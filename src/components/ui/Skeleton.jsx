import { cn } from '@/lib/utils';

export default function Skeleton({ className }) {
  return <div className={cn('skeleton', className)} />;
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn('card-surface overflow-hidden', className)}>
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 4, className }) {
  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
