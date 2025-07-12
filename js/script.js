// Ambil elemen-elemen penting dari HTML
const form = document.getElementById("todo-form");
const inputTugas = document.getElementById("inputtugas");
const inputDate = document.getElementById("inputdate");
const taskList = document.getElementById("tasklist");
const filterButtons = document.querySelectorAll(".filter-btn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// Tempat menyimpan semua tugas
let todos = []; // tiap tugas = { id, text, date, done }

// Status filter aktif
let currentFilter = "all";

// Render ulang daftar berdasarkan filter aktif
function renderTasks() {
  taskList.innerHTML = "";

  const filtered = todos.filter((todo) => {
    if (currentFilter === "pending") return !todo.done;
    if (currentFilter === "completed") return todo.done;
    return true; // filter 'all'
  });

  if (filtered.length === 0) {
    taskList.innerHTML = '<p style="text-align:center; opacity:0.7;">No task found</p>';
    return;
  }

  filtered.forEach((todo) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item" + (todo.done ? " done" : "");

    // Deskripsi tugas
    const text = document.createElement("span");
    text.textContent = `${todo.text} (${todo.date || "Tanpa tanggal"})`;

    // Tombol aksi
    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Tombol selesai
    const doneBtn = document.createElement("button");
    doneBtn.className = "done-btn";
    doneBtn.textContent = todo.done ? "⟲" : "✓";
    doneBtn.title = "Tandai selesai / belum";
    doneBtn.onclick = () => toggleDone(todo.id);

    // Tombol hapus
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.title = "Hapus tugas";
    delBtn.onclick = () => deleteTask(todo.id);

    actions.appendChild(doneBtn);
    actions.appendChild(delBtn);

    taskItem.appendChild(text);
    taskItem.appendChild(actions);

    taskList.appendChild(taskItem);
  });
}

// Tambah tugas
form.onsubmit = function (e) {
  e.preventDefault();

  const text = inputTugas.value.trim();
  const date = inputDate.value;

  if (!text) {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  const newTodo = {
    id: Date.now(),
    text,
    date,
    done: false,
  };

  todos.push(newTodo);

  inputTugas.value = "";
  inputDate.value = "";

  renderTasks();
};

// Toggle selesai
function toggleDone(id) {
  todos = todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
  renderTasks();
}

// Hapus tugas satuan
function deleteTask(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTasks();
}

// Hapus semua tugas
deleteAllBtn.onclick = () => {
  if (confirm("Yakin ingin menghapus semua tugas?")) {
    todos = [];
    renderTasks();
  }
};

// Filter tombol (All / Pending / Completed)
filterButtons.forEach((btn) => {
  btn.onclick = () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  };
});

// Render pertama kali
renderTasks();
// koment
