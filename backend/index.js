const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());  // To handle JSON request bodies

// Sample tasks data
let tasks = [
  { id: 1, task: "Learn React" },
  { id: 2, task: "Learn Node.js" },
];

// POST route to add a new task
app.post("/tasks", (req, res) => {
  const { task } = req.body;  // Get the task from the request body
  console.log(tasks)
  // Check if task is provided
  if (!task) {
    return res.status(400).json({ error: "Task is required!" });
  }

  // Add new task to the array
  const newTask = {
    id: tasks.length + 1,
    task: task,
  };
  tasks.push(newTask);

  // Return the updated list of tasks
  res.status(201).json(newTask);
});

// GET route to retrieve all tasks
app.get("/tasks", (req, res) => {
  // Send all tasks as a response
 
  res.json(tasks);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
