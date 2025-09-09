const express = require('express');
require('dotenv').config();
const app = express();

// Midleware
app.use(express.json());

// Ruta
const taskRoute = require('./routes/taskRoutes.js');
const userRoute = require('./routes/userRoutes.js');

// Endpoint
app.use('/api/tasks', taskRoute);
app.use('/api/users', userRoute);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
   console.log('Server connected on port: ', PORT)
})