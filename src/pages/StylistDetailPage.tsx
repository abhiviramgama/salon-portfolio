import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, ArrowLeft, Clock, Calendar, Sparkles } from 'lucide-react';
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

export default function StylistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { stylists, services } = useSalon();
  const stylist = stylists.find(s => s.id === id);

  if (!stylist) return <Navigate to="/stylists" replace />;

  const stylistServices = services.filter(s => stylist.services.includes(s.id));

  return (
    <>
      <title>{`${stylist.name} — Master Stylist | ÉLORA SALON`}</title>

      {/* Breadcrumb */}
      <div className="pt-28 pb-6 bg-[#201E1A] border-b border-[#C5A572]/20">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-xs font-sans text-[#A9A197]">
            <Link to="/" className="hover:text-[#C5A572] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/stylists" className="hover:text-[#C5A572] transition-colors">Stylists</Link>
            <span>/</span>
            <span className="text-[#F7F3EC] font-medium">{stylist.name}</span>
          </nav>
        </div>
      </div>

      {/* Profile Hero */}
      <section className="bg-[#151412]">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[520px]">
          <div className="lg:col-span-2 relative overflow-hidden min-h-[420px]">
            <img
              src={stylist.image}
              alt={stylist.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#151412] lg:from-transparent lg:to-[#151412] to-transparent opacity-80" />
            <div className="absolute top-6 left-6">
              <span className={`font-sans text-xs font-semibold tracking-wider uppercase px-3 py-1.5 border backdrop-blur-sm ${
                stylist.available
                  ? 'text-emerald-400 border-emerald-500/30 bg-[#151412]/85'
                  : 'text-rose-400 border-rose-500/30 bg-[#151412]/85'
              }`}>
                {stylist.available ? '● Accepting Appointments' : '○ Schedule Fully Reserved'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-3 flex items-center px-8 lg:px-16 py-16">
            <FadeIn className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-[#C5A572]" />
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
                  Élora Senior Atelier
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F7F3EC] mb-2">{stylist.name}</h1>
              <p className="font-sans text-sm text-[#C5A572] uppercase tracking-widest font-semibold mb-6">{stylist.role}</p>

              <div className="grid grid-cols-3 gap-4 mb-6 py-5 border-y border-[#C5A572]/20">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Star size={14} className="text-[#C5A572] fill-current" />
                    <span className="font-serif text-2xl font-light text-[#C5A572]">{stylist.rating}</span>
                  </div>
                  <div className="font-sans text-xs text-[#A9A197] mt-0.5 uppercase tracking-wider">{stylist.reviewCount} Client Reviews</div>
                </div>
                <div className="border-x border-[#C5A572]/15 text-center">
                  <div className="font-serif text-2xl font-light text-[#C5A572]">{stylist.experience}+</div>
                  <div className="font-sans text-xs text-[#A9A197] mt-0.5 uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-2xl font-light text-[#C5A572]">{stylistServices.length}</div>
                  <div className="font-sans text-xs text-[#A9A197] mt-0.5 uppercase tracking-wider">Services Offered</div>
                </div>
              </div>

              {stylist.workingHours && (
                <div className="mb-6 p-3 bg-[#201E1A] border border-[#C5A572]/20 flex items-center gap-3 text-xs font-sans text-[#A9A197]">
                  <Calendar size={14} className="text-[#C5A572]" />
                  <span>
                    <strong className="text-[#F7F3EC]">Working hours:</strong> {stylist.workingHours}
                  </span>
                </div>
              )}

              <p className="font-sans text-[#A9A197] leading-relaxed mb-6 text-sm">{stylist.bio}</p>

              {/* Specializations */}
              <div className="flex flex-wrap gap-2 mb-8">
                {stylist.specializations.map(spec => (
                  <span key={spec} className="font-sans text-xs uppercase tracking-wider text-[#A9A197] bg-[#201E1A] border border-[#C5A572]/20 px-3 py-1">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to={`/book?stylist=${stylist.id}`} className="btn-gold">
                  Reserve with {stylist.name.split(' ')[0]} <ArrowRight size={16} />
                </Link>
                <Link to="/stylists" className="btn-outline-gold">
                  <ArrowLeft size={16} /> All Stylists
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services offered */}
      {stylistServices.length > 0 && (
        <section className="section-padding bg-[#201E1A] border-t border-[#C5A572]/15">
          <div className="container-custom">
            <FadeIn className="mb-10 text-center">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] mb-2 font-semibold">
                Expertise & Masteries
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F3EC]">
                Services Performed by {stylist.name.split(' ')[0]}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stylistServices.map((service, i) => (
                <FadeIn key={service.id} delay={i * 0.08}>
                  <div className="bg-[#151412] border border-[#C5A572]/20 hover:border-[#C5A572]/50 transition-all p-5 flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden border border-[#C5A572]/20">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base font-light text-[#F7F3EC] mb-1 truncate">{service.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-[#A9A197] font-sans mb-3">
                        <span className="flex items-center gap-1"><Clock size={11} className="text-[#C5A572]" /> {service.duration}m</span>
                        <span className="text-[#C5A572] font-semibold">₹{service.price.toLocaleString('en-IN')}</span>
                      </div>
                      <Link
                        to={`/book?service=${service.id}&stylist=${stylist.id}`}
                        className="font-sans text-[11px] uppercase tracking-wider text-[#C5A572] hover:text-[#EAE1D5] font-semibold transition-colors flex items-center gap-1"
                      >
                        Book This Service →
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
