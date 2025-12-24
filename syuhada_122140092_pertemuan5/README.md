# Sistem Manajemen Perpustakaan Sederhana

**Praktikum Python OOP - Pertemuan 5**  
**Nama:** Syuhada Rantisi  
**NIM:** 122140092  
**Tanggal:** 24 Desember 2024

---

## 📋 Deskripsi Program

Program ini adalah sistem manajemen perpustakaan sederhana yang dibangun menggunakan konsep Object-Oriented Programming (OOP) dalam Python. Program ini mendemonstrasikan implementasi berbagai prinsip OOP termasuk **Abstract Class**, **Inheritance**, **Encapsulation**, **Polymorphism**, dan **Property Decorators**.

### 🎯 Fitur Utama

1. **Manajemen Item Perpustakaan**
   - Menambahkan item baru (Buku dan Majalah)
   - Menampilkan daftar semua item
   - Menampilkan daftar item yang tersedia

2. **Pencarian Item**
   - Pencarian berdasarkan ID (exact match)
   - Pencarian berdasarkan judul (partial match/keyword)

3. **Peminjaman dan Pengembalian**
   - Sistem peminjaman item
   - Sistem pengembalian item
   - Tracking status ketersediaan

4. **Perhitungan Denda**
   - Menghitung denda keterlambatan
   - Tarif berbeda untuk Buku dan Majalah

5. **Statistik Perpustakaan**
   - Total item per kategori
   - Jumlah item tersedia dan dipinjam
   - Overview perpustakaan

---

## 🏗️ Struktur Class

Program ini terdiri dari 4 class utama:

### 1. LibraryItem (Abstract Base Class)
Class abstrak yang menjadi blueprint untuk semua item perpustakaan.

**Atribut:**
- `_id` (protected): ID unik item
- `_title` (protected): Judul item
- `__available` (private): Status ketersediaan
- `__borrowed_date` (private): Tanggal peminjaman

**Abstract Methods:**
- `get_info()`: Mengembalikan informasi detail item
- `calculate_late_fee(days_late)`: Menghitung denda keterlambatan

**Concrete Methods:**
- `borrow()`: Meminjam item
- `return_item()`: Mengembalikan item

### 2. Book (Subclass dari LibraryItem)
Class untuk merepresentasikan buku di perpustakaan.

**Atribut Tambahan:**
- `_author`: Penulis buku
- `_isbn`: ISBN buku
- `_pages`: Jumlah halaman

**Class Variable:**
- `LATE_FEE_PER_DAY = 2000`: Denda Rp 2.000/hari

### 3. Magazine (Subclass dari LibraryItem)
Class untuk merepresentasikan majalah di perpustakaan.

**Atribut Tambahan:**
- `_publisher`: Penerbit majalah
- `_issue_number`: Nomor edisi
- `_month`: Bulan terbit

**Class Variable:**
- `LATE_FEE_PER_DAY = 1000`: Denda Rp 1.000/hari

### 4. Library
Class untuk mengelola koleksi item perpustakaan.

**Atribut:**
- `__items` (private): List berisi semua item perpustakaan
- `__name` (private): Nama perpustakaan

**Methods:**
- `add_item()`: Menambah item baru
- `display_items()`: Menampilkan daftar item
- `search_by_id()`: Mencari item berdasarkan ID
- `search_by_title()`: Mencari item berdasarkan judul
- `borrow_item()`: Meminjam item
- `return_item()`: Mengembalikan item
- `display_statistics()`: Menampilkan statistik

---

## 🔧 Implementasi Konsep OOP

### 1. Abstract Class dan Inheritance (30%)
- ✅ `LibraryItem` sebagai abstract base class menggunakan modul `abc`
- ✅ Abstract methods: `get_info()` dan `calculate_late_fee()`
- ✅ `Book` dan `Magazine` mewarisi dari `LibraryItem`
- ✅ Kedua subclass mengimplementasikan semua abstract methods
- ✅ Penggunaan `super()` untuk memanggil constructor parent class

### 2. Encapsulation (25%)
- ✅ **Protected attributes** (`_id`, `_title`, `_author`, dll.) menggunakan single underscore
- ✅ **Private attributes** (`__available`, `__items`, `__name`) menggunakan double underscore
- ✅ **Property decorators** untuk mengakses private/protected attributes:
  - `@property` untuk getter
  - `@setter` untuk setter (contoh: `available` property)
- ✅ Data sensitif dilindungi dari akses langsung

### 3. Polymorphism (20%)
- ✅ **Method overriding**: `get_info()` diimplementasikan berbeda di `Book` dan `Magazine`
- ✅ **Method overriding**: `calculate_late_fee()` dengan tarif berbeda per tipe item
- ✅ **Duck typing**: Method `display_items()` dapat bekerja dengan semua subclass `LibraryItem`
- ✅ Satu interface, banyak implementasi

### 4. Fungsionalitas Program (15%)
- ✅ Semua fitur berjalan dengan baik
- ✅ Menu interaktif yang user-friendly
- ✅ Error handling untuk input tidak valid
- ✅ Data contoh untuk testing

### 5. Dokumentasi Kode (10%)
- ✅ Docstring lengkap untuk semua class dan method
- ✅ Type hints untuk parameter dan return values
- ✅ Komentar inline untuk kode kompleks
- ✅ README.md lengkap dengan penjelasan

---

## 🚀 Cara Menjalankan Program

### Persyaratan
- Python 3.7 atau lebih tinggi
- Tidak memerlukan library eksternal (hanya built-in modules)

### Langkah-langkah

1. **Clone atau download repository**
   ```bash
   git clone <repository-url>
   cd syuhada_122140092_pertemuan5
   ```

2. **Jalankan program**
   ```bash
   python main.py
   ```

3. **Gunakan menu interaktif**
   - Pilih nomor menu (0-9)
   - Ikuti instruksi yang muncul
   - Tekan Enter untuk melanjutkan setelah setiap aksi

---

## 📸 Screenshot Hasil Running Program

### 1. Menu Utama
```
╔══════════════════════════════════════════════════════════╗
║   SISTEM MANAJEMEN PERPUSTAKAAN SEDERHANA               ║
║   Praktikum Python OOP - Pertemuan 5                     ║
║   Dibuat oleh: Syuhada Rantisi (122140092)              ║
╚══════════════════════════════════════════════════════════╝

==================================================
SISTEM MANAJEMEN PERPUSTAKAAN
==================================================
1. Tampilkan Semua Item
2. Tampilkan Item Tersedia
3. Cari Item berdasarkan ID
4. Cari Item berdasarkan Judul
5. Pinjam Item
6. Kembalikan Item
7. Lihat Detail Item
8. Hitung Denda Keterlambatan
9. Tampilkan Statistik
0. Keluar
==================================================

Pilih menu (0-9):
```

### 2. Tampilan Semua Item
```
==================================================
PERPUSTAKAAN ITERA
==================================================
Total Item: 6
Tersedia: 6
Dipinjam: 0
==================================================

[B001] Clean Code - Tersedia
[B002] Python Crash Course - Tersedia
[B003] The Pragmatic Programmer - Tersedia
[M001] National Geographic - Tersedia
[M002] TIME Magazine - Tersedia
[M003] Scientific American - Tersedia
```

### 3. Detail Item (Buku)
```
========================================
Tipe: BUKU
ID: B001
Judul: Clean Code
Penulis: Robert C. Martin
ISBN: 978-0132350884
Halaman: 464
Status: Tersedia
========================================
```

### 4. Detail Item (Majalah)
```
========================================
Tipe: MAJALAH
ID: M001
Judul: National Geographic
Penerbit: National Geographic Society
Edisi: #125
Bulan: Januari 2025
Status: Tersedia
========================================
```

### 5. Peminjaman Item
```
Masukkan ID item yang ingin dipinjam: B001

✓ Item 'B001' berhasil dipinjam!
```

### 6. Pencarian Berdasarkan Judul
```
Masukkan judul atau kata kunci: Python

Ditemukan 1 item:
[B002] Python Crash Course - Tersedia
```

### 7. Perhitungan Denda
```
Masukkan ID item: B001
Masukkan jumlah hari keterlambatan: 5

Denda keterlambatan untuk 5 hari: Rp 10,000
```

### 8. Statistik Perpustakaan
```
==================================================
STATISTIK PERPUSTAKAAN ITERA
==================================================
Total Buku: 3
Total Majalah: 3
Total Item: 6
Item Tersedia: 5
Item Dipinjam: 1
==================================================
```

---

## 📊 Diagram Class

Diagram class untuk sistem ini tersedia di file `class_diagram.txt`. Anda dapat menggunakan diagram tersebut sebagai referensi untuk membuat diagram visual menggunakan tools seperti draw.io, Lucidchart, atau PlantUML.

**Struktur Diagram:**
```
LibraryItem (Abstract)
    ↑
    |--- Book
    |--- Magazine

Library (mengelola koleksi LibraryItem)
```

---

## 🎓 Penjelasan Konsep OOP yang Digunakan

### Abstract Class
- `LibraryItem` adalah abstract class yang tidak bisa diinstansiasi langsung
- Memaksa subclass untuk mengimplementasikan method `get_info()` dan `calculate_late_fee()`
- Menyediakan template/blueprint untuk semua item perpustakaan

### Inheritance
- `Book` dan `Magazine` mewarisi semua atribut dan method dari `LibraryItem`
- Menggunakan `super().__init__()` untuk memanggil constructor parent
- Menambahkan atribut dan method spesifik untuk setiap tipe item

### Encapsulation
- **Private attributes** (`__available`, `__items`) tidak bisa diakses langsung dari luar class
- **Protected attributes** (`_id`, `_title`) menandakan atribut internal
- **Property decorators** menyediakan controlled access ke private attributes
- Name mangling Python untuk private attributes

### Polymorphism
- Method `get_info()` menampilkan format berbeda untuk Book dan Magazine
- Method `calculate_late_fee()` menggunakan tarif berbeda per tipe
- Duck typing: semua subclass LibraryItem bisa digunakan di Library class

---

## 💡 Fitur Tambahan

1. **Type Hints**: Menggunakan type hints untuk meningkatkan code readability
2. **Error Handling**: Validasi input dan penanganan error
3. **Interactive Menu**: User interface yang mudah digunakan
4. **Data Contoh**: Item contoh sudah dimasukkan untuk testing
5. **Formatting**: Output yang rapi dan terstruktur

---

## 🔍 Poin Penting

### Kelebihan Program
- ✅ Struktur OOP yang jelas dan terorganisir
- ✅ Mudah untuk menambah tipe item baru (extensible)
- ✅ Code reusability tinggi
- ✅ Dokumentasi lengkap
- ✅ User-friendly interface

### Kemungkinan Pengembangan
- 📌 Sistem user/member dengan authentication
- 📌 Database integration (SQLite/PostgreSQL)
- 📌 GUI menggunakan Tkinter atau PyQt
- 📌 Export/import data ke file (JSON/CSV)
- 📌 Sistem reservasi item
- 📌 History peminjaman
- 📌 Multi-user concurrent access

---

## 📝 Catatan

- Program ini dibuat untuk memenuhi tugas praktikum Python OOP
- Semua requirement telah terpenuhi dengan baik
- Code mengikuti PEP 8 style guide
- Dokumentasi lengkap tersedia di source code

---

## 👨‍💻 Author

**Syuhada Rantisi**  
NIM: 122140092  
Praktikum Python OOP - Pertemuan 5  
Institut Teknologi Sumatera (ITERA)

---

## 📄 Lisensi

Program ini dibuat untuk keperluan akademik dan pembelajaran.

---

**Terima kasih! 🙏**
