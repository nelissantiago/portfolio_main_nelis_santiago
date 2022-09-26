export type PostFrontMatter = {
  title: string;
  date: string;
  link: string;
  tags: string[];
  lastmod?: string;
  Released: string;
  type: string;
  draft?: boolean;
  summary?: string;
  images?: string[];
  authors?: string[];
  layout?: string;
  readingTime: any;
  canonicalUrl?: string;
  slug: string;
  name: string;
};

export type  ContentFrontMatter = {
  name: string;
  summary?: string;
  link?: string;
  tags?: string[];
  image?: string[];
  layout?: string;
  slug: string;
}
