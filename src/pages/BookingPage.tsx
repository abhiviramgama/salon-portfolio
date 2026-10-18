import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  Star,
  AlertTriangle,
  // Calendar as CalendarIcon,
  Sparkles,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useSalon } from '../context/SalonContext';
import { serviceCategories } from '../data';
import type { Booking, ServiceCategory } from '../types';

// ─── Step Indicator ────────────────────────────────────────────────────────────
const STEPS = [
  '1. Service',
  '2. Stylist',
  '3. Date',
  '4. Time Slot',
  '5. Client Info',
  '6. Review',
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between max-w-xl mx-auto px-2">
        {STEPS.map((label, i) => {
          const isDone = i < current;
          const isCurrent = i === current;
          return (
            <div key={label} className="flex flex-col items-center flex-1 relative">
              <div
                className={`w-9 h-9 flex items-center justify-center font-sans text-xs font-semibold transition-all ${
                  isDone
                    ? 'bg-[#C5A572] text-[#151412] shadow-sm'
                    : isCurrent
                    ? 'border-2 border-[#C5A572] text-[#C5A572] bg-[#201E1A]'
                    : 'border border-[#C5A572]/20 text-[#A9A197] bg-[#151412]'
                }`}
              >
                {isDone ? <Check size={14} strokeWidth={2.5} /> : i + 1}
              </div>
              <span
                className={`font-sans text-xs uppercase tracking-wider mt-2 text-center hidden sm:block ${
                  isCurrent ? 'text-[#C5A572] font-semibold' : isDone ? 'text-[#EAE1D5]' : 'text-[#A9A197]/70'
                }`}
              >
                {label.split('. ')[1]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 1: Select Service ───────────────────────────────────────────────────
function Step1({
  selectedId,
  onSelect,
  onNext,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  const { services } = useSalon();
  const [filter, setFilter] = useState<ServiceCategory | 'all'>('all');

  const filtered = useMemo(() => {
    return filter === 'all' ? services : services.filter(s => s.category === filter);
  }, [services, filter]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={14} className="text-[#C5A572]" />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
          Step 1 of 6
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F3EC] mb-2">
        Select Your Atelier Service
      </h2>
      <p className="font-sans text-sm text-[#A9A197] mb-6">
        Choose a precision service or bespoke treatment tailored to your signature aesthetic.
      </p>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {serviceCategories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`font-sans text-xs uppercase tracking-wider px-3 py-1.5 border transition-all ${
              filter === cat.value
                ? 'bg-[#C5A572] text-[#151412] border-[#C5A572] font-semibold'
                : 'bg-[#201E1A] text-[#A9A197] border-[#C5A572]/20 hover:border-[#C5A572]/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[520px] overflow-y-auto pr-1">
        {filtered.map(service => {
          const isSelected = selectedId === service.id;
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service.id)}
              className={`text-left p-4 border transition-all flex gap-3.5 items-start ${
                isSelected
                  ? 'border-[#C5A572] bg-[#C5A572]/10 shadow-sm'
                  : 'border-[#C5A572]/20 hover:border-[#C5A572]/50 bg-[#201E1A]'
              }`}
            >
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden border border-[#C5A572]/20">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-base font-bold text-[#F7F3EC] leading-tight line-clamp-1">
                    {service.name}
                  </h3>
                  {isSelected && (
                    <div className="w-4 h-4 bg-[#C5A572] flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[#151412]" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <p className="font-sans text-sm text-[#A9A197] line-clamp-1 mt-1">
                  {service.description}
                </p>
                <div className="flex items-center gap-3 mt-2 font-sans text-xs">
                  <span className="text-[#A9A197] flex items-center gap-1">
                    <Clock size={11} className="text-[#C5A572]" /> {service.duration}m
                  </span>
                  <span className="font-serif text-base font-semibold text-[#C5A572]">
                    ₹{service.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end mt-8 pt-4 border-t border-[#C5A572]/20">
        <button
          onClick={onNext}
          disabled={!selectedId}
          className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Select Stylist <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Select Stylist ───────────────────────────────────────────────────
function Step2({
  serviceId,
  selectedStylistId,
  onSelect,
  onNext,
  onBack,
}: {
  serviceId: string;
  selectedStylistId: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { stylists, services } = useSalon();
  const selectedService = services.find(s => s.id === serviceId);

  // Stylists trained for this service or all
  const eligibleStylists = useMemo(() => {
    if (!selectedService) return stylists;
    const matched = stylists.filter(s => s.services.includes(selectedService.id));
    return matched.length > 0 ? matched : stylists;
  }, [stylists, selectedService]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={14} className="text-[#C5A572]" />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
          Step 2 of 6
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F3EC] mb-2">
        Choose Your Master Stylist
      </h2>
      <p className="font-sans text-sm text-[#A9A197] mb-6">
        Select a specialist for your service or let our concierge allocate the first available artist.
      </p>

      {/* Any Available Option */}
      <button
        onClick={() => onSelect('any')}
        className={`w-full text-left p-4 border mb-4 transition-all flex items-center gap-4 ${
          selectedStylistId === 'any'
            ? 'border-[#C5A572] bg-[#C5A572]/10 shadow-sm'
            : 'border-[#C5A572]/20 hover:border-[#C5A572]/40 bg-[#201E1A]'
        }`}
      >
        <div className="w-12 h-12 border border-[#C5A572]/30 bg-[#151412] flex items-center justify-center flex-shrink-0">
          <User size={20} className="text-[#C5A572]" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-base font-light text-[#F7F3EC]">Any Available Master Stylist</h3>
          <p className="font-sans text-xs text-[#A9A197]">
            Fastest availability — our atelier director will assign the ideal specialist for {selectedService?.name || 'your treatment'}.
          </p>
        </div>
        {selectedStylistId === 'any' && (
          <div className="w-5 h-5 bg-[#C5A572] flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-[#151412]" strokeWidth={3} />
          </div>
        )}
      </button>

      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {eligibleStylists.map(stylist => {
          const isSelected = selectedStylistId === stylist.id;
          return (
            <button
              key={stylist.id}
              onClick={() => stylist.available && onSelect(stylist.id)}
              disabled={!stylist.available}
              className={`w-full text-left p-4 border transition-all flex items-center gap-4 ${
                !stylist.available
                  ? 'opacity-40 cursor-not-allowed border-[#C5A572]/10 bg-[#201E1A]/50'
                  : isSelected
                  ? 'border-[#C5A572] bg-[#C5A572]/10 shadow-sm'
                  : 'border-[#C5A572]/20 hover:border-[#C5A572]/40 bg-[#201E1A]'
              }`}
            >
              <div className="w-12 h-12 flex-shrink-0 overflow-hidden border border-[#C5A572]/20">
                <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-light text-[#F7F3EC] truncate">{stylist.name}</h3>
                  {!stylist.available ? (
                    <span className="font-sans text-[11px] uppercase tracking-wider text-rose-400 bg-rose-950/40 border border-rose-800/30 px-1.5 py-0.5">
                      Fully Booked
                    </span>
                  ) : (
                    <span className="font-sans text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-1.5 py-0.5">
                      Available
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs text-[#C5A572] truncate">{stylist.role}</p>
                <div className="flex items-center gap-2 mt-0.5 text-xs font-sans text-[#A9A197]">
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-[#C5A572] fill-current" /> {stylist.rating}
                  </span>
                  <span>•</span>
                  <span>{stylist.experience} yrs exp</span>
                </div>
              </div>
              {isSelected && (
                <div className="w-5 h-5 bg-[#C5A572] flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-[#151412]" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-[#C5A572]/20">
        <button onClick={onBack} className="btn-outline-gold">
          <ChevronLeft size={16} /> Service
        </button>
        <button
          onClick={onNext}
          disabled={!selectedStylistId}
          className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Select Date <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Select Date ──────────────────────────────────────────────────────
function Step3({
  selectedDate,
  onSelect,
  onNext,
  onBack,
}: {
  selectedDate: string;
  onSelect: (dateStr: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [today] = useState(() => new Date());
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Prevent dates strictly before today
  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < startOfToday;
  };

  const selectDay = (day: number) => {
    if (!isDisabled(day)) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      onSelect(dateStr);
    }
  };

  const selectedDay = selectedDate ? parseInt(selectedDate.split('-')[2], 10) : null;
  const selectedMonth = selectedDate ? parseInt(selectedDate.split('-')[1], 10) - 1 : null;
  const selectedYear = selectedDate ? parseInt(selectedDate.split('-')[0], 10) : null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={14} className="text-[#C5A572]" />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
          Step 3 of 6
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F3EC] mb-2">
        Select Appointment Date
      </h2>
      <p className="font-sans text-sm text-[#A9A197] mb-6">
        Appointments can be reserved up to 60 days in advance.
      </p>

      <div className="bg-[#201E1A] border border-[#C5A572]/20 p-6 max-w-sm mx-auto">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#C5A572]/15">
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            className="w-8 h-8 flex items-center justify-center text-[#A9A197] hover:text-[#C5A572] transition-colors"
            aria-label="Previous Month"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-serif text-base font-medium text-[#F7F3EC] tracking-wide">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="w-8 h-8 flex items-center justify-center text-[#A9A197] hover:text-[#C5A572] transition-colors"
            aria-label="Next Month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 mb-2 text-center">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="font-sans text-[11px] text-[#C5A572] font-semibold">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} className="h-9" />;
            const isSelected = day === selectedDay && month === selectedMonth && year === selectedYear;
            const disabled = isDisabled(day);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <button
                key={day}
                onClick={() => selectDay(day)}
                disabled={disabled}
                className={`h-9 flex items-center justify-center font-sans text-xs transition-all ${
                  isSelected
                    ? 'bg-[#C5A572] text-[#151412] font-bold shadow-sm'
                    : isToday
                    ? 'border border-[#C5A572] text-[#C5A572]'
                    : disabled
                    ? 'text-[#A9A197]/30 cursor-not-allowed'
                    : 'text-[#F7F3EC] hover:bg-[#151412] hover:text-[#C5A572]'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-4 text-center font-sans text-xs text-[#C5A572]">
          Selected: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      )}

      <div className="flex justify-between mt-8 pt-4 border-t border-[#C5A572]/20">
        <button onClick={onBack} className="btn-outline-gold">
          <ChevronLeft size={16} /> Stylist
        </button>
        <button
          onClick={onNext}
          disabled={!selectedDate}
          className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Select Time Slot <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Select Time Slot ─────────────────────────────────────────────────
function Step4({
  date,
  stylistId,
  selectedTime,
  onSelect,
  onNext,
  onBack,
}: {
  date: string;
  stylistId: string;
  selectedTime: string;
  onSelect: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { getAvailableSlots } = useSalon();
  const slots = useMemo(() => {
    return date ? getAvailableSlots(date, stylistId) : [];
  }, [date, stylistId, getAvailableSlots]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={14} className="text-[#C5A572]" />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
          Step 4 of 6
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F3EC] mb-2">
        Available Time Slots
      </h2>
      <p className="font-sans text-sm text-[#A9A197] mb-4">
        Real-time conflict detection: slots already reserved by other clients are marked unavailable.
      </p>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-6 text-xs font-sans text-[#A9A197]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#201E1A] border border-[#C5A572]/40" /> Available
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#C5A572]" /> Selected
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#151412] opacity-40 border border-[#A9A197]/20" /> Reserved
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
        {slots.map(slot => {
          const isSelected = selectedTime === slot.time;
          return (
            <button
              key={slot.time}
              onClick={() => slot.available && onSelect(slot.time)}
              disabled={!slot.available}
              className={`py-3 px-2 text-center font-sans text-xs transition-all border ${
                !slot.available
                  ? 'border-transparent bg-[#151412]/50 text-[#A9A197]/30 line-through cursor-not-allowed'
                  : isSelected
                  ? 'bg-[#C5A572] text-[#151412] font-bold border-[#C5A572] shadow-sm'
                  : 'bg-[#201E1A] text-[#F7F3EC] border-[#C5A572]/20 hover:border-[#C5A572]/50'
              }`}
            >
              {slot.time}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-[#C5A572]/20">
        <button onClick={onBack} className="btn-outline-gold">
          <ChevronLeft size={16} /> Date
        </button>
        <button
          onClick={onNext}
          disabled={!selectedTime}
          className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Customer Details <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 5: Customer Details ─────────────────────────────────────────────────
function Step5({
  customerName,
  customerEmail,
  customerPhone,
  notes,
  onChange,
  onNext,
  onBack,
}: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  onChange: (fields: Record<string, string>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) {
      errs.customerName = 'Please enter your full name.';
    }
    if (!customerEmail.trim()) {
      errs.customerEmail = 'Email address is required for appointment confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      errs.customerEmail = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!customerPhone.trim()) {
      errs.customerPhone = 'Contact phone number is required.';
    } else if (customerPhone.replace(/[^0-9]/g, '').length < 10) {
      errs.customerPhone = 'Please provide a valid phone number (at least 10 digits).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={14} className="text-[#C5A572]" />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
          Step 5 of 6
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F3EC] mb-2">
        Guest Contact Information
      </h2>
      <p className="font-sans text-sm text-[#A9A197] mb-6">
        We require your coordinates to send the calendar confirmation and appointment pass.
      </p>

      <div className="space-y-4 max-w-lg">
        <div>
          <label htmlFor="customerName" className="form-label flex items-center gap-1.5">
            <User size={13} className="text-[#C5A572]" /> Full Name *
          </label>
          <input
            id="customerName"
            type="text"
            placeholder="e.g. Radhika Kapoor"
            value={customerName}
            onChange={e => {
              onChange({ customerName: e.target.value });
              if (errors.customerName) setErrors(prev => ({ ...prev, customerName: '' }));
            }}
            className={`form-input ${errors.customerName ? 'border-rose-500' : ''}`}
            aria-invalid={!!errors.customerName}
          />
          {errors.customerName && (
            <p className="font-sans text-xs text-rose-400 mt-1">{errors.customerName}</p>
          )}
        </div>

        <div>
          <label htmlFor="customerPhone" className="form-label flex items-center gap-1.5">
            <Phone size={13} className="text-[#C5A572]" /> Contact Phone (Mobile) *
          </label>
          <input
            id="customerPhone"
            type="tel"
            placeholder="+91 98200 12345"
            value={customerPhone}
            onChange={e => {
              onChange({ customerPhone: e.target.value });
              if (errors.customerPhone) setErrors(prev => ({ ...prev, customerPhone: '' }));
            }}
            className={`form-input ${errors.customerPhone ? 'border-rose-500' : ''}`}
            aria-invalid={!!errors.customerPhone}
          />
          {errors.customerPhone && (
            <p className="font-sans text-xs text-rose-400 mt-1">{errors.customerPhone}</p>
          )}
        </div>

        <div>
          <label htmlFor="customerEmail" className="form-label flex items-center gap-1.5">
            <Mail size={13} className="text-[#C5A572]" /> Email Address *
          </label>
          <input
            id="customerEmail"
            type="email"
            placeholder="radhika@example.com"
            value={customerEmail}
            onChange={e => {
              onChange({ customerEmail: e.target.value });
              if (errors.customerEmail) setErrors(prev => ({ ...prev, customerEmail: '' }));
            }}
            className={`form-input ${errors.customerEmail ? 'border-rose-500' : ''}`}
            aria-invalid={!!errors.customerEmail}
          />
          {errors.customerEmail && (
            <p className="font-sans text-xs text-rose-400 mt-1">{errors.customerEmail}</p>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="form-label flex items-center gap-1.5">
            <FileText size={13} className="text-[#C5A572]" /> Specific Preferences or Notes (Optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            placeholder="Any allergies, previous chemical treatments, scalp sensitivities, or bespoke requests..."
            value={notes}
            onChange={e => onChange({ notes: e.target.value })}
            className="form-input resize-none"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-[#C5A572]/20">
        <button onClick={onBack} className="btn-outline-gold">
          <ChevronLeft size={16} /> Time Slot
        </button>
        <button onClick={handleContinue} className="btn-gold">
          Review Booking <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 6: Review & Final Confirmation ──────────────────────────────────────
function Step6({
  booking,
  onBack,
  onConfirm,
  loading,
}: {
  booking: Partial<Booking>;
  onBack: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  const { services, stylists } = useSalon();
  const service = services.find(s => s.id === booking.serviceId);
  const stylist = booking.stylistId === 'any' ? null : stylists.find(s => s.id === booking.stylistId);

  const formattedDate = booking.date
    ? new Date(booking.date + 'T00:00:00').toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={14} className="text-[#C5A572]" />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
          Step 6 of 6
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F3EC] mb-2">
        Appointment Summary
      </h2>
      <p className="font-sans text-sm text-[#A9A197] mb-6">
        Review your reservation details. Confirmed appointments are instantly logged in the salon database.
      </p>

      {/* Demo Mode Notice */}
      <div className="bg-[#201E1A] border border-[#C5A572]/40 p-4 mb-6 flex gap-3 items-start">
        <AlertTriangle size={17} className="text-[#C5A572] flex-shrink-0 mt-0.5" />
        <div className="font-sans text-xs text-[#A9A197] leading-relaxed">
          <strong className="text-[#F7F3EC]">Demonstration Registry:</strong> This booking will be securely recorded in the local salon database. You can inspect, modify, or cancel this booking anytime inside the <Link to="/admin/appointments" className="text-[#C5A572] underline font-medium">Admin Dashboard</Link>.
        </div>
      </div>

      <div className="bg-[#201E1A] border border-[#C5A572]/20 divide-y divide-[#C5A572]/15 mb-6">
        <div className="p-4 flex items-center justify-between">
          <span className="font-sans text-xs uppercase tracking-wider text-[#A9A197]">Selected Service</span>
          <span className="font-serif text-sm font-medium text-[#F7F3EC] text-right">{service?.name}</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="font-sans text-xs uppercase tracking-wider text-[#A9A197]">Master Stylist</span>
          <span className="font-sans text-sm text-[#F7F3EC]">{stylist ? stylist.name : 'Any Available Master Stylist'}</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="font-sans text-xs uppercase tracking-wider text-[#A9A197]">Date & Time</span>
          <span className="font-sans text-sm text-[#F7F3EC] text-right">
            {formattedDate} at <strong className="text-[#C5A572]">{booking.time}</strong>
          </span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="font-sans text-xs uppercase tracking-wider text-[#A9A197]">Estimated Duration</span>
          <span className="font-sans text-sm text-[#A9A197]">{service?.duration} minutes</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="font-sans text-xs uppercase tracking-wider text-[#A9A197]">Client Name</span>
          <span className="font-sans text-sm text-[#F7F3EC]">{booking.customerName}</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="font-sans text-xs uppercase tracking-wider text-[#A9A197]">Contact Info</span>
          <span className="font-sans text-xs text-[#A9A197] text-right">
            {booking.customerPhone} • {booking.customerEmail}
          </span>
        </div>
        {booking.notes && (
          <div className="p-4 flex items-start justify-between">
            <span className="font-sans text-xs uppercase tracking-wider text-[#A9A197]">Notes</span>
            <span className="font-sans text-xs text-[#A9A197] max-w-xs text-right italic">{booking.notes}</span>
          </div>
        )}
        <div className="p-4 flex items-center justify-between bg-[#151412]">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F7F3EC]">Total Demo Fee</span>
            <div className="font-sans text-xs text-[#A9A197]">Payable upon atelier completion</div>
          </div>
          <span className="font-serif text-2xl font-light text-[#C5A572]">
            ₹{service?.price.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-[#C5A572]/20">
        <button onClick={onBack} disabled={loading} className="btn-outline-gold">
          <ChevronLeft size={16} /> Edit Info
        </button>
        <button onClick={onConfirm} disabled={loading} className="btn-gold min-w-[180px] justify-center">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-[#151412]/30 border-t-[#151412] rounded-full animate-spin" />
              Recording Booking...
            </span>
          ) : (
            <>Confirm Reservation <Check size={16} /></>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Main Booking Page Controller ─────────────────────────────────────────────
export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addBooking, services } = useSalon();

  const initialService = searchParams.get('service') || '';
  const initialStylist = searchParams.get('stylist') || '';

  // Determine starting step
  const [step, setStep] = useState(() => {
    if (initialStylist && initialService) return 2; // Date
    if (initialService) return 1; // Stylist
    return 0; // Service
  });

  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<Partial<Booking>>({
    serviceId: initialService,
    stylistId: initialStylist,
    date: '',
    time: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    notes: '',
  });

  const handleConfirm = async () => {
    if (!booking.serviceId || !booking.date || !booking.time || !booking.customerName) {
      return;
    }
    setLoading(true);
    try {
      const confirmed = await addBooking({
        serviceId: booking.serviceId,
        stylistId: booking.stylistId || 'any',
        date: booking.date,
        time: booking.time,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone || '',
        customerEmail: booking.customerEmail || '',
        notes: booking.notes || '',
      });

      navigate('/booking-confirmation', {
        state: { booking: confirmed },
      });
    } catch (err) {
      console.error('Failed to create booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find(s => s.id === booking.serviceId);

  return (
    <>
      <title>Book Appointment — ÉLORA SALON | Bespoke Reservation</title>

      <PageHeader crumb="Book" title="Reserve your experience" intro="Choose a treatment, an artist and a time. Live availability, confirmed in minutes." image="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&h=900&q=80" imageAlt="A silk-finish blowout" />

      <section className="section-padding bg-[#151412]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <StepIndicator current={step} />

            <div className="bg-[#201E1A] border border-[#C5A572]/20 p-6 sm:p-10 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 0 && (
                    <Step1
                      selectedId={booking.serviceId || ''}
                      onSelect={id => setBooking(b => ({ ...b, serviceId: id }))}
                      onNext={() => setStep(1)}
                    />
                  )}
                  {step === 1 && (
                    <Step2
                      serviceId={booking.serviceId || ''}
                      selectedStylistId={booking.stylistId || ''}
                      onSelect={id => setBooking(b => ({ ...b, stylistId: id }))}
                      onNext={() => setStep(2)}
                      onBack={() => setStep(0)}
                    />
                  )}
                  {step === 2 && (
                    <Step3
                      selectedDate={booking.date || ''}
                      onSelect={d => setBooking(b => ({ ...b, date: d, time: '' }))}
                      onNext={() => setStep(3)}
                      onBack={() => setStep(1)}
                    />
                  )}
                  {step === 3 && (
                    <Step4
                      date={booking.date || ''}
                      stylistId={booking.stylistId || 'any'}
                      selectedTime={booking.time || ''}
                      onSelect={t => setBooking(b => ({ ...b, time: t }))}
                      onNext={() => setStep(4)}
                      onBack={() => setStep(2)}
                    />
                  )}
                  {step === 4 && (
                    <Step5
                      customerName={booking.customerName || ''}
                      customerEmail={booking.customerEmail || ''}
                      customerPhone={booking.customerPhone || ''}
                      notes={booking.notes || ''}
                      onChange={fields => setBooking(b => ({ ...b, ...fields }))}
                      onNext={() => setStep(5)}
                      onBack={() => setStep(3)}
                    />
                  )}
                  {step === 5 && (
                    <Step6
                      booking={booking}
                      onBack={() => setStep(4)}
                      onConfirm={handleConfirm}
                      loading={loading}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom active selection sticky banner */}
            {selectedService && step < 5 && (
              <div className="mt-4 bg-[#201E1A] border border-[#C5A572]/20 p-4 flex flex-wrap items-center justify-between text-xs font-sans text-[#A9A197]">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[#F7F3EC] font-medium">{selectedService.name}</span>
                  {booking.date && (
                    <>
                      <span>•</span>
                      <span>{booking.date}</span>
                    </>
                  )}
                  {booking.time && (
                    <>
                      <span>•</span>
                      <span className="text-[#C5A572] font-semibold">{booking.time}</span>
                    </>
                  )}
                </div>
                <div className="font-serif text-[#C5A572] font-semibold text-sm">
                  ₹{selectedService.price.toLocaleString('en-IN')}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
