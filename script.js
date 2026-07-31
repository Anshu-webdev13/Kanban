
let taskData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const toggleBtn = document.querySelector("#toggle-btn");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskBtn = document.querySelector("#add-new-task");

const columns = [todo, progress, done];

let dragElement = null;

// Create a task element
function createTask(title, desc) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
    `;

  // Drag start
  div.addEventListener("dragstart", () => {
    dragElement = div;
  });

  // Delete task
  div.querySelector(".delete-btn").addEventListener("click", () => {
    div.remove();
    updateCounts();
    saveTasks();
  });

  return div;
}

// Update task counts
function updateCounts() {
  columns.forEach((col) => {
    const count = col.querySelector(".right");
    if (count) {
      count.textContent = col.querySelectorAll(".task").length;
    }
  });
}

// Save tasks to localStorage
function saveTasks() {
  taskData = {};

  columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");

    taskData[col.id] = Array.from(tasks).map((task) => ({
      title: task.querySelector("h2").innerText,
      desc: task.querySelector("p").innerText,
    }));
  });

  localStorage.setItem("tasks", JSON.stringify(taskData));
}

// Load tasks from localStorage
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks"));

  if (!saved) return;

  columns.forEach((col) => {
    // Remove old tasks
    col.querySelectorAll(".task").forEach((task) => task.remove());

    if (saved[col.id]) {
      saved[col.id].forEach((task) => {
        col.appendChild(createTask(task.title, task.desc));
      });
    }
  });

  updateCounts();
}

// Drag & Drop
columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("hover-over");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();

    column.classList.remove("hover-over");

    if (dragElement) {
      column.appendChild(dragElement);
      updateCounts();
      saveTasks();
    }
  });
});

// Open modal
toggleBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

// Close modal
modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Add new task
addTaskBtn.addEventListener("click", () => {
  const titleInput = document.querySelector("#task-title-input");
  const descInput = document.querySelector("#task-desc-input");

  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (title === "") {
    alert("Please enter a task title.");
    return;
  }

  const task = createTask(title, desc);
  todo.appendChild(task);

  titleInput.value = "";
  descInput.value = "";

  modal.classList.remove("active");

  updateCounts();
  saveTasks();
});

// Initial setup
updateCounts();
loadTasks();