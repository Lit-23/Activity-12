const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

const todoInput = document.querySelector('#js-todo-input');
const addBtn = document.querySelector('#js-add-btn');
const todoItem = document.querySelector('#todoItem');

addBtn.addEventListener("click", () => {
  if(todoInput.value === "") {
    alert("The input field is requied!");
  }
  else{
    addTodo();
  }
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    if(todoInput.value === ""){
      alert("The input field is requied!");
    }
    else{
      addTodo();
    }
  }
});

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todoObject, index) => {
    const { todoName } = todoObject;
    const html = `
      <div>
        <button onclick="
          toggleCheckbox();
          "
          class="btn btn-light"
        >
          ✔
        </button>
        <span id="js-todo-name">
          ${todoName}
        </span>
        <button onclick="
          todoList.splice(${index}, 1);
          renderTodoList();"
        id="js-delete-btn" class="btn btn-light">
          ❌
        </button>
      </div>
      <hr>
    `;
    todoListHTML += html;
  })
  todoItem.innerHTML = todoListHTML;

  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addTodo() {
  const todoName = todoInput.value;

  todoList.push({todoName});

  todoInput.value = "";
  renderTodoList();
}

function toggleCheckbox(event) {
  this.event.target.parentElement.children[1].classList.toggle("task-complete");

  /* 
    sir pa advise po ako dito.
    pano po ito maisisave sa local storage. para pagnirefresh po ulit naka marked as completed parin yung todoItem ko.
    parescue na ako sir. almost 2days na ako nastack dito palang sa event.target haha mag move na po ako sa next lesson.
    Salamat sir!
  */
}