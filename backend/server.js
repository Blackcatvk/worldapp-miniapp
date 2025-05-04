const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Endpoint para recibir el código y obtener el token de acceso
app.post('/get-access-token', async (req, res) => {
  const { code } = req.body; // El código recibido del frontend

  // Datos que vamos a enviar a Worldcoin
  const data = {
    client_id: 'tu-client-id', // Tu client_id de Worldcoin
    client_secret: 'tu-client-secret', // Tu client_secret de Worldcoin
    code: code, // El código de autorización recibido
    redirect_uri: 'tu-redirect-uri', // La URL de redirección configurada en Worldcoin
    grant_type: 'authorization_code', // Tipo de flujo de autorización
  };

  try {
    // Realizamos la solicitud a la API de Worldcoin para obtener el access_token
    const response = await axios.post('https://api.worldcoin.org/oauth/token', data);
    const { access_token, refresh_token } = response.data;

    // Devolvemos el access_token y refresh_token al frontend
    res.json({ access_token, refresh_token });
  } catch (error) {
    console.error('Error al obtener el token:', error);
    res.status(500).json({ error: 'Error al obtener el token de acceso' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});