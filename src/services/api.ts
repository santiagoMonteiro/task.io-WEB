import axios, { AxiosError } from 'axios'
import { ProjectType } from '../pages/ProjectsPage'

type LoginProps = {
  email: string
  password: string
}

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export function logout() {
  localStorage.removeItem('Bearer')
  return (window.location.href = '/login')
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
    .catch((error) => {
      console.log(error)
    })

  return data
}

export async function updateProjectApiRoute({
  id,
  name,
  description,
  delivery_date,
}: ProjectType) {
  console.log(delivery_date)
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
    .catch((error) => {
      console.log(error)
    })

  return data
}
