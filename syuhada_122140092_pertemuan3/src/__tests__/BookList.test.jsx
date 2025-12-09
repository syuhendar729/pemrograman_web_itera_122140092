import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from '../context/BookContext';
import BookList from '../components/BookList/BookList';

/**
 * Test Suite untuk BookList Component
 * Testing:
 * - Rendering daftar buku
 * - Tampilan empty state
 * - Action buttons (edit, delete)
 * - Status badges
 */

// Helper component untuk wrap dengan provider
const BookListWrapper = ({ books, onEdit }) => (
  <BrowserRouter>
    <BookProvider>
      <BookList books={books} onEdit={onEdit} />
    </BookProvider>
  </BrowserRouter>
);

describe('BookList Component', () => {
  const mockBooks = [
    {
      id: 1,
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      status: 'milik',
    },
    {
      id: 2,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      status: 'baca',
    },
  ];

  test('Menampilkan empty state saat tidak ada buku', () => {
    render(<BookListWrapper books={[]} onEdit={jest.fn()} />);

    expect(
      screen.getByText(/tidak ada buku ditemukan/i)
    ).toBeInTheDocument();
  });

  test('Menampilkan daftar buku dengan benar', () => {
    render(<BookListWrapper books={mockBooks} onEdit={jest.fn()} />);

    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('The Hobbit')).toBeInTheDocument();
    expect(screen.getByText(/J.K. Rowling/i)).toBeInTheDocument();
    expect(screen.getByText(/J.R.R. Tolkien/i)).toBeInTheDocument();
  });

  test('Menampilkan status badge yang benar', () => {
    render(<BookListWrapper books={mockBooks} onEdit={jest.fn()} />);

    expect(screen.getByText(/milik saya/i)).toBeInTheDocument();
    expect(screen.getByText(/sedang dibaca/i)).toBeInTheDocument();
  });

  test('Memanggil onEdit callback saat tombol edit diklik', () => {
    const mockOnEdit = jest.fn();
    render(<BookListWrapper books={mockBooks} onEdit={mockOnEdit} />);

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockBooks[0]);
  });

  test('Menampilkan tombol edit dan delete untuk setiap buku', () => {
    render(<BookListWrapper books={mockBooks} onEdit={jest.fn()} />);

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    const deleteButtons = screen.getAllByRole('button', { name: /hapus/i });

    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });
});
