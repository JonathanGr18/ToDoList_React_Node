const pool = require('../config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resgisterUser = async (req,res) =>{
   const {name, email, password} = req.body

   if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
   }

   try {
      // Hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //Query
      const newUser = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email', [name, email, hashedPassword]);

      res.status(201).json(newUser.rows[0]);
   } catch (error) {
      console.error('Error al registrar usuario', error);
      res.status(500).json({error: 'Error interno del servidor'});
   }
}

const loginUser = async (req, res)=>{
   const {email, password} = req.body;

   try {
      // Buscar usuario con el email
      const userResult = await pool.query('SELECT * FROM users Where email = $1', [email]);
      if (userResult.rows.length === 0){
         return res.status(400).json({message : 'Credenciales invalidas'})
      }
      const user = userResult.rows[0]

      // Comparar las contraseñas
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect){
         return res.status(400).json({message: 'Cuenta invalida'})
      }

      //Si todo es correcto, generar token
      const payload = {id: user.id, name: user.name}
      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
      res.status(200).json({token})
   } catch (error) {
      console.error('Error al inciar sesion', error);
      res.status(500).json({error: 'Error del servidor'})
   }
}

 module.exports = {
   resgisterUser,
   loginUser
}