import { Account, EBookAcess, Email, Repos } from '../utils/CreateSVG';
import styles from './styles.module.scss';

export function DeveloperDashBoard() {
    return (
        <>
        <main className={styles.main} id="embed" >
            <div className={styles.grid}>
                <div className={styles.container}>
                    <div className={styles.profileInformation}>
                    <div className={styles.profile}>
                        <img src="https://github.com/slaidezera.png" alt="" />
                        <strong>Nelis Santiago</strong>
                        <span>Membro</span>
                        <button>SAIR</button>
                    </div>
                    <div className={styles.info}>
                        <span><Email /><p>slaidezera.web2021@gmail.com</p></span>
                        <span><EBookAcess /><p>0 Avaliação</p></span>
                        <span><Repos /><p>0 Contato</p></span>
                        <span><Account /><p>Logado</p></span>
                    </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.formList}>
                            <form>
                                <input type="text" placeholder="Nome"  disabled />
                                <input type="text" placeholder="Titulo" required />
                                <input type="number" placeholder="Nota de 1 a 5" max={5} min={1} required />
                                <textarea maxLength={120} placeholder="Descrição" required></textarea>
                                <button type="submit" >Avaliação</button>
                            </form>
                            <form>
                                <input type="text" placeholder="Nome"  disabled />
                                <input type="text" placeholder="Discord" required />
                                <textarea maxLength={320} placeholder="Mensagem" required></textarea>
                                <button type="submit" >Contato</button>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}