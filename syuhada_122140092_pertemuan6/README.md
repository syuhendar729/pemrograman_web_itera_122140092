# Matakuliah Backend API

Layanan REST sederhana untuk mengelola data matakuliah berbasis Pyramid, SQLAlchemy, dan PostgreSQL dengan manajemen transaksi otomatis via `pyramid_tm`.

## Deskripsi Proyek
- CRUD matakuliah dengan atribut `kode_mk`, `nama_mk`, `sks`, dan `semester`.
- Basis data PostgreSQL, migrasi menggunakan Alembic.
- Transaction management otomatis (commit/rollback) per request.

## Cara Instalasi
1. Pastikan Python 3.11+ dan PostgreSQL tersedia.
2. Buat virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # macOS/Linux
   # .venv\Scripts\activate   # Windows PowerShell
   ```
3. Instal dependensi (editable mode):
   ```bash
   pip install -e .
   ```

## Konfigurasi Database
1. Buat database PostgreSQL, misal `db_matakuliah_122140092`.
2. Atur URL database di `development.ini` dan `alembic.ini` (format):
   ```ini
   postgresql+psycopg2://<user>:<password>@<host>:<port>/<db_name>
   ```
   Contoh default:
   ```ini
   postgresql+psycopg2://postgres:root@192.168.18.91:5432/db_matakuliah_122140092
   ```

## Cara Menjalankan
### 1) Menjalankan migrasi
```bash
alembic upgrade head
```

### 2) Menjalankan server
```bash
pserve development.ini --reload
```
Server akan jalan di `http://localhost:6543` (lihat `[server:main]` pada `development.ini`).

## API Endpoints
Semua response bertipe JSON.

### 1. Get Home
- **GET** `/`
- Contoh response:
  ```json
  { "message": "Welcome to the Matakuliah API" }
  ```

### 2. Get All Matakuliah
- **GET** `/api/matakuliah`
- Contoh response:
  ```json
  {
    "matakuliahs": [
      {
        "id": 1,
        "kode_mk": "IF101",
        "nama_mk": "Algoritma dan Pemrograman",
        "sks": 3,
        "semester": 1
      }
    ]
  }
  ```

### 3. Get Detail Matakuliah
- **GET** `/api/matakuliah/{id}`
- Contoh response (200):
  ```json
  {
    "id": 1,
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 3,
    "semester": 1
  }
  ```
- Jika tidak ditemukan: status 404 dengan body `{"error": "Not found"}`.

### 4. Create Matakuliah
- **POST** `/api/matakuliah`
- Body JSON:
  ```json
  {
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 3,
    "semester": 1
  }
  ```
- Contoh response (201/200):
  ```json
  {
    "status": "Created",
    "matakuliah": {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    }
  }
  ```

### 5. Update Matakuliah
- **PUT** `/api/matakuliah/{id}`
- Body JSON sama seperti create.
- Contoh response:
  ```json
  {
    "id": 1,
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Struktur Data",
    "sks": 3,
    "semester": 2
  }
  ```

### 6. Delete Matakuliah
- **DELETE** `/api/matakuliah/{id}`
- Contoh response:
  ```json
  { "message": "Deleted" }
  ```

## Testing (curl)
Aktifkan virtualenv dan jalankan server, lalu uji endpoint berikut:

- Get home
  ```bash
  curl -X GET http://localhost:6543/
  ```
- Get all
  ```bash
  curl -X GET http://localhost:6543/api/matakuliah
  ```
- Get detail
  ```bash
  curl -X GET http://localhost:6543/api/matakuliah/1
  ```
- Create
  ```bash
  curl -X POST http://localhost:6543/api/matakuliah \
    -H "Content-Type: application/json" \
    -d '{
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    }'
  ```
- Update
  ```bash
  curl -X PUT http://localhost:6543/api/matakuliah/1 \
    -H "Content-Type: application/json" \
    -d '{
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Struktur Data",
      "sks": 3,
      "semester": 2
    }'
  ```
- Delete
  ```bash
  curl -X DELETE http://localhost:6543/api/matakuliah/1
  ```

## Catatan
- Transaksi dikelola otomatis oleh `pyramid_tm`; tidak perlu `session.commit()` di view.
- Pastikan URL database konsisten antara `development.ini` dan `alembic.ini` sebelum menjalankan migrasi atau server.
