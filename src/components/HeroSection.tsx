import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=85';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#151412]"
      aria-label="Hero section"
    >
      {/* Background Image with subtle atmospheric scale */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 7, ease: 'easeOut' }}
      >
        <img
          src={HERO_IMAGE}
          alt="ÉLORA SALON Luxury Atmosphere"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* Editorial gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#151412]/95 via-[#151412]/75 to-[#151412]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151412] via-transparent to-[#151412]/40" />
      </motion.div>

      {/* Vertical decorative branding accent */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-20">
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C5A572]/50" />
        <div className="text-[10px] tracking-[0.35em] uppercase text-[#C5A572]/70 font-sans rotate-90 my-8 whitespace-nowrap">
          ÉLORA SALON
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-[#C5A572]/50 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow text */}
          <motion.div variants={itemVariants} className="flex items-center gap-3.5 mb-6">
            <div className="w-10 h-px bg-[#C5A572]" />
            <span className="font-sans text-[11px] font-bold tracking-[0.3em] uppercase text-[#C5A572]">
              THE ART OF BEAUTY
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F7F3EC] leading-[1.08] mb-6 tracking-tight">
            Beauty, Refined.<br />
            <span className="italic font-normal text-[#C5A572]">Style, Redefined.</span>
          </motion.h1>

          {/* Supporting description */}
          <motion.p variants={itemVariants} className="font-sans text-base sm:text-lg text-[#A9A197] leading-relaxed mb-10 max-w-xl font-light">
            Discover a personalized salon experience where expert artistry, thoughtful care, and your individual style come together.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
            <Link
              to="/book"
              className="btn-gold inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-7 py-3.5 shadow-lg shadow-[#C5A572]/10"
            >
              BOOK AN APPOINTMENT <ArrowRight size={16} />
            </Link>
            <Link
              to="/services"
              className="btn-outline-ivory inline-flex items-center text-xs font-bold uppercase tracking-widest px-7 py-3.5"
            >
              EXPLORE OUR SERVICES
            </Link>
          </motion.div>

          {/* Authentic Core Pillars (No Fake Statistics) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-8 pt-8 border-t border-[#2E2B25]"
          >
            {[
              { icon: Sparkles, title: 'Bespoke Artistry', desc: 'Personalized to facial geometry' },
              { icon: HeartHandshake, title: 'Mindful Care', desc: 'One-on-one private sessions' },
              { icon: ShieldCheck, title: 'Pure Formulations', desc: 'Ammonia-free & ethical care' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3.5">
                <div className="w-9 h-9 border border-[#C5A572]/30 bg-[#C5A572]/5 flex items-center justify-center rounded-[2px]">
                  <Icon size={16} className="text-[#C5A572]" />
                </div>
                <div>
                  <div className="font-serif text-sm font-bold text-[#F7F3EC]">{title}</div>
                  <div className="font-sans text-[11px] text-[#A9A197] font-light mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating booking teaser card — desktop */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="absolute right-8 bottom-24 hidden xl:block z-20"
      >
        <div className="glass-card p-6 w-72 bg-[#201E1A]/85 backdrop-blur-xl border border-[#C5A572]/20 rounded-[2px] shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="font-sans text-[11px] font-semibold text-[#A9A197] tracking-wider uppercase">
              Online Reservations Open
            </span>
          </div>
          <p className="font-serif text-base font-bold text-[#F7F3EC] mb-1.5">
            Your Time. Your Style.
          </p>
          <p className="font-sans text-xs text-[#A9A197] mb-4 leading-relaxed font-light">
            Seamless multi-step scheduling with instant confirmation.
          </p>
          <Link
            to="/book"
            className="btn-gold w-full justify-center text-[11px] uppercase tracking-wider py-2.5 font-bold"
          >
            Reserve Your Chair
          </Link>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#A9A197]/70">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#C5A572]/70 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
