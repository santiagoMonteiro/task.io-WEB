import { useState } from 'react'
import styles from './styles.module.scss'
import { ProjectType } from '../../pages/ProjectsPage'
import { FiEdit } from 'react-icons/fi'
import { FaRegCheckSquare, FaRegTrashAlt } from 'react-icons/fa'
import {
  deleteProjectApiRoute,
  updateProjectApiRoute,
} from '../../services/api'
import { useNavigate } from 'react-router-dom'

interface ProjectProps {
  id: string
  name: string
  deliveryDate: string
  createdAt: string
  description: string
  updateProject: (project: ProjectType) => void
  deleteProject: (id: string) => void
}

export function Project({
  id,
  name,
  deliveryDate,
  createdAt,
  description,
  updateProject,
  deleteProject,
}: ProjectProps) {
  const [editableName, setEditableName] = useState(name)
  const [editableDeliveryDate, setEditableDeliveryDate] = useState(deliveryDate)
  const [editableDescription, setEditableDescription] = useState(description)

  const [isEditing, setIsEditing] = useState(false)
  const [changed, setChanged] = useState(false)

  const navigate = useNavigate()

  return (
    <div className={styles.outsideContainer}>
      <form
        action=''
        className={styles.container}
        onChange={() => setChanged(true)}
      >
        <input
          type='text'
          placeholder='Nome do Projeto'
          required
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
          readOnly={!isEditing}
        ></input>
        <label className={styles.deliveryDateContainer}>
          Entrega:
          <input
            type='date'
            placeholder='Entrega'
            value={editableDeliveryDate.split('T')[0]}
            onChange={(e) => setEditableDeliveryDate(e.target.value)}
            required
            readOnly={!isEditing}
          />
        </label>
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
        <button
          onClick={() => {
            navigate(`/tasks/${id}`)
          }}
        >
          Acessar tarefas
        </button>
      </form>
      <div className={styles.operationsContainer}>
        {isEditing ? (
          <button
            onClick={() => {
              setIsEditing(false)

              if (!changed) {
                return
              }

              const projectToUpdate = {
                id,
                name: editableName,
                created_at: createdAt,
                description: editableDescription,
                delivery_date: editableDeliveryDate,
              }
              updateProject(projectToUpdate)
              updateProjectApiRoute(projectToUpdate)

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
            deleteProject(id)
            deleteProjectApiRoute(id)
          }}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  )
}
