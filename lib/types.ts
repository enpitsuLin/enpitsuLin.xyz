export interface Post {
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  title: string;
  content: string;
}

export interface SiteMetaData {
  title: string;
  author: string;
  siteUrl: string;
  description: string;
  language: string;
  social: Record<'email' | 'github' | 'qq' | 'zhihu' | 'bilibili' | 'steam', string>;
}
