/* eslint-disable no-use-before-define */
import './style.css';

const newTodoForm = document.querySelector('#new-todo-form');
const todoList = document.querySelector('.todo-list');
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function init() {
  newTodoForm.addEventListener('submit', newTodo);
  updateList();
}

function updateTodos(newTodos) {
  todos = newTodos;
  localStorage.setItem('todos', JSON.stringify(todos));

  updateList();
}

function updateList() {
  const description = todos.map((todo) => `
            <li class="card todo-list-item ${todo.complete ? 'completed' : ''}" data-id="${todo.id}">
              <input type="checkbox" ${todo.complete ? 'checked' : ''} class="checkbox"/>
              <input type="text"value="${todo.description}" class="inputtext"/>
              <button type="button">🗑</button>
            </li>
          `).join('');

  todoList.innerHTML = description;

  const deleteButtons = todoList.querySelectorAll('.todo-list-item button');

  deleteButtons.forEach((button) => button.addEventListener('click', (event) => {
    const li = event.target.parentElement;
    removeTodo(li.id);
  }));

  const completedCheckboxes = todoList.querySelectorAll('.checkbox');
  completedCheckboxes.forEach((checkbox) => checkbox.addEventListener('click', toggleComplete));
}

function newTodo(e) {
  e.preventDefault();

  const newTodoText = this.querySelector('[name="new-todo-content"]');
  const description = newTodoText.value || '';

  if (description.length === 0) {
    return;
  }

  const newTodo = {
    description: newTodoText.value,
    completed: false,
    id: todos.length,
  };

  newTodoText.value = '';
  todos = [...todos, newTodo];
  localStorage.setItem('todos', JSON.stringify(todos));
  updateList();
}

const removeTodo = (targetIndex) => {
  const filterTodo = todos.filter((todo) => +todo.id !== +targetIndex);
  const newTodos = filterTodo.map((todo, id) => ({
    description: todo.description,
    completed: todo.completed,
    id,
  }));
  localStorage.setItem('todos', JSON.stringify(newTodos));
  todos = newTodos;
  updateList();
};

function toggleComplete() {
  if (!this.parentNode && !this.parentNode.dataset && !this.parentNode.dataset.id) {
    return;
  }

  const id = +this.parentNode.dataset.id;
  const newTodos = todos.slice();
  newTodos[id] = { ...newTodos[id], complete: this.checked };

  updateTodos(newTodos);
}

init();

newTodoForm.addEventListener('submit').newTodo();
