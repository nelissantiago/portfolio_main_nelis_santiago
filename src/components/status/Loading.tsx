import styles from './styles.module.scss'

export function LoadingDiscord() {
    return (
        <>
            <div className={styles.content}>
            <div className={styles.container}>
                <div className={styles.top_left} id={styles.block}></div>
                <div className={styles.bottom_right} id={styles.block}></div>
            </div>
            </div>
        </>
    )
}