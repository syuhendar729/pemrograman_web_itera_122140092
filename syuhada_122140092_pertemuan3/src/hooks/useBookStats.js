import { useMemo } from 'react';

/**
 * Custom hook untuk menghitung statistik buku
 * @param {Array} books - Array dari buku-buku
 * @returns {Object} - Statistik buku (total, milik, baca, beli)
 */
export const useBookStats = (books) => {
  return useMemo(() => {
    const stats = {
      total: books.length,
      milik: 0,
      baca: 0,
      beli: 0,
    };

    // Hitung jumlah buku berdasarkan status
    books.forEach((book) => {
      if (book.status === 'milik') stats.milik += 1;
      if (book.status === 'baca') stats.baca += 1;
      if (book.status === 'beli') stats.beli += 1;
    });

    return stats;
  }, [books]);
};
