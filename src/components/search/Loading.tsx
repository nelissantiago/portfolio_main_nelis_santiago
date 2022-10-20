import styles from './styles.module.scss';

export function LoadingSearch() {
    return (
        <>
                    <div className={styles.loading}>
                        <div className={styles.load_3}>
                            <div className={styles.line}></div>
                            <div className={styles.line}></div>
                            <div className={styles.line}></div>
                        </div>
                    </div>
        </>
    )
}