import { useState } from 'react';
import { Save, RotateCcw, Check, Sparkles, Shield, AlertTriangle } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

export default function AdminSettings() {
  const { settings, updateSettings, resetToDemoDefaults } = useSalon();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    resetToDemoDefaults();
    setConfirmReset(false);
    window.location.reload();
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#F7F3EC] mb-1">Salon Settings & Brand Configuration</h1>
        <p className="font-sans text-sm text-[#A9A197]">
          Customize brand name, booking policies, developer credits, and salon contact parameters
        </p>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-sans rounded-[2px] flex items-center gap-2">
          <Check size={16} /> Salon settings updated successfully! Changes are active immediately across the site.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Identity */}
        <div className="bg-[#201E1A] border border-[#2E2B25] p-6 rounded-[2px]">
          <h2 className="font-serif text-base font-bold text-[#F7F3EC] mb-4 flex items-center gap-2">
            <Sparkles size={16} className="text-[#C5A572]" /> Brand Presentation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans text-[#A9A197] mb-1.5">Salon Name</label>
              <input
                type="text"
                value={form.salonName}
                onChange={e => setForm({ ...form, salonName: e.target.value })}
                className="form-input w-full bg-[#151412] border-[#2E2B25] text-sm text-[#F7F3EC]"
              />
            </div>
            <div>
              <label className="block text-xs font-sans text-[#A9A197] mb-1.5">Brand Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={e => setForm({ ...form, tagline: e.target.value })}
                className="form-input w-full bg-[#151412] border-[#2E2B25] text-sm text-[#F7F3EC]"
              />
            </div>
            <div>
              <label className="block text-xs font-sans text-[#A9A197] mb-1.5">Currency Code</label>
              <input
                type="text"
                value={form.currency}
                onChange={e => setForm({ ...form, currency: e.target.value })}
                className="form-input w-full bg-[#151412] border-[#2E2B25] text-sm text-[#F7F3EC]"
              />
            </div>
            <div>
              <label className="block text-xs font-sans text-[#A9A197] mb-1.5">Currency Symbol</label>
              <input
                type="text"
                value={form.currencySymbol}
                onChange={e => setForm({ ...form, currencySymbol: e.target.value })}
                className="form-input w-full bg-[#151412] border-[#2E2B25] text-sm text-[#F7F3EC]"
              />
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="bg-[#201E1A] border border-[#2E2B25] p-6 rounded-[2px]">
          <h2 className="font-serif text-base font-bold text-[#F7F3EC] mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-sans text-[#A9A197] mb-1.5">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                className="form-input w-full bg-[#151412] border-[#2E2B25] text-sm text-[#F7F3EC]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-[#A9A197] mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="form-input w-full bg-[#151412] border-[#2E2B25] text-sm text-[#F7F3EC]"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-[#A9A197] mb-1.5">Concierge Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="form-input w-full bg-[#151412] border-[#2E2B25] text-sm text-[#F7F3EC]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Policies & Developer Attribution */}
        <div className="bg-[#201E1A] border border-[#2E2B25] p-6 rounded-[2px]">
          <h2 className="font-serif text-base font-bold text-[#F7F3EC] mb-4 flex items-center gap-2">
            <Shield size={16} className="text-[#C5A572]" /> Policy & Attribution
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-sans text-[#A9A197] mb-1.5">
                Cancellation Window Policy (Minimum hours notice)
              </label>
              <input
                type="number"
                min="0"
                max="48"
                value={form.cancellationNoticeHours}
                onChange={e => setForm({ ...form, cancellationNoticeHours: Number(e.target.value) })}
                className="form-input w-48 bg-[#151412] border-[#2E2B25] text-sm text-[#F7F3EC]"
              />
            </div>
            <div>
              <label className="block text-xs font-sans text-[#A9A197] mb-1.5">Booking Policy Statement</label>
              <textarea
                rows={2}
                value={form.bookingPolicy}
                onChange={e => setForm({ ...form, bookingPolicy: e.target.value })}
                className="form-input w-full bg-[#151412] border-[#2E2B25] text-xs text-[#F7F3EC]"
              />
            </div>
            <div>
              <label className="block text-xs font-sans text-[#A9A197] mb-1.5">
                Developer Credit (Discreet Footer Credit)
              </label>
              <input
                type="text"
                value={form.developerCredit}
                onChange={e => setForm({ ...form, developerCredit: e.target.value })}
                className="form-input w-full bg-[#151412] border-[#2E2B25] text-sm text-[#F7F3EC]"
              />
              <p className="text-[11px] text-[#A9A197] mt-1">Configurable developer signature displayed discreetly in footer.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="btn-gold flex items-center gap-2 text-xs px-6 py-2.5 w-full sm:w-auto"
          >
            <Save size={16} /> Save Settings
          </button>

          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="text-xs text-[#ef4444] hover:underline flex items-center gap-1.5"
            >
              <RotateCcw size={14} /> Reset Demo Data to Defaults
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-[#ef4444]/10 border border-[#ef4444]/30 px-3 py-2 rounded-[2px]">
              <span className="text-xs text-[#ef4444] flex items-center gap-1">
                <AlertTriangle size={14} /> Reset all demo services and bookings?
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="px-2 py-1 bg-[#ef4444] text-white text-[11px] font-bold rounded-[2px]"
              >
                Yes, Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="text-[11px] text-[#A9A197] hover:underline"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
