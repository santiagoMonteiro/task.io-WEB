import { Project } from '../../components/Project'
import styles from './styles.module.scss'

export function ProjectsPage() {
  return (
    <main className={styles.container}>
      <Project name='HEY' createdAt={new Date()}/>
      <Project name='HEY' createdAt={new Date()}/>
      <Project name='HEY' createdAt={new Date()}/>
      <Project name='HEY' createdAt={new Date()}/>
      <Project name='HEY' createdAt={new Date()}/>
      <Project name='HEY' createdAt={new Date()}/>
      <Project name='HEY' createdAt={new Date()}/>
      <Project name='HEY' createdAt={new Date()}/>
      <Project name='HEY' createdAt={new Date()}/>
      <Project name='HEY' createdAt={new Date()}/>
    </main>
  )
}