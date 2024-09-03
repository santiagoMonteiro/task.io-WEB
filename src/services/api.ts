import axios, { AxiosError } from 'axios'
import { ProjectType } from '../pages/ProjectsPage'
import { ProjectToCreateType } from '../components/ProjectToCreate'
import { TaskType } from '../pages/TasksPage '
import { TaskToCreateType } from '../components/TaskToCreate'

type LoginProps = {
  email: string
  password: string
}

type RegisterProps = {
  name: string
  email: string
  password: string
}

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export function logout() {
  localStorage.removeItem('Bearer')
  // return (window.location.href = '/login')
}

export function toRegister() {
  return (window.location.href = '/register')
}

export function toLogin() {
  return (window.location.href = '/login')
}

export function verifyAuth() {
  return !!localStorage.getItem('Bearer')
}

export function getJWT() {
  return localStorage.getItem('Bearer')
}

export function login({ email, password }: LoginProps) {
  api
    .post('/sessions', {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem('Bearer', response.data.token)
      window.location.href = '/projects'
    })
    .catch((error: AxiosError) => {
      console.log(error)
    })
}

export function register({ name, email, password }: RegisterProps) {
  api
    .post('/users', {
      name,
      email,
      password,
    })
    .then((response) => {
      console.log(response)
      // localStorage.setItem('Bearer', response.data.token)
      window.location.href = '/login'
    })
    .catch((error: AxiosError) => {
      console.log(error)
    })
}

export async function profile() {
  const data = await api
    .get('/me', {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    })
    .then((response) => {
      console.log(response)
      return response.data.user
    })
    .catch((error: AxiosError) => {
      console.log(error)
    })
  return data
}

export async function fetchProjectsApiRoute() {
  const data = await api
    .get('/projects', {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    })
    .then((response) => {
      return response.data.projects
    })
    .catch((error: AxiosError) => {
      if (error.status === 401) {
        logout()
      }
    })

  return data
}

export async function getProjectApiRoute(projectId: string) {
  const data = await api
    .get(`/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    })
    .then((response) => {
      return response.data.project
    })
    .catch((error: AxiosError) => {
      if (error.status === 401) {
        logout()
      }
    })

  return data
}

export async function deleteProjectApiRoute(projectId: string) {
  const data = await api
    .delete(`/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    })
    .then((response) => {
      return response.data.project
    })
    .catch((error: AxiosError) => {
      if (error.status === 401) {
        logout()
      }
    })

  return data
}

export async function updateProjectApiRoute({
  id,
  name,
  description,
  delivery_date,
}: ProjectType) {
  const data = await api
    .put(
      '/project',
      {
        projectId: id,
        name: name.length === 0 ? null : name,
        deliveryDate: delivery_date.length === 0 ? null : delivery_date,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      }
    )
    .then((response) => {
      return response.data.project
    })
    .catch((error: AxiosError) => {
      if (error.status === 401) {
        logout()
      }
    })

  return data
}

export async function createProjectApiRoute({
  name,
  description,
  deliveryDate,
}: ProjectToCreateType) {
  if (name.length === 0 || deliveryDate.length === 0) {
    return
  }

  const data = await api
    .post(
      '/project',
      {
        name,
        deliveryDate,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      }
    )
    .then((response) => {
      return response.data.project
    })
    .catch((error: AxiosError) => {
      if (error.status === 401) {
        logout()
      }
    })

  return data
}

export async function fetchTasksApiRoute(projectId: string) {
  const data = await api
    .get(`/task/${projectId}`, {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    })
    .then((response) => {
      return response.data.tasks
    })
    .catch((error: AxiosError) => {
      if (error.status === 401) {
        logout()
      }
    })

  return data
}

export async function deleteTaskApiRoute(projectId: string) {
  const data = await api
    .delete(`/task/${projectId}`, {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    })
    .then((response) => {
      return response.data.task
    })
    .catch((error: AxiosError) => {
      if (error.status === 401) {
        logout()
      }
    })

  return data
}

export async function updateTaskApiRoute({
  id,
  project_id,
  name,
  description,
  status,
}: TaskType) {
  const data = await api
    .put(
      '/task',
      {
        taskId: id,
        projectId: project_id,
        name: name.length === 0 ? null : name,
        description,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      }
    )
    .then((response) => {
      return response.data.task
    })
    .catch((error: AxiosError) => {
      if (error.status === 401) {
        logout()
      }
    })

  return data
}

export async function createTaskApiRoute({
  name,
  description,
  status,
  projectId,
}: TaskToCreateType) {
  if (name.length === 0) {
    return
  }

  const data = await api
    .post(
      '/task',
      {
        name,
        description,
        status,
        projectId,
      },
      {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      }
    )
    .then((response) => {
      return response.data.project
    })
    .catch((error: AxiosError) => {
      if (error.status === 401) {
        logout()
      }
    })

  return data
}
