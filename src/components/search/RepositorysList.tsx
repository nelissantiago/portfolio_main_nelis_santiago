import { formatDate } from './format';
import styles from './styles.module.scss';
import { Date } from '../utils/CreateSVG';

type TypesRepositorys = 'TypeScript' | 'SCSS'

interface RepositoryItemProps {
    date: string;
    title: string;
    description: string;
    charge: string;
    types: TypesRepositorys;
    link?: string;
}
export function ListRepositorys({title, description, charge, date, types, link}: RepositoryItemProps) {
    return (
        <>
            <div className={styles.list}>
                <h4 className={styles.date}><Date />{date}</h4>
                <div className={styles.textLink}>
                <a href={link}>{title}</a>
                <span>{charge}</span>
                </div>
                <p>{description}</p>
                <div className={styles.test}>
                    <span className={types === 'TypeScript' ? styles.types : types === 'SCSS' ? styles.scss : styles.null} />
                    <p>{types ? types : 'Sem Linguagem'}</p>
                </div>
            </div>
        </>
    )
}