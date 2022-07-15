/* eslint-disable no-use-before-define */
import './style.css';

const newTodoForm = document.querySelector('#new-todo-form');
const todoList = document.querySelector('.todo-list');
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function init() {
  newTodoForm.addEventListener('submit', newTodo);
  updateList();
}

function* index() {
  let i = todos.length;

  while (true) {
    yield i;

    i += 1;
  }
}

function createTodo({ description = '', completed = false } = {}) {
  const id = index().next().value;

  return {
    id,
    description,
    complete: completed,
  };
}

function newTodo(e) {
  e.preventDefault();

  const newTodoContentInput = this.querySelector('[name="new-todo-content"]');
  const description = newTodoContentInput.value || '';

  if (description.length === 0) {
    return;
  }

  const newTodo = createTodo({ description });

  const newTodos = [...todos, newTodo];

  newTodoContentInput.value = '';
  updateTodos(newTodos);
}

function removeTodo(e) {
  e.preventDefault();
  if (!this.parentNode && !this.parentNode.dataset && !this.parentNode.dataset.id) {
    return;
  }

  const id = +this.parentNode.dataset.id;
  const newTodos = todos.filter((todo) => todo.id !== id);

  updateTodos(newTodos);
}

function toggleComplete() {
  if (!this.parentNode && !this.parentNode.dataset && !this.parentNode.dataset.id) {
    return;
  }

  const id = +this.parentNode.dataset.id;
  const newTodos = todos.slice();
  newTodos[id] = { ...newTodos[id], complete: this.checked };

  updateTodos(newTodos);
}

function updateTodos(newTodos) {
  todos = newTodos;
  localStorage.setItem('todos', JSON.stringify(todos));

  updateList();
}

function updateList() {
  const description = todos.map((todo) => `
            <li class="card todo-list-item ${todo.complete ? 'completed' : ''}" data-id="${todo.id}">
              <input type="checkbox" ${todo.complete ? 'checked' : ''} />
              <p>${todo.description}</p>
              <button type="button">🗑</button>
            </li>
          `).join('');

  todoList.innerHTML = description;

  const deleteButtons = todoList.querySelectorAll('.todo-list-item button');
  deleteButtons.forEach((button) => button.addEventListener('click', removeTodo));

  const completedCheckboxes = todoList.querySelectorAll('.todo-list-item input[type="checkbox"]');
  completedCheckboxes.forEach((checkbox) => checkbox.addEventListener('click', toggleComplete));
}

init();
