import { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

/**
 * Halaman Home - Menampilkan daftar buku dengan fitur filter dan pencarian
 */
const Home = () => {
  const { books } = useBooks();
  const [editingBook, setEditingBook] = useState(null);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter buku berdasarkan status dan search term
  const filteredBooks = books.filter((book) => {
    const matchesStatus = !filter || book.status === filter;
    const matchesSearch =
      !searchTerm ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle edit buku - scroll ke form
  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle complete form
  const handleFormComplete = () => {
    setEditingBook(null);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Perpustakaan Pribadi</h1>
        <p>Kelola buku-buku favorit Anda dengan mudah</p>
      </div>

      <div className="container">
        <BookForm
          editingBook={editingBook}
          onComplete={handleFormComplete}
        />

        {books.length > 0 && (
          <>
            <BookFilter
              filter={filter}
              searchTerm={searchTerm}
              onFilterChange={setFilter}
              onSearchChange={setSearchTerm}
            />
            <div className="results-info">
              Menampilkan {filteredBooks.length} dari {books.length} buku
            </div>
          </>
        )}

        <BookList books={filteredBooks} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Home;
