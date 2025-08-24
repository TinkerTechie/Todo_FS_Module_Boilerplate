const fs = require("fs");
const file = "db.txt";

function readTodos() {
  if (!fs.existsSync(file)) return [];
  const data = fs.readFileSync(file, "utf-8") || "[]";
  return JSON.parse(data);
}

function writeTodos(todos) {
  fs.writeFileSync(file, JSON.stringify(todos, null, 2));
}

const getTodosSync = () => {
  return readTodos();
};

const getTodoSync = (id) => {
  const todos = readTodos();
  return todos.find((t) => t.id === id);
};

const createTodoSync = (todo) => {
  const todos = readTodos();
  const newTodo = {
    id: Date.now(),
    ...todo,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todos.push(newTodo);
  writeTodos(todos);
  return newTodo;
};

const updateTodoSync = (id, updates) => {
  const todos = readTodos();
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  todos[idx] = { ...todos[idx], ...updates, updatedAt: new Date() };
  writeTodos(todos);
  return todos[idx];
};

const deleteTodoSync = (id) => {
  let todos = readTodos();
  todos = todos.filter((t) => t.id !== id);
  writeTodos(todos);
  return true;
};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};
