
# ============================================
# Program Pengelolaan Data Nilai Mahasiswa
# ============================================

# Fungsi menghitung nilai akhir
def hitung_nilai_akhir(m):
    return (0.3 * m["nilai_uts"]) + (0.4 * m["nilai_uas"]) + (0.3 * m["nilai_tugas"])

# Fungsi menentukan grade
def tentukan_grade(nilai):
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"

# Fungsi menampilkan tabel data mahasiswa
def tampilkan_tabel(data):
    print("=" * 72)
    print(f"{'Nama':15} {'NIM':12} {'UTS':5} {'UAS':5} {'Tugas':7} {'Akhir':7} {'Grade':5}")
    print("=" * 72)
    for m in data:
        print(f"{m['nama']:15} {m['nim']:12} {m['nilai_uts']:5} {m['nilai_uas']:5} "
              f"{m['nilai_tugas']:7} {m['nilai_akhir']:7.2f} {m['grade']:5}")
    print("=" * 72)

# Fungsi mencari mahasiswa nilai tertinggi
def nilai_tertinggi(data):
    return max(data, key=lambda m: m["nilai_akhir"])

# Fungsi mencari mahasiswa nilai terendah
def nilai_terendah(data):
    return min(data, key=lambda m: m["nilai_akhir"])

# Fungsi menambah mahasiswa baru
def tambah_mahasiswa(data):
    print("\n=== Input Mahasiswa Baru ===")
    nama = input("Nama: ")
    nim = input("NIM: ")
    uts = float(input("Nilai UTS: "))
    uas = float(input("Nilai UAS: "))
    tugas = float(input("Nilai Tugas: "))

    m = {
        "nama": nama,
        "nim": nim,
        "nilai_uts": uts,
        "nilai_uas": uas,
        "nilai_tugas": tugas
    }

    # Hitung nilai akhir & grade
    m["nilai_akhir"] = hitung_nilai_akhir(m)
    m["grade"] = tentukan_grade(m["nilai_akhir"])

    data.append(m)
    print("Mahasiswa berhasil ditambahkan!\n")

# Fungsi filter berdasarkan grade
def filter_grade(data, target_grade):
    return [m for m in data if m["grade"] == target_grade]

# Fungsi rata-rata kelas
def rata_rata_kelas(data):
    total = sum(m["nilai_akhir"] for m in data)
    return total / len(data)


# ============================================
# DATA AWAL (minimal 5 mahasiswa)
# ============================================

mahasiswa = [
    {"nama": "Andi", "nim": "A001", "nilai_uts": 80, "nilai_uas": 75, "nilai_tugas": 85},
    {"nama": "Budi", "nim": "A002", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Cici", "nim": "A003", "nilai_uts": 90, "nilai_uas": 88, "nilai_tugas": 92},
    {"nama": "Deni", "nim": "A004", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 58},
    {"nama": "Eka", "nim": "A005", "nilai_uts": 72, "nilai_uas": 78, "nilai_tugas": 74},
]

# Hitung nilai akhir & grade untuk semua mahasiswa awal
for m in mahasiswa:
    m["nilai_akhir"] = hitung_nilai_akhir(m)
    m["grade"] = tentukan_grade(m["nilai_akhir"])

# ============================================
# MENU UTAMA
# ============================================

while True:
    print("\n=== Program Pengelolaan Nilai Mahasiswa ===")
    print("1. Tampilkan Semua Data")
    print("2. Tambah Mahasiswa Baru")
    print("3. Cari Nilai Tertinggi")
    print("4. Cari Nilai Terendah")
    print("5. Filter Berdasarkan Grade")
    print("6. Hitung Rata-rata Kelas")
    print("0. Keluar")

    pilihan = input("Pilih menu: ")

    if pilihan == "1":
        tampilkan_tabel(mahasiswa)

    elif pilihan == "2":
        tambah_mahasiswa(mahasiswa)

    elif pilihan == "3":
        tertinggi = nilai_tertinggi(mahasiswa)
        print("\nMahasiswa Nilai Tertinggi:")
        tampilkan_tabel([tertinggi])

    elif pilihan == "4":
        terendah = nilai_terendah(mahasiswa)
        print("\nMahasiswa Nilai Terendah:")
        tampilkan_tabel([terendah])

    elif pilihan == "5":
        grade = input("Masukkan grade (A/B/C/D/E): ").upper()
        hasil = filter_grade(mahasiswa, grade)
        if hasil:
            print(f"\nMahasiswa dengan grade {grade}:")
            tampilkan_tabel(hasil)
        else:
            print("Tidak ada mahasiswa dengan grade tersebut.")

    elif pilihan == "6":
        print(f"\nRata-rata nilai akhir kelas: {rata_rata_kelas(mahasiswa):.2f}")

    elif pilihan == "0":
        print("Program selesai.")
        break

    else:
        print("Pilihan tidak valid!")
