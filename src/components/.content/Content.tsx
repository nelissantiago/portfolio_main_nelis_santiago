import { Header } from './Header';
import { useState } from 'react';
import { ContentFrontMatter } from '../../@types/Post';
import styles from './styles.module.scss'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Repos } from '../utils/CreateSVG';
import App from '../../lib/particles';

interface Props {
  posts: ContentFrontMatter[];
  title: string;
  initialDisplayPosts?: ContentFrontMatter[];
}

export default function ListLayout({ posts, initialDisplayPosts }: Props) {
  const [searchValue,  setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter(frontMatter => {
    const searchContent = frontMatter.name + frontMatter.summary + frontMatter.tags.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayPosts = initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts; 
  return (
    <>
      <main className={styles.main}>
          <div className={styles.grid}>
          <Header title="Conteudo.">
              <input
                  aria-label='Search'
                  type='text'
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder='Pesquisar Por um Conteudo'
                  className={styles.inputSearch}
                />
                <div className={styles.con}>
                  <Repos /> {displayPosts.length ? displayPosts.length : displayPosts.length === 0 && '0'}
                </div>
            </Header>
            <div className={styles.content}>
          
              {!displayPosts.length && searchValue && (
                <p className={styles.error}>Ops! Não Foi Encontrado Nenhum Conteudo</p>
              )}

              {displayPosts.map(frontMatter => {
                const { name, summary, link } = frontMatter;

                function HandleRedirect() {

                  if(link) {
                    setTimeout(() => {
                      window.location.assign(link);
                    }, (1000 * 2));

                    toast('Redirecionando...', {
                      autoClose: 2000,
                      hideProgressBar: false,
                      delay: 1000,
                    type: 'success',
                    })
                    } else if(link === '')  {
                      toast.error('Conteudo Não Encontrado')
                    }}

                return (
                  <>
                      <main  className={styles.SearchContent}>  
                          <article className={styles.listContent} onClick={HandleRedirect}>
                            <div className={styles.text}>
                              <h2>{name}</h2>
                              {summary}
                            </div>
                          </article> 
                      </main>
                  </>
                );
              })}
          </div>
          </div>
        </main>
        <App />
    </>
  );
}
