import { RegisterForm } from '../../components/RegisterForm'
import styles from './styles.module.scss'

export function RegisterPage() {
  return (
    <main className={styles.container}>
      <RegisterForm />
    </main>
  )
}