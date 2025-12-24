"""
Sistem Manajemen Perpustakaan Sederhana
Dibuat oleh: Syuhada Rantisi (122140092)
Praktikum Python OOP - Pertemuan 5

Program ini mengimplementasikan konsep OOP Python termasuk:
- Abstract Class dan Inheritance
- Encapsulation dengan Access Modifiers
- Polymorphism dan Method Overriding
- Property Decorators
"""

from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Optional


class LibraryItem(ABC):
    """
    Abstract Base Class untuk semua item di perpustakaan.
    
    Attributes:
        _id (str): ID unik untuk item (protected)
        _title (str): Judul item (protected)
        _available (bool): Status ketersediaan item (private)
        _borrowed_date (datetime): Tanggal peminjaman (private)
    """
    
    def __init__(self, item_id: str, title: str):
        """
        Constructor untuk LibraryItem.
        
        Args:
            item_id (str): ID unik item
            title (str): Judul item
        """
        self._id = item_id
        self._title = title
        self.__available = True
        self.__borrowed_date = None
    
    @property
    def id(self) -> str:
        """Getter untuk ID item."""
        return self._id
    
    @property
    def title(self) -> str:
        """Getter untuk title item."""
        return self._title
    
    @property
    def available(self) -> bool:
        """Getter untuk status ketersediaan item."""
        return self.__available
    
    @available.setter
    def available(self, value: bool):
        """
        Setter untuk status ketersediaan item.
        
        Args:
            value (bool): Status ketersediaan baru
        """
        self.__available = value
        if not value:
            self.__borrowed_date = datetime.now()
        else:
            self.__borrowed_date = None
    
    @abstractmethod
    def get_info(self) -> str:
        """
        Abstract method untuk mendapatkan informasi detail item.
        Harus diimplementasikan oleh subclass.
        
        Returns:
            str: Informasi detail item
        """
        pass
    
    @abstractmethod
    def calculate_late_fee(self, days_late: int) -> float:
        """
        Abstract method untuk menghitung denda keterlambatan.
        Harus diimplementasikan oleh subclass.
        
        Args:
            days_late (int): Jumlah hari keterlambatan
            
        Returns:
            float: Jumlah denda
        """
        pass
    
    def borrow(self) -> bool:
        """
        Method untuk meminjam item.
        
        Returns:
            bool: True jika berhasil, False jika item tidak tersedia
        """
        if self.__available:
            self.available = False
            return True
        return False
    
    def return_item(self) -> bool:
        """
        Method untuk mengembalikan item.
        
        Returns:
            bool: True jika berhasil, False jika item sudah tersedia
        """
        if not self.__available:
            self.available = True
            return True
        return False
    
    def __str__(self) -> str:
        """String representation dari item."""
        status = "Tersedia" if self.__available else "Dipinjam"
        return f"[{self._id}] {self._title} - {status}"


class Book(LibraryItem):
    """
    Class untuk merepresentasikan Buku di perpustakaan.
    Mewarisi dari LibraryItem.
    
    Attributes:
        _author (str): Penulis buku
        _isbn (str): ISBN buku
        _pages (int): Jumlah halaman
    """
    
    # Class variable untuk denda per hari
    LATE_FEE_PER_DAY = 2000
    
    def __init__(self, item_id: str, title: str, author: str, isbn: str, pages: int):
        """
        Constructor untuk Book.
        
        Args:
            item_id (str): ID unik buku
            title (str): Judul buku
            author (str): Penulis buku
            isbn (str): ISBN buku
            pages (int): Jumlah halaman
        """
        super().__init__(item_id, title)
        self._author = author
        self._isbn = isbn
        self._pages = pages
    
    @property
    def author(self) -> str:
        """Getter untuk author."""
        return self._author
    
    @property
    def isbn(self) -> str:
        """Getter untuk ISBN."""
        return self._isbn
    
    @property
    def pages(self) -> int:
        """Getter untuk pages."""
        return self._pages
    
    def get_info(self) -> str:
        """
        Implementasi abstract method untuk mendapatkan info buku.
        
        Returns:
            str: Informasi lengkap buku
        """
        status = "Tersedia" if self.available else "Dipinjam"
        return f"""
========================================
Tipe: BUKU
ID: {self._id}
Judul: {self._title}
Penulis: {self._author}
ISBN: {self._isbn}
Halaman: {self._pages}
Status: {status}
========================================
        """
    
    def calculate_late_fee(self, days_late: int) -> float:
        """
        Implementasi abstract method untuk menghitung denda buku.
        
        Args:
            days_late (int): Jumlah hari keterlambatan
            
        Returns:
            float: Jumlah denda
        """
        return days_late * self.LATE_FEE_PER_DAY


class Magazine(LibraryItem):
    """
    Class untuk merepresentasikan Majalah di perpustakaan.
    Mewarisi dari LibraryItem.
    
    Attributes:
        _publisher (str): Penerbit majalah
        _issue_number (int): Nomor edisi
        _month (str): Bulan terbit
    """
    
    # Class variable untuk denda per hari (lebih murah dari buku)
    LATE_FEE_PER_DAY = 1000
    
    def __init__(self, item_id: str, title: str, publisher: str, 
                 issue_number: int, month: str):
        """
        Constructor untuk Magazine.
        
        Args:
            item_id (str): ID unik majalah
            title (str): Judul majalah
            publisher (str): Penerbit majalah
            issue_number (int): Nomor edisi
            month (str): Bulan terbit
        """
        super().__init__(item_id, title)
        self._publisher = publisher
        self._issue_number = issue_number
        self._month = month
    
    @property
    def publisher(self) -> str:
        """Getter untuk publisher."""
        return self._publisher
    
    @property
    def issue_number(self) -> int:
        """Getter untuk issue number."""
        return self._issue_number
    
    @property
    def month(self) -> str:
        """Getter untuk month."""
        return self._month
    
    def get_info(self) -> str:
        """
        Implementasi abstract method untuk mendapatkan info majalah.
        
        Returns:
            str: Informasi lengkap majalah
        """
        status = "Tersedia" if self.available else "Dipinjam"
        return f"""
========================================
Tipe: MAJALAH
ID: {self._id}
Judul: {self._title}
Penerbit: {self._publisher}
Edisi: #{self._issue_number}
Bulan: {self._month}
Status: {status}
========================================
        """
    
    def calculate_late_fee(self, days_late: int) -> float:
        """
        Implementasi abstract method untuk menghitung denda majalah.
        
        Args:
            days_late (int): Jumlah hari keterlambatan
            
        Returns:
            float: Jumlah denda
        """
        return days_late * self.LATE_FEE_PER_DAY


class Library:
    """
    Class untuk mengelola koleksi item perpustakaan.
    
    Attributes:
        __items (List[LibraryItem]): Daftar item di perpustakaan (private)
        __name (str): Nama perpustakaan (private)
    """
    
    def __init__(self, name: str):
        """
        Constructor untuk Library.
        
        Args:
            name (str): Nama perpustakaan
        """
        self.__items: List[LibraryItem] = []
        self.__name = name
    
    @property
    def name(self) -> str:
        """Getter untuk nama perpustakaan."""
        return self.__name
    
    @property
    def total_items(self) -> int:
        """Getter untuk total jumlah item."""
        return len(self.__items)
    
    @property
    def available_items(self) -> int:
        """Getter untuk jumlah item yang tersedia."""
        return sum(1 for item in self.__items if item.available)
    
    def add_item(self, item: LibraryItem) -> bool:
        """
        Menambahkan item ke perpustakaan.
        
        Args:
            item (LibraryItem): Item yang akan ditambahkan
            
        Returns:
            bool: True jika berhasil, False jika ID sudah ada
        """
        # Cek apakah ID sudah ada
        if any(existing_item.id == item.id for existing_item in self.__items):
            return False
        
        self.__items.append(item)
        return True
    
    def display_items(self, show_all: bool = True) -> None:
        """
        Menampilkan daftar item di perpustakaan.
        
        Args:
            show_all (bool): True untuk menampilkan semua, False untuk tersedia saja
        """
        print(f"\n{'='*50}")
        print(f"PERPUSTAKAAN {self.__name.upper()}")
        print(f"{'='*50}")
        print(f"Total Item: {self.total_items}")
        print(f"Tersedia: {self.available_items}")
        print(f"Dipinjam: {self.total_items - self.available_items}")
        print(f"{'='*50}\n")
        
        if not self.__items:
            print("Perpustakaan masih kosong.")
            return
        
        items_to_show = self.__items if show_all else [item for item in self.__items if item.available]
        
        if not items_to_show:
            print("Tidak ada item yang tersedia saat ini.")
            return
        
        for item in items_to_show:
            print(item)
    
    def search_by_id(self, item_id: str) -> Optional[LibraryItem]:
        """
        Mencari item berdasarkan ID.
        
        Args:
            item_id (str): ID item yang dicari
            
        Returns:
            Optional[LibraryItem]: Item jika ditemukan, None jika tidak
        """
        for item in self.__items:
            if item.id.lower() == item_id.lower():
                return item
        return None
    
    def search_by_title(self, title: str) -> List[LibraryItem]:
        """
        Mencari item berdasarkan judul (partial match).
        
        Args:
            title (str): Judul atau bagian judul yang dicari
            
        Returns:
            List[LibraryItem]: Daftar item yang cocok
        """
        results = []
        title_lower = title.lower()
        for item in self.__items:
            if title_lower in item.title.lower():
                results.append(item)
        return results
    
    def borrow_item(self, item_id: str) -> bool:
        """
        Meminjam item dari perpustakaan.
        
        Args:
            item_id (str): ID item yang akan dipinjam
            
        Returns:
            bool: True jika berhasil, False jika gagal
        """
        item = self.search_by_id(item_id)
        if item:
            return item.borrow()
        return False
    
    def return_item(self, item_id: str) -> bool:
        """
        Mengembalikan item ke perpustakaan.
        
        Args:
            item_id (str): ID item yang dikembalikan
            
        Returns:
            bool: True jika berhasil, False jika gagal
        """
        item = self.search_by_id(item_id)
        if item:
            return item.return_item()
        return False
    
    def display_statistics(self) -> None:
        """Menampilkan statistik perpustakaan."""
        total_books = sum(1 for item in self.__items if isinstance(item, Book))
        total_magazines = sum(1 for item in self.__items if isinstance(item, Magazine))
        
        print(f"\n{'='*50}")
        print(f"STATISTIK PERPUSTAKAAN {self.__name.upper()}")
        print(f"{'='*50}")
        print(f"Total Buku: {total_books}")
        print(f"Total Majalah: {total_magazines}")
        print(f"Total Item: {self.total_items}")
        print(f"Item Tersedia: {self.available_items}")
        print(f"Item Dipinjam: {self.total_items - self.available_items}")
        print(f"{'='*50}\n")


def print_menu():
    """Menampilkan menu utama."""
    print("\n" + "="*50)
    print("SISTEM MANAJEMEN PERPUSTAKAAN")
    print("="*50)
    print("1. Tampilkan Semua Item")
    print("2. Tampilkan Item Tersedia")
    print("3. Cari Item berdasarkan ID")
    print("4. Cari Item berdasarkan Judul")
    print("5. Pinjam Item")
    print("6. Kembalikan Item")
    print("7. Lihat Detail Item")
    print("8. Hitung Denda Keterlambatan")
    print("9. Tampilkan Statistik")
    print("0. Keluar")
    print("="*50)


def main():
    """Fungsi utama untuk menjalankan program."""
    # Inisialisasi perpustakaan
    library = Library("ITERA")
    
    # Menambahkan beberapa buku contoh
    library.add_item(Book(
        "B001", 
        "Clean Code", 
        "Robert C. Martin", 
        "978-0132350884",
        464
    ))
    
    library.add_item(Book(
        "B002",
        "Python Crash Course",
        "Eric Matthes",
        "978-1593279288",
        560
    ))
    
    library.add_item(Book(
        "B003",
        "The Pragmatic Programmer",
        "Andrew Hunt",
        "978-0201616224",
        352
    ))
    
    # Menambahkan beberapa majalah contoh
    library.add_item(Magazine(
        "M001",
        "National Geographic",
        "National Geographic Society",
        125,
        "Januari 2025"
    ))
    
    library.add_item(Magazine(
        "M002",
        "TIME Magazine",
        "TIME USA LLC",
        52,
        "Desember 2024"
    ))
    
    library.add_item(Magazine(
        "M003",
        "Scientific American",
        "Springer Nature",
        340,
        "Februari 2025"
    ))
    
    # Loop menu utama
    while True:
        print_menu()
        choice = input("\nPilih menu (0-9): ").strip()
        
        if choice == "1":
            # Tampilkan semua item
            library.display_items(show_all=True)
            
        elif choice == "2":
            # Tampilkan item tersedia
            library.display_items(show_all=False)
            
        elif choice == "3":
            # Cari berdasarkan ID
            item_id = input("Masukkan ID item: ").strip()
            item = library.search_by_id(item_id)
            if item:
                print("\nItem ditemukan:")
                print(item)
            else:
                print(f"\nItem dengan ID '{item_id}' tidak ditemukan.")
                
        elif choice == "4":
            # Cari berdasarkan judul
            title = input("Masukkan judul atau kata kunci: ").strip()
            results = library.search_by_title(title)
            if results:
                print(f"\nDitemukan {len(results)} item:")
                for item in results:
                    print(item)
            else:
                print(f"\nTidak ada item dengan judul '{title}'.")
                
        elif choice == "5":
            # Pinjam item
            item_id = input("Masukkan ID item yang ingin dipinjam: ").strip()
            if library.borrow_item(item_id):
                print(f"\n✓ Item '{item_id}' berhasil dipinjam!")
            else:
                print(f"\n✗ Gagal meminjam item '{item_id}'. Item tidak tersedia atau tidak ditemukan.")
                
        elif choice == "6":
            # Kembalikan item
            item_id = input("Masukkan ID item yang dikembalikan: ").strip()
            if library.return_item(item_id):
                print(f"\n✓ Item '{item_id}' berhasil dikembalikan!")
            else:
                print(f"\n✗ Gagal mengembalikan item '{item_id}'. Item sudah tersedia atau tidak ditemukan.")
                
        elif choice == "7":
            # Lihat detail item
            item_id = input("Masukkan ID item: ").strip()
            item = library.search_by_id(item_id)
            if item:
                print(item.get_info())
            else:
                print(f"\nItem dengan ID '{item_id}' tidak ditemukan.")
                
        elif choice == "8":
            # Hitung denda
            item_id = input("Masukkan ID item: ").strip()
            item = library.search_by_id(item_id)
            if item:
                try:
                    days = int(input("Masukkan jumlah hari keterlambatan: ").strip())
                    if days < 0:
                        print("\nJumlah hari tidak boleh negatif!")
                    else:
                        fee = item.calculate_late_fee(days)
                        print(f"\nDenda keterlambatan untuk {days} hari: Rp {fee:,.0f}")
                except ValueError:
                    print("\nInput tidak valid! Masukkan angka.")
            else:
                print(f"\nItem dengan ID '{item_id}' tidak ditemukan.")
                
        elif choice == "9":
            # Statistik
            library.display_statistics()
            
        elif choice == "0":
            # Keluar
            print("\nTerima kasih telah menggunakan sistem perpustakaan!")
            print("Program selesai.\n")
            break
            
        else:
            print("\n✗ Pilihan tidak valid! Silakan pilih menu 0-9.")
        
        input("\nTekan Enter untuk melanjutkan...")


if __name__ == "__main__":
    print("""
    ╔══════════════════════════════════════════════════════════╗
    ║   SISTEM MANAJEMEN PERPUSTAKAAN SEDERHANA               ║
    ║   Praktikum Python OOP - Pertemuan 5                     ║
    ║   Dibuat oleh: Syuhada Rantisi (122140092)              ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    main()
