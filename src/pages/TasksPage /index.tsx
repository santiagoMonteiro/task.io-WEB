import { Task } from '../../components/Task'
import styles from './styles.module.scss'

export function TasksPage() {
  return (
    <main className={styles.container}>
      <Task name='HEY' createdAt={new Date()}/>
      <Task name='HEY' createdAt={new Date()}/>
      <Task name='HEY' createdAt={new Date()}/>
      <Task name='HEY' createdAt={new Date()}/>
      <Task name='HEY' createdAt={new Date()}/>
      <Task name='HEY' createdAt={new Date()}/>
      <Task name='HEY' createdAt={new Date()}/>
      <Task name='HEY' createdAt={new Date()}/>
      <Task name='HEY' createdAt={new Date()}/>
      <Task name='HEY' createdAt={new Date()}/>
    </main>
  )
}