import Logo from './Logo';
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSalon } from '../context/SalonContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Our Stylists', href: '/stylists' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { settings } = useSalon();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const prevScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      setHidden(currentY > prevScrollY.current && currentY > 280);
      prevScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevKey, setPrevKey] = useState(location.key);
  if (prevKey !== location.key) {
    setPrevKey(location.key);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#151412]/95 backdrop-blur-md border-b border-[#2E2B25] py-3.5 shadow-xl shadow-black/40'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo: ÉLORA */}
            <Link to="/" className="group flex items-center" aria-label="ÉLORA Salon home">
              <Logo size={42} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-9">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `font-sans text-xs tracking-[0.15em] uppercase font-medium transition-colors relative py-1 ${
                      isActive
                        ? 'text-[#C5A572] font-semibold'
                        : 'text-[#A9A197] hover:text-[#F7F3EC]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C5A572]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* CTA + Admin Access */}
            <div className="hidden lg:flex items-center gap-5">
              <Link
                to="/admin"
                className="text-[11px] tracking-widest uppercase font-medium text-[#A9A197]/80 hover:text-[#C5A572] transition-colors font-sans"
                title="Management Demo Portal"
              >
                Admin
              </Link>
              <Link
                to="/book"
                className="btn-gold text-[11px] uppercase tracking-widest px-6 py-2.5 font-bold"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-[#F7F3EC] hover:text-[#C5A572] transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/75 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#201E1A] z-50 border-l border-[#2E2B25] flex flex-col p-6 justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#2E2B25] mb-8">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center"
                    aria-label="ÉLORA Salon home"
                  >
                    <Logo size={38} />
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="text-[#A9A197] hover:text-[#F7F3EC] p-1"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      end={link.href === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `py-3 font-sans text-xs tracking-widest uppercase font-semibold transition-colors border-b border-[#2E2B25]/50 flex items-center justify-between ${
                          isActive ? 'text-[#C5A572]' : 'text-[#A9A197] hover:text-[#F7F3EC]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <NavLink
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="py-3 font-sans text-xs tracking-widest uppercase text-[#A9A197]/70 hover:text-[#C5A572] transition-colors"
                  >
                    Admin Portal
                  </NavLink>
                </nav>
              </div>

              <div className="pt-6 border-t border-[#2E2B25]">
                <Link
                  to="/book"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold w-full justify-center text-xs uppercase tracking-widest py-3 font-bold"
                >
                  Book Now
                </Link>
                <p className="text-[10px] text-[#A9A197]/60 text-center mt-3 font-sans">
                  {settings.phone} • {settings.email}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
