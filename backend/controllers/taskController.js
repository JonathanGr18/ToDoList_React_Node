const pool = require('../config/db.js');

//Obtener todas las tareas
const getAllTasks = async (req,res)=> {
   try {
      const resultado = await pool.query('SELECT * FROM tasks');
      if (result.rows.length === 0) {
         return res.status(404).json({message: 'Sin tareas'})
      }
      res.json(resultado.rows);
   } catch (error) {
      console.error('Error al obtener las tareas', error);
      res.status(500).json({error: 'Error interno del servidor'});
   }
};

const createTask = async (req, res) =>{
   const {title, due_date} = req.body;
   
   if (!title || !due_date) {
      return res.status(400).json({ message: 'El título y la fecha de vencimiento son requeridos' });
   }

   try{
      const result = await pool.query('INSERT INTO tasks (title, due_date) VALUES ($1, $2) RETURNING *', [title, due_date]);
      res.status(201).json(result.rows[0])
   } catch(error){
      console.error('Error al agregar la tarea', error);
      res. status(500).json({error: 'Error interno del servidor'})
   }
}

const updateTask = async (req,res)=>{
   const {id} = req.params; //Id de la URL
   const {title, is_complete} = req.body //Datos por actualizar
   try {
      const result = await pool.query('UPDATE tasks SET title = $1, is_complete = $2 WHERE id = $3 RETURNING *', [title, is_complete, id]);

      if (result.rows.length === 0) {
         return res.status(404).json({message: 'Tarea no encontrada'})
      }
      res.json(result.rows[0]);
   } catch (error) {
      console.error('Error al actualizar la tarea', error);
      res.status(500).json({error: 'Error interno del servidor'});
   }
}

const deleteTask = async (req,res)=>{
   const {id} = req.params; //Id de la URL
   try {
      const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

      if (result.rowCount === 0) {
         return res.status(404).json({message: 'Tarea no encontrada'})
      }
      res.status(200).json({message: 'Tarea eliminada correctamente'});
   } catch (error) {
      console.error('Error al eliminar la tarea', error);
      res.status(500).json({error: 'Error interno del servidor'});
   }
}

module.exports = {
   getAllTasks,
   createTask,
   updateTask,
   deleteTask,
}