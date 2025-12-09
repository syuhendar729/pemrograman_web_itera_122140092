import { useState, useEffect } from 'react';

/**
 * Custom hook untuk mengelola localStorage dengan state React
 * @param {string} key - Kunci untuk localStorage
 * @param {any} initialValue - Nilai default jika localStorage kosong
 * @returns {[any, Function]} - State dan fungsi untuk update
 */
export const useLocalStorage = (key, initialValue) => {
  // State untuk menyimpan value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Ambil dari localStorage berdasarkan key
      const item = window.localStorage.getItem(key);
      // Parse JSON jika ada, jika tidak return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return wrapped version of useState's setter function yang
  // persists value ke localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function seperti useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save ke localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};
