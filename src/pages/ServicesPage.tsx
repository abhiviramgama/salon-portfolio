import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, 
  // ArrowRight,
   Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { serviceCategories } from '../data';
import { useInView } from '../hooks/useInView';
import { useSalon } from '../context/SalonContext';

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

export default function ServicesPage() {
  const { services, settings } = useSalon();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured');
  const { ref, inView } = useInView();

  const filtered = services
    .filter(s => {
      const matchCategory = activeCategory === 'all' || s.category === activeCategory;
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch && s.available !== false;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'duration') return a.duration - b.duration;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <>
      <title>Services — ÉLORA SALON | Hair & Beauty Atelier</title>

      {/* Page Header */}
      <div className="page-header text-center bg-[#201E1A] py-28 relative overflow-hidden border-b border-[#2E2B25]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=70"
            alt="ÉLORA Atelier"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201E1A] via-transparent to-transparent" />
        </div>
        <div className="container-custom relative z-10 pt-10">
          <FadeIn>
            <p className="font-sans text-[11px] font-bold tracking-[0.3em] uppercase text-[#C5A572] mb-3">
              THE ÉLORA SERVICE ATELIER
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F3EC] mb-4">
              Couture Hair & Beauty Treatments
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#A9A197] max-w-lg mx-auto leading-relaxed font-light mb-4">
              Every service is a personalized sensory ritual, designed to deliver flawless results tailored to your lifestyle.
            </p>
            <span className="inline-block text-[10px] uppercase tracking-widest text-[#C5A572] border border-[#C5A572]/30 bg-[#C5A572]/10 px-3 py-1 rounded-[2px]">
              Realistic sample pricing in {settings.currency} ({settings.currencySymbol}) for presentation
            </span>
          </FadeIn>
        </div>
      </div>

      <section className="py-20 bg-[#151412]">
        <div className="container-custom">
          {/* Controls Bar: Search & Sort */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full md:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9A197]" />
              <input
                type="search"
                placeholder="Search treatment or styling..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="form-input pl-10 w-full bg-[#201E1A] border-[#2E2B25] text-xs text-[#F7F3EC] py-2.5 rounded-[2px]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <SlidersHorizontal size={14} className="text-[#C5A572]" />
              <span className="text-xs text-[#A9A197] font-sans">Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-[#201E1A] border border-[#2E2B25] text-xs text-[#F7F3EC] px-3 py-2 rounded-[2px] font-sans cursor-pointer"
                aria-label="Sort services"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {/* Category Filters (8 categories) */}
          <FadeIn delay={0.05} className="flex flex-wrap gap-2 mb-12">
            {serviceCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`font-sans text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-2 border transition-all rounded-[2px] ${
                  activeCategory === cat.value
                    ? 'bg-[#C5A572] text-[#151412] border-[#C5A572]'
                    : 'bg-[#201E1A] text-[#A9A197] border-[#2E2B25] hover:border-[#C5A572]/40 hover:text-[#F7F3EC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </FadeIn>

          {/* Services Grid */}
          <div ref={ref as React.Ref<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service, i) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="bg-[#201E1A] border border-[#2E2B25] rounded-[2px] overflow-hidden group hover:border-[#C5A572]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#201E1A] via-transparent to-transparent" />
                    {service.featured && (
                      <div className="absolute top-3 left-3 bg-[#C5A572] text-[#151412] text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 font-sans rounded-[2px] flex items-center gap-1">
                        <Sparkles size={10} /> Signature
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[#F7F3EC] text-xs font-sans bg-[#151412]/80 px-2 py-0.5 rounded-[2px] backdrop-blur-sm border border-[#2E2B25]">
                      <Clock size={11} className="text-[#C5A572]" />
                      {formatDuration(service.duration)}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="font-mono text-[10px] text-[#C5A572] uppercase tracking-widest block mb-1">
                      {service.category}
                    </span>
                    <h2 className="font-serif text-lg font-bold text-[#F7F3EC] mb-2">{service.name}</h2>
                    <p className="font-sans text-xs text-[#A9A197] leading-relaxed font-light line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-[#2E2B25]">
                    <div>
                      <span className="font-sans text-[10px] uppercase tracking-widest text-[#A9A197] block mb-0.5">Investment</span>
                      <span className="font-serif text-xl font-bold text-[#C5A572]">
                        {settings.currencySymbol}{service.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/services/${service.id}`}
                        className="font-sans text-[11px] uppercase tracking-wider text-[#A9A197] hover:text-[#F7F3EC] transition-colors font-medium px-3 py-2 border border-[#2E2B25] rounded-[2px]"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/book?service=${service.id}`}
                        className="btn-gold !py-2 !px-4 !text-[11px] font-bold"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-24 bg-[#201E1A] border border-[#2E2B25] rounded-[2px] mt-4">
              <Search size={32} className="mx-auto text-[#A9A197]/40 mb-3" />
              <h3 className="font-serif text-xl text-[#F7F3EC] mb-1">No services found</h3>
              <p className="font-sans text-xs text-[#A9A197] mb-6">
                Try searching for different keywords or select "All Services".
              </p>
              <button
                onClick={() => { setActiveCategory('all'); setSearch(''); }}
                className="btn-outline-gold text-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
