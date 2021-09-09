import { navigate } from 'gatsby';

const __NON_LATIN_REGEXP__ = /[\p{sc=Katakana}\p{sc=Hiragana}\p{sc=Han}]/gu;

export function calcArticleWordCount(article: GatsbyTypes.MarkdownRemark): number {
  const { html, wordCount } = article;
  const words = wordCount?.words;
  return (html?.match(__NON_LATIN_REGEXP__)?.length || 0) + (words || 0);
}

export function navigateToArticle(slug: string) {
  navigate(`/articles${slug}`);
}
