import { HomePage } from './Home';
import { Tablist } from './Tablist';
import { ServicesPage } from './Services';
import { ProjectPage } from './Project';
import { FrieldPage } from './Frields';
import { KnowledgePage } from './knowledge';
import { UiDesigner, Mobile, Computer } from '../utils/CreateSVG'

import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles.module.scss'
import html from '../../../public/images/html.svg'
import css from '../../../public/images/css.svg'
import sass from '../../../public/images/sass.svg'
import javascript from '../../../public/images/js.svg'
import tailwind from '../../../public/images/tailwind.svg'
import nextjs from '../../../public/images/next.svg'
import react from '../../../public/images/react.svg'
import prisma from '../../../public/images/prisma.svg'
import typescript from '../../../public/images/typescriptt.svg'
import { Carousel } from './Assessments';
import { gql, useQuery } from '@apollo/client';
import { Created } from './created';


import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' 

const GET_CONTENT_BY_GRAPHQL = gql`
query MyQuery {
  frieldsamigo(orderBy: publishedAt_ASC, stage: PUBLISHED) {
    profissao
    nomeDoUsuario
    avatar
    discordComunidade
    copiar
  }
}
`

interface GetContentProps {
    frieldsamigo: {
        profissao: string
        nomeDoUsuario: string
        avatar: string
        discordComunidade: string
        copiar: string
    }[]
}

interface Propss {
    avaliacoes: {
        title: string,
        nota: number,
        description: string,
        avatar: string,
        userpool: {
            name: string,
        }
    }[]

    counts: {
        avaliacoescount: number
        count: number
    }
}

export function Main(props: Propss) {
    const {data} = useQuery<GetContentProps>(GET_CONTENT_BY_GRAPHQL)


    const [sliderRef, instanceRef] = useKeenSlider(
        {
         slides: {
            perView: 1.544,
            spacing: 10,
         },
         mode: 'free-snap',
        },
      )


    const Home = [
        {
            img: 'https://github.com/slaidezera.png',
            name: 'Nelis Santiago',
            writer: '<span>Front-End Developer e Ui Designer.</span>',
            paragra: 'Olá, meu nome e Nelis Santiago, sou freelancer como Front-end developer e Ui designer, desenvolvo aplicaçoes de alto nivel concentrado em performance, detalhes e SEO.',
        }
    ]

    const TabList = [
        {
            name: 'Conteudo',
            nametwo: 'eBook',
            title: 'Conteudo.',
            titletwo: 'eBook.',
            pargraph: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI,',
            pargraphtwo: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI,',
            link: '/content',
            linktwo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
    ]

    const Services = [
        {
            title: 'Ui Designer.',
            paragraph: 'Crio interfaces de forma que ela seja clara, objetiva e atraente para o usuario.',
            icon: <UiDesigner />
        },
        {
            title: 'Desenvolvimento.',
            paragraph: 'Desenvolvo websites de alto nivel para dispositivos desktop e celulares.',
            icon: <Computer />
        },
        {
            title: 'Responsivo.',
            paragraph: 'Acesse o site de qualque dispositivo sem nenhum tipo de problema de layout.',
            icon: <Mobile />
        }
    ]

    const Project = [
        {
            title: 'Em breve...',
            paragraph: 'Pegue um cafe e aguarde, estou construindo um novo projeto.',
        },
        {
            title: 'Em breve...',
            paragraph: 'Pegue um cafe e aguarde, estou construindo um novo projeto.',
        },
        {
            title: 'Em breve...',
            paragraph: 'Pegue um cafe e aguarde, estou construindo um novo projeto.',
        }
    ]

    const knowledge = [
        {
            tooltip: 'HTML',
            img: html,
            width: 70,
            height: 70,
        },
        {
            tooltip: 'CSS',
            img: css,
            width: 70,
            height: 70,
        },
        {
            tooltip: 'SASS',
            img: sass,
            width: 70,
            height: 70,
        },
        {
            tooltip: 'TAILWIND',
            img: tailwind,
            width: 70,
            height: 70,
        },
        {
            tooltip: 'PRISMA',
            img: prisma,
            width: 70,
            height: 70,
        },
        {
            tooltip: 'JAVASCRIPT',
            img: javascript,
            width: 70,
            height: 70,
        },
        {
            tooltip: 'REACT',
            img: react,
            width: 70,
            height: 70,
        },
        {
            tooltip: 'TYPESCRIPT',
            img: typescript,
            width: 70,
            height: 70,
        },
        {
            tooltip: 'NEXTJS',
            img: nextjs,
            width: 70,
            height: 70,
        },
    ]

    return (
        <>
            <main className={styles.main} data-aos="fade-up">
                <div className={styles.grid}>
                    <section className={styles.home}>
                      {Home.map(react => {
                        return (
                         <>
                            <HomePage 
                                logoImg={react.img}
                                title={react.name}
                                typerwriter={react.writer}
                                paragraph={react.paragra}   
                            />
                         </>
                        )
                      })}
                    </section>

                <section className={styles.tab}>
                   {TabList.map(react => {
                    return (
                        <>
                            <Tablist 
                            name={react.name}
                            nametwo={react.nametwo}
                            title={react.title}
                            titletwo={react.titletwo}
                            pargraphtwo={react.pargraphtwo}
                            pargraph={react.pargraph}
                            link={react.link}
                            linktwo={react.linktwo}
                            />
                        </>
                    )
                   })}
                </section>

                <section className={styles.services}>
                    <h2>Services.</h2>
                    <div className={styles.ServiceContent}>
                    {Services.map(react => {
                        return (
                            <>
                                <ServicesPage 
                                title={react.title}
                                paragraph={react.paragraph}
                                icon={react.icon}
                                />
                            </>
                        )
                    })}
                    </div>
                </section>

                <section className={styles.project}>
                <h2>Projetos.</h2>
                <div className={styles.Projectcontent}>
                    {Project.map(react => {
                        return (
                            <>
                                <ProjectPage 
                                title={react.title}
                                paragraph={react.paragraph}
                                />
                            </>
                        )
                    })}
                </div>
                </section> 

                <section className={styles.frields}>
                <h2>Amigos.</h2>
                    <div className={styles.contentFrields}>
                        {data?.frieldsamigo.map(react => {
                            return (
                                <>
                                <FrieldPage 
                                avatar={react.avatar}
                                name={react.nomeDoUsuario}
                                profissao={react.profissao}
                                buttonCopy="Discord"
                                href={react.discordComunidade}
                                copy={react.copiar}
                                />
                                </>
                            )
                        })}
                    </div>  
                </section>

                <section className={styles.assessments}>
                    <h2>Avaliações.</h2>
                    <article className={styles.assessments}>
                        <div className={styles.assessmentsContent}>
                            <div ref={sliderRef} className="keen-slider">
                            {props.avaliacoes.map(react => {
                            return (
                                <>
                                    <Carousel pool={react} />
                                </>
                                )
                            })}
                            
                            </div>
                        </div>
                    </article>
                </section>
                <section className={styles.count}>
                    <div className={styles.countContent}>
                        <Created counts={props.counts} />
                    </div>
                </section>
                <section className={styles.knowledge}>
                <h2>Conhecimentos.</h2>
                    <div className={styles.contentKnowledge}>
                        {knowledge.map(react => {
                            return (
                                <>
                                    <KnowledgePage 
                                    tooltip={react.tooltip}
                                    img={react.img}
                                    width={react.width}
                                    height={react.height}
                                    />
                                </>
                            )
                        })}
                    </div>
                </section>
                </div>
            </main>
        </>
    )
}

