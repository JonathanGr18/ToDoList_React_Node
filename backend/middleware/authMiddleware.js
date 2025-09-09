const jwt = require('jsonwebtoken');
const pool = require('../config/db.js');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Obtener y verificar el token
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 2. Obtener el usuario y adjuntarlo a la petición
      const userResult = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [decoded.id]);
      req.user = userResult.rows[0];

      // 3. Si el usuario del token ya no existe en la BD
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado, el usuario ya no existe' });
      }

      return next(); // Todo correcto, continuar al controlador

    } catch (error) {
      return res.status(401).json({ message: 'No autorizado, token inválido' });
    }
  }

  // Si el 'if' inicial falla, significa que no se envió un token con el formato correcto
  return res.status(401).json({ message: 'No autorizado, no hay token o tiene el formato incorrecto' });
};

module.exports = { protect };