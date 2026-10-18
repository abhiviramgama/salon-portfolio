import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, 
  // ArrowRight,
   Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { serviceCategories } from '../data';
import { useInView } from '../hooks/useInView';
import PageHeader from '../components/PageHeader';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const activeCategory = serviceCategories.some(c => c.value === catParam) ? (catParam as string) : 'all';
  const setActiveCategory = (value: string) => {
    const next = new URLSearchParams(searchParams);
    value === 'all' ? next.delete('cat') : next.set('cat', value);
    setSearchParams(next, { replace: true });
  };
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured');

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

      <PageHeader crumb="Services" title="Every treatment, in full" intro="Cuts, colour, grooming, facials and spa rituals, each one tailored to you." note="Sample pricing in INR (₹), shown for presentation." image="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&h=900&q=80" imageAlt="The ÉLORA salon floor" />

      <section className="bg-[#151412] py-16 lg:py-24">
        <div className="container-custom">
          {/* Toolbar */}
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div
              role="tablist"
              aria-label="Treatment categories"
              className="-mx-1 flex min-w-0 gap-x-7 gap-y-1 overflow-x-auto px-1 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              {serviceCategories.map(cat => {
                const active = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`shrink-0 whitespace-nowrap border-b-2 pb-3 font-sans text-[15px] transition-colors ${
                      active
                        ? 'border-[#C5A572] font-semibold text-[#F7F3EC]'
                        : 'border-transparent text-[#8A847B] hover:text-[#F7F3EC]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <label className="relative block sm:w-72">
                <span className="sr-only">Search treatments</span>
                <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A847B]" />
                <input
                  type="search"
                  placeholder="Search treatments"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="h-12 w-full border border-[#2E2B25] bg-[#201E1A] pl-11 pr-4 font-sans text-sm text-[#F7F3EC] placeholder:text-[#6C665F] focus:border-[#C5A572] focus:outline-none"
                />
              </label>
              <label className="relative block">
                <span className="sr-only">Sort treatments</span>
                <SlidersHorizontal size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A572]" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="h-12 w-full cursor-pointer appearance-none border border-[#2E2B25] bg-[#201E1A] pl-11 pr-10 font-sans text-sm text-[#F7F3EC] focus:border-[#C5A572] focus:outline-none"
                >
                  <option value="featured">Signature first</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="duration">Shortest first</option>
                </select>
              </label>
            </div>
          </div>

          <p className="mb-8 font-sans text-sm text-[#8A847B]" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'treatment' : 'treatments'}
          </p>

          {/* Grid */}
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service, i) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ delay: (i % 3) * 0.06, duration: 0.5 }}
                className="group flex flex-col"
              >
                <Link to={`/services/${service.id}`} className="relative block aspect-[4/3] overflow-hidden bg-[#201E1A]">
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151412]/60 via-transparent to-transparent" />
                  {service.featured && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-[#C5A572] px-3 py-1 font-sans text-xs font-bold text-[#151412]">
                      <Sparkles size={12} /> Signature
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-serif text-2xl font-bold leading-snug text-[#F7F3EC] transition-colors group-hover:text-[#D6B988]">
                      <Link to={`/services/${service.id}`}>{service.name}</Link>
                    </h2>
                    <p className="shrink-0 font-serif text-2xl font-bold text-[#C5A572]">
                      {settings.currencySymbol}{service.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 font-sans text-sm text-[#8A847B]">
                    <Clock size={14} className="text-[#C5A572]" /> {formatDuration(service.duration)}
                  </p>
                  <p className="mt-3 line-clamp-3 font-sans text-[15px] leading-relaxed text-[#A9A197]">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3 pt-1">
                    <Link
                      to={`/book?service=${service.id}`}
                      className="btn-gold flex-1 justify-center px-5 py-3 text-sm font-bold"
                    >
                      Book now
                    </Link>
                    <Link
                      to={`/services/${service.id}`}
                      className="flex h-[46px] items-center border border-[#3D3932] px-5 font-sans text-sm font-semibold text-[#F7F3EC] transition-colors hover:border-[#C5A572] hover:text-[#D6B988]"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="mt-4 border border-[#2E2B25] bg-[#201E1A] py-24 text-center">
              <Search size={32} className="mx-auto mb-4 text-[#8A847B]" />
              <h3 className="font-serif text-2xl text-[#F7F3EC]">No treatments found</h3>
              <p className="mx-auto mt-2 mb-7 max-w-sm font-sans text-[15px] text-[#A9A197]">
                Try different keywords, or clear the filters to see the full menu.
              </p>
              <button
                onClick={() => { setActiveCategory('all'); setSearch(''); }}
                className="btn-outline-gold"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
