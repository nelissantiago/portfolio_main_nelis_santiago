import { gql, useQuery } from "@apollo/client";
import styles from './styles.module.scss';
import Head from 'next/head'
import { PagFound404 } from "./Pag404";
import { Loading } from "./loading";
import { Footer } from "../footer";
import { Date } from "../utils/CreateSVG";
import Image from '../../../public/images/content.png'
import { formatDate } from "../utils/format";
const GET_LESSON_GRAPHQL = gql`
  query GetLessonBySlug($slug: String) {
    content(where: {slug: $slug}, stage: PUBLISHED) {
      title
      description
      diaLancado
      titlecontent
      descriptioncontent
      titulotwo
      descriptiontwo
      titulothree
      descriptionthree
      image {
        fileName
        height
        width
        url
      }
      imagetwo {
        fileName
        height
        width
        url
      }
      imagethree {
        fileName
        height
        width
        url
      }
    }
  }
`

export interface Props {
  content: {
    title: string;
    description: string;
    diaLancado: string;
    titlecontent: string;
    descriptioncontent: string;
    titulotwo: string;
    descriptiontwo: string;
    titulothree: string;
    descriptionthree: string;
    image: {
      fileName: any;
      height: number;
      width: number;
      url: string;
    }
    imagetwo: {
      fileName: any;
      height: number;
      width: number;
      url: string;
    }
    imagethree: {
      fileName: any;
      height: number;
      width: number;
      url: string;
    }
  }
  lessonSlug: string | string[];
}

export function Video({ lessonSlug, content }: Props) {
  const { data } = useQuery<Props>(GET_LESSON_GRAPHQL, {
    variables: {
      slug: lessonSlug
    }
  })

  if ((!data)) {
    return <Loading />
  } else if ((!data.content)) {
    return <PagFound404 />
  }

  console.log(data.content)
  return (
    <>
    <Head>
      <title>Nelis Santiago - {data.content.title}</title>
    </Head>
        <main className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.content}>
              <div className={styles.header}>
              <img src={data.content.image?.url} alt="" />
              </div>
                <section className={styles.ContentList}>
                  {data.content.title ? (
                    <>
                      <div className={styles.title}>
                        <h1>{data.content.title}</h1>
                        <span className={styles.date}> < Date />{formatDate(data.content.diaLancado)}</span>
                      </div>
                    </>
                  ) : ""}
                    <div className={styles.list}>
                      {data.content.description ? (
                        <>
                          <p className={styles.textdescription}>
                          {data.content.description}
                        </p>
                        </>
                      ) : ""}
                         {data.content.titulotwo || data.content.descriptiontwo || data.content.imagetwo ? (
                            <>
                                {data.content.titulotwo ? (
                                  <>
                                  <div className={data.content.titulotwo ? styles.titleList : ''}>
                                    <h2>{data.content.titulotwo}</h2>
                                  </div>
                                  </>
                                ) : ""}
                           {data.content.descriptiontwo ? (
                            <>
                               <p className={styles.textdescription}>
                                {data.content.descriptiontwo}
                              </p>
                            </>
                           ) : ""}
                            
                         {data.content.imagetwo ? (
                          <>
                           <h2 className={styles.exp}>{data.content.imagetwo ? 'Exemplo:' : ''}</h2>
                            <div className={styles.image}>
                            <img src={data.content.imagetwo?.url} alt="" />
                            </div>
                          </>
                         ) : ""}
                            </>
                          ) : ''}
                          {data.content.titulothree || data.content.descriptionthree || data.content.imagethree ? (
                            <>
                                {data.content.titulothree ? (
                                  <>
                                    <div className={data.content.titulothree ? styles.titleList : ''}>
                                    <h2>{data.content.titulothree}</h2>
                                    </div>
                                  </>
                                ) : ""}
                               {data.content.descriptionthree ? (
                                <>
                                 <p>
                                  {data.content.descriptionthree}
                                </p>
                                </>
                               ) : ""}
                             {data.content.imagethree ? (
                              <>
                                <h2 className={styles.exp}>{data.content.imagethree ? 'Exemplo:' : ''}</h2>
                                <div className={styles.image}>
                                  <img src={data.content.imagethree?.url} alt="" />
                                </div>
                            </>
                             ) : ""}
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