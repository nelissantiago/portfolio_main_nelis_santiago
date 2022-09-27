import { Header } from './Header';
import {CustomLink} from './Link';
import { formatDate } from '../utils/Date';
import { useState } from 'react';
import styles from './styles.module.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import App from '../utils/particles';
import { Repos } from '../utils/CreateSVG';
import { PostFrontMatter } from '../../@types/interfaces';

interface Props {
  posts: PostFrontMatter[];
  title: string;
  initialDisplayPosts?: PostFrontMatter[];
}

export default function ListLayout({posts, initialDisplayPosts }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter(frontMatter => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayPosts = initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts;

  return (
    <>
      <main className={styles.main}>
       <div className={styles.grid}>
       <Header title="Repositorio.">
          <input
              aria-label='Search'
              type='text'
              onChange={e => setSearchValue(e.target.value)}
              placeholder='Pesquisar Por um Repositorio'
              className={styles.inputSearch}
            />
           <div className={styles.repos}>
              <Repos /> {displayPosts.length ? displayPosts.length : displayPosts.length === 0 && '0'}
           </div>

        </Header>
          {!filteredBlogPosts.length &&  (
            <p className={styles.error}>Ops! Não Foi Encontrado Nenhum Repositorio</p>
          )}

          {displayPosts.map(frontMatter => {
            const { slug, date, title, summary, link, Released } = frontMatter;
            return (
              <>
                <main key={slug} className={styles.SearchContent}>
                <article className={styles.List}>     
                  <div className={styles.info}>
                      <h3>
                        <CustomLink
                          href={link}
                          className={styles.link}
                        >

                          {title}
                        </CustomLink>
                        <span className={styles.released}>
                            {Released}
                          </span>
                      </h3>  
                      <p className={styles.text}>
                        {summary}
                      </p>
                      <span className={styles.time}>      
                          <time lang='pt-br' dateTime={date}>Publicado em {formatDate(date)}</time>
                      </span>
                  </div>
                </article>
              </main>
              </>
            );
          })}
       </div>
         <ToastContainer />
       </main>
       <App />
    </>
  );
}