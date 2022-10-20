import { gql, useQuery } from "@apollo/client";
import styles from './styles.module.scss';
import Head from 'next/head'
import { PagFound404 } from "./Pag404";
import { Loading } from "./loading";
import { Footer } from "../footer";
import { Date } from "../utils/CreateSVG";
import Image from '../../../public/images/content.png'
const GET_LESSON_GRAPHQL = gql`
  query GetLessonBySlug($slug: String) {
    content(where: {slug: $slug}, stage: PUBLISHED) {
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

interface Props {
  content: {
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

interface LessonProps {
  lessonSlug: string | string[];
}

export function Video({ lessonSlug }: LessonProps) {
  const { data } = useQuery<Props>(GET_LESSON_GRAPHQL, {
    variables: {
      slug: lessonSlug
    }
  })

  console.log(data)

  if ((!data)) {
    return <Loading />
  } else if ((!data.content)) {
    return <PagFound404 />
  }

  return (
    <>
    <Head>
      <title>Nelis Santiago - {data.content.title}</title>
    </Head>
      <main className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.header}>
              <img src={data.content.image} alt="" />
            </div>
              <section className={styles.ContentList}>
                <div className={styles.title}>
                  <h1>{data.content.titlecontent}</h1>
                  <span className={styles.date}> < Date /> Publicado em {data.content.diaLancado}</span>
                </div>
                  <div className={styles.list}>
                    <p>
                      {data.content.descriptioncontent}
                    </p>
                         {data.content.titulotwo || data.content.descriptiontwo || data.content.imagetwo ? (
                          <>
                              <div className={data.content.titulotwo ? styles.titleList : ''}>
                          <h2>{data.content.titulotwo}</h2>
                          </div>
                          <p>
                            {data.content.descriptiontwo}
                          </p>
                          <div>
                        <h2 className={styles.exp}>{data.content.imagetwo ? 'Exemplo:' : ''}</h2>
                          </div>
                          <div className={styles.image}>
                          <img src={data.content.imagetwo} alt="" />
                          </div>
                          </>
                         ) : ''}
                       {data.content.titulothree || data.content.descriptionthree || data.content.imagethree ? (
                        <>
                            <div className={data.content.titulothree ? styles.titleList : ''}>
                          <h2>{data.content.titulothree}</h2>
                          </div>
                            <p>
                              {data.content.descriptionthree}
                            </p>
                          <div>
                        <h2 className={styles.exp}>{data.content.imagethree ? 'Exemplo:' : ''}</h2>
                        </div>
                        <div className={styles.image}>
                          <img src={data.content.imagethree} alt="" />
                        </div>
                        </>
                       ) : ''}
                  </div>
              </section>
          </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

//<img src={data.content.image} alt="" />

/**
 * 
 *  <div className={styles.titleList}>
                          <h2>{data.content.titulotwo}</h2>
                          </div>
                          <p>
                            {data.content.descriptiontwo}
                          </p>
                          <div className={styles.titleList}>
                        <h2>Exemplo:</h2>
                        </div>
                        <div className={styles.image}>
                        <img src={data.content.imagetwo} alt="" />
                        </div>

 */