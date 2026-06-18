import { useState } from 'react';
import HotelCard from '../components/HotelCard';
import StatsBar from '../components/StatsBar';
import { CATEGORIES } from '../interfaces/Hotel';

export default function HomePage({ hotels, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filtered = hotels.filter(h => {
    const matchSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Tümü' || h.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <StatsBar hotels={hotels} />

      {/* Arama + filtre */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Otel adı, şehir veya konum ara..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1A1A2E] transition-colors bg-white"
          />
        </div>
      </div>

      {/* Kategori filtreleri */}
      <div className="flex gap-2 flex-wrap mb-6">
        {['Tümü', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${activeCategory === cat
                ? 'bg-[#1A1A2E] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sonuç başlığı */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">
          {activeCategory === 'Tümü' ? 'Tüm Oteller' : activeCategory}
          <span className="text-gray-400 font-normal ml-2">({filtered.length})</span>
        </h2>
      </div>

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🏨</p>
          <p className="font-medium text-gray-600">Otel bulunamadı</p>
          <p className="text-sm mt-1">
            {search ? 'Farklı bir arama deneyin' : 'Yeni otel eklemek için sağ üstteki butonu kullanın'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
