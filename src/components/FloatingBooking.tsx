import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FloatingBooking() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8, y: visible ? 0 : 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed bottom-8 right-8 z-40 hidden lg:block"
      aria-hidden={!visible}
    >
      <Link
        to="/book"
        className="flex items-center gap-3 bg-[#C5A572] text-[#151412] px-5 py-3.5 font-sans font-bold text-xs tracking-widest uppercase shadow-2xl hover:bg-[#D6B988] transition-all hover:-translate-y-1 rounded-[2px]"
        style={{ boxShadow: '0 8px 32px rgba(197,165,114,0.3)' }}
      >
        <CalendarDays size={17} />
        Book Appointment
      </Link>
    </motion.div>
  );
}
