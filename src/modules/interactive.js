/* eslint-disable import/no-cycle */
import { updateTodos } from '../index.js';

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

export { removeCompleted, toggleComplete };