const {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
} = require("./index.js");

// Add a new todo
createTodoSync({ id: 1, title: "Learn Node.js", completed: false });
createTodoSync({ id: 2, title: "Finish Homework", completed: false });

// Get all todos
console.log("All Todos:", getTodosSync());

// Get a single todo
console.log("Todo with id 1:", getTodoSync(1));

// Update a todo
updateTodoSync(2, { completed: true });
console.log("After updating id 2:", getTodosSync());

// Delete a todo
deleteTodoSync(1);
console.log("After deleting id 1:", getTodosSync());
