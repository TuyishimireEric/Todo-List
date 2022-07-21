/**
 * @jest-environment jsdom
 */
/* eslint-disable no-unused-vars */
document.body.innerHTML = `
    <div class="row">
            <ul class="todo-list">
            </ul>
    </div> `;

let Array;
let rest;
let updated;
let completed;
let unchecked;

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
  newTodo('start part 2');
  test('check if newTodo is a function', () => {
    expect(typeof newTodo).toBe('function');
  });
  test('test if newTodo is adding', () => {
    expect(Array).toBe(4);
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
    expect(rest).toBe(3);
  });
});

// update todo-list part 2

function updateInputText(id, newText) {
  const todoListArray = JSON.parse(localStorage.getItem('todos') || '[]');
  // eslint-disable-next-line no-unused-vars
  const updateTodoList = todoListArray.map((todo) => {
    if (todo.id === parseInt(id, 10)) {
      updated = newText;
      return { ...todo, description: newText };
    }
    return todo;
  });
}

function toggleComplete(id) {
  const todoListArray = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateTodoList = todoListArray.map((todo) => {
    if (todo.id === parseInt(id, 10)) {
      completed = !todo.completed;
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
}

const removeCompleted = () => {
  const todoListArr = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateList = todoListArr.filter((todo) => todo.completed !== true);
  unchecked = updateList.length;
};

describe('By updating in todos description', () => {
  // Action with index 1
  updateInputText(1, 'updated text');
  // Assert
  test('check if removeTodo is a function', () => {
    expect(typeof updateInputText).toBe('function');
  });
  test('test if todos are removed from array', () => {
    expect(updated).toBe('updated text');
  });
});

describe('By checking the complete status of todos', () => {
  // Action with index 1
  toggleComplete(3);
  // Assert
  test('check if toggleComplete is a function', () => {
    expect(typeof toggleComplete).toBe('function');
  });
  test('test if todos are completed from array', () => {
    expect(completed).toBe(true);
  });
});

describe('By removing all completed item in todos', () => {
  // Action with index 1
  removeCompleted();
  // Assert
  test('check if removeTodo is a function', () => {
    expect(typeof removeCompleted).toBe('function');
  });
  test('test if todos are removed from array', () => {
    expect(unchecked).toBe(4);
  });
});