import { useState } from 'react'
import styles from './styles.module.scss'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form action='' className={styles.container}>
      <h2>Login:</h2>
      <input
        type='email'
        placeholder='Email:'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>

      <input
        type='password'
        placeholder='Senha:'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button>Fazer login</button>
    </form>
  )
}
