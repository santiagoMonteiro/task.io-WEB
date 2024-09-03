import { useEffect, useState } from 'react'
import { Project } from '../../components/Project'
import styles from './styles.module.scss'
import { fetchProjectsApiRoute } from '../../services/api'

export type ProjectType = {
  id: string
  name: string
  delivery_date: string
  created_at: string
  description: string
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([])

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

  useEffect(() => {
    fetchProjectsApiRoute().then((data) => {
      console.log(data)
      setProjects(data)
    })
  }, [])

  return (
    <main className={styles.container}>
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
  )
}
