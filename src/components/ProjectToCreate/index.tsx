import { useState } from 'react'
import styles from './styles.module.scss'
import { FaRegTrashAlt } from 'react-icons/fa'

interface ProjectToCreateProps {
  createProject: (projectToCreate: ProjectToCreateType) => void
  giveUpCreating: () => void
}

export type ProjectToCreateType = {
  name: string
  deliveryDate: string
  description: string
}

export function ProjectToCreate({
  createProject,
  giveUpCreating,
}: ProjectToCreateProps) {
  const [editableName, setEditableName] = useState('')
  const [editableDeliveryDate, setEditableDeliveryDate] = useState('')
  const [editableDescription, setEditableDescription] = useState('')

  return (
    <div className={styles.outsideContainer}>
      <form action='' className={styles.container}>
        <input
          required
          type='text'
          placeholder='Nome do Projeto'
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
        ></input>
        <label className={styles.deliveryDateContainer}>
          Entrega:
          <input
            required
            type='date'
            placeholder='Entrega'
            value={editableDeliveryDate.split('T')[0]}
            onChange={(e) => setEditableDeliveryDate(e.target.value)}
          />
        </label>
        <p>Descrição:</p>
        <textarea
          value={editableDescription}
          onChange={(e) => setEditableDescription(e.target.value)}
        ></textarea>
        <button
          onClick={() => {
            if (editableName !== '' || editableDeliveryDate !== '') {
              createProject({
                name: editableName,
                deliveryDate: editableDeliveryDate,
                description: editableDescription,
              })
            }
          }}
        >
          Criar Projeto
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
