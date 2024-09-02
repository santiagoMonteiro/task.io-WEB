import { useState } from 'react'
import styles from './styles.module.scss'

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form action='' className={styles.container}>
      <h2>Cadastro:</h2>
      <input
        type='text'
        placeholder='Nome:'
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

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

      <button>Fazer cadastro</button>
    </form>
  )
}
