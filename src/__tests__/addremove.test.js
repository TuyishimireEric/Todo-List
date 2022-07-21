/**
 * @jest-environment jsdom
 */
document.body.innerHTML = `
    <div class="row">
            <ul class="todo-list">
            </ul>
    </div> `;

let Array;
let rest;

function newTodo(e) {
  const newTask = e;
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');

  const newTodo = {
    description: newTask,
    completed: false,
    id: todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : todos.length + 1,
  };
  const updatedTodos = [...todos, newTodo];
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  Array = updatedTodos.length;
}

const removeTodo = (targetIndex) => {
  const todoListArr = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateList = todoListArr.filter((todo) => todo.id !== parseInt(targetIndex, 10));
  rest = updateList.length;
};

describe('By adding item in todos', () => {
  // action
  newTodo('finish project');
  newTodo('submit project');
  newTodo('done');
  test('check if newTodo is a function', () => {
    expect(typeof newTodo).toBe('function');
  });
  test('test if newTodo is adding', () => {
    expect(Array).toBe(3);
  });
});

describe('By removing item in todos', () => {
  // Action with index 1
  removeTodo(1);
  // Assert
  test('check if removeTodo is a function', () => {
    expect(typeof removeTodo).toBe('function');
  });
  test('test if todos are removed from array', () => {
    expect(rest).toBe(2);
  });
});
