import { createBrowserRouter } from 'react-router-dom'
import { ProjectsPage } from './pages/ProjectsPage'
import { TasksPage } from './pages/TasksPage '
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/tasks',
    element: <TasksPage />,
  },
])
