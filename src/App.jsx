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

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: 'projects',
          element: <ProjectsPage />,
        },
        {
          path: 'projects/add',
          element: <AddProject />,
        },
        {
          path: 'projects/edit',
          element: <EditProject />,
        },
        {
          path: 'task',
          element: <TaskPage />,
        },
        {
          path: 'task/add',
          element: <AddTask />,
        },
        {
          path: 'task/edit',
          element: <EditTask />,
        },
        
        {
          path: 'users',
          element: <h1 className='title'>Users</h1>,
        },
        {
          path: 'new-customer',
          element: <h1 className='title'>New Customer</h1>,
        },
        {
          path: 'verified-customers',
          element: <h1 className='title'>Verified Customers</h1>,
        },
        {
          path: 'products',
          element: <h1 className='title'>Products</h1>,
        },
        {
          path: 'new-product',
          element: <h1 className='title'>New Product</h1>,
        },
        {
          path: 'inventory',
          element: <h1 className='title'>Inventory</h1>,
        },
        {
          path: 'settings',
          element: <h1 className='title'>Settings</h1>,
        },
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
