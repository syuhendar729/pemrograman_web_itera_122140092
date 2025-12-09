# Aplikasi Manajemen Buku Pribadi - Perpustakaan Pribadi

Aplikasi React yang memungkinkan pengguna untuk mengelola koleksi buku pribadi mereka dengan mudah. Fitur lengkap mencakup menambah, mengedit, menghapus, filter, dan pencarian buku dengan berbagai status.

## 📋 Daftar Isi

- [Deskripsi Aplikasi](#deskripsi-aplikasi)
- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Instalasi](#instalasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Testing](#testing)
- [Struktur Folder](#struktur-folder)
- [Konsep React yang Diimplementasikan](#konsep-react-yang-diimplementasikan)

## 📚 Deskripsi Aplikasi

**Perpustakaan Pribadi** adalah aplikasi web yang dirancang untuk membantu pengguna mencatat dan mengelola buku-buku yang mereka miliki, sedang baca, atau ingin beli. Aplikasi ini menyimpan data secara persisten menggunakan localStorage sehingga data tetap aman meskipun browser ditutup.

### Tujuan Pembelajaran
Aplikasi ini dibuat untuk pembelajaran konsep dasar React termasuk:
- Component-Based Architecture
- State Management dengan Hooks dan Context API
- React Router untuk navigasi multi-halaman
- Custom Hooks untuk logika reusable
- Unit Testing dengan React Testing Library

## ✨ Fitur Utama

### 1. **Manajemen Buku**
- ✅ Menambah buku baru dengan judul, penulis, dan status
- ✅ Mengedit informasi buku yang sudah ada
- ✅ Menghapus buku dari koleksi
- ✅ Validasi form input untuk data yang benar

### 2. **Filter dan Pencarian**
- 🔍 Filter buku berdasarkan status (Milik Saya, Sedang Dibaca, Ingin Dibeli)
- 🔎 Pencarian buku berdasarkan judul atau penulis
- 📊 Kombinasi filter dan pencarian untuk hasil yang lebih spesifik

### 3. **Statistik Buku**
- 📈 Total jumlah buku dalam koleksi
- 📊 Breakdown per status dengan visual progress bar
- 📉 Distribusi persentase untuk setiap status

### 4. **Navigasi Multi-halaman**
- 🏠 Halaman Home: Manajemen dan viewing buku
- 📊 Halaman Stats: Statistik dan analisis koleksi
- 🧭 Navigasi yang smooth antar halaman

### 5. **Penyimpanan Data**
- 💾 Data disimpan di localStorage browser
- 🔒 Data persisten antar session
- ⚙️ Automatic sync antara state dan localStorage

## 🛠️ Teknologi yang Digunakan

### Framework & Library
- **React 19.2.0** - UI library
- **React Router 7.10.1** - Client-side routing
- **Vite 7.2.4** - Build tool dan dev server
- **React DOM 19.2.0** - DOM rendering

### Development Tools
- **ESLint 9.39.1** - Code linting
- **React Testing Library 16.3.0** - Component testing
- **Jest** - Test runner

## 🚀 Instalasi

### Prerequisites
- Node.js v16 atau lebih tinggi
- npm atau yarn package manager

### Steps

1. **Masuk ke direktori project**
```bash
cd syuhada_122140092_pertemuan3
```

2. **Install dependencies**
```bash
npm install
```

## 🎮 Menjalankan Aplikasi

### Development Mode
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 🧪 Testing

### Menjalankan Semua Tests
```bash
npm test
```

### Test Files
Aplikasi memiliki 5 test suites dengan 25+ tests:

#### 1. **BookForm.test.jsx** - Form Validation (4 tests)
- Form rendering dengan field yang benar
- Error handling untuk input kosong
- Form submission dengan validasi
- Clear error messages

#### 2. **BookList.test.jsx** - List Display (5 tests)
- Empty state display
- Buku rendering dengan correct data
- Status badges display
- Edit/Delete button callbacks
- Correct number of action buttons

#### 3. **BookFilter.test.jsx** - Filter & Search (5 tests)
- Filter dan search input rendering
- Filter options display
- onFilterChange callback
- onSearchChange callback
- Controlled component behavior

#### 4. **useBookStats.test.js** - Stats Calculation (5 tests)
- Initial stats untuk empty array
- Total buku calculation
- Status-based counting
- Stats update saat books berubah
- Memoization optimization

#### 5. **useLocalStorage.test.js** - LocalStorage Hook (6 tests)
- Initial value handling
- localStorage retrieval
- Value persistence
- State updates
- Function updater support
- Error handling

## 📁 Struktur Folder

```
src/
├── components/
│   ├── BookForm/          # Form untuk tambah/edit buku
│   │   ├── BookForm.jsx
│   │   └── BookForm.css
│   ├── BookList/          # Komponen untuk display list
│   │   ├── BookList.jsx
│   │   └── BookList.css
│   ├── BookFilter/        # Filter dan search controls
│   │   ├── BookFilter.jsx
│   │   └── BookFilter.css
│   └── Layout/            # Layout dengan navbar
│       ├── Layout.jsx
│       └── Layout.css
├── pages/
│   ├── Home/              # Halaman utama
│   │   ├── Home.jsx
│   │   └── Home.css
│   └── Stats/             # Halaman statistik
│       ├── Stats.jsx
│       └── Stats.css
├── hooks/
│   ├── useLocalStorage.js # localStorage management
│   └── useBookStats.js    # Statistics calculation
├── context/
│   └── BookContext.jsx    # Global state management
├── __tests__/             # Unit tests
│   ├── BookForm.test.jsx
│   ├── BookList.test.jsx
│   ├── BookFilter.test.jsx
│   ├── useBookStats.test.js
│   └── useLocalStorage.test.js
├── App.jsx                # Root dengan routing
├── App.css
├── main.jsx               # Entry point
└── index.css
```

## 🎯 Konsep React yang Diimplementasikan

### 1. Component-Based Architecture
Aplikasi dipecah menjadi komponen reusable yang independent:
- `BookForm` - Controlled form component
- `BookList` - Grid display dengan responsive design
- `BookFilter` - Filter dan search UI
- `Layout` - Shared layout dengan navigasi
- `Home` & `Stats` - Page-level components

### 2. Functional Components dengan Hooks
Semua komponen menggunakan functional approach:
- `useState` untuk local state management
- `useEffect` untuk side effects
- `useReducer` (dalam Context) untuk complex state
- `useMemo` untuk performance optimization
- `useContext` untuk accessing global state

### 3. State Management dengan Context API
```jsx
// BookContext.jsx
const BookProvider = ({ children }) => {
  const [books, dispatch] = useReducer(bookReducer, []);
  // Books management: add, delete, update
};
```

### 4. Custom Hooks
#### useLocalStorage
- Synchronize state dengan localStorage
- Auto-save functionality
- Error handling

#### useBookStats
- Calculate statistics dari book array
- Memoized computation untuk performa
- Return object dengan breakdown per status

### 5. React Router
Multi-page navigation:
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/stats" element={<Stats />} />
</Routes>
```

### 6. Form Handling & Validation
- Controlled components
- Real-time error validation
- Clear error messages untuk user

### 7. Conditional Rendering
- Empty states
- Loading states
- Conditional feature display

### 8. Event Handling
- Form submission dengan validation
- Delete confirmation dialogs
- Filter/search callbacks
- Edit mode toggling

## 📊 Fitur Detail

### Home Page
- Form untuk menambah/edit buku
- List buku dengan status badges
- Filter berdasarkan status
- Search berdasarkan judul/penulis
- Edit dan delete buttons
- Automatic localStorage persistence

### Stats Page
- Total buku count
- Breakdown per status dengan cards
- Progress bars untuk distribusi
- Percentage calculations
- Empty state handling

## 💾 Data Persistence

Data disimpan di browser's localStorage:
- Format: JSON
- Key: `'books'`
- Auto-save setiap kali ada perubahan
- Load otomatis saat aplikasi dimulai

## 🎨 Design & Styling

- **Color Scheme**: Purple gradient untuk headers
- **Status Colors**: 
  - Milik: Green (#2e7d32)
  - Baca: Orange (#e65100)
  - Beli: Blue (#1565c0)
- **Responsive**: Mobile-friendly dengan media queries
- **Animations**: Smooth transitions dan hover effects

## 🧠 Best Practices

1. Component separation dan single responsibility
2. DRY principle dengan custom hooks
3. Proper error handling dan validation
4. Performance optimization dengan memoization
5. Comprehensive unit tests
6. Clean dan readable code structure
7. JSDoc comments untuk dokumentasi

## 📚 File Penting

### BookContext.jsx
State management untuk semua buku. Menggunakan useReducer untuk centralized state updates dan localStorage untuk persistence.

### Home.jsx
Main page dengan form, list, filter, dan search. Menggabungkan semua komponen untuk create functional book management interface.

### Stats.jsx
Analytics page yang menampilkan statistik koleksi dengan visual progress bars dan percentage calculations.

### Custom Hooks
- **useLocalStorage**: Wrapper untuk localStorage API dengan React state
- **useBookStats**: Calculate dan memoize book statistics

## 🚀 Cara Menggunakan

1. **Tambah Buku**: Isi form dan klik "Tambah Buku"
2. **Edit Buku**: Klik "Edit" pada buku, ubah data, klik "Update"
3. **Hapus Buku**: Klik "Hapus" dan konfirmasi
4. **Filter**: Gunakan dropdown untuk filter berdasarkan status
5. **Cari**: Gunakan search box untuk cari judul/penulis
6. **Lihat Stats**: Klik "Statistik" di navbar

## 📝 Informasi

**Nama**: Syuhada Rantisi
**NIM**: 122140092
**Pertemuan**: 3 (React Dasar)

---

**Happy Reading! 📚**

