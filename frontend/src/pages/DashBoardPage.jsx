import TaskList from '../components/TaskList';

const DashboardPage = ({ handleLogout }) => {
  return (
    <div>
      <button onClick={handleLogout}>Cerrar Sesion</button>
      <TaskList />
    </div>
  );
};

export default DashboardPage;