const fs = require("fs");
const path = require("path");

const DB_FILE_PATH = path.join(__dirname, "db.txt");

// Helper: read db file as raw text
function readDbFile() {
  if (!fs.existsSync(DB_FILE_PATH)) return "";
  return fs.readFileSync(DB_FILE_PATH, "utf-8");
}

// Helper: parse db.txt into an array of todos
function parseTodos(text) {
  if (!text.trim()) return [];
  const formatted = `[${text.trim().split("\n}\n{").join("},{")}]`;
  return JSON.parse(formatted);
}

// Helper: convert todos array back to db.txt format
function stringifyTodos(todos) {
  return todos.map(todo => JSON.stringify(todo, null, 2)).join("\n") + "\n";
}

// ✅ Create
const createTodoSync = (title) => {
  const text = readDbFile();
  const todos = parseTodos(text);

  const newTodo = {
    id: Date.now(),
    title,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.push(newTodo);

  fs.writeFileSync(DB_FILE_PATH, stringifyTodos(todos));
  return newTodo;
};

// ✅ Read all (raw text)
const getTodosSync = () => {
  return readDbFile(); // return db.txt content as is
};

// ✅ Read one (stringified JSON)
const getTodoSync = (id) => {
  const text = readDbFile();
  const todos = parseTodos(text);
  const todo = todos.find((t) => t.id === id);
  return todo ? JSON.stringify(todo, null, 2) : null;
};

// ✅ Update
const updateTodoSync = (id, updates) => {
  const text = readDbFile();
  const todos = parseTodos(text);

  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  todos[idx] = {
    ...todos[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(DB_FILE_PATH, stringifyTodos(todos));
  return todos[idx];
};

// ✅ Delete
const deleteTodoSync = (id) => {
  const text = readDbFile();
  let todos = parseTodos(text);

  todos = todos.filter((t) => t.id !== id);

  fs.writeFileSync(DB_FILE_PATH, stringifyTodos(todos));
  return true;
};

module.exports = {
  createTodoSync,
  getTodosSync,
  getTodoSync,
  updateTodoSync,
  deleteTodoSync,
};
