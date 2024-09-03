import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProjectsPage } from './pages/ProjectsPage'
import { TasksPage } from './pages/TasksPage '
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { verifyAuth } from './services/api'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/login'} />,
  },
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
    element: verifyAuth() ? <ProjectsPage /> : <Navigate to={'/login'} />,
  },
  {
    path: '/tasks/:projectId',
    element: verifyAuth() ? <TasksPage /> : <Navigate to={'/login'} />,
  },
])
