import { ProjectProps } from '../../@types/interfaces'
import styles from './styles.module.scss'

export function ProjectPage({title, paragraph}: ProjectProps) {
    return (
        <>
            <article className={styles.list}>
                <h3>{title}</h3>
                <p>
                    {paragraph}
                </p>
            </article>
        </>
    )
}