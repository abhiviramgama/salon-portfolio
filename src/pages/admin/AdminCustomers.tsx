import { useState } from 'react';
import { Search, UserCheck, Calendar, Phone, Mail } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

interface CustomerSummary {
  name: string;
  phone: string;
  email: string;
  totalVisits: number;
  totalSpend: number;
  latestVisit: string;
  status: string;
}

export default function AdminCustomers() {
  const { bookings, settings } = useSalon();
  const [search, setSearch] = useState('');

  // Aggregate customer records from booking history
  const customersMap = new Map<string, CustomerSummary>();

  bookings.forEach(b => {
    const key = b.customerEmail.toLowerCase().trim() || b.customerPhone.trim();
    if (!key) return;

    const existing = customersMap.get(key);
    const amount = (b.status === 'confirmed' || b.status === 'completed') ? (b.totalPrice || 0) : 0;

    if (!existing) {
      customersMap.set(key, {
        name: b.customerName,
        phone: b.customerPhone,
        email: b.customerEmail,
        totalVisits: 1,
        totalSpend: amount,
        latestVisit: b.date,
        status: b.status,
      });
    } else {
      existing.totalVisits += 1;
      existing.totalSpend += amount;
      if (b.date > existing.latestVisit) {
        existing.latestVisit = b.date;
        existing.status = b.status;
      }
    }
  });

  const customers = Array.from(customersMap.values());

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#F7F3EC] mb-1">Customer Records & Directory</h1>
          <p className="font-sans text-sm text-[#A9A197]">
            Review client visit frequency, cumulative spend, and booking history
            <span className="ml-3 text-[#C5A572] text-xs border border-[#C5A572]/30 bg-[#C5A572]/10 px-2 py-0.5">
              {customers.length} Unique Clients
            </span>
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A9A197]" />
          <input
            type="search"
            placeholder="Search by client name, mobile, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input pl-10 w-full bg-[#201E1A] border-[#2E2B25] text-[#F7F3EC]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#201E1A] border border-[#2E2B25] overflow-hidden rounded-[2px]">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Total Bookings</th>
                <th>Total Spend</th>
                <th>Latest Appointment</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#C5A572]/10 border border-[#C5A572]/30 flex items-center justify-center text-xs font-bold text-[#C5A572]">
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-[#F7F3EC]">{c.name}</span>
                    </div>
                  </td>
                  <td className="text-xs text-[#A9A197]">
                    <span className="flex items-center gap-1.5">
                      <Phone size={12} className="text-[#C5A572]" /> {c.phone}
                    </span>
                  </td>
                  <td className="text-xs text-[#A9A197]">
                    <span className="flex items-center gap-1.5">
                      <Mail size={12} className="text-[#C5A572]" /> {c.email}
                    </span>
                  </td>
                  <td className="text-xs font-medium text-[#F7F3EC]">{c.totalVisits} appointment{c.totalVisits > 1 ? 's' : ''}</td>
                  <td className="text-sm font-serif font-bold text-[#C5A572]">
                    {settings.currencySymbol}{c.totalSpend.toLocaleString('en-IN')}
                  </td>
                  <td className="text-xs text-[#A9A197]">
                    <span className="flex items-center gap-1.5 text-[#F7F3EC]">
                      <Calendar size={12} className="text-[#C5A572]" /> {c.latestVisit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <UserCheck size={32} className="mx-auto text-[#A9A197]/40 mb-3" />
            <p className="font-serif text-lg text-[#F7F3EC] mb-1">No customer records found</p>
            <p className="font-sans text-xs text-[#A9A197]">Client records will automatically populate as appointments are booked.</p>
          </div>
        )}
      </div>
    </div>
  );
}
