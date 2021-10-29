//Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
//Functions

function addTodo(event) {
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  saveLocalStorage(todoInput.value);
  newTodo.classList.add("todo.item");
  todoDiv.appendChild(newTodo);
  //BUTTONS
  const completedBTN = document.createElement("button");
  completedBTN.innerHTML = `<i class = 'fas fa-check'> </i>`;
  completedBTN.classList.add("complete-btn");
  todoDiv.appendChild(completedBTN);

  const trashBTN = document.createElement("button");
  trashBTN.innerHTML = `<i class = 'fas fa-trash'> </i>`;
  trashBTN.classList.add("trash-btn");
  todoDiv.appendChild(trashBTN);
  todoList.appendChild(todoDiv);

  todoInput.value = "";
  event.preventDefault();
}

function deleteCheck(e) {
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    const deletedtodo = todo.firstChild.innerText;
    removeLocalTodos(deletedtodo);
    //Animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  e.preventDefault();
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = " none";
          break;
        }
    }
  });
}

function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo.item");
    todoDiv.appendChild(newTodo);
    //BUTTONS
    const completedBTN = document.createElement("button");
    completedBTN.innerHTML = `<i class = 'fas fa-check'> </i>`;
    completedBTN.classList.add("complete-btn");
    todoDiv.appendChild(completedBTN);

    const trashBTN = document.createElement("button");
    trashBTN.innerHTML = `<i class = 'fas fa-trash'> </i>`;
    trashBTN.classList.add("trash-btn");
    todoDiv.appendChild(trashBTN);
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(deletetodo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo, index) {
    if (deletetodo === todo) {
      todos.splice(index, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  });
}
