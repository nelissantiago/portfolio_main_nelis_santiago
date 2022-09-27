
import { getAllFilesFrontMatter } from '../utils/mdx/contentMdx';
import { POSTS_PER_PAGE } from '../../config';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { PostFrontMatter } from '../../@types/interfaces';
import ListLayoutt from './Content';
import React from 'react';

export const getStaticPaths: GetStaticPaths<{
  slug: string;
}> = async () => {
  const posts = await getAllFilesFrontMatter('src/data/posts');

  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[];
  initialDisplayPosts: PostFrontMatter[];
}> = async ({ params }) => {
  const posts = await getAllFilesFrontMatter('src/data/posts');
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);

  return {
    props: {
      initialDisplayPosts,
      posts,
    },
  };
  }

export default function Search({ posts, initialDisplayPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListLayoutt  posts={posts} initialDisplayPosts={initialDisplayPosts} title='Repositorio.' />
    </>
  );
}
