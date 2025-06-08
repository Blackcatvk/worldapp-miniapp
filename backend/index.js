const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
  origin: 'https://worldapp-miniapp.vercel.app' // ← tu frontend
}));
app.use(express.json());

let tasks = [];

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});