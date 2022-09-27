import { getAllFilesFrontMatter } from '../components/utils/mdx/contentMdx';
import ListLayoutt from '../components/.content/Content';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { POSTS_PER_PAGE } from '../config';
import SafeHydrate from '../lib/Hydrate';


export default function Search({ posts, initialDisplayPosts }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>      
        <ListLayoutt 
            posts={posts} 
            initialDisplayPosts={initialDisplayPosts} 
            title='Conteudo.'
          />

    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter('src/data/posts');

  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  
    return { props: { initialDisplayPosts, posts } };

};

