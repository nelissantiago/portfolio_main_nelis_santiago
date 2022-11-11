/* eslint-disable @next/next/no-html-link-for-pages */
import { Account, Code, Content, Date, Discord, Githubb, Gmail, Instagram, Linkeedin, Repos, Telegram } from '../utils/CreateSVG';
import { ThemeSwitch } from '../utils/Darktoggle';
import Typewriter from 'typewriter-effect';
import { FragementParticles } from '../utils/particles';
import styles from './styles.module.scss';
import { gql, useQuery } from '@apollo/client';
import { formatDate } from '../search/format';


const GET_LESSON_BY_GRAPH = gql`
    query GetLessons {
      contents(orderBy: publishedAt_ASC, stage: PUBLISHED) {
        id
        slug
        diaLancado
        title
        description
        titlecontent
        descriptioncontent
        image
        titulotwo
        descriptiontwo
        imagetwo
        titulothree
        descriptionthree
        imagethree
      }
    }
`

export interface Props {
    contents: {
        id: string;
        slug: string;
        diaLancado: string;
        title: string;
        description: string;
        titlecontent: string;
        descriptioncontent: string;
        image: string;
        titulotwo: string;
        descriptiontwo: string;
        imagetwo: string;
        titulothree: string;
        descriptionthree: string;
        imagethree: string;
    }
}


export function Bio() {
    const { data } = useQuery<Props>(GET_LESSON_BY_GRAPH)

    const statuss = [
        {
            title: data?.contents[0].title,
            created: data?.contents[0].diaLancado,
            link: data?.contents[0].slug,
        }
    ]

    return (
        <>
        <main className={styles.main}>
        
            <div className={styles.grid}>
            <div className={styles.darktoggle}><ThemeSwitch /></div>
                <section className={styles.container}>
                    <div className={styles.profile}>
                        <img src="https://github.com/slaidezera.png" alt="" />
                        <h2>Nelis Santiago</h2>
                        <span>
                            <Typewriter 
                                options={{
                                    strings: ['Front-end Developer.', 'Ui Designer.'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </span>
                    </div>
                    <article className={styles.content}>
                    <h2>Portfolio</h2>
                        <div className={styles.list}>
                             <a href="/"><Code /> Portfolio</a>
                             <a href="/status"><Discord />Status</a>
                             <a href="/account/dashboard"><Account />Dashboard</a>
                             <a href="/content"><Content />Conteudo</a>
                             <a href="/search"><Repos />Repositorio</a>
                          </div>
                    </article>
                    <article className={styles.content}>
                    <h2>Redes Sociais</h2>
                        <div className={styles.list}>
                             <a href="https://www.linkedin.com/in/nelis-santiago-72454b233/"><Linkeedin />Linkeedin</a>
                             <a href="https://www.instagram.com/nelis_santiago/"><Instagram />Instagram</a>
                             <a href=""><Gmail />Gmail</a>
                             <a href=""><Telegram />Telegram</a>
                             <a href="https://github.com/slaidezera/"><Githubb />GitHub</a>
                          </div>
                    </article>
                    <section className={styles.Contentupgrade}>
                        <article className={styles.ListUpgrade}>
                            <div className={styles.upgrade}>
                            {statuss.map(react => {
                                    return (
                                        <>
                                            <h2><Content />Foi adicionado {react.title}</h2>
                                            <p><Date />Publicado em {formatDate(react.created)}</p>
                                            <a href={`/content/${react.link}`}><Repos />Acessa Conteudo</a>
                                        </>
                                    )
                                })}
                            </div>
                        </article>
                    </section>
                </section>
            </div>
        </main>
        <FragementParticles />
        </>
    )
}