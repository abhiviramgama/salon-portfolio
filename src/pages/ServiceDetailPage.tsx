import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, ArrowLeft, CheckCircle, Star, Sparkles, ShieldCheck } from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import { serviceCategories } from '../data';
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

const formatDuration = (min: number) =>
  min >= 60 ? `${Math.floor(min / 60)}h ${min % 60 > 0 ? `${min % 60}m` : ''}`.trim() : `${min}m`;

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { services, stylists } = useSalon();

  const service = services.find(s => s.id === id);

  if (!service) return <Navigate to="/services" replace />;

  const categoryLabel = serviceCategories.find(c => c.value === service.category)?.label || service.category;
  const relatedServices = services.filter(s => s.category === service.category && s.id !== service.id).slice(0, 3);
  const availableStylists = stylists.filter(s => s.services.includes(service.id));

  const includes = [
    'Private consultation & bespoke hair/skin analysis',
    'Application of imported luxury professional-grade serums & botanicals',
    'Expert precision cutting, styling, or tailored aesthetic treatment',
    'Customized home-care prescription & maintenance regime',
  ];

  return (
    <>
      <title>{`${service.name} | ÉLORA SALON Experience`}</title>

      {/* Breadcrumb */}
      <div className="pt-28 pb-0 bg-[#201E1A] border-b border-[#C5A572]/20">
        <div className="container-custom pb-6">
          <nav className="flex items-center gap-2 text-xs font-sans text-[#A9A197]" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#C5A572] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-[#C5A572] transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[#F7F3EC] font-medium">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#151412]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
          <div className="relative overflow-hidden min-h-[380px]">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#151412]/80 lg:from-transparent lg:to-[#151412] to-[#151412]" />
            <div className="absolute top-6 left-6">
              <span className="font-sans text-xs uppercase tracking-widest px-3 py-1.5 bg-[#151412]/85 text-[#C5A572] border border-[#C5A572]/30 backdrop-blur-sm font-semibold">
                {categoryLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center px-8 lg:px-16 py-16">
            <FadeIn className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-[#C5A572]" />
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
                  Élora Signature Atelier
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F7F3EC] mb-5 leading-tight">
                {service.name}
              </h1>
              <p className="font-sans text-[#A9A197] leading-relaxed mb-8 text-base">
                {service.longDescription || service.description}
              </p>

              <div className="flex flex-wrap items-center gap-8 mb-8 py-6 border-y border-[#C5A572]/15">
                <div>
                  <div className="font-sans text-xs uppercase tracking-widest text-[#A9A197] mb-1">
                    Demo Pricing (INR)
                  </div>
                  <div className="font-serif text-3xl font-light text-[#C5A572]">
                    ₹{service.price.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="w-px h-10 bg-[#C5A572]/20 hidden sm:block" />
                <div>
                  <div className="font-sans text-xs uppercase tracking-widest text-[#A9A197] mb-1">
                    Estimated Duration
                  </div>
                  <div className="flex items-center gap-2 text-[#F7F3EC]">
                    <Clock size={16} className="text-[#C5A572]" />
                    <span className="font-sans font-medium">{formatDuration(service.duration)}</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-[#C5A572]/20 hidden sm:block" />
                <div>
                  <div className="font-sans text-xs uppercase tracking-widest text-[#A9A197] mb-1">
                    Status
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-sans text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Booking
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to={`/book?service=${service.id}`} className="btn-gold">
                  Reserve This Service <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="btn-outline-gold">
                  <ArrowLeft size={16} /> All Services
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What's Included & Available Stylists */}
      <section className="section-padding bg-[#201E1A]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={16} className="text-[#C5A572]" />
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
                  Standard of Care
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F3EC] mb-6">
                What Each Session Encompasses
              </h2>
              <ul className="space-y-4">
                {includes.map(item => (
                  <li key={item} className="flex gap-3 items-start">
                    <CheckCircle size={17} className="text-[#C5A572] flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-[#A9A197] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-5 bg-[#151412] border border-[#C5A572]/20">
                <p className="font-sans text-xs text-[#A9A197] leading-relaxed">
                  <strong className="text-[#C5A572]">Client Note:</strong> Service prices and durations shown are representative demonstration values in INR. As an administrator, you can adjust these figures in real time via the salon management portal.
                </p>
              </div>
            </FadeIn>

            {availableStylists.length > 0 && (
              <FadeIn delay={0.15}>
                <div className="flex items-center gap-2 mb-3">
                  <Star size={16} className="text-[#C5A572]" />
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
                    Master Craftsmen
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F3EC] mb-6">
                  Recommended Specialists
                </h2>
                <div className="space-y-4">
                  {availableStylists.map(stylist => (
                    <div key={stylist.id} className="flex items-center gap-4 p-4 bg-[#151412] border border-[#C5A572]/20 hover:border-[#C5A572]/50 transition-colors">
                      <img
                        src={stylist.image}
                        alt={stylist.name}
                        className="w-14 h-14 object-cover rounded-none border border-[#C5A572]/30"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-sans text-sm font-semibold text-[#F7F3EC] truncate">{stylist.name}</div>
                        <div className="font-sans text-xs text-[#C5A572] truncate">{stylist.role}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Star size={12} className="text-[#C5A572] fill-current" />
                          <span className="font-sans text-xs text-[#A9A197]">{stylist.rating} ({stylist.reviewCount} reviews)</span>
                        </div>
                      </div>
                      <Link
                        to={`/book?service=${service.id}&stylist=${stylist.id}`}
                        className="btn-outline-gold !py-2 !px-4 !text-xs whitespace-nowrap"
                      >
                        Book With {stylist.name.split(' ')[0]}
                      </Link>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="section-padding bg-[#151412] border-t border-[#C5A572]/15">
          <div className="container-custom">
            <FadeIn className="mb-12 text-center">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] mb-2 font-semibold">
                Complementary Experiences
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F3EC]">
                Explore Similar Services
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((s, i) => (
                <FadeIn key={s.id} delay={i * 0.1}>
                  <Link to={`/services/${s.id}`} className="group block bg-[#201E1A] border border-[#C5A572]/20 hover:border-[#C5A572]/60 transition-all">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#201E1A] via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-light text-[#F7F3EC] mb-2 group-hover:text-[#C5A572] transition-colors">{s.name}</h3>
                      <div className="flex items-center justify-between text-xs font-sans pt-3 border-t border-[#C5A572]/10">
                        <span className="text-[#A9A197] flex items-center gap-1.5">
                          <Clock size={12} className="text-[#C5A572]" /> {formatDuration(s.duration)}
                        </span>
                        <span className="font-serif text-base text-[#C5A572] font-semibold">
                          ₹{s.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
