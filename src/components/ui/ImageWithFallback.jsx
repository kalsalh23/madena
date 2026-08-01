import { useState } from 'react';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function ImageWithFallback({ src, alt = '', className, ...props }) {
  const [error, setError] = useState(false);
  return (
    <img
      src={error || !src ? PLACEHOLDER_IMAGE : src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className={cn('object-cover', className)}
      {...props}
    />
  );
}
