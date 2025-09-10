// en src/components/Login.jsx
import { useState } from 'react';
import axiosInstance  from '../api/axios';

const Login = ({ setToken }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Llamada a la API para login
      const response = await axiosInstance.post('/users/login', { 
        email, 
        password });
      // Usamos la función del padre para guardar el token
      setToken(response.data.token); 
    } catch (err) {
      setError('Credenciales inválidas:' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;