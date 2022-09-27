import  { readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { AuthorFrontMatter, PostFrontMatter } from '../../../@types/interfaces';

import getAllFilesRecursively from '../file';
const root = process.cwd();

export function getFiles(type: '/data/posts' | '/data/blog') {
  return getAllFilesRecursively(path.join(root, 'data', type));
  
}

 function formatSlug(slug: string) {
  return slug.replace(/\.mdx?$/, '');
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export async function getAllFilesFrontMatter(folder: 'src/data/posts' | 'src/data/blog' | '/author') {
  const prefixPaths = path.join(root, '', folder);

  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter: PostFrontMatter[] = [];

  files.forEach((file: string) => {
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/');

    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return;
    }

    const source = readFileSync(file, 'utf8');
    const matterFile = matter(source);
    const frontmatter = matterFile.data as AuthorFrontMatter | PostFrontMatter;

    if ('date' in frontmatter) {
      frontmatter.date = new Date(frontmatter.date).toISOString();
    }


    if ('draft' in frontmatter && frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : null,
      });
    }
  });

  return allFrontMatter.sort((a, b) => dateSortDesc(b.date, a.date));
}