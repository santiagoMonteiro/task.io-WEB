import { useEffect, useState } from 'react'
import { Project } from '../../components/Project'
import styles from './styles.module.scss'
import {
  createProjectApiRoute,
  fetchProjectsApiRoute,
  logout,
  profile,
} from '../../services/api'
import {
  ProjectToCreate,
  ProjectToCreateType,
} from '../../components/ProjectToCreate'
import { useNavigate } from 'react-router-dom'

export type ProjectType = {
  id: string
  name: string
  delivery_date: string
  created_at: string
  description: string
}

type User = {
  id: string
  name: string
  email: string
  created_at: string
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [user, setUser] = useState<User>({} as User)

  const navigate = useNavigate()

  function deleteProject(id: string) {
    const newProjects = projects.filter((p) => p.id !== id)
    setProjects(newProjects)
  }

  function updateProject(props: ProjectType) {
    const projectIndex = projects.findIndex((p) => p.id === props.id)
    const newProjects = [...projects]
    newProjects[projectIndex] = { ...props }
    setProjects(newProjects)
  }

  async function createProject(projectToCreate: ProjectToCreateType) {
    if (projectToCreate.deliveryDate.length === 0) {
      return
    }

    const { id, created_at, delivery_date, description, name }: ProjectType =
      await createProjectApiRoute(projectToCreate)

    setProjects([
      {
        created_at: created_at,
        delivery_date,
        description: description,
        name: name,
        id,
      },
      ...projects,
    ])

    giveUpCreating()
  }

  function giveUpCreating() {
    setIsCreating(false)
  }

  useEffect(() => {
    fetchProjectsApiRoute().then((data) => {
      console.log(data)
      setProjects(data)
    })
    profile().then((data) => {
      console.log(data)
      setUser(data)
    })
  }, [])

  return (
    <>
      <header className={styles.headerContainer}>
        <h1>
          Task<span>.</span>io
        </h1>
        <div>
          <button onClick={() => setIsCreating(true)}>
            Criar Novo Projeto
          </button>
          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <div className={styles.titleContainer}>
        <h2>Projetos: {user.name ?? ''}</h2>
      </div>
      <main className={styles.container}>
        {isCreating ? (
          <ProjectToCreate
            createProject={createProject}
            giveUpCreating={giveUpCreating}
          />
        ) : (
          <></>
        )}
        {projects.map((p) => {
          return (
            <Project
              id={p.id}
              key={p.id}
              name={p.name}
              createdAt={p.created_at}
              deliveryDate={p.delivery_date}
              description={p.description}
              updateProject={updateProject}
              deleteProject={deleteProject}
            />
          )
        })}
      </main>
    </>
  )
}
