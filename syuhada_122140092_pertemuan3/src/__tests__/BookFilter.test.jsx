import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from '../components/BookFilter/BookFilter';

/**
 * Test Suite untuk BookFilter Component
 * Testing:
 * - Rendering filter options
 * - Callback untuk perubahan filter dan search
 * - Input value propagation
 */

describe('BookFilter Component', () => {
  test('Menampilkan filter dan search input', () => {
    render(
      <BookFilter
        filter=""
        searchTerm=""
        onFilterChange={jest.fn()}
        onSearchChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/filter berdasarkan status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cari buku/i)).toBeInTheDocument();
  });

  test('Menampilkan semua opsi filter', () => {
    render(
      <BookFilter
        filter=""
        searchTerm=""
        onFilterChange={jest.fn()}
        onSearchChange={jest.fn()}
      />
    );

    const filterSelect = screen.getByLabelText(/filter berdasarkan status/i);
    const options = filterSelect.querySelectorAll('option');

    expect(options).toHaveLength(4); // Semua Status, Milik, Baca, Beli
    expect(options[0]).toHaveTextContent('Semua Status');
    expect(options[1]).toHaveTextContent('Milik Saya');
    expect(options[2]).toHaveTextContent('Sedang Dibaca');
    expect(options[3]).toHaveTextContent('Ingin Dibeli');
  });

  test('Memanggil onFilterChange saat filter berubah', () => {
    const mockOnFilterChange = jest.fn();
    render(
      <BookFilter
        filter=""
        searchTerm=""
        onFilterChange={mockOnFilterChange}
        onSearchChange={jest.fn()}
      />
    );

    const filterSelect = screen.getByLabelText(/filter berdasarkan status/i);
    fireEvent.change(filterSelect, { target: { value: 'milik' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith('milik');
  });

  test('Memanggil onSearchChange saat search input berubah', () => {
    const mockOnSearchChange = jest.fn();
    render(
      <BookFilter
        filter=""
        searchTerm=""
        onFilterChange={jest.fn()}
        onSearchChange={mockOnSearchChange}
      />
    );

    const searchInput = screen.getByLabelText(/cari buku/i);
    fireEvent.change(searchInput, { target: { value: 'Harry' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('Harry');
  });

  test('Display nilai filter dan search saat dikontrol secara eksternal', () => {
    const { rerender } = render(
      <BookFilter
        filter="milik"
        searchTerm="Potter"
        onFilterChange={jest.fn()}
        onSearchChange={jest.fn()}
      />
    );

    const filterSelect = screen.getByLabelText(/filter berdasarkan status/i);
    const searchInput = screen.getByLabelText(/cari buku/i);

    expect(filterSelect.value).toBe('milik');
    expect(searchInput.value).toBe('Potter');

    rerender(
      <BookFilter
        filter="baca"
        searchTerm="Updated"
        onFilterChange={jest.fn()}
        onSearchChange={jest.fn()}
      />
    );

    expect(filterSelect.value).toBe('baca');
    expect(searchInput.value).toBe('Updated');
  });
});
