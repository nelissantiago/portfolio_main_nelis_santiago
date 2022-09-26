import React from 'react';
import ListLayout from './Content';
import { getAllFilesFrontMatter } from '../utils/mdx/contentMdx';
import { POSTS_PER_PAGE } from '../../config';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ContentFrontMatter } from '../../@types/Post';


export const getStaticPaths: GetStaticPaths<{ pagee: any }> = async () => {
  const totalPosts = await getAllFilesFrontMatter('src/data/posts');
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { pagee: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  posts: ContentFrontMatter[];
  initialDisplayPosts: ContentFrontMatter[];
  pagination: { currentPage: number; totalPages: number };
}> = async context => {
  const {
    params: { pagee },
  } = context;
  const posts = await getAllFilesFrontMatter('src/data/posts');
  const pageNumber = parseInt(pagee as string);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  };
};

export default function PostPage({
  posts,
  initialDisplayPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
