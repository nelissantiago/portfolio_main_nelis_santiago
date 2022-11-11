import { gql, useQuery } from "@apollo/client"
import { useState} from 'react'
import styles from './styles.module.scss'
import { Lesson } from "./Content";
import { Repos, Search } from "../utils/CreateSVG";
import { Loading } from "./loading";
import { FragementParticles } from "../utils/particles";

export const GET_LESSON_BY_GRAPH = gql`
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
    }[]
}


export function SideBar() {
  const { data } = useQuery<Props>(GET_LESSON_BY_GRAPH)
  const [ search, SetSearch] = useState('')

  if(!data)  return <Loading />

  const filterItens = data?.contents.filter((item) => {
    const Filter = item.title + item.description
    return Filter.toLowerCase().includes(search.toLowerCase())
  })

  return (
      <>
        <main className={styles.main}>
          <div className={styles.grid}>
            <header className={styles.header}>
              <h2 className={styles.title}>Conteudo.</h2>
              <div className={styles.search}>
                <Search />
                <input  
                placeholder="Pesquisar por conteudo"  
                type="text" 
                className={styles.inputSearch}
                onChange={e => SetSearch(e.target.value)} 
                />
                <div className={styles.repos}>
                <Repos /> {filterItens?.length}
                </div>
              </div>
            </header>
              <div className={styles.content}>
              {filterItens?.length === 0 && (
                <p className={styles.error}>Nenhum resultado encontrado</p>
              )}
              {filterItens?.map(react => {
                return (
                  <>
                    <Lesson
                      key={react.id}
                      title={react.title}
                      description={react.description}
                      slug={react.slug}
                    />
                  </>
                )
              })}
              </div>
            </div>
          </main>
          <FragementParticles />
      </>
  );
}
