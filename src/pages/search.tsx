import { getAllFilesFrontMatter } from '../components/utils/mdx/contentMdx';
import ListLayout from '../components/search/Search';
import { GetStaticProps } from 'next';
import { POSTS_PER_PAGE } from '../config';

export default function Search({ posts, initialDisplayPosts }) {

  return (
    <>
            <ListLayout 
                  posts={posts} 
                  initialDisplayPosts={initialDisplayPosts} 
                  title='Repositorio.'
                />      
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const posts = await getAllFilesFrontMatter('src/data/blog');

  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  
    return { props: { initialDisplayPosts, posts } };
};


