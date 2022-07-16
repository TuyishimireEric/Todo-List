/* eslint-disable no-use-before-define */
import { todos, todoList } from '../index.js';

const updateList = () => {
  const content = todos.map((todo) => `
              <li class="card todo-list-item ${todo.complete ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" ${todo.complete ? 'checked' : ''} />
                <p>${todo.content}</p>
                <button type="button">🗑</button>
              </li>
            `).join('');

  todoList.innerHTML = content;

  const deleteButtons = todoList.querySelectorAll('.todo-list-item button');
  deleteButtons.forEach((button) => button.addEventListener('click', removeTodo));

  const completedCheckboxes = todoList.querySelectorAll('.todo-list-item input[type="checkbox"]');
  completedCheckboxes.forEach((checkbox) => checkbox.addEventListener('click', toggleComplete));
};

const updateTodos = (newTodos) => {
  todos = newTodos;
  localStorage.setItem('todos', JSON.stringify(todos));

  updateList();
};

const removeTodo = (e) => {
  e.preventDefault();
  if (!this.parentNode && !this.parentNode.dataset && !this.parentNode.dataset.id) {
    return;
  }

  const id = +this.parentNode.dataset.id;
  const newTodos = todos.filter((todo) => todo.id !== id);

  updateTodos(newTodos);
};

const toggleComplete = () => {
  if (!this.parentNode && !this.parentNode.dataset && !this.parentNode.dataset.id) {
    return;
  }

  const id = +this.parentNode.dataset.id;
  const newTodos = todos.slice();
  newTodos[id] = { ...newTodos[id], complete: this.checked };

  updateTodos(newTodos);
};

export { updateList, updateTodos, toggleComplete };