import { useDocumentTitle } from '@/hooks';
import Container from '@/components/ui/Container';

const REPORTS_URL = 'https://iblaghtaybeh.vercel.app';

export default function ReportsPage() {
  useDocumentTitle('إبلاغات المدينة');
  return (
    <div className="pt-16 lg:pt-20">
      <Container className="pb-4 pt-6 text-center">
        <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">خدمات المواطن</span>
        <h1 className="mt-3 font-display text-2xl font-black text-brand-900 sm:text-3xl">إبلاغات المدينة</h1>
        <p className="mt-2 text-sm text-ink-100">
          منصة متكاملة داخل بوابة المدينة لاستقبال ملاحظاتك وبلاغاتك واقتراحاتك.
        </p>
      </Container>
      <div className="h-[calc(100vh-12rem)] w-full overflow-hidden bg-white">
        <iframe
          src={REPORTS_URL}
          title="منصة إبلاغات المدينة"
          className="h-full w-full border-0"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
}
