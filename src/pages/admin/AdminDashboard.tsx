import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar, Users, DollarSign,
  AlertCircle, ArrowRight, Scissors, Clock
} from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

function StatCard({ icon: Icon, label, value, subtext, color = 'gold' }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#201E1A] border border-[#2E2B25] p-6 rounded-[2px]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 flex items-center justify-center border ${
          color === 'gold' ? 'border-[#C5A572]/30 bg-[#C5A572]/10' :
          color === 'green' ? 'border-[#22c55e]/30 bg-[#22c55e]/10' :
          color === 'blue' ? 'border-[#3b82f6]/30 bg-[#3b82f6]/10' :
          'border-[#a855f7]/30 bg-[#a855f7]/10'
        }`}>
          <Icon size={18} className={
            color === 'gold' ? 'text-[#C5A572]' :
            color === 'green' ? 'text-[#22c55e]' :
            color === 'blue' ? 'text-[#3b82f6]' :
            'text-[#a855f7]'
          } />
        </div>
      </div>
      <div className="font-serif text-3xl font-bold text-[#F7F3EC] mb-1">{value}</div>
      <div className="font-sans text-xs text-[#A9A197] uppercase tracking-wider">{label}</div>
      {subtext && <div className="font-sans text-[11px] text-[#A9A197]/70 mt-1">{subtext}</div>}
    </motion.div>
  );
}

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: 'Pending', class: 'badge-pending' },
  confirmed: { label: 'Confirmed', class: 'badge-confirmed' },
  completed: { label: 'Completed', class: 'badge-completed' },
  cancelled: { label: 'Cancelled', class: 'badge-cancelled' },
  'no-show': { label: 'No-show', class: 'badge-noshow' },
};

export default function AdminDashboard() {
  const { bookings, services, stylists, settings } = useSalon();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.date === todayStr);
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'completed' || b.status === 'confirmed')
    .reduce((acc, b) => acc + (b.totalPrice || 0), 0);

  const recentBookings = bookings.slice(0, 5);

  const getServiceName = (id: string) => services.find(s => s.id === id)?.name || id;
  const getStylistName = (id: string) => {
    if (id === 'any') return 'Any Available';
    return stylists.find(s => s.id === id)?.name || id;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#F7F3EC] mb-1">Salon Overview</h1>
          <p className="font-sans text-sm text-[#A9A197]">
            Live operational intelligence for {settings.salonName}
            <span className="ml-3 text-[#C5A572] text-xs border border-[#C5A572]/30 bg-[#C5A572]/10 px-2 py-0.5">
              Live Demo Storage
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/book" className="btn-outline-gold text-xs px-4 py-2">
            Open Booking Flow
          </Link>
          <Link to="/admin/appointments" className="btn-gold text-xs px-4 py-2">
            View All Bookings
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Calendar}
          label="Today's Appointments"
          value={todayBookings.length}
          subtext={`${todayBookings.filter(b => b.status === 'confirmed').length} confirmed today`}
          color="gold"
        />
        <StatCard
          icon={DollarSign}
          label="Estimated Revenue"
          value={`${settings.currencySymbol}${totalRevenue.toLocaleString('en-IN')}`}
          subtext="Confirmed & completed bookings"
          color="green"
        />
        <StatCard
          icon={AlertCircle}
          label="Pending Approvals"
          value={pendingCount}
          subtext="Awaiting salon confirmation"
          color="blue"
        />
        <StatCard
          icon={Users}
          label="Active Stylists"
          value={stylists.filter(s => s.available).length}
          subtext={`${stylists.length} registered specialists`}
          color="purple"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 bg-[#201E1A] border border-[#2E2B25] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg font-bold text-[#F7F3EC]">Recent Appointments</h2>
            <Link to="/admin/appointments" className="font-sans text-xs text-[#C5A572] hover:underline flex items-center gap-1">
              All appointments <ArrowRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Stylist</th>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => {
                  const cfg = statusConfig[b.status] || { label: b.status, class: '' };
                  return (
                    <tr key={b.id}>
                      <td className="font-mono text-xs text-[#A9A197]">{b.reference || b.id}</td>
                      <td>
                        <span className="font-semibold text-[#F7F3EC] block">{b.customerName}</span>
                        <span className="text-[11px] text-[#A9A197]">{b.customerPhone}</span>
                      </td>
                      <td className="text-[#A9A197]">{getServiceName(b.serviceId)}</td>
                      <td className="text-[#A9A197]">{getStylistName(b.stylistId)}</td>
                      <td className="text-xs text-[#A9A197] whitespace-nowrap">
                        <span className="block text-[#F7F3EC]">{b.date}</span>
                        <span>{b.time}</span>
                      </td>
                      <td className="text-[#C5A572] font-serif font-bold">
                        {settings.currencySymbol}{(b.totalPrice || 0).toLocaleString('en-IN')}
                      </td>
                      <td>
                        <span className={`status-badge ${cfg.class}`}>
                          {cfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Breakdown & Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#201E1A] border border-[#2E2B25] p-6">
            <h2 className="font-serif text-lg font-bold text-[#F7F3EC] mb-4">Pipeline Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-sans text-[#A9A197] mb-1">
                  <span>Confirmed</span>
                  <span className="text-[#22c55e] font-semibold">{confirmedCount}</span>
                </div>
                <div className="w-full bg-[#151412] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#22c55e] h-full"
                    style={{ width: `${bookings.length ? (confirmedCount / bookings.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-sans text-[#A9A197] mb-1">
                  <span>Pending</span>
                  <span className="text-[#eab308] font-semibold">{pendingCount}</span>
                </div>
                <div className="w-full bg-[#151412] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#eab308] h-full"
                    style={{ width: `${bookings.length ? (pendingCount / bookings.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-sans text-[#A9A197] mb-1">
                  <span>Completed</span>
                  <span className="text-[#C5A572] font-semibold">{completedCount}</span>
                </div>
                <div className="w-full bg-[#151412] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C5A572] h-full"
                    style={{ width: `${bookings.length ? (completedCount / bookings.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#201E1A] border border-[#2E2B25] p-6">
            <h2 className="font-serif text-lg font-bold text-[#F7F3EC] mb-4">Quick Management</h2>
            <div className="space-y-2.5">
              <Link to="/admin/services" className="flex items-center justify-between p-3 border border-[#2E2B25] hover:border-[#C5A572] transition-colors group">
                <div className="flex items-center gap-3">
                  <Scissors size={16} className="text-[#C5A572]" />
                  <span className="font-sans text-xs text-[#F7F3EC] group-hover:text-[#C5A572] transition-colors">
                    Manage Services & Prices
                  </span>
                </div>
                <span className="text-xs text-[#A9A197]">{services.length} items</span>
              </Link>

              <Link to="/admin/stylists" className="flex items-center justify-between p-3 border border-[#2E2B25] hover:border-[#C5A572] transition-colors group">
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-[#C5A572]" />
                  <span className="font-sans text-xs text-[#F7F3EC] group-hover:text-[#C5A572] transition-colors">
                    Stylist Roster & Hours
                  </span>
                </div>
                <span className="text-xs text-[#A9A197]">{stylists.length} staff</span>
              </Link>

              <Link to="/admin/settings" className="flex items-center justify-between p-3 border border-[#2E2B25] hover:border-[#C5A572] transition-colors group">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-[#C5A572]" />
                  <span className="font-sans text-xs text-[#F7F3EC] group-hover:text-[#C5A572] transition-colors">
                    Salon Policies & Settings
                  </span>
                </div>
                <span className="text-xs text-[#A9A197]">Config</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
