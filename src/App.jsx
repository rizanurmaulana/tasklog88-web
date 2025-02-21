import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from './contexts/theme-context';

import Layout from './routes/layout';
import DashboardPage from './routes/dashboard/page';
import ProjectsPage from './routes/projects/ProjectsPage';
import AddProject from './routes/projects/AddProject';
import EditProject from './routes/projects/EditProject';
import TaskPage from './routes/task/TaskPage';
import AddTask from './routes/task/AddTask';
import EditTask from './routes/task/EditTask';
import Login from './routes/auth/Login';
import UserPage from './routes/user/UserPage';
import AddUser from './routes/user/AddUser';
import EditUser from './routes/user/EditUser';
import TaskPageById from './routes/task/TaskPageById';
import PengerjaanPage from './routes/pengerjaan/PengerjaanPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    // Routing untuk Peserta
    {
      path: '/peserta',
      element: <Layout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'projects', element: <ProjectsPage /> },
        { path: 'projects/edit', element: <EditProject /> },
        { path: 'task', element: <TaskPageById /> },
        { path: 'task/edit', element: <EditTask /> },
        { path: 'task/pengerjaan', element: <PengerjaanPage /> },
      ],
    },
    {
      path: '/pendamping_lapangan',
      element: <Layout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'projects', element: <ProjectsPage /> },
        { path: 'projects/add', element: <AddProject /> },
        { path: 'projects/edit/:id', element: <EditProject /> },
        { path: 'task', element: <TaskPage /> },
        { path: 'task/add', element: <AddTask /> },
        { path: 'task/edit/:id', element: <EditTask /> },
        { path: 'task/:id', element: <PengerjaanPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'user/add', element: <AddUser /> },
        { path: 'user/edit/:id', element: <EditUser /> },
      ],
    },
    // Routing untuk Pendamping Kampus
    {
      path: '/pendamping_kampus',
      element: <Layout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'projects', element: <ProjectsPage /> },
        { path: 'task', element: <TaskPage /> },
        { path: 'user', element: <UserPage /> },
      ],
    },
  ]);

  return (
    <ThemeProvider storageKey='theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
