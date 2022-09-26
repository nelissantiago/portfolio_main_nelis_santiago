import { Conteudo, EBoook, Instagram, EBookAcess } from '../utils/CreateSVG'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { toast } from 'react-toastify';
import { TabProps } from '../../@types/interfaces';
import styles from './styles.module.scss'
import progress from '../../lib/progress';

export function Tablist({name, nametwo, title, pargraph, link, linktwo, titletwo, pargraphtwo}: TabProps) {

    function Progress() {
        progress.start()
        progress.done()
    }

    function HandleCopyProfile() {
        const name = "Essa pagina não existe."

      toast(name, {
          delay: 100,
         type: 'error',
        })
    }

    return (
        <>
            <Tabs disableUpDownKeys={true}>
                <TabList className={styles.react_tabs}>
                    <Tab className={styles.tablist} selectedClassName={styles.select} id={styles.tab1}><Conteudo />{name}</Tab>
                    <Tab className={styles.tablist} selectedClassName={styles.select} id={styles.tab2}><EBoook />{nametwo}</Tab>
                </TabList>

                <TabPanel className={styles.painelList}>
                <strong>{title}</strong>
                    <p>
                        {pargraph}
                    </p>
                    <div className={styles.linkAcess}>
                    <a href={link} onClick={Progress}>Acessar Conteudo <Instagram /></a>
                    </div>
                    </TabPanel>
                    <TabPanel className={styles.painelList}>
                    <strong>{titletwo}</strong>
                    <p>
                        {pargraphtwo}
                    </p>
                    <div className={styles.linkAcess}>
                        <button onClick={HandleCopyProfile}>Acessar eBook<EBookAcess/></button>
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
}