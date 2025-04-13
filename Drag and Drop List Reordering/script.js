const list = document.getElementById("draggable-list");
const items = list.querySelectorAll(".draggable-item");

items.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
  item.addEventListener("dragover", dragOver);
  item.addEventListener("drop", drop);
  item.addEventListener("dragenter", dragEnter);
  item.addEventListener("dragleave", dragLeave);
});

let draggedItem = null;

function dragStart(e) {
  draggedItem = this;
  this.classList.add("dragging");
}

function dragEnd(e) {
  this.classList.remove("dragging");
  draggedItem = null;

  // Remove drag-over class from all items
  document.querySelectorAll(".draggable-item").forEach((item) => {
    item.classList.remove("drag-over");
  });
}

function dragOver(e) {
  e.preventDefault();
  if (this === draggedItem) return;
}

function dragEnter(e) {
  e.preventDefault();
  if (this === draggedItem) return;
  this.classList.add("drag-over");
}

function dragLeave(e) {
  this.classList.remove("drag-over");
}

function drop(e) {
  e.preventDefault();
  if (this === draggedItem) return;

  let allItems = [...document.querySelectorAll(".draggable-item")];
  let draggedIndex = allItems.indexOf(draggedItem);
  let droppedIndex = allItems.indexOf(this);

  if (draggedIndex < droppedIndex) {
    this.parentNode.insertBefore(draggedItem, this.nextSibling);
  } else {
    this.parentNode.insertBefore(draggedItem, this);
  }

  // Add shake animation to the dropped item
  this.classList.add("shake");
  setTimeout(() => {
    this.classList.remove("shake");
  }, 500);

  this.classList.remove("drag-over");
}
