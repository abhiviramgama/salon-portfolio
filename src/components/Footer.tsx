import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Instagram, Facebook, Twitter } from './SocialIcons';
import { businessHours } from '../data';
import { useSalon } from '../context/SalonContext';

const footerServices = [
  { label: 'Haircuts & Styling', href: '/services?cat=haircuts' },
  { label: 'Hair Colour & Highlights', href: '/services?cat=colour' },
  { label: 'Hair Treatments', href: '/services?cat=treatments' },
  { label: 'Beard & Grooming', href: '/services?cat=grooming' },
  { label: 'Facials & Skincare', href: '/services?cat=facials' },
  { label: 'Bridal & Occasions', href: '/services?cat=bridal' },
  { label: 'Spa & Relaxation', href: '/services?cat=spa' },
  { label: 'Manicure & Pedicure', href: '/services?cat=nails' },
];

const footerLinks = [
  { label: 'About the salon', href: '/about' },
  { label: 'Our stylists', href: '/stylists' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Book an appointment', href: '/book' },
  { label: 'Management portal', href: '/admin' },
];

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const linkClass =
  'group inline-flex items-center gap-2 font-sans text-[15px] text-[#A9A197] transition-colors hover:text-[#F7F3EC]';

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-6 font-serif text-xl text-[#F7F3EC]">{children}</h3>;
}

export default function Footer() {
  const { settings } = useSalon();
  const [todayName] = useState(
    () => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]
  );
  const [currentYear] = useState(() => new Date().getFullYear());

  return (
    <footer className="relative overflow-hidden border-t border-[#2E2B25] bg-[#11100E] text-[#F7F3EC]">
      <div className="container-custom relative z-10 pb-10 pt-20 lg:pt-24">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link to="/" className="inline-block" aria-label={`${settings.salonName} home`}>
              <span className="font-serif text-3xl font-bold tracking-wider text-[#F7F3EC]">
                ÉLORA<span className="ml-2 font-light text-[#C5A572]">SALON</span>
              </span>
            </Link>
            <p className="mt-4 font-serif text-xl italic text-[#D6B988]">{settings.tagline}</p>
            <p className="mt-5 max-w-sm font-sans text-[15px] leading-relaxed text-[#A9A197]">
              An architectural sanctuary for modern hair artistry, thoughtful beauty care and bespoke grooming rituals.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3D3932] text-[#A9A197] transition-colors hover:border-[#C5A572] hover:bg-[#C5A572] hover:text-[#151412]"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <ColumnTitle>Services</ColumnTitle>
            <ul className="space-y-3.5">
              {footerServices.map(s => (
                <li key={s.href}>
                  <Link to={s.href} className={linkClass}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explore */}
          <nav aria-label="Explore" className="lg:col-span-2">
            <ColumnTitle>Explore</ColumnTitle>
            <ul className="space-y-3.5">
              {footerLinks.map(l => (
                <li key={l.href}>
                  <Link to={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div className="lg:col-span-3">
            <ColumnTitle>Visit us</ColumnTitle>
            <ul className="space-y-4 font-sans text-[15px] text-[#A9A197]">
              <li className="flex gap-3">
                <MapPin size={17} className="mt-1 shrink-0 text-[#C5A572]" />
                <span className="leading-relaxed">{settings.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-1 shrink-0 text-[#C5A572]" />
                <a href={`tel:${settings.phone}`} className="transition-colors hover:text-[#F7F3EC]">
                  {settings.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="mt-1 shrink-0 text-[#C5A572]" />
                <a href={`mailto:${settings.email}`} className="break-all transition-colors hover:text-[#F7F3EC]">
                  {settings.email}
                </a>
              </li>
            </ul>

            <div className="mt-8 border-t border-[#2E2B25] pt-6">
              <h4 className="mb-4 font-serif text-lg text-[#F7F3EC]">Opening hours</h4>
              <ul className="space-y-2 font-sans text-sm">
                {businessHours.map(h => {
                  const isToday = h.day === todayName;
                  return (
                    <li
                      key={h.day}
                      className={`flex items-center justify-between ${
                        isToday ? 'font-semibold text-[#D6B988]' : 'text-[#A9A197]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full ${isToday ? 'bg-[#C5A572]' : 'bg-transparent'}`}
                        />
                        {h.day}
                        {isToday && <span className="sr-only"> (today)</span>}
                      </span>
                      <span className="tabular-nums">{h.closed ? 'Closed' : `${h.open} to ${h.close}`}</span>
                    </li>
                  );
                })}
              </ul>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1 font-sans text-sm text-[#C5A572] transition-colors hover:text-[#F7F3EC]"
              >
                Get directions <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-[#2E2B25] pt-8 font-sans text-sm text-[#8A847B] sm:flex-row sm:items-center">
          <p>
            © {currentYear} {settings.salonName}. All rights reserved. Demonstration client portfolio.
          </p>
          <p>
            {settings.developerCredit}
            <span className="mx-2 text-[#C5A572]/50" aria-hidden>
              /
            </span>
            Full-stack salon platform
          </p>
        </div>
      </div>

      {/* Oversized wordmark: the footer's one bold gesture */}
      <div
        aria-hidden
        className="pointer-events-none -mb-[0.16em] select-none whitespace-nowrap text-center font-serif font-bold leading-none tracking-[0.04em]"
        style={{
          fontSize: 'clamp(88px, 19vw, 300px)',
          background: 'linear-gradient(180deg, rgba(197,165,114,0.28) 0%, rgba(197,165,114,0.02) 85%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        ÉLORA
      </div>
    </footer>
  );
}
