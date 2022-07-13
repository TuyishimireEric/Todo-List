import './style.css';

let todoList = [];
let id = 1;
function add(text) {
  
  const todo = {
    description: text,
    completed: false,
    index: id ++,
  };
  todoList.push(todo);
  showTodo(todo);
}

const form = document.querySelector('.main');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.action');
  const text = input.value.trim();
  if (text !== '') {
    add(text);
    input.value = '';
    input.focus();
  }
});

function showTodo(todo) {
    const list = document.querySelector('.list');
    const newlist = document.createElement("li");
    newlist.classList.add("newlist");
    newlist.innerHTML = `
      <input id="${todo.index}" class="check" type="checkbox"/>
      <span class="text">${todo.description}</span>
      <button class="delete"><img src="../images/dots.svg"></button>
    `;
    list.append(newlist);
}


 const completed = document.querySelector('.newlist');
 completed.addEventListener('click', event => {
    completed.classList.toggle('complete');
 }
)
