import { useState } from 'react';
import { createHotel } from '../interfaces/Hotel';

const STORAGE_KEY = 'stayora_hotels';

function getStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(hotels) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels));
}

// Başlangıç verisi — ilk açılışta örnek oteller gelsin
const INITIAL_HOTELS = [
  {
    id: '1',
    name: 'Grand Hyatt Istanbul',
    city: 'İstanbul',
    location: 'Beşiktaş',
    price: 2450,
    rating: 4.8,
    category: 'Şehir',
    description: 'Boğaz manzaralı lüks otel, tam anlamıyla İstanbul deneyimi.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Çırağan Palace Kempinski',
    city: 'İstanbul',
    location: 'Beşiktaş',
    price: 4800,
    rating: 4.9,
    category: 'Şehir',
    description: 'Osmanlı sarayı konumundaki eşsiz konaklama deneyimi.',
    createdAt: new Date().toISOString(),
  },
];

export function useHotels() {
  const [hotels, setHotels] = useState(() => {
    const stored = getStored();
    if (stored.length === 0) {
      saveToStorage(INITIAL_HOTELS);
      return INITIAL_HOTELS;
    }
    return stored;
  });

  // CREATE — Ekle
  function addHotel(data) {
    const hotel = createHotel(data);
    const updated = [...hotels, hotel];
    setHotels(updated);
    saveToStorage(updated);
    return hotel;
  }

  // UPDATE — Güncelle
  function updateHotel(id, data) {
    const updated = hotels.map(h =>
      h.id === id ? { ...h, ...data } : h
    );
    setHotels(updated);
    saveToStorage(updated);
  }

  // DELETE — Sil
  function deleteHotel(id) {
    const updated = hotels.filter(h => h.id !== id);
    setHotels(updated);
    saveToStorage(updated);
  }

  // READ — Tek otel getir
  function getHotel(id) {
    return hotels.find(h => h.id === id);
  }

  return { hotels, addHotel, updateHotel, deleteHotel, getHotel };
}
