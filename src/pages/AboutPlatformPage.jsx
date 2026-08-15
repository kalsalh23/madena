import { Info } from 'lucide-react';
import Container from '@/components/ui/Container';
import AboutPlatform from '@/components/home/AboutPlatform';
import { useSEO } from '@/hooks/useSEO';
import { SITE } from '@/lib/constants';

export default function AboutPlatformPage() {
  useSEO({ title: 'عن المنصة' });

  return (
    <div className="pt-28 pb-16">
      <Container className="max-w-[1600px] px-3 sm:px-4 lg:px-6">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-800 text-gold-400">
            <Info className="h-7 w-7" />
          </span>
          <div>
            <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">عن المنصة</h1>
            <p className="mt-2 text-sm text-ink-100">معلومات عامة عن منصة {SITE.name}</p>
          </div>
        </div>
        <AboutPlatform />
      </Container>
    </div>
  );
}
