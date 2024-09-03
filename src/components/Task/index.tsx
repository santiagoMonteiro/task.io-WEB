import { useState } from 'react'
import styles from './styles.module.scss'
import { TaskType } from '../../pages/TasksPage '
import { FiEdit } from 'react-icons/fi'
import { FaRegCheckSquare, FaRegTrashAlt } from 'react-icons/fa'
import { deleteTaskApiRoute, updateTaskApiRoute } from '../../services/api'

interface TaskProps {
  id: string
  name: string
  status: string
  createdAt: string
  description: string
  projectId: string
  updateTask: (task: TaskType) => void
  deleteTask: (id: string) => void
}

export function Task({
  id,
  name,
  createdAt,
  description,
  status,
  projectId,
  updateTask,
  deleteTask,
}: TaskProps) {
  const [editableName, setEditableName] = useState(name)
  const [editableStatus, setEditableStatus] = useState(status)
  const [editableDescription, setEditableDescription] = useState(description)

  const [isEditing, setIsEditing] = useState(false)
  const [changed, setChanged] = useState(false)

  return (
    <div className={styles.outsideContainer}>
      <form
        action=''
        className={styles.container}
        onChange={() => setChanged(true)}
      >
        <input
          type='text'
          placeholder='Nome da Tarefa'
          required
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
          readOnly={!isEditing}
        ></input>
        <select
          value={editableStatus}
          onChange={(e) => setEditableStatus(e.target.value)}
          disabled={!isEditing}
        >
          <option value='TODO'>TODO</option>
          <option value='DOING'>DOING</option>
          <option value='DONE'>DONE</option>
        </select>
        {createdAt ? (
          <p>
            Criação:{' '}
            {new Intl.DateTimeFormat('pt-BR').format(new Date(createdAt))}
          </p>
        ) : (
          <></>
        )}
        <p>Descrição:</p>
        <textarea
          value={editableDescription}
          onChange={(e) => setEditableDescription(e.target.value)}
          readOnly={!isEditing}
        ></textarea>
      </form>
      <div className={styles.operationsContainer}>
        {isEditing ? (
          <button
            onClick={() => {
              setIsEditing(false)

              if (!changed) {
                return
              }

              const taskToUpdate = {
                id,
                name: editableName,
                status: editableStatus,
                created_at: createdAt,
                description: editableDescription,
                project_id: projectId,
              }

              updateTask(taskToUpdate)

              updateTaskApiRoute(taskToUpdate)

              setChanged(false)
            }}
          >
            <FaRegCheckSquare />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true)
            }}
          >
            <FiEdit />
          </button>
        )}
        <button
          onClick={() => {
            deleteTask(id)
            deleteTaskApiRoute(id)
          }}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  )
}
