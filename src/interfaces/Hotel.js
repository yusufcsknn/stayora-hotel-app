/**
 * Hotel Interface
 * @typedef {Object} Hotel
 * @property {string} id - Benzersiz kimlik
 * @property {string} name - Otel adı
 * @property {string} city - Şehir
 * @property {string} location - Konum / Semt
 * @property {number} price - Gecelik fiyat (TL)
 * @property {number} rating - Puan (1-5)
 * @property {string} category - Kategori (Şehir/Sahil/Dağ/Butik)
 * @property {string} description - Açıklama
 * @property {string} createdAt - Oluşturma tarihi
 */

/**
 * Yeni bir Hotel nesnesi oluşturur
 * @param {Partial<Hotel>} data
 * @returns {Hotel}
 */
export function createHotel(data) {
  return {
    id: Date.now().toString(),
    name: data.name || '',
    city: data.city || '',
    location: data.location || '',
    price: Number(data.price) || 0,
    rating: Number(data.rating) || 5,
    category: data.category || 'Şehir',
    description: data.description || '',
    createdAt: new Date().toISOString(),
  };
}

export const CATEGORIES = ['Şehir', 'Sahil', 'Dağ', 'Butik'];
