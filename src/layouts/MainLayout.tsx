import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingBooking from '../components/FloatingBooking';
import ScrollToTop from '../components/ScrollToTop';

export default function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#111110]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {!isHomePage && <FloatingBooking />}
    </div>
  );
}
