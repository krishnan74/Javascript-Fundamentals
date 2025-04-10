// Grab references to the DOM elements we need
const todoInput = document.getElementById("todoInput");
const addTodoButton = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

// This array will hold all our tasks, loaded from localStorage if available
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save the current list of tasks to localStorage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Create a new list item for a task
const createTodoElement = (todo) => {
  const li = document.createElement("li");
  li.className = `todo-item ${todo.completed ? "completed" : ""}`;
  li.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => toggleTodo(todo.id));

  const span = document.createElement("span");
  span.textContent = todo.text;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTodo(todo.id));

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);

  return li;
};

// Update the UI to show the current list of tasks
const renderTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    todoList.appendChild(createTodoElement(todo));
  });
};

// Add a new task to the list
const addTodo = (text) => {
  if (text.trim()) {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = "";
  }
};

// Toggle whether a task is marked as completed
const toggleTodo = (id) => {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveTodos();
  renderTodos();
};

// Remove a task from the list
const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
};

// Set up event listeners for adding tasks
addTodoButton.addEventListener("click", () => addTodo(todoInput.value));

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo(todoInput.value);
  }
});

// Render the initial list of tasks when the page loads
renderTodos();
