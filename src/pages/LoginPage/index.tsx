import { LoginForm } from '../../components/LoginForm'
import styles from './styles.module.scss'

export function LoginPage() {
  return (
    <main className={styles.container}>
      <LoginForm />
    </main>
  )
}