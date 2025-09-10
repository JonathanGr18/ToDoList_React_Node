// en src/components/TaskList.jsx
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/tasks');
        setTasks(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, []); // Este efecto se ejecuta cada vez que el token cambia

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Mis Tareas</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes tareas pendientes. ¡Añade una!</p>
      )}
    </div>
  );
};

export default TaskList;