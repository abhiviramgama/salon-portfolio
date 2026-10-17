import type {
  Service,
  Stylist,
  Testimonial,
  BusinessHours,
  ContactInfo,
  GalleryItem,
  SalonSettings,
  Booking,
  ServiceCategory,
  GalleryCategory
} from '../types';

// Curated high-resolution Unsplash photo IDs for luxury salon aesthetics
const unsplash = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

// ─── SALON BRAND SETTINGS (CONFIGURABLE) ──────────────────────────────────────
export const initialSettings: SalonSettings = {
  salonName: 'ÉLORA SALON',
  tagline: 'Your Beauty. Your Signature.',
  currency: 'INR',
  currencySymbol: '₹',
  address: 'Level 2, The Pavilion, Luxury Boulevard, Bandra West, Mumbai 400050',
  phone: '+91 22 2640 8800',
  email: 'concierge@elorasalon.demo',
  bookingPolicy: 'Appointments can be rescheduled or cancelled up to 4 hours in advance without fee.',
  cancellationNoticeHours: 4,
  developerCredit: 'Website crafted by Abhi',
};

// ─── SERVICES (8 CATEGORIES IN INR DEMO PRICING) ──────────────────────────────
export const initialServices: Service[] = [
  // 1. Haircuts & Styling
  {
    id: 'svc-001',
    name: "Women's Signature Precision Cut",
    category: 'haircuts',
    description: 'Personalized couture cut tailored to face architecture, hair texture, and styling habits.',
    longDescription: 'Begins with an in-depth sensory consultation, hair detox wash using botanical infusions, customized architectural precision cut, and a bespoke runway blowout finish.',
    price: 2400,
    duration: 60,
    image: unsplash('1522337360826-74a49a5c3380', 700, 500),
    popular: true,
    featured: true,
    available: true,
  },
  {
    id: 'svc-002',
    name: "Men's Architectural Scissor Cut",
    category: 'haircuts',
    description: 'Precision scissor and clipper blend with scalp stimulating shampoo and styling.',
    longDescription: 'Tailored specifically for male face structures. Includes relaxing scalp massage with aromatic hair tonic, clean scissor sculpting, and matte clay styling.',
    price: 1500,
    duration: 45,
    image: unsplash('1503951914875-452162b0f3f1', 700, 500),
    popular: true,
    featured: false,
    available: true,
  },
  {
    id: 'svc-003',
    name: 'Red Carpet Silk Blowout',
    category: 'haircuts',
    description: 'Ultra-smooth, luminous blow-dry styling with long-lasting thermal memory.',
    price: 1800,
    duration: 45,
    image: unsplash('1560869713-7d0a29430803', 700, 500),
    popular: false,
    featured: false,
    available: true,
  },

  // 2. Hair Colour & Highlights
  {
    id: 'svc-004',
    name: 'French Balayage & Melt',
    category: 'colour',
    description: 'Hand-painted dimensional contouring with ammonia-free gloss toner.',
    longDescription: 'Seamless gradations designed to reflect natural sunlight. Hand-swept highlights followed by an acidic conditioning gloss to lock in radiant luster for months.',
    price: 7500,
    duration: 180,
    image: unsplash('1595476108010-9a4ed74c00b3', 700, 500),
    popular: true,
    featured: true,
    available: true,
  },
  {
    id: 'svc-005',
    name: 'Full Bespoke Hair Colouring',
    category: 'colour',
    description: 'Rich, multi-tonal root-to-end couture color enriched with protective bond builders.',
    price: 5200,
    duration: 120,
    image: unsplash('1487412947147-5cebf100d293', 700, 500),
    popular: false,
    featured: false,
    available: true,
  },

  // 3. Hair Treatments
  {
    id: 'svc-006',
    name: 'Liquid Gold Keratin Infusion',
    category: 'treatments',
    description: 'Intense anti-frizz smoothing treatment sealing cuticle with hydrolyzed silk.',
    longDescription: 'Reconstructs damaged keratin chains, shields against coastal humidity, and provides effortless mirror shine for up to 16 weeks.',
    price: 8500,
    duration: 150,
    image: unsplash('1519823551278-64ac92734fb1', 700, 500),
    popular: true,
    featured: true,
    available: true,
  },
  {
    id: 'svc-007',
    name: 'Micro-Molecular Bond Repair',
    category: 'treatments',
    description: 'Deep structural hair recovery ritual for chemically treated or sensitized hair.',
    price: 3800,
    duration: 60,
    image: unsplash('1522337360826-74a49a5c3380', 700, 500),
    popular: false,
    featured: false,
    available: true,
  },

  // 4. Beard & Grooming
  {
    id: 'svc-008',
    name: 'Gentleman’s Royal Shave & Beard Sculpt',
    category: 'grooming',
    description: 'Pre-shave eucalyptus steam, double hot towel wrap, straight razor finish, and cold compress.',
    price: 1200,
    duration: 45,
    image: unsplash('1599351431613-18ef1fdd27e6', 700, 500),
    popular: true,
    featured: true,
    available: true,
  },

  // 5. Facials & Skincare
  {
    id: 'svc-009',
    name: '24K Golden Radiance Facial',
    category: 'facials',
    description: 'Cellular rejuvenating facial with peptide mist, ultrasonic infusion, and pure gold mask.',
    price: 4800,
    duration: 75,
    image: unsplash('1570172619644-dfd03ed5d881', 700, 500),
    popular: true,
    featured: true,
    available: true,
  },
  {
    id: 'svc-010',
    name: 'Botanical Detox & Pore Purifying Ritual',
    category: 'facials',
    description: 'Deep pore enzymatic exfoliation, cryo-lymphatic massage, and antioxidant defense.',
    price: 3400,
    duration: 60,
    image: unsplash('1616394584738-fc6e612e71b9', 700, 500),
    popular: false,
    featured: false,
    available: true,
  },

  // 6. Bridal & Special Occasions
  {
    id: 'svc-011',
    name: 'The ÉLORA Signature Bridal Symphony',
    category: 'bridal',
    description: 'Complete high-fashion bridal hair styling, bespoke makeup artistry, and dupatta draping.',
    longDescription: 'Comprehensive bridal package including comprehensive pre-wedding trial, skin prep ritual, HD airbrush makeup, couture hair sculpting, and on-call artist touchups.',
    price: 25000,
    duration: 240,
    image: unsplash('1511285560929-80b5bfe3b5c5', 700, 500),
    popular: true,
    featured: true,
    available: true,
  },

  // 7. Spa & Relaxation
  {
    id: 'svc-012',
    name: 'Ayurvedic Scalp Therapy & Head Spa',
    category: 'spa',
    description: 'Warm herbal oil shirodhara massage with steam bath and deep relaxation therapy.',
    price: 2800,
    duration: 60,
    image: unsplash('1540555700478-4be35c4b0c6a', 700, 500),
    popular: true,
    featured: false,
    available: true,
  },

  // 8. Manicure & Pedicure
  {
    id: 'svc-013',
    name: 'Champagne Rose Gel Manicure & Pedicure',
    category: 'nails',
    description: 'Organic sea salt soak, gentle sugar scrub, nail sculpting, cuticle renewal, and gel color.',
    price: 2600,
    duration: 75,
    image: unsplash('1519014816548-bf5fe059798b', 700, 500),
    popular: false,
    featured: false,
    available: true,
  },
];

// ─── STYLISTS (DEMO PROFILES) ─────────────────────────────────────────────────
export const initialStylists: Stylist[] = [
  {
    id: 'sty-001',
    name: 'Aria Mehta',
    role: 'Creative Director & Master Colourist',
    specializations: ['French Balayage', 'Couture Precision Cuts', 'Color Correction'],
    bio: 'With over 12 years of editorial styling experience across Mumbai and Paris fashion weeks, Aria is revered for creating effortlessly luminous shades and architectural cuts.',
    experience: 12,
    image: unsplash('1580489944761-15a19d654956', 500, 600),
    available: true,
    rating: 4.9,
    reviewCount: 284,
    services: ['svc-001', 'svc-003', 'svc-004', 'svc-005', 'svc-006'],
    workingHours: '10:00 AM - 07:00 PM',
  },
  {
    id: 'sty-002',
    name: 'Vikram Sengupta',
    role: 'Lead Master Barber & Grooming Artisan',
    specializations: ['Classic Barbering', 'Royal Hot Towel Shave', 'Beard Architecture'],
    bio: 'Vikram treats male grooming as an art form. His meticulous attention to beard symmetry, precision fading, and hot towel rituals has earned him an elite clientele.',
    experience: 10,
    image: unsplash('1507003211169-0a1dd7228f2d', 500, 600),
    available: true,
    rating: 4.8,
    reviewCount: 215,
    services: ['svc-002', 'svc-008'],
    workingHours: '11:00 AM - 08:00 PM',
  },
  {
    id: 'sty-003',
    name: 'Zara Kapoor',
    role: 'Celebrity Bridal Stylist & Makeup Artist',
    specializations: ['High-Fashion Bridal', 'Airbrush Artistry', 'Editorial Updos'],
    bio: 'Having styled brides across destination weddings in Udaipur, Lake Como, and Goa, Zara brings quiet confidence, elegance, and perfection to every bridal moment.',
    experience: 9,
    image: unsplash('1573497019940-1c28c88b4f3e', 500, 600),
    available: true,
    rating: 5.0,
    reviewCount: 168,
    services: ['svc-011', 'svc-001', 'svc-009'],
    workingHours: '09:00 AM - 06:00 PM',
  },
  {
    id: 'sty-004',
    name: 'Rohan Deshmukh',
    role: 'Senior Hair Artisan & Texture Specialist',
    specializations: ['Keratin Treatments', 'Multi-Dimensional Colour', 'Silk Blowouts'],
    bio: 'Trained at Vidal Sassoon London, Rohan understands hair biology intimately. He excels in restoring chemical resilience and creating vibrant, tactile movement.',
    experience: 8,
    image: unsplash('1500648767791-00dcc994a43e', 500, 600),
    available: true,
    rating: 4.9,
    reviewCount: 194,
    services: ['svc-001', 'svc-004', 'svc-006', 'svc-007'],
    workingHours: '10:00 AM - 07:00 PM',
  },
  {
    id: 'sty-005',
    name: 'Ananya Sharma',
    role: 'Holistic Aesthetician & Head Spa Specialist',
    specializations: ['24K Gold Facials', 'Ayurvedic Scalp Therapy', 'Nail Couture'],
    bio: 'Ananya blends ancient Ayurvedic principles with Swiss clinical skincare, providing restorative head spas and rejuvenating facials that revive tired senses.',
    experience: 7,
    image: unsplash('1594744803329-e58b31de8bf5', 500, 600),
    available: true,
    rating: 4.9,
    reviewCount: 142,
    services: ['svc-009', 'svc-010', 'svc-012', 'svc-013'],
    workingHours: '10:00 AM - 08:00 PM',
  },
];

// ─── GALLERY ITEMS ────────────────────────────────────────────────────────────
export const galleryItems: GalleryItem[] = [
  { id: 'gal-001', src: unsplash('1522337360826-74a49a5c3380', 700, 900), alt: 'Editorial precision cut and soft wave styling', category: 'transformations', title: 'Architectural Cut & Sculpt' },
  { id: 'gal-002', src: unsplash('1595476108010-9a4ed74c00b3', 900, 700), alt: 'Sunlit French balayage dimension', category: 'colour', title: 'Golden Champagne Balayage' },
  { id: 'gal-003', src: unsplash('1511285560929-80b5bfe3b5c5', 800, 1000), alt: 'Intricate bridal floral updo', category: 'bridal', title: 'Royal Heritage Bridal Look' },
  { id: 'gal-004', src: unsplash('1599351431613-18ef1fdd27e6', 700, 800), alt: 'Sharp beard fade and hot towel styling', category: 'grooming', title: 'Gentleman’s Razor Sculpture' },
  { id: 'gal-005', src: unsplash('1487412947147-5cebf100d293', 800, 600), alt: 'Lustrous gloss hair transformation', category: 'colour', title: 'Mahogany Multi-Tonal Glaze' },
  { id: 'gal-006', src: unsplash('1560066984-138dadb4c035', 1000, 700), alt: 'ÉLORA private styling lounge and suite', category: 'interiors', title: 'The ÉLORA Styling Suite' },
  { id: 'gal-007', src: unsplash('1560869713-7d0a29430803', 800, 900), alt: 'Silk finish runway blowout', category: 'styling', title: 'Runway Silk Volume' },
  { id: 'gal-008', src: unsplash('1540555700478-4be35c4b0c6a', 900, 650), alt: 'Serene spa head therapy suite', category: 'interiors', title: 'Private Spa Haven' },
  { id: 'gal-009', src: unsplash('1519823551278-64ac92734fb1', 800, 800), alt: 'Glass hair keratin mirror reflection', category: 'transformations', title: 'Liquid Gold Keratin Finish' },
  { id: 'gal-010', src: unsplash('1503951914875-452162b0f3f1', 750, 900), alt: 'Classic scissor over comb haircut', category: 'grooming', title: 'Timeless Male Styling' },
  { id: 'gal-011', src: unsplash('1570172619644-dfd03ed5d881', 800, 650), alt: '24K gold facial skin radiance session', category: 'styling', title: 'Gold Leaf Rejuvenation' },
  { id: 'gal-012', src: unsplash('1524504388515-9b7d1e04b83c', 700, 900), alt: 'Destination bridal hair and makeup portrait', category: 'bridal', title: 'Destination Bridal Glow' },
];

// ─── TESTIMONIALS (SAMPLE REVIEWS FOR DEMO) ──────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: 'tst-001',
    name: 'Natasha Singhal',
    quote: 'ÉLORA SALON delivers an experience comparable to the finest salons in Milan or Mayfair. Aria understood my hair structure immediately — my balayage has never looked this natural.',
    rating: 5,
    service: 'French Balayage & Melt',
    avatar: unsplash('1494790108377-be9c29b29330', 90, 90),
  },
  {
    id: 'tst-002',
    name: 'Devraj Oberoi',
    quote: 'The royal shave with Vikram is unmatched. The hot towels, aromatic oils, and precision razor work make it an essential sanctuary before important board meetings.',
    rating: 5,
    service: 'Royal Shave & Beard Sculpt',
    avatar: unsplash('1500648767791-00dcc994a43e', 90, 90),
  },
  {
    id: 'tst-003',
    name: 'Meera Chawla',
    quote: 'Zara styled my wedding hair and makeup. She remained composed, elegant, and brought out the most authentic version of my bridal vision. The photographs speak for themselves.',
    rating: 5,
    service: 'Signature Bridal Symphony',
    avatar: unsplash('1534528741775-53994a69daeb', 90, 90),
  },
  {
    id: 'tst-004',
    name: 'Aditya Merchant',
    quote: 'From the warm greeting to the precision scissor work, ÉLORA exemplifies luxury hospitality. Quiet, sophisticated, and completely bespoke.',
    rating: 5,
    service: "Men's Architectural Cut",
    avatar: unsplash('1507003211169-0a1dd7228f2d', 90, 90),
  },
];

// ─── BUSINESS HOURS ───────────────────────────────────────────────────────────
export const businessHours: BusinessHours[] = [
  { day: 'Monday', open: '10:00', close: '20:00', closed: false },
  { day: 'Tuesday', open: '10:00', close: '20:00', closed: false },
  { day: 'Wednesday', open: '10:00', close: '20:00', closed: false },
  { day: 'Thursday', open: '10:00', close: '21:00', closed: false },
  { day: 'Friday', open: '10:00', close: '21:00', closed: false },
  { day: 'Saturday', open: '09:00', close: '21:00', closed: false },
  { day: 'Sunday', open: '10:00', close: '19:00', closed: false },
];

// ─── CONTACT INFO ─────────────────────────────────────────────────────────────
export const contactInfo: ContactInfo = {
  address: 'Level 2, The Pavilion, Luxury Boulevard, Bandra West, Mumbai 400050',
  phone: '+91 22 2640 8800',
  email: 'concierge@elorasalon.demo',
  mapUrl: 'https://maps.google.com/?q=Bandra+West+Mumbai',
};

// ─── CATEGORY LABELS (8 REAL CATEGORIES) ──────────────────────────────────────
export const serviceCategories: { value: ServiceCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Services' },
  { value: 'haircuts', label: 'Haircuts & Styling' },
  { value: 'colour', label: 'Hair Colour & Highlights' },
  { value: 'treatments', label: 'Hair Treatments' },
  { value: 'grooming', label: 'Beard & Grooming' },
  { value: 'facials', label: 'Facials & Skincare' },
  { value: 'bridal', label: 'Bridal & Occasions' },
  { value: 'spa', label: 'Spa & Relaxation' },
  { value: 'nails', label: 'Manicure & Pedicure' },
];

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: 'all', label: 'All Collections' },
  { value: 'transformations', label: 'Hair Transformations' },
  { value: 'colour', label: 'Hair Colour' },
  { value: 'styling', label: 'Styling' },
  { value: 'grooming', label: 'Grooming' },
  { value: 'bridal', label: 'Bridal Looks' },
  { value: 'interiors', label: 'Salon Interiors' },
];

// ─── INITIAL DEMO APPOINTMENTS (SAMPLE DATA) ───────────────────────────────────
export const initialBookings: Booking[] = [
  {
    id: 'BK-2026-081',
    serviceId: 'svc-004',
    stylistId: 'sty-001',
    date: '2026-10-18',
    time: '11:00',
    customerName: 'Priyanka Khanna',
    customerPhone: '+91 98201 12345',
    customerEmail: 'priyanka.k@example.com',
    status: 'confirmed',
    totalPrice: 7500,
    reference: 'ELORA-8812',
    createdAt: '2026-10-17T10:15:00Z',
  },
  {
    id: 'BK-2026-082',
    serviceId: 'svc-008',
    stylistId: 'sty-002',
    date: '2026-10-18',
    time: '14:00',
    customerName: 'Siddharth Roy',
    customerPhone: '+91 98202 23456',
    customerEmail: 'siddharth@example.com',
    status: 'pending',
    totalPrice: 1200,
    reference: 'ELORA-8813',
    createdAt: '2026-10-17T11:30:00Z',
  },
  {
    id: 'BK-2026-083',
    serviceId: 'svc-011',
    stylistId: 'sty-003',
    date: '2026-10-19',
    time: '10:00',
    customerName: 'Ananya Mehra',
    customerPhone: '+91 98203 34567',
    customerEmail: 'ananya.m@example.com',
    status: 'confirmed',
    totalPrice: 25000,
    reference: 'ELORA-8814',
    createdAt: '2026-10-16T14:20:00Z',
  },
  {
    id: 'BK-2026-084',
    serviceId: 'svc-001',
    stylistId: 'sty-001',
    date: '2026-10-17',
    time: '12:00',
    customerName: 'Kavita Menon',
    customerPhone: '+91 98204 45678',
    customerEmail: 'kavita@example.com',
    status: 'completed',
    totalPrice: 2400,
    reference: 'ELORA-8810',
    createdAt: '2026-10-15T09:00:00Z',
  },
];

// Helper to generate realistic time slots with real overlap checking
export const STANDARD_TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30',
];
