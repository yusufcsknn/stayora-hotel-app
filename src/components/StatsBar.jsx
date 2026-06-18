export default function StatsBar({ hotels }) {
  const total = hotels.length;
  const avgPrice = total > 0
    ? Math.round(hotels.reduce((s, h) => s + h.price, 0) / total)
    : 0;
  const avgRating = total > 0
    ? (hotels.reduce((s, h) => s + Number(h.rating), 0) / total).toFixed(1)
    : '0.0';

  const stats = [
    { label: 'Toplam Otel', value: total, icon: '🏨' },
    { label: 'Ort. Fiyat',  value: `₺${avgPrice.toLocaleString('tr-TR')}`, icon: '💰' },
    { label: 'Ort. Puan',   value: `★ ${avgRating}`, icon: '⭐' },
    { label: 'LocalStorage', value: 'Aktif', icon: '💾' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="text-2xl mb-1">{s.icon}</p>
          <p className="text-xl font-bold text-[#1A1A2E]">{s.value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
