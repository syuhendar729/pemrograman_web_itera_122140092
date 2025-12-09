import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from '../context/BookContext';
import BookForm from '../components/BookForm/BookForm';

/**
 * Test Suite untuk BookForm Component
 * Testing:
 * - Form input dan validasi
 * - Penambahan buku baru
 * - Error handling untuk input kosong
 */

// Helper component untuk wrap dengan provider
const BookFormWrapper = ({ editingBook, onComplete }) => (
  <BrowserRouter>
    <BookProvider>
      <BookForm editingBook={editingBook} onComplete={onComplete} />
    </BookProvider>
  </BrowserRouter>
);

describe('BookForm Component', () => {
  test('Rendering form dengan semua field yang benar', () => {
    render(<BookFormWrapper />);

    expect(screen.getByLabelText(/judul buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/penulis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /tambah buku/i })
    ).toBeInTheDocument();
  });

  test('Menampilkan error saat submit dengan field kosong', async () => {
    render(<BookFormWrapper />);

    const submitButton = screen.getByRole('button', { name: /tambah buku/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/judul buku harus diisi/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/penulis harus diisi/i)
      ).toBeInTheDocument();
    });
  });

  test('Memungkinkan input data dan submit form', async () => {
    const mockOnComplete = jest.fn();
    render(<BookFormWrapper onComplete={mockOnComplete} />);

    const titleInput = screen.getByLabelText(/judul buku/i);
    const authorInput = screen.getByLabelText(/penulis/i);
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });

    await userEvent.type(titleInput, 'Harry Potter');
    await userEvent.type(authorInput, 'J.K. Rowling');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalled();
    });
  });

  test('Clear error message saat user mulai mengetik', async () => {
    render(<BookFormWrapper />);

    const submitButton = screen.getByRole('button', { name: /tambah buku/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/judul buku harus diisi/i)
      ).toBeInTheDocument();
    });

    const titleInput = screen.getByLabelText(/judul buku/i);
    await userEvent.type(titleInput, 'Test');

    await waitFor(() => {
      expect(screen.queryByText(/judul buku harus diisi/i)).not.toBeInTheDocument();
    });
  });
});
