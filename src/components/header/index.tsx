/* eslint-disable @next/next/no-html-link-for-pages */
import progress from '../../lib/progress'
import { Search } from '../utils/CreateSVG'
import { ThemeSwitch } from '../utils/Darktoggle'
import styles from './styles.module.scss'
import { HeaderAvatarProfile } from '../dashboard/Header';

export function Header() {
    
    function Progress() {
        progress.start()
        progress.done()
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.grid}>
                <h2>Nelis Santiago.</h2>
                    <div className={styles.nav}>
                       <ThemeSwitch />
                        <a href="/search" onClick={Progress}><Search /></a>
                        <HeaderAvatarProfile  />
                    </div>
                </div>
            </header>
        </>
    )
}
