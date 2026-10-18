import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

interface PageHeaderProps {
  /** Current page name, shown in the breadcrumb */
  crumb: string;
  title: React.ReactNode;
  intro?: string;
  /** Small clarifying note, e.g. "sample pricing" */
  note?: string;
  /** Optional photo shown in the arch on the right (desktop) */
  image?: string;
  imageAlt?: string;
}

export default function PageHeader({ crumb, title, intro, note, image, imageAlt = '' }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden border-b border-[#2E2B25] bg-[#151412]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[560px] w-[560px] rounded-full bg-[#C5A572]/[0.09] blur-[120px]"
      />

      <div className="container-custom">
        <div className="grid items-end gap-10 pb-16 pt-32 lg:grid-cols-12 lg:pb-20 lg:pt-40">
          <div className="lg:col-span-8">
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              aria-label="Breadcrumb"
              className="mb-7 flex items-center gap-1.5 font-sans text-sm text-[#8A847B]"
            >
              <Link to="/" className="transition-colors hover:text-[#D6B988]">Home</Link>
              <ChevronRight size={14} aria-hidden />
              <span className="text-[#D6B988]" aria-current="page">{crumb}</span>
            </motion.nav>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-serif font-bold leading-[1.02] tracking-[-0.015em] [text-wrap:balance] text-[#F7F3EC] text-[clamp(40px,6vw,84px)]"
            >
              {title}
            </motion.h1>

            {intro && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="mt-6 max-w-xl font-sans text-base leading-relaxed text-[#C9C2B6] sm:text-lg"
              >
                {intro}
              </motion.p>
            )}

            {note && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-6 inline-flex max-w-xl items-center gap-2 border-l-2 border-[#C5A572]/60 pl-3 font-sans text-sm text-[#A9A197]"
              >
                {note}
              </motion.p>
            )}
          </div>

          {image && (
            <div className="hidden lg:col-span-4 lg:block">
              <div className="relative ml-auto w-full max-w-[280px]">
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] border border-[#C5A572]/40"
                />
                <motion.div
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  animate={{ clipPath: 'inset(0% 0 0 0)' }}
                  transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
                  className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] bg-[#201E1A]"
                >
                  <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151412]/50 via-transparent to-transparent" />
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
