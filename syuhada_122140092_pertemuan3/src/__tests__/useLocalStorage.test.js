import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Test Suite untuk useLocalStorage Custom Hook
 * Testing:
 * - Save dan retrieve dari localStorage
 * - Update value dan localStorage sync
 * - Error handling
 */

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    // Clear localStorage sebelum setiap test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('Mengembalikan initial value saat localStorage kosong', () => {
    const initialValue = 'test-value';
    const { result } = renderHook(() =>
      useLocalStorage('test-key', initialValue)
    );

    expect(result.current[0]).toBe(initialValue);
  });

  test('Mengembalikan nilai dari localStorage jika ada', () => {
    const storedValue = { data: 'stored' };
    localStorage.setItem('test-key', JSON.stringify(storedValue));

    const { result } = renderHook(() =>
      useLocalStorage('test-key', { data: 'initial' })
    );

    expect(result.current[0]).toEqual(storedValue);
  });

  test('Menyimpan nilai ke localStorage saat setState dipanggil', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    );

    const [, setStoredValue] = result.current;

    act(() => {
      setStoredValue('new-value');
    });

    const stored = localStorage.getItem('test-key');
    expect(JSON.parse(stored)).toBe('new-value');
  });

  test('Update state saat nilai berubah', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    );

    expect(result.current[0]).toBe('initial');

    const [, setStoredValue] = result.current;

    act(() => {
      setStoredValue('updated');
    });

    expect(result.current[0]).toBe('updated');
  });

  test('Mendukung function updater seperti useState', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', { count: 0 })
    );

    const [, setStoredValue] = result.current;

    act(() => {
      setStoredValue((prev) => ({ count: prev.count + 1 }));
    });

    expect(result.current[0]).toEqual({ count: 1 });

    act(() => {
      setStoredValue((prev) => ({ count: prev.count + 1 }));
    });

    expect(result.current[0]).toEqual({ count: 2 });
  });

  test('Handle error gracefully saat localStorage tidak tersedia', () => {
    // Mock localStorage.setItem untuk throw error
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = jest.fn(() => {
      throw new Error('QuotaExceededError');
    });

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    );

    const [, setStoredValue] = result.current;

    // Should not throw, just log error
    expect(() => {
      act(() => {
        setStoredValue('new-value');
      });
    }).not.toThrow();

    // Restore original function
    Storage.prototype.setItem = originalSetItem;
  });
});
