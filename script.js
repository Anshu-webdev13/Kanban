const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const tasks = document.querySelectorAll(".task");
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
  });
}
addDragEventonColumn(todo);
addDragEventonColumn(progress);
addDragEventonColumn(done);
