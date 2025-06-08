const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // <-- Necesario para recibir JSON

// Tu ruta POST
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  console.log('Nueva tarea:', title);
  // Guardar la tarea...
  res.status(201).json({ message: 'Tarea creada' });
});