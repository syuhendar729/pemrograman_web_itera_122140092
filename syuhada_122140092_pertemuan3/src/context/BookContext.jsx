import { createContext, useContext, useReducer, useEffect } from 'react';

// Membuat Context untuk buku
const BookContext = createContext();

// Action types untuk reducer
export const ACTIONS = {
  ADD_BOOK: 'ADD_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  SET_BOOKS: 'SET_BOOKS',
};

// Reducer function untuk mengelola state buku
const bookReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_BOOK:
      return [...state, { ...action.payload, id: Date.now() }];
    case ACTIONS.DELETE_BOOK:
      return state.filter(book => book.id !== action.payload);
    case ACTIONS.UPDATE_BOOK:
      return state.map(book =>
        book.id === action.payload.id ? action.payload : book
      );
    case ACTIONS.SET_BOOKS:
      return action.payload;
    default:
      return state;
  }
};

// Provider component untuk membungkus aplikasi
export const BookProvider = ({ children }) => {
  const [books, dispatch] = useReducer(bookReducer, [], (initial) => {
    // Load initial books dari localStorage
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : initial;
  });

  // Simpan books ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  // Fungsi-fungsi untuk memanipulasi books
  const addBook = (book) => {
    dispatch({ type: ACTIONS.ADD_BOOK, payload: book });
  };

  const deleteBook = (id) => {
    dispatch({ type: ACTIONS.DELETE_BOOK, payload: id });
  };

  const updateBook = (id, updatedBook) => {
    dispatch({ type: ACTIONS.UPDATE_BOOK, payload: { id, ...updatedBook } });
  };

  const value = {
    books,
    addBook,
    deleteBook,
    updateBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

// Custom hook untuk menggunakan BookContext
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
};
