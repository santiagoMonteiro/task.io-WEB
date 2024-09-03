import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.container}>
      <h1>
        Task<span>.</span>io
      </h1>
    </header>
  )
}
