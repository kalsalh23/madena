import Hero from '@/components/home/Hero';
import AdBanner from '@/components/home/AdBanner';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import LatestNews from '@/components/home/LatestNews';
import OngoingProjects from '@/components/home/OngoingProjects';
import MapSection from '@/components/home/MapSection';
import FeaturedPlaces from '@/components/home/FeaturedPlaces';
import EventsSection from '@/components/home/EventsSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import LatestVideos from '@/components/home/LatestVideos';
import Partners from '@/components/home/Partners';
import { useSEO } from '@/hooks/useSEO';

export default function Home() {
  useSEO();

  return (
    <>
      <Hero />
      <AdBanner />
      <Stats />
      <Services />
      <LatestNews />
      <OngoingProjects />
      <MapSection />
      <FeaturedPlaces />
      <EventsSection />
      <GalleryPreview />
      <LatestVideos />
      <Partners />
    </>
  );
}
