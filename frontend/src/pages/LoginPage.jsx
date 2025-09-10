import Login from '../components/Login';
import { Link } from 'react-router-dom';

const LoginPage = ({ setToken }) => {
  return (
    <div>
      <Login setToken={setToken} />
      <p>
        ¿ No tienes una cuenta ? <Link to="/register">Registrate</Link>
      </p>
    </div>
  );
};

export default LoginPage;