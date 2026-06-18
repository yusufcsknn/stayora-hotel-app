import { CATEGORIES } from '../interfaces/Hotel';

const CATEGORY_COLORS = {
  'Şehir':  'bg-blue-100 text-blue-800',
  'Sahil':  'bg-cyan-100 text-cyan-800',
  'Dağ':    'bg-green-100 text-green-800',
  'Butik':  'bg-purple-100 text-purple-800',
};

const CATEGORY_EMOJIS = {
  'Şehir': '🏙️',
  'Sahil': '🏖️',
  'Dağ':   '🏔️',
  'Butik': '✨',
};

export default function HotelCard({ hotel, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Renk bandı */}
      <div className="h-2 bg-[#1A1A2E]" />

      <div className="p-5">
        {/* Üst satır */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-base truncate">{hotel.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              📍 {hotel.location}, {hotel.city}
            </p>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${CATEGORY_COLORS[hotel.category] || 'bg-gray-100 text-gray-700'}`}>
            {CATEGORY_EMOJIS[hotel.category]} {hotel.category}
          </span>
        </div>

        {/* Açıklama */}
        {hotel.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
        )}

        {/* Alt bilgi satırı */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-gray-400">Gecelik</p>
              <p className="font-bold text-[#1A1A2E] text-base">
                ₺{hotel.price.toLocaleString('tr-TR')}
              </p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div>
              <p className="text-xs text-gray-400">Puan</p>
              <p className="font-bold text-amber-500 text-base">★ {hotel.rating}</p>
            </div>
          </div>

          {/* Aksiyon butonları */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(hotel)}
              className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Düzenle
            </button>
            <button
              onClick={() => onDelete(hotel.id)}
              className="text-sm px-3 py-1.5 rounded-lg border border-red-100 text-red-600 hover:bg-red-50 transition-colors font-medium"
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
