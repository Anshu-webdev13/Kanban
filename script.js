let taskData={}
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const tasks = document.querySelectorAll(".task");
const togglebtn = document.querySelector("#toggle-btn");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskBtn = document.querySelector("#add-new-task");
const columns = [todo, progress, done];

let dragElement = null;
tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    e.preventDefault();
    dragElement = task;
  });
});

function addDragEventonColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.appendChild(dragElement);
    column.classList.remove("hover-over");
    columns.forEach(col=>{
      const tasks = col.querySelectorAll(".task");
      const count = col.querySelector(".right");
      count.innerHTML=tasks.length;
    })
  });
}
addDragEventonColumn(todo);
addDragEventonColumn(progress);
addDragEventonColumn(done);
togglebtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});
modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});
addTaskBtn.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title-input").value;
  const taskDescrib = document.querySelector("#task-desc-input").value;
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");
  div.innerHTML = `<h2>${taskTitle}</h2>
                <p>${taskDescrib}</p>
                <button>Delete</button>`;
  todo.appendChild(div);
  columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");
    count.innerHTML = tasks.length;
    taskData[col.id]=Array.from(task).map(t=>{
      return{
        title: t.querySelector("h2").innerText,
        desc :t.querySelector("p").innerText
      }
  });
  localStorage.setItem("tasks", JSON.stringify(taskData));
  count.innerTask=tasks.length;

  div.addEventListener("drag", (e) => {
    e.preventDefault();
    dragElement = div;
  });
  modal.classList.remove("active");
});
