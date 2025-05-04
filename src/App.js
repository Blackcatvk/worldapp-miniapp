import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './App.css';
import { IDKitWidget } from '@worldcoin/idkit';

function App() {
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // Capturamos el parámetro "code" de la URL después de la redirección
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      setAuthCode(code); // Guardamos el código de autorización
      console.log("Código de autorización:", code);

      // Intercambiamos el código por el token de acceso utilizando la URL del backend desde las variables de entorno
      fetch(`${process.env.REACT_APP_API_URL}`, {  // Usamos la URL definida en el archivo .env
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setAccessToken(data.access_token); // Guardamos el token de acceso
            console.log("Token de acceso recibido:", data.access_token);
          } else {
            alert("Error al obtener el token de acceso");
          }
        })
        .catch((error) => {
          console.error("Error al intercambiar el código por el token:", error);
          alert("Error al intercambiar el código por el token");
        });
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

      {accessToken && <div>¡Token de acceso recibido! Puedes acceder a los datos del usuario.</div>}
    </div>
  );
}

export default App;