import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Users, Scissors,
  Settings, LogOut, Menu, X, ChevronRight, Lock, ArrowRight
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Calendar, label: 'Appointments', href: '/admin/appointments' },
  { icon: Scissors, label: 'Services & Pricing', href: '/admin/services' },
  { icon: Users, label: 'Stylist Roster', href: '/admin/stylists' },
  { icon: Users, label: 'Client Records', href: '/admin/customers' },
  { icon: Settings, label: 'Salon Settings', href: '/admin/settings' },
];

export default function AdminLayout() {
  const { settings, bookings } = useSalon();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('elora_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo passcode validation for demonstration to salon client
    if (passcode === '1234' || passcode === 'elora' || passcode === 'admin') {
      sessionStorage.setItem('elora_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid demo PIN. Try 1234 or click Demo Quick Access below.');
    }
  };

  const handleDemoAccess = () => {
    sessionStorage.setItem('elora_admin_auth', 'true');
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('elora_admin_auth');
    setIsAuthenticated(false);
  };

  // If not authenticated, render luxury admin access gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#151412] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#201E1A] border border-[#2E2B25] p-8 max-w-md w-full rounded-[2px] shadow-2xl text-center"
        >
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#C5A572]/10 border border-[#C5A572]/30 flex items-center justify-center text-[#C5A572]">
            <Lock size={24} />
          </div>

          <h1 className="font-serif text-2xl font-bold text-[#F7F3EC] mb-1">
            ÉLORA <span className="text-[#C5A572]">SALON</span>
          </h1>
          <p className="font-sans text-xs text-[#A9A197] tracking-widest uppercase mb-6">
            Management Portal Access
          </p>

          {authError && (
            <div className="mb-4 p-3 bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-xs font-sans rounded-[2px]">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Demo PIN (e.g. 1234)"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="form-input w-full bg-[#151412] border-[#2E2B25] text-center text-[#F7F3EC] tracking-widest text-lg py-2.5 rounded-[2px]"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="btn-gold w-full justify-center text-xs py-2.5"
            >
              Sign In to Management <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#2E2B25] flex flex-col gap-2">
            <button
              onClick={handleDemoAccess}
              className="text-xs text-[#C5A572] hover:underline font-sans"
            >
              Client Demo Quick Access (Auto-Unlock)
            </button>
            <Link to="/" className="text-xs text-[#A9A197] hover:text-[#F7F3EC] transition-colors mt-2">
              Return to Public Salon Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151412] flex text-[#F7F3EC]">
      {/* Sidebar */}
      <aside className="admin-sidebar fixed left-0 top-0 bottom-0 z-40 hidden lg:flex flex-col bg-[#201E1A] border-r border-[#2E2B25] w-[260px]">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-[#2E2B25]">
          <Link to="/" className="font-serif text-lg font-bold text-[#F7F3EC] tracking-wider">
            ÉLORA<span className="text-[#C5A572] ml-1.5 font-light">SALON</span>
          </Link>
          <p className="font-sans text-[10px] text-[#A9A197] tracking-widest uppercase mt-0.5">
            Administration Suite
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map(({ icon: Icon, label, href }) => (
            <NavLink
              key={href}
              to={href}
              end={href === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-xs font-sans tracking-wide transition-colors border-l-2 ${
                  isActive
                    ? 'border-[#C5A572] text-[#C5A572] bg-[#C5A572]/10 font-semibold'
                    : 'border-transparent text-[#A9A197] hover:text-[#F7F3EC] hover:bg-[#151412]/50'
                }`
              }
            >
              <Icon size={16} />
              {label}
              {label === 'Appointments' && pendingCount > 0 && (
                <span className="ml-auto bg-[#C5A572] text-[#151412] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {pendingCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#2E2B25] p-4 bg-[#151412]/40">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-8 h-8 bg-[#C5A572]/20 border border-[#C5A572]/30 flex items-center justify-center rounded-[2px]">
              <span className="font-sans text-xs font-bold text-[#C5A572]">AB</span>
            </div>
            <div className="truncate">
              <p className="font-sans text-xs font-bold text-[#F7F3EC] truncate">Abhi (Admin)</p>
              <p className="font-sans text-[10px] text-[#A9A197] truncate">{settings.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-[#A9A197] hover:text-[#ef4444] transition-colors w-full px-2 py-2"
          >
            <LogOut size={14} /> Exit Admin Session
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 z-50 flex flex-col lg:hidden w-[260px] bg-[#201E1A] border-r border-[#2E2B25]"
            >
              <div className="px-6 py-5 border-b border-[#2E2B25] flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-[#F7F3EC]">
                  ÉLORA<span className="text-[#C5A572] ml-1 font-light">SALON</span>
                </span>
                <button onClick={() => setSidebarOpen(false)} className="text-[#A9A197] hover:text-[#F7F3EC]">
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 py-4">
                {navItems.map(({ icon: Icon, label, href }) => (
                  <NavLink
                    key={href}
                    to={href}
                    end={href === '/admin'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-6 py-3 text-xs font-sans tracking-wide transition-colors border-l-2 ${
                        isActive
                          ? 'border-[#C5A572] text-[#C5A572] bg-[#C5A572]/10 font-semibold'
                          : 'border-transparent text-[#A9A197] hover:text-[#F7F3EC]'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={16} />
                    {label}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#201E1A]/95 backdrop-blur-md border-b border-[#2E2B25] px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#A9A197] hover:text-[#F7F3EC] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="hidden lg:flex items-center gap-2 text-sm font-sans text-[#A9A197]">
            <Link to="/" className="hover:text-[#C5A572] transition-colors">
              {settings.salonName}
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#F7F3EC]">Management Hub</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/book"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#C5A572] border border-[#C5A572]/30 px-3 py-1.5 rounded-[2px] hover:bg-[#C5A572]/10 transition-colors"
            >
              Public Client View
            </Link>
            <div className="flex items-center gap-2 text-xs font-sans text-[#A9A197]">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span className="hidden sm:inline">Demo Operational</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
