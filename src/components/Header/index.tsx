import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

export function Header() {
  const navigate = useNavigate()
  return (
    <header className={styles.container}>
      <h1>
        Task<span>.</span>io
      </h1>
      <div>
        <button onClick={() => navigate('/register')}>Cadastrar</button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </header>
  )
}
