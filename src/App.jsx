import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import Spinner from '@/components/ui/Spinner';
import { ADMIN_BASE_PATH } from '@/lib/constants';

const Home = lazy(() => import('@/pages/Home'));
const NewsListPage = lazy(() => import('@/pages/NewsListPage'));
const NewsDetailPage = lazy(() => import('@/pages/NewsDetailPage'));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const PlacesPage = lazy(() => import('@/pages/PlacesPage'));
const PlaceDetailPage = lazy(() => import('@/pages/PlaceDetailPage'));
const MapPage = lazy(() => import('@/pages/MapPage'));
const VideosPage = lazy(() => import('@/pages/VideosPage'));
const EventsPage = lazy(() => import('@/pages/EventsPage'));
const EventDetailPage = lazy(() => import('@/pages/EventDetailPage'));
const StatisticsPage = lazy(() => import('@/pages/StatisticsPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const AboutPlatformPage = lazy(() => import('@/pages/AboutPlatformPage'));
const DynamicPage = lazy(() => import('@/pages/DynamicPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const LoginPage = lazy(() => import('@/pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));
const NewsManagePage = lazy(() => import('@/pages/admin/NewsManagePage'));
const ProjectsManagePage = lazy(() => import('@/pages/admin/ProjectsManagePage'));
const PlacesManagePage = lazy(() => import('@/pages/admin/PlacesManagePage'));
const VideosManagePage = lazy(() => import('@/pages/admin/VideosManagePage'));
const EventsManagePage = lazy(() => import('@/pages/admin/EventsManagePage'));
const StatisticsManagePage = lazy(() => import('@/pages/admin/StatisticsManagePage'));
const CategoriesManagePage = lazy(() => import('@/pages/admin/CategoriesManagePage'));
const PagesManagePage = lazy(() => import('@/pages/admin/PagesManagePage'));
const PartnersManagePage = lazy(() => import('@/pages/admin/PartnersManagePage'));
const AdsManagePage = lazy(() => import('@/pages/admin/AdsManagePage'));
const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage'));
const AdminAboutPlatformPage = lazy(() => import('@/pages/admin/AboutPlatformPage'));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner className="h-9 w-9" />
    </div>
  );
}

function withSuspense(component) {
  return <Suspense fallback={<PageLoader />}>{component}</Suspense>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={withSuspense(<Home />)} />
        <Route path="/news" element={withSuspense(<NewsListPage />)} />
        <Route path="/news/:slug" element={withSuspense(<NewsDetailPage />)} />
        <Route path="/projects" element={withSuspense(<ProjectsPage />)} />
        <Route path="/projects/:slug" element={withSuspense(<ProjectDetailPage />)} />
        <Route path="/places" element={withSuspense(<PlacesPage />)} />
        <Route path="/places/:slug" element={withSuspense(<PlaceDetailPage />)} />
        <Route path="/map" element={withSuspense(<MapPage />)} />
        <Route path="/videos" element={withSuspense(<VideosPage />)} />
        <Route path="/events" element={withSuspense(<EventsPage />)} />
        <Route path="/events/:slug" element={withSuspense(<EventDetailPage />)} />
        <Route path="/statistics" element={withSuspense(<StatisticsPage />)} />
        <Route path="/search" element={withSuspense(<SearchPage />)} />
        <Route path="/about-platform" element={withSuspense(<AboutPlatformPage />)} />
        <Route path="/:slug" element={withSuspense(<DynamicPage />)} />
      </Route>

      <Route path={`${ADMIN_BASE_PATH}/login`} element={withSuspense(<LoginPage />)} />
      <Route
        path={ADMIN_BASE_PATH}
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={withSuspense(<DashboardPage />)} />
        <Route path="news" element={withSuspense(<NewsManagePage />)} />
        <Route path="projects" element={withSuspense(<ProjectsManagePage />)} />
        <Route path="places" element={withSuspense(<PlacesManagePage />)} />
        <Route path="videos" element={withSuspense(<VideosManagePage />)} />
        <Route path="events" element={withSuspense(<EventsManagePage />)} />
        <Route path="statistics" element={withSuspense(<StatisticsManagePage />)} />
        <Route path="categories" element={withSuspense(<CategoriesManagePage />)} />
        <Route path="pages" element={withSuspense(<PagesManagePage />)} />
        <Route path="partners" element={withSuspense(<PartnersManagePage />)} />
        <Route path="ads" element={withSuspense(<AdsManagePage />)} />
        <Route path="settings" element={withSuspense(<SettingsPage />)} />
        <Route path="about" element={withSuspense(<AdminAboutPlatformPage />)} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
      <Route path="/404" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
