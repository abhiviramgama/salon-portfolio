import { useState } from 'react';
import { Users, Clock, Star, Edit3, Check, X } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

export default function AdminStylists() {
  const { stylists, updateStylist, services } = useSalon();
  const [editingStylistId, setEditingStylistId] = useState<string | null>(null);
  const [hoursInput, setHoursInput] = useState('');

  const handleSaveHours = (id: string) => {
    updateStylist(id, { workingHours: hoursInput });
    setEditingStylistId(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#F7F3EC] mb-1">Stylist Roster & Working Hours</h1>
          <p className="font-sans text-sm text-[#A9A197]">
            Configure stylist availability, schedule shifts, and assigned salon services
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stylists.map(stylist => (
          <div key={stylist.id} className="bg-[#201E1A] border border-[#2E2B25] p-6 rounded-[2px] flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-16 h-20 object-cover rounded-[2px] border border-[#2E2B25]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-[#F7F3EC] text-base">{stylist.name}</h3>
                    <button
                      onClick={() => updateStylist(stylist.id, { available: !stylist.available })}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded-[2px] transition-colors ${
                        stylist.available
                          ? 'text-[#22c55e] border-[#22c55e]/30 bg-[#22c55e]/10'
                          : 'text-[#ef4444] border-[#ef4444]/30 bg-[#ef4444]/10'
                      }`}
                    >
                      {stylist.available ? 'Available' : 'On Leave'}
                    </button>
                  </div>
                  <p className="font-sans text-xs text-[#C5A572] mt-0.5">{stylist.role}</p>
                  <div className="flex items-center gap-1 text-xs text-[#A9A197] mt-1.5">
                    <Star size={12} className="text-[#C5A572] fill-[#C5A572]" />
                    <span>{stylist.rating}</span>
                    <span className="text-[10px]">({stylist.reviewCount} client reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#2E2B25] text-xs">
                <div>
                  <span className="text-[#A9A197] block mb-1">Specializations</span>
                  <div className="flex flex-wrap gap-1">
                    {stylist.specializations.map(spec => (
                      <span key={spec} className="bg-[#151412] text-[#F7F3EC] px-2 py-0.5 text-[10px] border border-[#2E2B25] rounded-[2px]">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[#A9A197] block mb-1">Assigned Services</span>
                  <span className="text-[11px] text-[#A9A197]">
                    {stylist.services.length} services enabled ({stylist.services.map(sId => services.find(s => s.id === sId)?.name).filter(Boolean).join(', ') || 'All'})
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#2E2B25]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A9A197] flex items-center gap-1.5">
                  <Clock size={12} className="text-[#C5A572]" /> Shift Hours:
                </span>
                {editingStylistId === stylist.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={hoursInput}
                      onChange={e => setHoursInput(e.target.value)}
                      className="px-2 py-0.5 bg-[#151412] border border-[#C5A572] text-[11px] text-[#F7F3EC] w-36 rounded-[2px]"
                      autoFocus
                    />
                    <button onClick={() => handleSaveHours(stylist.id)} className="p-1 text-[#22c55e]">
                      <Check size={13} />
                    </button>
                    <button onClick={() => setEditingStylistId(null)} className="p-1 text-[#ef4444]">
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditingStylistId(stylist.id); setHoursInput(stylist.workingHours || '10:00 AM - 07:00 PM'); }}
                    className="font-medium text-[#F7F3EC] hover:text-[#C5A572] flex items-center gap-1 transition-colors"
                    title="Click to edit hours"
                  >
                    <span>{stylist.workingHours || '10:00 AM - 07:00 PM'}</span>
                    <Edit3 size={11} className="text-[#A9A197]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
