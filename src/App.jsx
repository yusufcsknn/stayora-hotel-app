import { useState } from 'react';
import Navbar from './components/Navbar';
import HotelForm from './components/HotelForm';
import HomePage from './pages/HomePage';
import { useHotels } from './hooks/useHotels';
import './index.css';

export default function App() {
  const { hotels, addHotel, updateHotel, deleteHotel } = useHotels();
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleAdd(data) {
    addHotel(data);
    setShowForm(false);
    showToast('Otel basariyla eklendi!');
  }

  function handleUpdate(data) {
    updateHotel(editingHotel.id, data);
    setEditingHotel(null);
    showToast('Otel guncellendi!');
  }

  function handleDelete(id) {
    if (window.confirm('Bu oteli silmek istediginize emin misiniz?')) {
      deleteHotel(id);
      showToast('Otel silindi.', 'info');
    }
  }

  function handleEdit(hotel) {
    setEditingHotel(hotel);
  }

  function handleCloseForm() {
    setShowForm(false);
    setEditingHotel(null);
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navbar onAddClick={() => setShowForm(true)} />
      <HomePage
        hotels={hotels}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {(showForm || editingHotel) && (
        <HotelForm
          hotel={editingHotel}
          onSave={editingHotel ? handleUpdate : handleAdd}
          onClose={handleCloseForm}
        />
      )}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-white z-50
          ${toast.type === 'info' ? 'bg-gray-700' : 'bg-[#1A1A2E]'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
