import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, User, Scissors, ArrowRight } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export default function BookingConfirmationPage() {
  const { state } = useLocation();
  const { services, stylists } = useSalon();

  if (!state?.booking) return <Navigate to="/book" replace />;

  const { booking } = state;
  const service = services.find(s => s.id === booking.serviceId);
  const stylist = booking.stylistId === 'any' ? null : stylists.find(s => s.id === booking.stylistId);

  const details = [
    { icon: Scissors, label: 'Service', value: service?.name },
    { icon: User, label: 'Stylist', value: stylist?.name || 'Any Available Stylist' },
    { icon: Calendar, label: 'Date', value: booking.date ? new Date(booking.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '' },
    { icon: Clock, label: 'Time', value: booking.time },
  ];

  return (
    <>
      <title>Booking Confirmed — ÉLORA SALON</title>

      <div className="min-h-screen bg-[#111110] flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-lg w-full text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-20 h-20 bg-[#C6A66B]/15 border border-[#C6A66B]/30 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle size={36} className="text-[#C6A66B]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="font-serif text-3xl font-bold text-[#F5F0E8] mb-3">
              You're All Set!
            </h1>
            <p className="font-sans text-[#AAA49A] leading-relaxed mb-2">
              Your appointment request has been received. We'll confirm it shortly via email.
            </p>
            <p className="font-sans text-xs text-[#AAA49A]/60 mb-8">
              Demo mode — no actual booking was created.
            </p>

            {/* Reference */}
            <div className="bg-[#1B1A18] border border-[#C6A66B]/20 px-6 py-4 mb-6">
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#AAA49A] mb-1">Booking Reference</p>
              <p className="font-serif text-2xl font-bold text-[#C6A66B]">{booking.reference}</p>
            </div>

            {/* Details */}
            <div className="bg-[#1B1A18] border border-[#2A2926] mb-8">
              {details.filter(d => d.value).map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 px-6 py-4 border-b border-[#2A2926] last:border-0">
                  <Icon size={16} className="text-[#C6A66B] flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="font-sans text-[10px] uppercase tracking-wider text-[#AAA49A]">{label}</p>
                    <p className="font-sans text-sm font-semibold text-[#F5F0E8] mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="font-sans text-sm font-bold text-[#F5F0E8]">Total</span>
                <span className="font-serif text-xl font-bold text-[#C6A66B]">£{service?.price}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/" className="btn-gold flex-1 justify-center">
                Back to Home <ArrowRight size={16} />
              </Link>
              <Link to="/book" className="btn-outline-gold flex-1 justify-center">
                Book Another
              </Link>
            </div>

            <p className="font-sans text-xs text-[#AAA49A] mt-6 leading-relaxed">
              A confirmation will be sent to <strong className="text-[#F5F0E8]">{booking.customerEmail}</strong>. Please arrive 5 minutes before your appointment.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
