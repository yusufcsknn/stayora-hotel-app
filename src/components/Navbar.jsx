export default function Navbar({ onAddClick }) {
  return (
    <nav className="bg-[#1A1A2E] text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
          <span className="text-[#1A1A2E] font-bold text-lg">S</span>
        </div>
        <div>
          <h1 className="text-lg font-bold leading-none">Stayora</h1>
          <p className="text-xs text-gray-400 leading-none mt-0.5">Otel Yönetim Paneli</p>
        </div>
      </div>
      <button
        onClick={onAddClick}
        className="bg-white text-[#1A1A2E] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
      >
        <span className="text-lg leading-none">+</span>
        Otel Ekle
      </button>
    </nav>
  );
}
