import { useState } from 'react'
import styles from './styles.module.scss'

interface TaskProps {
  name?: string
  status?: string
  createdAt?: Date
  description?: string
}

export function Task({ name, createdAt, description, status }: TaskProps) {
  const [editableName, setEditableName] = useState(name)
  const [editableStatus, setEditableStatus] = useState(status)
  const [editableDescription, setEditableDescription] = useState(description)

  return (
    <div>
      <form action='' className={styles.container}>
        <input
          type='text'
          placeholder='Nome da tarefa'
          required
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
        ></input>

        <label>
          Status:
          <select
            value={editableStatus}
            onChange={(e) => setEditableStatus(e.target.value)}
          >
            <option value='TODO'>TODO</option>
            <option value='DOING'>DOING</option>
            <option value='DONE'>DONE</option>
          </select>
        </label>

        {createdAt ? (
          <p>Criação: {new Intl.DateTimeFormat('pt-BR').format(createdAt)}</p>
        ) : (
          <></>
        )}

        <p>Descrição:</p>
        <textarea
          value={editableDescription}
          onChange={(e) => setEditableDescription(e.target.value)}
        ></textarea>
      </form>
    </div>
  )
}