import { Header } from '../../components/Header'
import { LoginForm } from '../../components/LoginForm'
import styles from './styles.module.scss'

export function LoginPage() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <LoginForm />
      </main>
    </>
  )
}
