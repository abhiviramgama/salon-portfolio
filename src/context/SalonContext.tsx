import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type {
  Service,
  Stylist,
  Booking,
  SalonSettings,
  AppointmentStatus,
} from '../types';
import {
  initialServices,
  initialStylists,
  initialBookings,
  initialSettings,
  STANDARD_TIME_SLOTS,
} from '../data';

interface SalonContextType {
  settings: SalonSettings;
  services: Service[];
  stylists: Stylist[];
  bookings: Booking[];
  updateSettings: (updates: Partial<SalonSettings>) => void;
  updateServicePrice: (id: string, newPrice: number) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  addService: (newService: Omit<Service, 'id'>) => Service;
  deleteService: (id: string) => void;
  toggleServiceAvailability: (id: string) => void;
  updateStylist: (id: string, updates: Partial<Stylist>) => void;
  addBooking: (bookingData: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  cancelBooking: (id: string) => { success: boolean; message: string };
  updateBookingStatus: (id: string, status: AppointmentStatus) => void;
  getAvailableSlots: (date: string, stylistId?: string) => { time: string; available: boolean }[];
  resetToDemoDefaults: () => void;
}

const STORAGE_KEYS = {
  SETTINGS: 'elora_salon_settings_v1',
  SERVICES: 'elora_salon_services_v1',
  STYLISTS: 'elora_salon_stylists_v1',
  BOOKINGS: 'elora_salon_bookings_v1',
};

const SalonContext = createContext<SalonContextType | null>(null);

export function SalonProvider({ children }: { children: React.ReactNode }) {
  // Load settings with fallback
  const [settings, setSettings] = useState<SalonSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  // Load services with fallback
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : initialServices;
    } catch {
      return initialServices;
    }
  });

  // Load stylists with fallback
  const [stylists, setStylists] = useState<Stylist[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STYLISTS);
      return saved ? JSON.parse(saved) : initialStylists;
    } catch {
      return initialStylists;
    }
  });

  // Load bookings with fallback
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : initialBookings;
    } catch {
      return initialBookings;
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not persist settings to storage', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.warn('Could not persist services to storage', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STYLISTS, JSON.stringify(stylists));
    } catch (e) {
      console.warn('Could not persist stylists to storage', e);
    }
  }, [stylists]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.warn('Could not persist bookings to storage', e);
    }
  }, [bookings]);

  // Context methods
  const updateSettings = (updates: Partial<SalonSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const updateServicePrice = (id: string, newPrice: number) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, price: Math.max(0, newPrice) } : s))
    );
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  const addService = (newServiceData: Omit<Service, 'id'>) => {
    const newId = `svc-${String(Date.now()).slice(-4)}`;
    const created: Service = { ...newServiceData, id: newId };
    setServices(prev => [created, ...prev]);
    return created;
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const toggleServiceAvailability = (id: string) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, available: s.available === false } : s))
    );
  };

  const updateStylist = (id: string, updates: Partial<Stylist>) => {
    setStylists(prev => prev.map(st => (st.id === id ? { ...st, ...updates } : st)));
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (id: string): { success: boolean; message: string } => {
    const booking = bookings.find(b => b.id === id || b.reference === id);
    if (!booking) {
      return { success: false, message: 'Appointment not found.' };
    }
    if (booking.status === 'cancelled') {
      return { success: false, message: 'This appointment is already cancelled.' };
    }

    // Business rule: check notice hours against booking date/time
    const apptDateTime = new Date(`${booking.date}T${booking.time}:00`);
    const now = new Date();
    const hoursDifference = (apptDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursDifference < settings.cancellationNoticeHours && hoursDifference > 0) {
      // In demo mode we still allow it with warning, or confirm
      setBookings(prev =>
        prev.map(b => (b.id === booking.id ? { ...b, status: 'cancelled' } : b))
      );
      return {
        success: true,
        message: `Appointment cancelled. Note: Notice was less than ${settings.cancellationNoticeHours}h policy.`,
      };
    }

    setBookings(prev =>
      prev.map(b => (b.id === booking.id ? { ...b, status: 'cancelled' } : b))
    );
    return { success: true, message: 'Your appointment has been successfully cancelled.' };
  };

  const updateBookingStatus = (id: string, status: AppointmentStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status } : b))
    );
  };

  // True overlap checking against real confirmed/pending bookings
  const getAvailableSlots = (date: string, stylistId?: string) => {
    const activeBookings = bookings.filter(
      b => b.date === date && b.status !== 'cancelled' && b.status !== 'no-show'
    );

    return STANDARD_TIME_SLOTS.map(time => {
      // Check if slot is taken for specific stylist
      const isTaken = activeBookings.some(b => {
        if (stylistId && stylistId !== 'any') {
          // If booking was for this stylist or "any"
          return (b.stylistId === stylistId || b.stylistId === 'any') && b.time === time;
        } else {
          // If "any" stylist is chosen, is there at least one stylist free?
          const bookingsAtThisTime = activeBookings.filter(b => b.time === time);
          // If total bookings at this time >= active stylists count, slot is booked out
          return bookingsAtThisTime.length >= stylists.filter(s => s.available).length;
        }
      });

      return {
        time,
        available: !isTaken,
      };
    });
  };

  const resetToDemoDefaults = () => {
    setSettings(initialSettings);
    setServices(initialServices);
    setStylists(initialStylists);
    setBookings(initialBookings);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.STYLISTS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
  };

  const contextValue = useMemo<SalonContextType>(
    () => ({
      settings,
      services,
      stylists,
      bookings,
      updateSettings,
      updateServicePrice,
      updateService,
      addService,
      deleteService,
      toggleServiceAvailability,
      updateStylist,
      addBooking,
      cancelBooking,
      updateBookingStatus,
      getAvailableSlots,
      resetToDemoDefaults,
    }),
    [settings, services, stylists, bookings]
  );

  return (
    <SalonContext.Provider value={contextValue}>
      {children}
    </SalonContext.Provider>
  );
}

export function useSalon() {
  const ctx = useContext(SalonContext);
  if (!ctx) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return ctx;
}
