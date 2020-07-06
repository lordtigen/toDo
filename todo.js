const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const listItems = document.getElementsByClassName(".list-group-item");
const clearSelectedItems = document.querySelector("#clear-selected-todos");

eventListeners();

function eventListeners() {
  // Tum event listenerlar
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", deleteAllTodosFromUI);
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display:none !important");
    } else {
      listItem.setAttribute("style", "display:block");
    }
  });
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Bir Todo Girin bos birakilmamlidir.");
  } else {
    addTodoToStorage(newTodo);
    addTodotoUI(newTodo);
    showAlert("success", "Todo Basariyla Eklendi");
  }

  e.preventDefault();
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodotoUI(todo);
  });
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromStorage(newTodo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodotoUI(item) {
  /*        <li class="list-group-item d-flex justify-content-between">
      Todo 1
      <a href = "#" class ="delete-item">
          <i class = "fa fa-remove"></i>
      </a>
            </li> */

  // Li Elementinin olusumu
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";

  // Link Elementinin Olusumu
  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";
  a.innerHTML = "<i class='fa fa-remove'></i>";

  // Text node ekleyip linki li ye baglama
  li.appendChild(document.createTextNode(item));
  li.appendChild(a);

  // Todo Listi listeye koyma
  todoList.appendChild(li);
  todoInput.value = "";
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodosFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo Basariyla Silindi");
  }
}

function deleteTodosFromStorage(deleteTodo) {
  var todos = getTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteAllTodosFromUI(e) {
  if (confirm("Tumunu silmek istediginize emin misiniz?")) {
    // Arayuzden todolari temizleme
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}
