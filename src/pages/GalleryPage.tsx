import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { galleryItems, galleryCategories } from '../data';
import { useInView } from '../hooks/useInView';
import type { GalleryCategory } from '../types';

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

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, inView } = useInView();

  const filtered = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(g => g.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const next = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filtered.length]);

  return (
    <>
      <title>Gallery — ÉLORA SALON | Hair & Aesthetic Transformations</title>

      {/* Header */}
      <div className="page-header text-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1487412947147-5cebf100d293?auto=format&fit=crop&w=1920&q=60"
            alt="Élora salon gallery backdrop"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-[#151412]/90" />
        </div>
        <div className="container-custom relative z-10">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={14} className="text-[#C5A572]" />
              <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#C5A572] font-semibold">
                Editorial Portfolio
              </p>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#F7F3EC] mb-5 tracking-tight">
              Transformations & Moments
            </h1>
            <p className="font-sans text-[#A9A197] max-w-xl mx-auto text-base leading-relaxed">
              A curated photographic record of bespoke colour formulation, precision architecture, bridal artistry, and our private atelier spaces.
            </p>
          </FadeIn>
        </div>
      </div>

      <section className="section-padding bg-[#151412]">
        <div className="container-custom">
          {/* Category Filters */}
          <FadeIn className="flex flex-wrap justify-center gap-2 mb-12">
            {galleryCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`font-sans text-[11px] font-semibold tracking-[0.14em] uppercase px-5 py-2.5 border transition-all ${
                  activeCategory === cat.value
                    ? 'bg-[#C5A572] text-[#151412] border-[#C5A572] shadow-sm'
                    : 'bg-[#201E1A] text-[#A9A197] border-[#C5A572]/20 hover:border-[#C5A572]/50 hover:text-[#F7F3EC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </FadeIn>

          {/* Magazine Asymmetrical Grid */}
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group relative overflow-hidden bg-[#201E1A] border border-[#C5A572]/20 hover:border-[#C5A572]/60 transition-all cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`View full image: ${item.title || item.alt}`}
                onKeyDown={e => e.key === 'Enter' && openLightbox(i)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full block object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151412]/90 via-[#151412]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex items-center justify-between text-[#C5A572] mb-1">
                      <span className="font-sans text-[10px] uppercase tracking-widest font-semibold">
                        {item.category}
                      </span>
                      <ZoomIn size={18} />
                    </div>
                    <h3 className="font-serif text-lg font-light text-[#F7F3EC]">
                      {item.title || item.alt}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-[#201E1A] border border-[#C5A572]/20">
              <p className="font-serif text-lg text-[#F7F3EC] mb-2">No images in this collection</p>
              <p className="font-sans text-xs text-[#A9A197]">Select another category to view atelier works.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Viewer */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#151412]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-[#F7F3EC] bg-[#201E1A]/80 border border-[#C5A572]/30 hover:border-[#C5A572] transition-all z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Navigation Previous */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[#F7F3EC] bg-[#201E1A]/80 border border-[#C5A572]/30 hover:border-[#C5A572] transition-all z-10"
              onClick={e => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} className="text-[#C5A572]" />
            </button>

            {/* Navigation Next */}
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[#F7F3EC] bg-[#201E1A]/80 border border-[#C5A572]/30 hover:border-[#C5A572] transition-all z-10"
              onClick={e => { e.stopPropagation(); next(); }}
              aria-label="Next image"
            >
              <ChevronRight size={22} className="text-[#C5A572]" />
            </button>

            {/* Lightbox Main Image & Details */}
            <div className="flex flex-col items-center max-w-4xl" onClick={e => e.stopPropagation()}>
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                className="max-w-[90vw] max-h-[75vh] object-contain border border-[#C5A572]/20"
              />

              <div className="mt-4 text-center">
                <div className="font-serif text-xl font-light text-[#F7F3EC] mb-1">
                  {filtered[lightboxIndex].title || filtered[lightboxIndex].alt}
                </div>
                <div className="flex items-center justify-center gap-3 font-sans text-xs text-[#A9A197]">
                  <span className="uppercase tracking-widest text-[#C5A572] font-semibold">{filtered[lightboxIndex].category}</span>
                  <span>•</span>
                  <span>{lightboxIndex + 1} of {filtered.length}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
