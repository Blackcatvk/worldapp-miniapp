const express = require('express');
const cors = require('cors');

const app = express();
const tasks = []; // 🔸 Memoria temporal

app.use(cors());
app.use(express.json());

// 🔹 POST: agregar tarea
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask = { id: Date.now(), title };
  tasks.push(newTask);
  console.log('Tarea agregada:', newTask);
  res.status(201).json(newTask);
});

// 🔹 GET: devolver todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 🔹 Ruta base para probar que el servidor responde
app.get('/', (req, res) => {
  res.send('API activa');
});

// 🔹 Escuchar el puerto asignado por Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});