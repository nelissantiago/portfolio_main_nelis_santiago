import { ServicesProps } from '../../@types/interfaces'
import styles from './styles.module.scss'

export function ServicesPage({ title, paragraph, icon }: ServicesProps) {

    return (
        <>
        <article className={styles.list}>
            {icon}
            <h3>{title}</h3>
            <p>
             {paragraph}
            </p>
        </article>
        </>
    )
}