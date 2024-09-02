import { useState } from 'react'
import styles from './styles.module.scss'

interface ProjectProps {
  name?: string
  deliveryDate?: Date
  createdAt?: Date
  description?: string
}

export function Project({
  name,
  deliveryDate,
  createdAt,
  description,
}: ProjectProps) {
  const [editableName, setEditableName] = useState(name)
  const [editableDeliveryDate, setEditableDeliveryDate] = useState(deliveryDate)
  const [editableDescription, setEditableDescription] = useState(description)

  return (
    <div>
      <form action='' className={styles.container}>
        <input
          type='text'
          placeholder='Nome do Projeto'
          required
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
        ></input>
        <label className={styles.deliveryDateContainer}>
          Entrega:
          <input
            type='date'
            placeholder='Entrega'
            value={new Intl.DateTimeFormat('pt-BR').format(
              editableDeliveryDate
            )}
            onChange={(e) => setEditableDeliveryDate(new Date(e.target.value))}
            required
          />
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
        <button>Acessar tarefas</button>
      </form>
    </div>
  )
}
