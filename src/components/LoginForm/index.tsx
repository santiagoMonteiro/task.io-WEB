import { useState } from 'react'
import styles from './styles.module.scss'
import { login } from '../../services/api'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) {
    event.preventDefault()
    login({
      email,
      password,
    })
  }

  return (
    <form
      action=''
      className={styles.container}
      onSubmit={(e) => handleSubmit(e, email, password)}
    >
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

      <button type='submit'>Fazer login</button>
    </form>
  )
}
