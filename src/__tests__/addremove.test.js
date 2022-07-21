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
let updated;
let completed;

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
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  updateTodos(updateTodoList);
}

const removeCompleted = () => {
  const todoListArr = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateList = todoListArr.filter((todo) => todo.completed !== true);
  updateTodos(updateList);
};

describe('By removing item in todos', () => {
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
  toggleComplete(1);
  // Assert
  test('check if toggleComplete is a function', () => {
    expect(typeof toggleComplete).toBe('function');
  });
  test('test if todos are completed from array', () => {
    expect(updated).toBe(true);
  });
});
