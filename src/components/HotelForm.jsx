import { useState, useEffect } from 'react';
import { CATEGORIES } from '../interfaces/Hotel';

const EMPTY = {
  name: '', city: '', location: '', price: '', rating: '5',
  category: 'Şehir', description: '',
};

export default function HotelForm({ hotel, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(hotel);

  useEffect(() => {
    if (hotel) {
      setForm({
        name: hotel.name,
        city: hotel.city,
        location: hotel.location,
        price: hotel.price,
        rating: hotel.rating,
        category: hotel.category,
        description: hotel.description,
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [hotel]);

  function validate() {
    const e = {};
    if (!form.name.trim())     e.name = 'Otel adı zorunlu';
    if (!form.city.trim())     e.city = 'Şehir zorunlu';
    if (!form.location.trim()) e.location = 'Konum zorunlu';
    if (!form.price || Number(form.price) <= 0) e.price = 'Geçerli fiyat girin';
    if (!form.rating || Number(form.rating) < 1 || Number(form.rating) > 5)
      e.rating = 'Puan 1-5 arasında olmalı';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    onSave(form);
  }

  function handleChange(key, val) {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {isEdit ? '✏️ Oteli Düzenle' : '➕ Yeni Otel Ekle'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEdit ? 'Bilgileri güncelleyin' : 'Yeni otel bilgilerini girin'}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Otel Adı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Otel Adı *</label>
            <input
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="örn: Grand Hyatt Istanbul"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors
                ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#1A1A2E]'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Şehir + Konum */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şehir *</label>
              <input
                value={form.city}
                onChange={e => handleChange('city', e.target.value)}
                placeholder="örn: İstanbul"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors
                  ${errors.city ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#1A1A2E]'}`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konum *</label>
              <input
                value={form.location}
                onChange={e => handleChange('location', e.target.value)}
                placeholder="örn: Beşiktaş"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors
                  ${errors.location ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#1A1A2E]'}`}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Fiyat + Puan */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gecelik Fiyat (₺) *</label>
              <input
                type="number"
                value={form.price}
                onChange={e => handleChange('price', e.target.value)}
                placeholder="örn: 2450"
                min="1"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors
                  ${errors.price ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#1A1A2E]'}`}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Puan (1-5) *</label>
              <input
                type="number"
                value={form.rating}
                onChange={e => handleChange('rating', e.target.value)}
                placeholder="4.8"
                min="1" max="5" step="0.1"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors
                  ${errors.rating ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#1A1A2E]'}`}
              />
              {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1A1A2E] transition-colors bg-white"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <textarea
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Otel hakkında kısa bir açıklama..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1A1A2E] transition-colors resize-none"
            />
          </div>

          {/* Butonlar */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#1A1A2E] text-white text-sm font-semibold hover:bg-[#2d2d4e] transition-colors"
            >
              {isEdit ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
