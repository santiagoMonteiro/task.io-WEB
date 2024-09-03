import { Header } from '../../components/Header'
import { RegisterForm } from '../../components/RegisterForm'
import styles from './styles.module.scss'

export function RegisterPage() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <RegisterForm />
      </main>
    </>
  )
}
