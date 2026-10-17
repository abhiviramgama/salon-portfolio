import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SalonProvider } from './context/SalonContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Lazy-loaded pages for optimized code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const StylistsPage = lazy(() => import('./pages/StylistsPage'));
const StylistDetailPage = lazy(() => import('./pages/StylistDetailPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminAppointments = lazy(() => import('./pages/admin/AdminAppointments'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminStylists = lazy(() => import('./pages/admin/AdminStylists'));
const AdminCustomers = lazy(() => import('./pages/admin/AdminCustomers'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] bg-[#151412] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#C5A572]/20 border-t-[#C5A572] rounded-full animate-spin" />
        <span className="font-serif text-xs text-[#C5A572] tracking-[0.25em] uppercase font-semibold">
          ÉLORA SALON
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SalonProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Salon Site */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/:id" element={<ServiceDetailPage />} />
              <Route path="stylists" element={<StylistsPage />} />
              <Route path="stylists/:id" element={<StylistDetailPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="book" element={<BookingPage />} />
              <Route path="booking-confirmation" element={<BookingConfirmationPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Admin Management Hub */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="stylists" element={<AdminStylists />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>

            {/* 404 Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SalonProvider>
  );
}