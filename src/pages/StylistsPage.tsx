import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import { useInView } from '../hooks/useInView';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function StylistsPage() {
  const { stylists } = useSalon();
  const { ref, inView } = useInView();

  return (
    <>
      <title>Our Stylists — ÉLORA SALON | Master Artisans & Stylists</title>

      {/* Header */}
      <div className="page-header text-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522337360826-74a49a5c3380?auto=format&fit=crop&w=1920&q=60"
            alt="Élora salon atelier"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-[#151412]/90" />
        </div>
        <div className="container-custom relative z-10">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={14} className="text-[#C5A572]" />
              <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#C5A572] font-semibold">
                The Creative Collective
              </p>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#F7F3EC] mb-5 tracking-tight">
              Master Stylists & Artists
            </h1>
            <p className="font-sans text-[#A9A197] max-w-xl mx-auto text-base leading-relaxed">
              Every cut, colour formulation, and treatment is guided by consummate artisans dedicated to honoring your individual signature.
            </p>
            <div className="mt-4 inline-block px-3 py-1 bg-[#201E1A] border border-[#C5A572]/20 text-[11px] font-sans text-[#C5A572]/90">
              Representative salon team profiles prepared for client demonstration
            </div>
          </FadeIn>
        </div>
      </div>

      <section className="section-padding bg-[#151412]">
        <div className="container-custom">
          <div ref={ref as React.Ref<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stylists.map((stylist, i) => (
              <motion.article
                key={stylist.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-[#201E1A] border border-[#C5A572]/20 hover:border-[#C5A572]/60 transition-all flex flex-col"
              >
                {/* Photo */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={stylist.image}
                    alt={`${stylist.name} – ${stylist.role}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201E1A] via-transparent to-transparent opacity-80" />

                  {/* Availability badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`font-sans text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 ${
                      stylist.available
                        ? 'bg-[#151412]/85 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm'
                        : 'bg-[#151412]/85 text-rose-400 border border-rose-500/30 backdrop-blur-sm'
                    }`}>
                      {stylist.available ? '● Available' : '○ Fully Booked'}
                    </span>
                  </div>

                  {/* Experience badge */}
                  <div className="absolute top-4 right-4 bg-[#151412]/85 border border-[#C5A572]/30 px-2.5 py-1 backdrop-blur-sm">
                    <span className="font-sans text-[10px] text-[#C5A572] font-semibold">{stylist.experience}y exp.</span>
                  </div>

                  {/* Hover overlay CTA */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-[#201E1A] via-[#201E1A]/95 to-transparent pt-12">
                    <Link
                      to={`/book?stylist=${stylist.id}`}
                      className="btn-gold w-full justify-center !py-2.5 text-xs"
                    >
                      Reserve with {stylist.name.split(' ')[0]}
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="font-serif text-xl font-light text-[#F7F3EC]">{stylist.name}</h2>
                        <p className="font-sans text-xs text-[#C5A572] uppercase tracking-wider font-medium mt-0.5">{stylist.role}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 mt-1 bg-[#151412] px-2 py-1 border border-[#C5A572]/15">
                        <Star size={11} className="text-[#C5A572] fill-current" />
                        <span className="font-sans text-xs font-semibold text-[#F7F3EC]">{stylist.rating}</span>
                        <span className="font-sans text-[10px] text-[#A9A197]">({stylist.reviewCount})</span>
                      </div>
                    </div>

                    <p className="font-sans text-sm text-[#A9A197] leading-relaxed mb-4 line-clamp-3">{stylist.bio}</p>

                    {/* Shift & working hours */}
                    {stylist.workingHours && (
                      <div className="flex items-center gap-1.5 text-xs font-sans text-[#A9A197] mb-4 bg-[#151412] p-2 border border-[#C5A572]/10">
                        <Clock size={12} className="text-[#C5A572]" />
                        <span>Hours: {stylist.workingHours}</span>
                      </div>
                    )}

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {stylist.specializations.map(spec => (
                        <span key={spec} className="font-sans text-[10px] uppercase tracking-wider text-[#A9A197] bg-[#151412] border border-[#C5A572]/15 px-2 py-0.5">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3 border-t border-[#C5A572]/15">
                    <Link to={`/stylists/${stylist.id}`} className="btn-outline-gold !py-2 !px-3 !text-[11px] flex-1 justify-center">
                      View Profile
                    </Link>
                    <Link to={`/book?stylist=${stylist.id}`} className="btn-gold !py-2 !px-3 !text-[11px] flex-1 justify-center">
                      Book Slot
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy banner */}
      <section className="bg-[#201E1A] border-t border-[#C5A572]/20 py-20">
        <div className="container-custom text-center">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C5A572] mb-3 font-semibold">
              The ÉLORA Standard
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F7F3EC] mb-5">
              Personalized Artistry, Uncompromising Detail
            </h2>
            <p className="font-sans text-[#A9A197] max-w-xl mx-auto mb-8 text-base leading-relaxed">
              Can't decide on a specialist? Our concierge will happily pair your hair type, scalp profile, and aesthetic vision with our most qualified artist.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/book" className="btn-gold">
                Book Any Available Stylist <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-gold">
                Consult With Concierge
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
