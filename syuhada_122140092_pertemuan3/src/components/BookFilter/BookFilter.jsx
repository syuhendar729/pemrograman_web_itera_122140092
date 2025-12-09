import './BookFilter.css';

/**
 * Komponen BookFilter untuk filter dan pencarian buku
 * @param {string} filter - Status filter saat ini
 * @param {string} searchTerm - Term pencarian saat ini
 * @param {Function} onFilterChange - Callback saat filter berubah
 * @param {Function} onSearchChange - Callback saat search berubah
 */
const BookFilter = ({ filter, searchTerm, onFilterChange, onSearchChange }) => {
  return (
    <div className="book-filter">
      <div className="filter-group">
        <label htmlFor="filter-status">Filter Berdasarkan Status:</label>
        <select
          id="filter-status"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Semua Status</option>
          <option value="milik">Milik Saya</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="search-books">Cari Buku:</label>
        <input
          id="search-books"
          type="text"
          placeholder="Cari berdasarkan judul atau penulis..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default BookFilter;
