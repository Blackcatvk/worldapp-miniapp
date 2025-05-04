import React, { useState } from 'react';
import { IDKitWidget } from '@worldcoin/idkit';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

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
      <button onClick={() => setCount(count + 1)}>
        Clicks: {count}
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
    </div>
  );
}

export default App;