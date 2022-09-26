import { useState } from 'react'
import { Powered } from '../utils/CreateSVG'
import styles from './styles.module.scss'

export function Footer() {
    return (
        <>
        <footer className={styles.footer}>
            <div className={styles.grid}>
                <strong>© 2022 Nelis Santiago.</strong>
                <span className={styles.powered}>Powered By <Powered /></span>
            </div>
        </footer>
        </>
    )
}