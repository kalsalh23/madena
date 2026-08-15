import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Newspaper, Building2, Map, Play, CalendarDays,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

const services = [
  { to: '/news', icon: Newspaper, title: 'الأخبار', desc: 'تابع آخر أخبار المدينة وبلدياتها.', color: '#054239' },
  { to: '/projects', icon: Building2, title: 'المشاريع', desc: 'تعرف على المشاريع التنموية الجارية.', color: '#988561' },
  { to: '/places', icon: Map, title: 'دليل الأماكن', desc: 'أهم الأماكن والخدمات في المدينة.', color: '#0e7a63' },
  { to: '/events', icon: CalendarDays, title: 'الفعاليات', desc: 'جدول الفعاليات والمناسبات القادمة.', color: '#6b1f2a' },
  { to: '/videos', icon: Play, title: 'الفيديوهات', desc: 'جولات مصورة وتقارير عن المدينة.', color: '#988561' },
];

export default function Services() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="خدماتنا" title="كل ما يخص مدينتك في مكان واحد" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <Link
                to={s.to}
                className="card-surface group flex items-start gap-4 p-6 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${s.color}1a`, color: s.color }}
                >
                  <s.icon className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="mb-1 font-bold text-ink-900 group-hover:text-brand-700">{s.title}</h3>
                  <p className="text-sm leading-6 text-ink-100">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
