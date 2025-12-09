import { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

/**
 * Komponen BookForm untuk menambah dan mengedit buku
 * @param {Object} editingBook - Buku yang sedang diedit (null jika menambah)
 * @param {Function} onComplete - Callback saat form selesai disubmit
 */
const BookForm = ({ editingBook, onComplete }) => {
  const { addBook, updateBook } = useBooks();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'milik',
  });
  const [errors, setErrors] = useState({});

  // Set form data jika ada buku yang diedit
  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        status: editingBook.status,
      });
    } else {
      setFormData({ title: '', author: '', status: 'milik' });
    }
    setErrors({});
  }, [editingBook]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error untuk field ini saat user mulai mengetik
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validasi form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku harus diisi';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Penulis harus diisi';
    }
    return newErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Tambah atau update buku
    if (editingBook) {
      updateBook(editingBook.id, formData);
    } else {
      addBook(formData);
    }

    // Reset form
    setFormData({ title: '', author: '', status: 'milik' });
    setErrors({});

    // Call callback
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Judul Buku *</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Masukkan judul buku"
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis *</label>
        <input
          id="author"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Masukkan nama penulis"
          className={errors.author ? 'input-error' : ''}
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="milik">Milik Saya</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {editingBook ? 'Update Buku' : 'Tambah Buku'}
      </button>
    </form>
  );
};

export default BookForm;
