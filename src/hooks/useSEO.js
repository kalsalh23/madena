import { useEffect } from 'react';
import { SITE } from '@/lib/constants';

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`${attr}[${key}="${value}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
}

export function useSEO({ title, description, image, type = 'website', url } = {}) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || '';
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

    document.title = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;

    const metaDescription = description || SITE.description;
    setMeta('name', 'description', metaDescription);
    setMeta('property', 'og:title', document.title);
    setMeta('property', 'og:description', metaDescription);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', image || '');
    if (fullUrl) setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:site_name', SITE.name);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', document.title);
    setMeta('name', 'twitter:description', metaDescription);
    setMeta('name', 'twitter:image', image || '');
  }, [title, description, image, type, url]);
}
