const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // Permite recibir JSON en el body

// Ruta para agregar tareas
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  console.log('Nueva tarea:', title);
  // Aquí podrías guardar la tarea en una base de datos, etc.
  res.status(201).json({ message: 'Tarea creada' });
});

// Ruta simple de prueba
app.get('/', (req, res) => {
  res.send('API activa');
});

// INDISPENSABLE para que Render funcione
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});