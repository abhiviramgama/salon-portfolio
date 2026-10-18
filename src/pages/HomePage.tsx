import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Star, Award, Heart, Sparkles, Clock,
  ChevronLeft, ChevronRight, ZoomIn, X, Calendar, Gem,
  Phone, MapPin, Coffee, Leaf, MessageCircle, DoorOpen
} from 'lucide-react';
import { testimonials, galleryItems, businessHours, serviceCategories, galleryCategories } from '../data';
import { useInView } from '../hooks/useInView';
import { useSalon } from '../context/SalonContext';

const EASE = [0.16, 1, 0.3, 1] as const;

const enlarge = (url: string, w: number, h: number) =>
  url.replace(/w=\d+/, `w=${w}`).replace(/h=\d+/, `h=${h}`);

// ─── Shared bits ──────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  title, intro, action,
}: { title: React.ReactNode; intro?: string; action?: { to: string; label: string } }) {
  return (
    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-20">
      <div className="max-w-2xl">
        <h2 className="font-serif text-4xl font-bold leading-[1.08] text-[#F7F3EC] sm:text-5xl lg:text-[56px]">{title}</h2>
        {intro && <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-[#A9A197]">{intro}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-2 border-b border-[#C5A572]/60 pb-1 font-sans text-sm font-semibold text-[#D6B988] transition-colors hover:border-[#C5A572] hover:text-[#F7F3EC]"
        >
          {action.label}
          <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

function TextTabs<T extends string>({
  items, value, onChange, label,
}: { items: { value: T; label: string }[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="-mx-1 flex gap-x-7 gap-y-1 overflow-x-auto px-1 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      {items.map(it => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(it.value)}
            className={`shrink-0 whitespace-nowrap border-b-2 pb-3 font-sans text-[15px] transition-colors ${
              active
                ? 'border-[#C5A572] font-semibold text-[#F7F3EC]'
                : 'border-transparent text-[#8A847B] hover:text-[#F7F3EC]'
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const pillars = [
  { icon: Award, title: 'Master artisans', desc: 'Renowned hair and aesthetic specialists' },
  { icon: Gem, title: 'Pure formulations', desc: 'Ammonia-conscious, botanical care' },
  { icon: Heart, title: 'Bespoke care', desc: 'One-on-one tailored consultations' },
  { icon: Sparkles, title: 'Editorial finish', desc: 'From arrival to the final reveal' },
];

function Hero() {
  const status = useOpenStatus();
  const main = galleryItems.find(g => g.id === 'gal-006') ?? galleryItems[0];
  const inset = galleryItems.find(g => g.id === 'gal-007') ?? galleryItems[1];
  const line = (delay: number) => ({
    initial: { y: '110%' },
    animate: { y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#151412]" aria-label="Welcome">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-[#C5A572]/[0.08] blur-[140px]"
      />
      <div className="container-custom relative flex flex-1 items-center">
        <div className="grid w-full items-center gap-12 pb-14 pt-28 lg:grid-cols-12 lg:gap-8 lg:pb-12 lg:pt-28">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-8 flex items-center gap-3 font-sans text-sm text-[#A9A197]"
            >
              <span className="relative flex h-2 w-2">
                {status.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-[#6C665F]'}`} />
              </span>
              Bandra West, Mumbai · {status.label}
            </motion.p>

            <h1 className="font-serif font-bold leading-[0.98] tracking-[-0.02em] text-[#F7F3EC] text-[clamp(52px,7.4vw,112px)]">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" {...line(0.15)}>Beauty,</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.span className="block text-[#C5A572]" {...line(0.3)}>refined.</motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="mt-8 max-w-md font-sans text-lg leading-relaxed text-[#C9C2B6]"
            >
              A personal salon experience where expert artistry, thoughtful care and your own style come together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link to="/book" className="btn-gold group px-8 py-4 text-sm font-bold tracking-wider">
                Book an appointment
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="btn-outline-ivory px-8 py-4 text-sm font-bold tracking-wider">
                See the treatments
              </Link>
            </motion.div>
          </div>

          {/* Arched mirror portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[440px] lg:ml-auto lg:mr-0">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] border border-[#C5A572]/40"
              />
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
                className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] bg-[#201E1A]"
              >
                <img
                  src={enlarge(main.src, 900, 1230)}
                  alt={main.alt}
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151412]/50 via-transparent to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 1, ease: EASE }}
                className="absolute -bottom-8 -left-6 h-36 w-36 overflow-hidden rounded-full border-[6px] border-[#151412] bg-[#201E1A] shadow-2xl shadow-black/50 sm:-left-14 sm:h-44 sm:w-44"
              >
                <img src={enlarge(inset.src, 400, 400)} alt={inset.alt} className="h-full w-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars strip */}
      <div className="relative border-t border-[#2E2B25] bg-[#151412]/80 backdrop-blur-md">
        <div className="container-custom">
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, desc }, i) => (
              <li
                key={title}
                className={`flex items-start gap-4 py-5 pr-4 ${i > 0 ? 'lg:border-l lg:border-[#2E2B25] lg:pl-8' : ''} ${i % 2 === 1 ? 'pl-4' : ''}`}
              >
                <Icon size={20} className="mt-0.5 shrink-0 text-[#C5A572]" />
                <div>
                  <p className="font-serif text-base text-[#F7F3EC]">{title}</p>
                  <p className="mt-1 hidden font-sans text-sm leading-snug text-[#8A847B] sm:block">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Treatment menu ───────────────────────────────────────────────────────────
const formatDuration = (min: number) =>
  min >= 60 ? `${Math.floor(min / 60)}h${min % 60 > 0 ? ` ${min % 60}m` : ''}` : `${min} min`;

function ServicesSection() {
  const { services, settings } = useSalon();
  const [category, setCategory] = useState<string>('all');
  const [hovered, setHovered] = useState<string | null>(null);

  const list = (category === 'all' ? services : services.filter(s => s.category === category)).slice(0, 6);
  const preview = list.find(s => s.id === hovered) ?? list[0];

  return (
    <section id="services" className="bg-[#201E1A] py-24 lg:py-32" aria-label="Services">
      <div className="container-custom">
        <SectionHeader
          title="The treatment menu"
          intro="Signature cuts, colour, grooming and care. Every treatment starts with a conversation about what you want."
          action={{ to: '/services', label: 'View the full menu' }}
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Sticky preview */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#151412]">
                <AnimatePresence mode="popLayout">
                  {preview && (
                    <motion.img
                      key={preview.id}
                      src={enlarge(preview.image, 700, 875)}
                      alt={preview.name}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#151412]/80 via-transparent to-transparent" />
                {preview && (
                  <p className="absolute bottom-5 left-5 right-5 font-serif text-xl text-[#F7F3EC]">{preview.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="min-w-0 lg:col-span-8">
            <TextTabs
              label="Treatment categories"
              items={serviceCategories as { value: string; label: string }[]}
              value={category}
              onChange={v => { setCategory(v); setHovered(null); }}
            />

            <ul className="border-t border-[#2E2B25]">
              {list.map(service => (
                <li
                  key={service.id}
                  onMouseEnter={() => setHovered(service.id)}
                  onFocus={() => setHovered(service.id)}
                  className="group border-b border-[#2E2B25]"
                >
                  <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:gap-8">
                    <Link to={`/services/${service.id}`} className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-serif text-2xl font-bold text-[#F7F3EC] transition-colors group-hover:text-[#D6B988] sm:text-[28px]">
                          {service.name}
                        </h3>
                        {service.popular && (
                          <span className="rounded-full border border-[#C5A572]/50 px-2.5 py-0.5 font-sans text-xs font-semibold text-[#D6B988]">
                            Signature
                          </span>
                        )}
                      </div>
                      <p className="mt-2 line-clamp-2 max-w-xl font-sans text-[15px] leading-relaxed text-[#A9A197]">
                        {service.description}
                      </p>
                    </Link>

                    <div className="flex items-center justify-between gap-8 sm:justify-end">
                      <div className="sm:text-right">
                        <p className="font-serif text-2xl font-bold text-[#C5A572]">
                          {settings.currencySymbol}{service.price.toLocaleString('en-IN')}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 font-sans text-sm text-[#8A847B] sm:justify-end">
                          <Clock size={13} /> {formatDuration(service.duration)}
                        </p>
                      </div>
                      <Link
                        to={`/book?service=${service.id}`}
                        className="flex h-12 items-center gap-2 border border-[#C5A572]/50 px-5 font-sans text-sm font-semibold text-[#D6B988] transition-colors hover:bg-[#C5A572] hover:text-[#151412]"
                        aria-label={`Book ${service.name}`}
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Philosophy ───────────────────────────────────────────────────────────────
const comforts = [
  { icon: MessageCircle, title: 'Unhurried consultations', desc: 'A one-on-one style and skin conversation before any treatment begins.' },
  { icon: Leaf, title: 'Considered formulations', desc: 'Organic, cruelty-free professional products chosen for your hair and skin.' },
  { icon: Coffee, title: 'Complimentary refreshments', desc: 'Espresso and botanical herbal infusions while you settle in.' },
  { icon: DoorOpen, title: 'Private sanctuaries', desc: 'Quiet styling rooms where no one rushes you out.' },
];

function SignatureExperience() {
  return (
    <section className="overflow-hidden bg-[#151412] py-24 lg:py-32" aria-label="The ÉLORA difference">
      <div className="container-custom">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#201E1A] lg:aspect-[5/6]">
              <img
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&h=1200&q=80"
                alt="Inside the ÉLORA styling suite"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figure className="relative -mt-14 ml-auto mr-4 w-[88%] max-w-sm border border-[#C5A572]/30 bg-[#151412] p-7 shadow-2xl shadow-black/50 sm:absolute sm:-bottom-10 sm:-right-6 sm:mr-0 sm:mt-0 sm:w-72">
              <blockquote className="font-serif text-xl italic leading-snug text-[#F7F3EC]">
                Extraordinary beauty starts with being listened to.
              </blockquote>
              <figcaption className="mt-4 font-sans text-sm text-[#A9A197]">The ÉLORA promise</figcaption>
            </figure>
          </div>

          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl font-bold leading-[1.08] text-[#F7F3EC] sm:text-5xl lg:text-[56px]">
              More than a salon. A moment that’s yours.
            </h2>
            <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-[#A9A197]">
              From the first consultation to the final reveal, every detail is shaped around your comfort, your schedule and your signature.
            </p>

            <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {comforts.map(({ icon: Icon, title, desc }) => (
                <li key={title}>
                  <Icon size={22} className="text-[#C5A572]" />
                  <h3 className="mt-4 font-serif text-xl text-[#F7F3EC]">{title}</h3>
                  <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#A9A197]">{desc}</p>
                </li>
              ))}
            </ul>

            <Link
              to="/about"
              className="group mt-12 inline-flex items-center gap-2 border-b border-[#C5A572]/60 pb-1 font-sans text-sm font-semibold text-[#D6B988] transition-colors hover:border-[#C5A572] hover:text-[#F7F3EC]"
            >
              Read our story
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stylists ─────────────────────────────────────────────────────────────────
function StylistsSection() {
  const { stylists } = useSalon();

  return (
    <section id="stylists" className="bg-[#201E1A] py-24 lg:py-32" aria-label="Our Stylists">
      <div className="container-custom">
        <SectionHeader
          title="The artists behind your signature look"
          intro="Master colourists, precision cutters and bridal specialists, each with their own craft."
          action={{ to: '/stylists', label: 'Meet the full team' }}
        />

        <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-14 [&::-webkit-scrollbar]:hidden">
          {stylists.map(stylist => (
            <li
              key={stylist.id}
              className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-auto lg:shrink lg:[&:nth-child(even)]:translate-y-12"
            >
              <article className="group relative aspect-[3/4.3] overflow-hidden bg-[#151412]">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151412] via-[#151412]/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="mb-2 flex items-center gap-2 font-sans text-xs text-[#C9C2B6]">
                    <span className={`h-1.5 w-1.5 rounded-full ${stylist.available ? 'bg-emerald-400' : 'bg-[#6C665F]'}`} />
                    {stylist.available ? 'Taking bookings' : 'On leave'}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-[#F7F3EC]">{stylist.name}</h3>
                  <p className="mt-1 font-sans text-sm leading-snug text-[#D6B988]">{stylist.role}</p>
                  <Link
                    to={`/book?stylist=${stylist.id}`}
                    className="mt-4 inline-flex items-center gap-1.5 border-b border-[#F7F3EC]/30 pb-0.5 font-sans text-sm font-semibold text-[#F7F3EC] transition-colors hover:border-[#C5A572] hover:text-[#D6B988] after:absolute after:inset-0 after:content-['']"
                  >
                    Book with {stylist.name.split(' ')[0]}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
// Bento layout for up to 8 tiles on desktop (4 columns x 3 rows, ends flush)
const tileSpans = [
  'lg:row-span-2', '', '', 'lg:row-span-2',
  'lg:col-span-2', '', 'lg:col-span-2', '',
];

function GallerySection() {
  const [tab, setTab] = useState<string>('all');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const items = (tab === 'all' ? galleryItems : galleryItems.filter(g => g.category === tab)).slice(0, 8);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="bg-[#151412] py-24 lg:py-32" aria-label="Salon Gallery">
      <div className="container-custom">
        <SectionHeader
          title="Curated transformations"
          intro="Bridal styling, luminous colour and architectural cuts, from the chair."
          action={{ to: '/gallery', label: 'Open the gallery' }}
        />

        <div className="mb-10">
          <TextTabs label="Gallery collections" items={galleryCategories} value={tab} onChange={setTab} />
        </div>

        <div className="grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:auto-rows-[250px] lg:grid-cols-4 lg:gap-4">
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setLightbox({ src: item.src, alt: item.alt })}
              aria-label={`View ${item.title}`}
              className={`group relative block h-full w-full overflow-hidden bg-[#201E1A] ${tileSpans[i] ?? ''}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#151412]/90 via-transparent to-transparent p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="font-serif text-base font-bold text-[#F7F3EC]">{item.title}</span>
                <ZoomIn size={16} className="mt-2 text-[#C5A572]" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
        >
          <button
            className="absolute right-6 top-6 p-2 text-white/70 transition-colors hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[85vh] max-w-[90vw] border border-[#2E2B25] object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

// ─── Testimonials (Identified as Demonstration Client Feedback) ────────────────
const AUTOPLAY_MS = 9000;

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const total = testimonials.length;
  const active = testimonials[current];
  const average = testimonials.reduce((sum, t) => sum + t.rating, 0) / total;

  const go = (i: number) => setCurrent((i + total) % total);
  const autoplay = !paused && !reduceMotion;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#201E1A] py-24 lg:py-32"
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* soft gold glow behind the portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[#C5A572]/[0.07] blur-[120px]"
      />

      <div className="container-custom relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Portrait */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              <div
                aria-hidden
                className="absolute -bottom-5 -right-5 h-full w-full border border-[#C5A572]/40"
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-[#201E1A]">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={active.id}
                    src={active.avatar ? enlarge(active.avatar, 720, 900) : undefined}
                    alt={active.name}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#201E1A]/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-serif text-xl text-[#F7F3EC]">{active.name}</p>
                  {active.service && (
                    <p className="mt-1 font-sans text-sm text-[#D6B988]">{active.service}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <FadeIn>
              <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#F7F3EC] sm:text-5xl lg:text-6xl">
                Stories of Style &amp; Confidence
              </h2>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex gap-1" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-[#C5A572] text-[#C5A572]" />
                  ))}
                </div>
                <p className="font-sans text-sm text-[#A9A197]">
                  {average.toFixed(1)} from {total} demonstration reviews, shown for presentation purposes
                </p>
              </div>
            </FadeIn>

            <div className="relative mt-10 min-h-[260px] sm:min-h-[230px]">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-1 -top-16 select-none font-serif text-[140px] leading-none text-[#C5A572]/20 sm:-left-8"
              >
                &ldquo;
              </span>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative font-serif text-[22px] font-normal italic leading-[1.5] text-[#F7F3EC] sm:text-[28px] sm:leading-[1.45]"
                >
                  {active.quote}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Reviewer selector — doubles as progress indicator */}
            <div className="mt-10 flex items-end gap-6">
              <div className="grid flex-1 grid-cols-4 gap-3" role="tablist" aria-label="Choose a review">
                {testimonials.map((t, i) => {
                  const isActive = i === current;
                  return (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => go(i)}
                      className="group text-left"
                    >
                      <span className="relative block h-px w-full bg-[#3D3932]">
                        {isActive && (
                          <motion.span
                            key={`${t.id}-${autoplay}`}
                            className="absolute inset-y-[-0.5px] left-0 block h-[2px] w-full origin-left bg-[#C5A572]"
                            initial={{ scaleX: autoplay ? 0 : 1 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: autoplay ? AUTOPLAY_MS / 1000 : 0, ease: 'linear' }}
                            onAnimationComplete={() => autoplay && go(current + 1)}
                          />
                        )}
                      </span>
                      <span
                        className={`mt-3 block truncate font-sans text-sm transition-colors ${
                          isActive ? 'text-[#F7F3EC]' : 'text-[#6C665F] group-hover:text-[#A9A197]'
                        }`}
                      >
                        {t.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => go(current - 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3D3932] text-[#A9A197] transition-colors hover:border-[#C5A572] hover:text-[#C5A572]"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => go(current + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3D3932] text-[#A9A197] transition-colors hover:border-[#C5A572] hover:text-[#C5A572]"
                  aria-label="Next review"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Booking CTA ──────────────────────────────────────────────────────────────
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + (m || 0);
};

function useOpenStatus() {
  const [now] = useState(() => new Date());
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = businessHours.find(h => h.day === names[now.getDay()]);
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (!today || today.closed) return { today, open: false, label: 'Closed today' };
  if (minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { today, open: true, label: `Open now, until ${today.close}` };
  }
  if (minutes < toMinutes(today.open)) {
    return { today, open: false, label: `Opens today at ${today.open}` };
  }
  return { today, open: false, label: 'Closed for the day' };
}

function BookingCta() {
  const { settings } = useSalon();
  const status = useOpenStatus();
  const bg = galleryItems.find(g => g.id === 'gal-006');

  return (
    <section className="relative isolate overflow-hidden bg-[#151412]" aria-label="Book appointment">
      {bg && (
        <img
          src={enlarge(bg.src, 1800, 1100)}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#151412] via-[#151412]/90 to-[#151412]/55" />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-[#151412] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#151412] to-transparent" />

      <div className="container-custom py-28 lg:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <h2 className="font-serif text-[40px] font-bold leading-[1.05] text-[#F7F3EC] sm:text-6xl lg:text-7xl">
              Ready to discover your signature style?
            </h2>
            <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-[#C9C2B6] sm:text-lg">
              Choose your treatment, your artist and a time that suits you. Booking takes about two minutes.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/book"
                className="btn-gold group px-8 py-4 text-sm font-bold tracking-wider"
              >
                Book an appointment
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${settings.phone}`}
                className="btn-outline-ivory px-8 py-4 text-sm font-bold tracking-wider"
              >
                <Phone size={16} /> {settings.phone}
              </a>
            </div>
          </FadeIn>

          {/* Visit card */}
          <FadeIn delay={0.15} className="lg:col-span-5">
            <div className="border border-[#C5A572]/25 bg-[#151412]/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-10">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  {status.open && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                  )}
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                      status.open ? 'bg-emerald-400' : 'bg-[#6C665F]'
                    }`}
                  />
                </span>
                <p className="font-sans text-sm font-semibold text-[#F7F3EC]">{status.label}</p>
              </div>

              <dl className="mt-8 space-y-6 border-t border-[#2E2B25] pt-8">
                <div className="flex gap-4">
                  <Clock size={18} className="mt-1 shrink-0 text-[#C5A572]" />
                  <div>
                    <dt className="font-serif text-lg text-[#F7F3EC]">Today</dt>
                    <dd className="mt-0.5 font-sans text-sm text-[#A9A197]">
                      {status.today && !status.today.closed
                        ? `${status.today.open} to ${status.today.close}`
                        : 'By appointment only'}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin size={18} className="mt-1 shrink-0 text-[#C5A572]" />
                  <div>
                    <dt className="font-serif text-lg text-[#F7F3EC]">Find us</dt>
                    <dd className="mt-0.5 font-sans text-sm leading-relaxed text-[#A9A197]">{settings.address}</dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Calendar size={18} className="mt-1 shrink-0 text-[#C5A572]" />
                  <div>
                    <dt className="font-serif text-lg text-[#F7F3EC]">Changing plans?</dt>
                    <dd className="mt-0.5 font-sans text-sm leading-relaxed text-[#A9A197]">
                      Cancel or reschedule up to {settings.cancellationNoticeHours} hours before your visit.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <title>ÉLORA SALON — Premium Beauty & Styling Experience</title>
      <Hero />
      <ServicesSection />
      <SignatureExperience />
      <StylistsSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingCta />
    </>
  );
}
