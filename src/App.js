import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

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

      </header>
    </div>
  );
}

export default App;
