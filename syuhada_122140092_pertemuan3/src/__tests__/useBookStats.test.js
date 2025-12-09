import { renderHook, act } from '@testing-library/react';
import { useBookStats } from '../hooks/useBookStats';

/**
 * Test Suite untuk useBookStats Custom Hook
 * Testing:
 * - Perhitungan statistik buku yang benar
 * - Memoization performa
 */

describe('useBookStats Hook', () => {
  test('Mengembalikan stats dengan nilai awal 0 untuk array kosong', () => {
    const { result } = renderHook(() => useBookStats([]));

    expect(result.current).toEqual({
      total: 0,
      milik: 0,
      baca: 0,
      beli: 0,
    });
  });

  test('Menghitung total buku dengan benar', () => {
    const books = [
      { id: 1, title: 'Book 1', author: 'Author 1', status: 'milik' },
      { id: 2, title: 'Book 2', author: 'Author 2', status: 'baca' },
      { id: 3, title: 'Book 3', author: 'Author 3', status: 'beli' },
    ];

    const { result } = renderHook(() => useBookStats(books));

    expect(result.current.total).toBe(3);
  });

  test('Menghitung status buku dengan benar', () => {
    const books = [
      { id: 1, title: 'Book 1', author: 'Author 1', status: 'milik' },
      { id: 2, title: 'Book 2', author: 'Author 2', status: 'milik' },
      { id: 3, title: 'Book 3', author: 'Author 3', status: 'baca' },
      { id: 4, title: 'Book 4', author: 'Author 4', status: 'beli' },
    ];

    const { result } = renderHook(() => useBookStats(books));

    expect(result.current.milik).toBe(2);
    expect(result.current.baca).toBe(1);
    expect(result.current.beli).toBe(1);
    expect(result.current.total).toBe(4);
  });

  test('Update stats saat books berubah', () => {
    const initialBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1', status: 'milik' },
    ];

    const { result, rerender } = renderHook(
      ({ books }) => useBookStats(books),
      { initialProps: { books: initialBooks } }
    );

    expect(result.current.total).toBe(1);
    expect(result.current.milik).toBe(1);

    const updatedBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1', status: 'milik' },
      { id: 2, title: 'Book 2', author: 'Author 2', status: 'baca' },
    ];

    rerender({ books: updatedBooks });

    expect(result.current.total).toBe(2);
    expect(result.current.milik).toBe(1);
    expect(result.current.baca).toBe(1);
  });

  test('Memoization - returns same object saat books tidak berubah', () => {
    const books = [
      { id: 1, title: 'Book 1', author: 'Author 1', status: 'milik' },
    ];

    const { result, rerender } = renderHook(
      ({ books }) => useBookStats(books),
      { initialProps: { books } }
    );

    const firstResult = result.current;

    rerender({ books });

    const secondResult = result.current;

    // Should be the same object reference due to useMemo
    expect(firstResult).toBe(secondResult);
  });
});
