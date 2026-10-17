// Types for ÉLORA SALON application

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';

export type ServiceCategory =
  | 'haircuts'
  | 'colour'
  | 'treatments'
  | 'grooming'
  | 'facials'
  | 'bridal'
  | 'spa'
  | 'nails';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  longDescription?: string;
  price: number; // in INR (₹)
  duration: number; // in minutes
  image: string;
  popular?: boolean;
  featured?: boolean;
  available?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  specializations: string[];
  bio: string;
  experience?: number; // years
  image: string;
  available: boolean;
  rating: number;
  reviewCount: number;
  services: string[]; // service IDs
  workingHours?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
  };
}

export type GalleryCategory =
  | 'all'
  | 'transformations'
  | 'colour'
  | 'styling'
  | 'grooming'
  | 'bridal'
  | 'interiors';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title?: string;
  width?: number;
  height?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  avatar?: string;
  service?: string;
  date?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  stylistId: string | 'any';
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  status: AppointmentStatus;
  totalPrice?: number;
  reference: string;
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapUrl?: string;
}

export interface SalonSettings {
  salonName: string;
  tagline: string;
  currency: string;
  currencySymbol: string;
  address: string;
  phone: string;
  email: string;
  bookingPolicy: string;
  cancellationNoticeHours: number;
  developerCredit: string;
}

export interface FilterOption {
  value: string;
  label: string;
}
