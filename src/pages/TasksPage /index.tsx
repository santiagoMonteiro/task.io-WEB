import { useEffect, useState } from 'react'
import { Task } from '../../components/Task'
import styles from './styles.module.scss'
import {
  createTaskApiRoute,
  fetchTasksApiRoute,
  getProjectApiRoute,
  logout,
} from '../../services/api'

import { useNavigate, useParams } from 'react-router-dom'
import { TaskToCreate, TaskToCreateType } from '../../components/TaskToCreate'
import { ProjectType } from '../ProjectsPage'

export type TaskType = {
  id: string
  name: string
  status: string
  created_at: string
  description: string
  project_id: string
}

export function TasksPage() {
  const navigate = useNavigate()
  const { projectId } = useParams()

  const [tasks, setTasks] = useState<TaskType[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const [project, setProject] = useState<ProjectType>({} as ProjectType)

  function deleteTask(id: string) {
    const newTasks = tasks.filter((p) => p.id !== id)
    setTasks(newTasks)
  }

  function updateTask(props: TaskType) {
    const taskIndex = tasks.findIndex((p) => p.id === props.id)
    const newTasks = [...tasks]
    newTasks[taskIndex] = { ...props }
    setTasks(newTasks)
  }

  async function createTask(taskToCreate: TaskToCreateType) {
    const { id, created_at, status, description, name, project_id }: TaskType =
      await createTaskApiRoute(taskToCreate)

    setTasks([
      {
        created_at: created_at,
        status,
        description: description,
        name: name,
        project_id,
        id,
      },
      ...tasks,
    ])

    giveUpCreating()
  }

  function giveUpCreating() {
    setIsCreating(false)
  }

  useEffect(() => {
    fetchTasksApiRoute(projectId!).then((data) => {
      console.log(data)
      setTasks(data)
    })
    getProjectApiRoute(projectId!).then((data) => {
      setProject(data)
    })
  }, [])

  return (
    <>
      <header className={styles.headerContainer}>
        <h1>
          Task<span>.</span>io
        </h1>
        <div>
          <button onClick={() => setIsCreating(true)}>Criar Nova Tarefa</button>
          <button
            onClick={() => {
              navigate('/projects')
            }}
          >
            Projetos
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
        <h2>Tarefas do Projeto: {project.name ?? ''}</h2>
      </div>
      <main className={styles.container}>
        {isCreating ? (
          <TaskToCreate
            projectId={projectId!}
            createTask={createTask}
            giveUpCreating={giveUpCreating}
          />
        ) : (
          <></>
        )}
        {tasks.map((p) => {
          return (
            <Task
              id={p.id}
              key={p.id}
              name={p.name}
              createdAt={p.created_at}
              status={p.status}
              description={p.description}
              projectId={p.project_id}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          )
        })}
      </main>
    </>
  )
}
