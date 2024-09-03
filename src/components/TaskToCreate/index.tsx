import { useState } from 'react'
import styles from './styles.module.scss'
import { FaRegTrashAlt } from 'react-icons/fa'

interface TaskToCreateProps {
  createTask: (taskToCreate: TaskToCreateType) => void
  giveUpCreating: () => void
  projectId: string
}

export type TaskToCreateType = {
  name: string
  status: string
  description: string
  projectId: string
}

export function TaskToCreate({
  createTask,
  giveUpCreating,
  projectId,
}: TaskToCreateProps) {
  const [editableName, setEditableName] = useState('')
  const [editableStatus, setEditableStatus] = useState('TODO')
  const [editableDescription, setEditableDescription] = useState('')

  return (
    <div className={styles.outsideContainer}>
      <form action='' className={styles.container}>
        <input
          required
          type='text'
          placeholder='Nome da Tarefa'
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
        ></input>

        <select
          value={editableStatus}
          onChange={(e) => setEditableStatus(e.target.value)}
        >
          <option value='TODO'>TODO</option>
          <option value='DOING'>DOING</option>
          <option value='DONE'>DONE</option>
        </select>

        <p>Descrição:</p>
        <textarea
          value={editableDescription}
          onChange={(e) => setEditableDescription(e.target.value)}
        ></textarea>
        <button
          onClick={() => {
            if (editableName !== '') {
              createTask({
                name: editableName,
                status: editableStatus,
                description: editableDescription,
                projectId,
              })
            }
          }}
        >
          Criar Tarefa
        </button>
      </form>
      <div className={styles.operationsContainer}>
        <button
          onClick={() => {
            giveUpCreating()
          }}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  )
}
