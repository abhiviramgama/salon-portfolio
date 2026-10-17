import { useState } from 'react';
import { Search, Check, X, Clock, Calendar } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import type { AppointmentStatus } from '../../types';

export default function AdminAppointments() {
  const { bookings, updateBookingStatus, services, stylists, settings } = useSalon();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getServiceName = (id: string) => services.find(s => s.id === id)?.name || id;
  const getStylistName = (id: string) => {
    if (id === 'any') return 'Any Available Stylist';
    return stylists.find(s => s.id === id)?.name || id;
  };

  const filtered = bookings.filter(b => {
    const serviceName = getServiceName(b.serviceId).toLowerCase();
    const stylistName = getStylistName(b.stylistId).toLowerCase();
    const q = search.toLowerCase();

    const matchSearch =
      b.customerName.toLowerCase().includes(q) ||
      b.customerPhone.toLowerCase().includes(q) ||
      b.customerEmail.toLowerCase().includes(q) ||
      (b.reference && b.reference.toLowerCase().includes(q)) ||
      b.id.toLowerCase().includes(q) ||
      serviceName.includes(q) ||
      stylistName.includes(q);

    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#F7F3EC] mb-1">Appointment Roster</h1>
          <p className="font-sans text-sm text-[#A9A197]">
            Monitor, approve, reschedule, or cancel salon client bookings
            <span className="ml-3 text-[#C5A572] text-xs border border-[#C5A572]/30 bg-[#C5A572]/10 px-2 py-0.5">
              {filtered.length} Bookings Shown
            </span>
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A9A197]" />
          <input
            type="search"
            placeholder="Search by client name, mobile, reference, service, or stylist..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input pl-10 w-full bg-[#201E1A] border-[#2E2B25] text-[#F7F3EC]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="form-input w-full sm:w-48 bg-[#201E1A] border-[#2E2B25] text-[#F7F3EC]"
          aria-label="Filter appointments by status"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="no-show">No-show</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#201E1A] border border-[#2E2B25] overflow-hidden rounded-[2px]">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Client Details</th>
                <th>Service</th>
                <th>Stylist</th>
                <th>Appointment Date</th>
                <th>Fee</th>
                <th>Current Status</th>
                <th>Manage Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td className="font-mono text-xs text-[#A9A197]">
                    <span className="text-[#C5A572] font-semibold">{b.reference || b.id}</span>
                    <span className="block text-[10px] text-[#A9A197]/70">
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'Online'}
                    </span>
                  </td>
                  <td>
                    <span className="font-semibold text-[#F7F3EC] block">{b.customerName}</span>
                    <span className="text-xs text-[#A9A197] block">{b.customerPhone}</span>
                    <span className="text-[11px] text-[#A9A197]/70">{b.customerEmail}</span>
                  </td>
                  <td className="text-[#F7F3EC] font-medium">{getServiceName(b.serviceId)}</td>
                  <td className="text-[#A9A197]">{getStylistName(b.stylistId)}</td>
                  <td className="text-[#A9A197] whitespace-nowrap text-xs">
                    <span className="block text-[#F7F3EC] font-medium">{b.date}</span>
                    <span className="flex items-center gap-1 text-[11px] text-[#C5A572]">
                      <Clock size={11} /> {b.time}
                    </span>
                  </td>
                  <td className="text-[#C5A572] font-bold font-serif">
                    {settings.currencySymbol}{(b.totalPrice || 0).toLocaleString('en-IN')}
                  </td>
                  <td>
                    <span className={`status-badge ${
                      b.status === 'confirmed' ? 'badge-confirmed' :
                      b.status === 'pending' ? 'badge-pending' :
                      b.status === 'completed' ? 'badge-completed' :
                      b.status === 'cancelled' ? 'badge-cancelled' :
                      'badge-noshow'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <select
                        value={b.status}
                        onChange={e => updateBookingStatus(b.id, e.target.value as AppointmentStatus)}
                        className="text-xs font-sans border border-[#2E2B25] bg-[#151412] text-[#F7F3EC] px-2 py-1 rounded-[2px] cursor-pointer"
                        aria-label={`Change status for booking ${b.id}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="no-show">No-show</option>
                      </select>

                      {b.status === 'pending' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'confirmed')}
                          className="p-1 text-[#22c55e] hover:bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-[2px]"
                          title="Confirm appointment"
                        >
                          <Check size={14} />
                        </button>
                      )}

                      {b.status !== 'cancelled' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'cancelled')}
                          className="p-1 text-[#ef4444] hover:bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-[2px]"
                          title="Cancel appointment"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Calendar size={32} className="mx-auto text-[#A9A197]/40 mb-3" />
            <p className="font-serif text-lg text-[#F7F3EC] mb-1">No appointments matched</p>
            <p className="font-sans text-xs text-[#A9A197]">Try adjusting your search query or status filter.</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-[#2E2B25] bg-[#151412]/50 flex items-center justify-between text-xs text-[#A9A197]">
          <span>Changes are saved immediately in local demo storage.</span>
          <span>{settings.salonName} Central Administration</span>
        </div>
      </div>
    </div>
  );
}
