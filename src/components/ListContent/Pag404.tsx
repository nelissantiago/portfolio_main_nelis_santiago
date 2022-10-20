/* eslint-disable @next/next/no-html-link-for-pages */
import styles from './styles.module.scss';

export function PagFound404() {
  return (
    <div className={styles.error}>
      <div className={styles.found}>
      <h1>Página não encontrada</h1>
      <a href="/content">Voltar</a>
      </div>
    </div>
  )
}