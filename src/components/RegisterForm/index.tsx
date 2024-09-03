import { useState } from 'react'
import styles from './styles.module.scss'
import { register } from '../../services/api'

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    password: string
  ) {
    event.preventDefault()
    register({
      name,
      email,
      password,
    })
  }

  return (
    <form
      action=''
      className={styles.container}
      onSubmit={(e) => handleSubmit(e, name, email, password)}
    >
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
        minLength={6}
      ></input>

      <button type='submit'>Fazer cadastro</button>
    </form>
  )
}
