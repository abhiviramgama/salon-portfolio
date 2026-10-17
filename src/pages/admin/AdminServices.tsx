import { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Search, Sparkles } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { serviceCategories } from '../../data';
import type { Service, ServiceCategory } from '../../types';

export default function AdminServices() {
  const { services, updateServicePrice, addService, deleteService, toggleServiceAvailability, settings } = useSalon();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Quick inline price editing state
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  // New service modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSvc, setNewSvc] = useState<Omit<Service, 'id'>>({
    name: '',
    category: 'haircuts',
    description: '',
    longDescription: '',
    price: 1500,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=600&q=80',
    popular: false,
    featured: false,
    available: true,
  });

  const filtered = services.filter(s => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSavePrice = (id: string) => {
    const num = parseFloat(tempPrice);
    if (!isNaN(num) && num >= 0) {
      updateServicePrice(id, num);
    }
    setEditingPriceId(null);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSvc.name || newSvc.price <= 0) return;
    addService(newSvc);
    setShowAddModal(false);
    setNewSvc({
      name: '',
      category: 'haircuts',
      description: '',
      price: 1500,
      duration: 45,
      image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=600&q=80',
      available: true,
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#F7F3EC] mb-1">Services & Pricing Catalogue</h1>
          <p className="font-sans text-sm text-[#A9A197]">
            Update live pricing, availability, and service specifications across the customer website
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-gold flex items-center gap-2 text-xs"
        >
          <Plus size={16} /> Add New Service
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A9A197]" />
          <input
            type="search"
            placeholder="Search service title or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input pl-10 w-full bg-[#201E1A] border-[#2E2B25] text-[#F7F3EC]"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="form-input w-full sm:w-56 bg-[#201E1A] border-[#2E2B25] text-[#F7F3EC]"
          aria-label="Filter services by category"
        >
          {serviceCategories.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Service Table */}
      <div className="bg-[#201E1A] border border-[#2E2B25] overflow-hidden rounded-[2px]">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Price ({settings.currencySymbol})</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(svc => (
                <tr key={svc.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={svc.image} alt={svc.name} className="w-10 h-10 object-cover rounded-[2px] border border-[#2E2B25]" />
                      <div>
                        <span className="font-semibold text-[#F7F3EC] block text-sm">{svc.name}</span>
                        <span className="text-[11px] text-[#A9A197] line-clamp-1 max-w-sm">{svc.description}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-mono text-xs capitalize text-[#C5A572] bg-[#C5A572]/10 border border-[#C5A572]/20 px-2 py-0.5 rounded-[2px]">
                      {svc.category}
                    </span>
                  </td>
                  <td className="text-xs text-[#A9A197]">{svc.duration} mins</td>
                  <td>
                    {editingPriceId === svc.id ? (
                      <div className="flex items-center gap-1">
                        <span className="text-[#C5A572] font-serif text-sm">{settings.currencySymbol}</span>
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={e => setTempPrice(e.target.value)}
                          className="w-20 px-2 py-1 bg-[#151412] border border-[#C5A572] text-xs text-[#F7F3EC] rounded-[2px]"
                          autoFocus
                        />
                        <button onClick={() => handleSavePrice(svc.id)} className="p-1 text-[#22c55e]">
                          <Check size={14} />
                        </button>
                        <button onClick={() => setEditingPriceId(null)} className="p-1 text-[#ef4444]">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditingPriceId(svc.id); setTempPrice(String(svc.price)); }}
                        className="group flex items-center gap-2 font-serif font-bold text-[#C5A572] hover:text-[#D6B988] transition-colors"
                        title="Click to quickly edit price"
                      >
                        {settings.currencySymbol}{svc.price.toLocaleString('en-IN')}
                        <Edit2 size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#A9A197]" />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => toggleServiceAvailability(svc.id)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 border rounded-[2px] transition-colors ${
                        svc.available !== false
                          ? 'text-[#22c55e] border-[#22c55e]/30 bg-[#22c55e]/10'
                          : 'text-[#ef4444] border-[#ef4444]/30 bg-[#ef4444]/10'
                      }`}
                    >
                      {svc.available !== false ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteService(svc.id)}
                        className="p-1 text-[#A9A197] hover:text-[#ef4444] transition-colors"
                        title="Delete service"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#201E1A] border border-[#2E2B25] p-6 max-w-lg w-full rounded-[2px] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#2E2B25] mb-5">
              <h2 className="font-serif text-lg font-bold text-[#F7F3EC] flex items-center gap-2">
                <Sparkles size={18} className="text-[#C5A572]" /> Add New Salon Service
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-[#A9A197] hover:text-[#F7F3EC]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4">
              <div>
                <label className="block text-xs font-sans text-[#A9A197] mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Italian Silk Gloss Treatment"
                  value={newSvc.name}
                  onChange={e => setNewSvc({ ...newSvc, name: e.target.value })}
                  className="form-input w-full bg-[#151412] border-[#2E2B25] text-sm text-[#F7F3EC]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans text-[#A9A197] mb-1">Category *</label>
                  <select
                    value={newSvc.category}
                    onChange={e => setNewSvc({ ...newSvc, category: e.target.value as ServiceCategory })}
                    className="form-input w-full bg-[#151412] border-[#2E2B25] text-xs text-[#F7F3EC]"
                  >
                    {serviceCategories.filter(c => c.value !== 'all').map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-sans text-[#A9A197] mb-1">Price ({settings.currencySymbol}) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newSvc.price}
                    onChange={e => setNewSvc({ ...newSvc, price: Number(e.target.value) })}
                    className="form-input w-full bg-[#151412] border-[#2E2B25] text-xs text-[#F7F3EC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans text-[#A9A197] mb-1">Duration (minutes) *</label>
                  <input
                    type="number"
                    required
                    min="15"
                    step="15"
                    value={newSvc.duration}
                    onChange={e => setNewSvc({ ...newSvc, duration: Number(e.target.value) })}
                    className="form-input w-full bg-[#151412] border-[#2E2B25] text-xs text-[#F7F3EC]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-[#A9A197] mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newSvc.image}
                    onChange={e => setNewSvc({ ...newSvc, image: e.target.value })}
                    className="form-input w-full bg-[#151412] border-[#2E2B25] text-xs text-[#F7F3EC]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-[#A9A197] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description for customer view..."
                  value={newSvc.description}
                  onChange={e => setNewSvc({ ...newSvc, description: e.target.value })}
                  className="form-input w-full bg-[#151412] border-[#2E2B25] text-xs text-[#F7F3EC]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#2E2B25]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-[#A9A197] hover:text-[#F7F3EC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold text-xs px-5 py-2"
                >
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
