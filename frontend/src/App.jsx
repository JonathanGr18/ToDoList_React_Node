import { useState } from 'react';
import Login from './components/login.jsx';

function App() {
  // Estado para el token
  const [token, setToken] = useState(localStorage.getItem('token'));

    // Guardar token en localStorage
  const handleSetToken = (newToken) =>{
    if (newToken){
      localStorage.setItem('token', newToken);
    } else{
      localStorage.removeItem('token');
    }
    setToken(newToken);
  }

  // Cerrar sesion, token a null
  const handleLogout = () => {
    handleSetToken(null);
  }

  return(
    <div>
      <h1>Mi aplicacion de tareas</h1>
      {token ? (
        // Si hay token muestra contenido y un boton de logout
        <div>
          <p>Bienvenido has iniciado sesion.</p>
          <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
      ) : (
        // Si no hay token muestra el login
        <Login setToken={handleSetToken} />
      )}
    </div>
  );

}

export default App;