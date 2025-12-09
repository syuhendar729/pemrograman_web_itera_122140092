import { useBooks } from '../../context/BookContext';
import './BookList.css';

/**
 * Komponen BookList untuk menampilkan daftar buku
 * @param {Array} books - Array dari buku-buku yang ditampilkan
 * @param {Function} onEdit - Callback saat buku diklik untuk diedit
 */
const BookList = ({ books, onEdit }) => {
  const { deleteBook } = useBooks();

  // Fungsi untuk mendapatkan label status
  const getStatusLabel = (status) => {
    const statusMap = {
      milik: 'Milik Saya',
      baca: 'Sedang Dibaca',
      beli: 'Ingin Dibeli',
    };
    return statusMap[status] || status;
  };

  // Fungsi untuk mendapatkan badge class berdasarkan status
  const getStatusBadgeClass = (status) => {
    return `status-badge status-${status}`;
  };

  // Handle delete dengan konfirmasi
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      deleteBook(id);
    }
  };

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>Tidak ada buku ditemukan. Mulai tambahkan buku baru!</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-content">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">oleh {book.author}</p>
            <span className={getStatusBadgeClass(book.status)}>
              {getStatusLabel(book.status)}
            </span>
          </div>
          <div className="book-actions">
            <button
              className="btn btn-edit"
              onClick={() => onEdit(book)}
              title="Edit buku"
            >
              Edit
            </button>
            <button
              className="btn btn-delete"
              onClick={() => handleDelete(book.id)}
              title="Hapus buku"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
