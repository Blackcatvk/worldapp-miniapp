import React, { useState, useEffect } from 'react';  // Para manejar estados y efectos en React
import { IDKitWidget } from '@worldcoin/idkit';
import { db } from './firebase';  // Asegúrate de tener la configuración de Firebase en el archivo firebase.js
import { doc, getDoc, setDoc } from 'firebase/firestore';  // Para interactuar con Firestore de Firebase
import './App.css';
import logo from './logo.svg'; // Importamos el logo como en el template original

function App() {
  const [authCode, setAuthCode] = useState(null);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Capturamos el parámetro "code" de la URL después de la redirección
  useEffect(() => {
    // Extraemos el código de autorización de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Este es el código de autorización
    const token = urlParams.get('token'); // Si el token está en la URL (si lo tienes)

    if (code) {
      setAuthCode(code); // Guardamos el código de autorización
      // También puedes almacenar el token si lo recibes en la URL
      setToken(token);
      console.log("Código de autorización:", code);
      console.log("Token:", token);
    }
  }, []);

  const handleVerify = async (proof) => {
    const nullifier = proof.nullifier_hash;
    if (!nullifier) {
      alert("Verificación fallida");
      return;
    }

    try {
      const userRef = doc(db, "usuarios", nullifier);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          monedasWCatCon: 100,
          terrenos: [],
          creado: new Date().toISOString()
        });
        alert("✅ Perfil creado con 100 monedas WLD");
      } else {
        alert("👋 Bienvenido de nuevo. Ya tienes un perfil.");
      }
    } catch (error) {
      console.error("❌ Error al guardar datos:", error);
      alert("Error al guardar datos del usuario");
    }
  };

  const handleSuccess = (result) => {
    console.log("✅ Verificación exitosa:", result);
  };

  return (
    <div className="App">
      <h1>Bienvenido a WorldCat Conquest</h1>
      <button onClick={() => console.log('Clicks!')}>
        Clicks: {authCode ? "Código capturado" : "Esperando autorización..."}
      </button>
      <p>Obtén terrenos y gana monedas WLD</p>

      <IDKitWidget
        app_id="app_9107e5e1f88c0e8e568869ccb2fa3fed"
        action="worldapp_login"
        signal="ingresoapp"
        handleVerify={handleVerify}
        onSuccess={handleSuccess}
        onError={(err) => {
          console.error("❌ Error en World ID:", err);
          alert("Error con la verificación");
        }}
      >
        {({ open }) => <button onClick={open}>Verificar con World ID</button>}
      </IDKitWidget>

      {authCode && <div>¡Código de autorización recibido: {authCode}</div>}
    </div>
  );
}

export default App;