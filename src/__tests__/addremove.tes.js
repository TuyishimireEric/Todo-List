/**
 * @jest-environment jsdom
 */
// import { newTodo } from '../index.js';

document.body.innerHTML = `
    <div class="row">
            <ul class="todo-list">
            </ul>
    </div> `;

let Array;
let rest;

function newTodo(e) {
  // e.preventDefault();
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');

  const newTodo = {
    description: e,
    completed: false,
    id: todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : todos.length + 1,
  };

  // document.getElementById('new-task').value = '';
  const updatedTodos = [...todos, newTodo];
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  Array = updatedTodos.length;
  // updateList();
}

const removeTodo = (targetIndex) => {
  const todoListArr = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateList = todoListArr.filter((todo) => todo.id !== parseInt(targetIndex, 10));
  rest = updateList.length;
};

describe('By adding item in todos', () => {
  newTodo('finish project');
  newTodo('submit project');
  const message = {
    check: 'check if newTodo is a function',
    test: 'test if newTodo is adding',
  };
  test(message.check, () => {
    expect(typeof newTodo).toBe('function');
  });
  test(message.test, () => {
    expect(Array).toBe(2);
  });
});

describe('By removing item in todos', () => {
  const message = {
    check: 'check if removeTodo is a function',
    test: 'test if todos are removed from array',
  };
  // Action with index 1
  removeTodo(1);
  // Assert
  test(message.check, () => {
    expect(typeof removeTodo).toBe('function');
  });
  test(message.test, () => {
    expect(rest).toBe(1);
  });
});