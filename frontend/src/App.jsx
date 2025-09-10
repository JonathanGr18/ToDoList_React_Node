import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashBoardPage';

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

  return (
    <BrowserRouter>
      {/* Aquí irá el Navbar más adelante */}
      <Routes>
        <Route 
          path="/login" 
          element={!token ? <LoginPage setToken={handleSetToken} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={!token ? <RegisterPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/" 
          element={token ? <DashboardPage handleLogout={handleLogout} token={token} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );

}

export default App;