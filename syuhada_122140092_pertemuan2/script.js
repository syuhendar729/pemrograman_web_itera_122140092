// ====== Class untuk Jadwal Kuliah ======
class Schedule {
    constructor(subject, day, time, lecturer) {
        this.id = Date.now();
        this.subject = subject;
        this.day = day;
        this.time = time;
        this.lecturer = lecturer;
    }
}

// ====== Array Penyimpanan ======
let schedules = JSON.parse(localStorage.getItem('schedules')) || [];

// ====== Fungsi Arrow untuk Menyimpan ke localStorage ======
const saveToLocalStorage = () => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
};

// ====== Fungsi Arrow untuk Merender Jadwal ======
const renderSchedules = () => {
    const list = document.getElementById('scheduleList');
    list.innerHTML = '';

    if (schedules.length === 0) {
        list.innerHTML = '<p class="text-muted text-center">Belum ada jadwal kuliah</p>';
        return;
    }

    schedules.forEach(schedule => {
        const card = document.createElement('div');
        card.className = 'card mb-3 p-3';
        card.innerHTML = `
            <h5>${schedule.subject}</h5>
            <p><strong>Hari:</strong> ${schedule.day}</p>
            <p><strong>Waktu:</strong> ${schedule.time}</p>
            <p><strong>Dosen:</strong> ${schedule.lecturer}</p>
            <button class="btn btn-warning btn-sm mt-2" onclick="editSchedule(${schedule.id})">Edit</button>
            <button class="btn btn-danger btn-sm mt-2" onclick="deleteSchedule(${schedule.id})">Hapus</button>
        `;
        list.appendChild(card);
    });
};

// ====== Fungsi Asinkron untuk Simulasi Notifikasi ======
async function showNotification(message) {
    await new Promise(resolve => setTimeout(resolve, 300));
    alert(message);
}

// ====== Tambah atau Edit Jadwal ======
document.getElementById('scheduleForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const subject = document.getElementById('subject').value.trim();
    const day = document.getElementById('day').value.trim();
    const time = document.getElementById('time').value.trim();
    const lecturer = document.getElementById('lecturer').value.trim();

    if (!subject || !day || !time || !lecturer) {
        alert('Semua field harus diisi!');
        return;
    }

    if (e.target.dataset.editing) {
        const id = parseInt(e.target.dataset.editing);
        const index = schedules.findIndex(item => item.id === id);
        schedules[index] = new Schedule(subject, day, time, lecturer);
        schedules[index].id = id;
        delete e.target.dataset.editing;
        await showNotification('Jadwal berhasil diperbarui!');
    } else {
        const newSchedule = new Schedule(subject, day, time, lecturer);
        schedules.push(newSchedule);
        await showNotification('Jadwal baru berhasil ditambahkan!');
    }

    saveToLocalStorage();
    renderSchedules();
    e.target.reset();
});

// ====== Fungsi untuk Edit Jadwal ======
function editSchedule(id) {
    const schedule = schedules.find(item => item.id === id);
    document.getElementById('subject').value = schedule.subject;
    document.getElementById('day').value = schedule.day;
    document.getElementById('time').value = schedule.time;
    document.getElementById('lecturer').value = schedule.lecturer;
    document.getElementById('scheduleForm').dataset.editing = id;
}

// ====== Fungsi Arrow untuk Menghapus Jadwal ======
const deleteSchedule = (id) => {
    schedules = schedules.filter(item => item.id !== id);
    saveToLocalStorage();
    renderSchedules();
};

// ====== Render Awal ======
renderSchedules();
