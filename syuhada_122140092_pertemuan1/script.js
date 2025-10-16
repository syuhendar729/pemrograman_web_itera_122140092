// Ambil elemen
const taskForm = document.getElementById('taskForm')
const taskList = document.getElementById('taskList')
const errorMsg = document.getElementById('errorMsg')
const searchInput = document.getElementById('searchInput')
const incompleteCount = document.getElementById(
    'incompleteCount'
)

// Inisialisasi data dari localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

// Simpan ke localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Render daftar tugas
function renderTasks(filter = '') {
    taskList.innerHTML = ''
    let filteredTasks = tasks.filter(
        (t) =>
            t.name
                .toLowerCase()
                .includes(filter.toLowerCase()) ||
            t.subject
                .toLowerCase()
                .includes(filter.toLowerCase())
    )

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li')
        li.className =
            'list-group-item d-flex justify-content-between align-items-center'
        li.innerHTML = `
      <div>
        <input type="checkbox" class="form-check-input me-2" ${
            task.completed ? 'checked' : ''
        } onchange="toggleTask(${index})">
        <span class="${task.completed ? 'text-decoration-line-through' : ''}">
          <strong>${task.name}</strong> - ${task.subject} (Deadline: ${
              task.deadline
          })
        </span>
      </div>
      <div>
        <button class="btn btn-sm btn-warning me-2" onclick="editTask(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Hapus</button>
      </div>
    `
        taskList.appendChild(li)
    })

    updateIncompleteCount()
}

// Update jumlah tugas belum selesai
function updateIncompleteCount() {
    const count = tasks.filter((t) => !t.completed).length
    incompleteCount.textContent = count
}

// Tambah tugas baru
taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document
        .getElementById('taskName')
        .value.trim()
    const subject = document
        .getElementById('subject')
        .value.trim()
    const deadline =
        document.getElementById('deadline').value

    // Validasi
    if (!name || !subject || !deadline) {
        errorMsg.textContent =
            'Semua kolom harus diisi dengan benar!'
        errorMsg.classList.remove('d-none')
        return
    } else {
        errorMsg.classList.add('d-none')
    }

    const newTask = {
        name,
        subject,
        deadline,
        completed: false,
    }

    tasks.push(newTask)
    saveTasks()
    renderTasks()
    taskForm.reset()
})

// Tandai tugas selesai/belum selesai
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed
    saveTasks()
    renderTasks(searchInput.value)
}

// Hapus tugas
function deleteTask(index) {
    if (
        confirm(
            'Apakah Anda yakin ingin menghapus tugas ini?'
        )
    ) {
        tasks.splice(index, 1)
        saveTasks()
        renderTasks(searchInput.value)
    }
}

// Edit tugas
function editTask(index) {
    const task = tasks[index]
    const newName = prompt('Edit Nama Tugas:', task.name)
    const newSubject = prompt(
        'Edit Mata Kuliah:',
        task.subject
    )
    const newDeadline = prompt(
        'Edit Deadline (YYYY-MM-DD):',
        task.deadline
    )

    if (newName && newSubject && newDeadline) {
        tasks[index].name = newName.trim()
        tasks[index].subject = newSubject.trim()
        tasks[index].deadline = newDeadline
        saveTasks()
        renderTasks(searchInput.value)
    }
}

// Fitur pencarian
searchInput.addEventListener('input', (e) => {
    renderTasks(e.target.value)
})

// Saat halaman pertama kali dibuka
renderTasks()
