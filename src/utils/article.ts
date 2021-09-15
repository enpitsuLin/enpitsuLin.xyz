import { navigate } from 'gatsby';

const __NON_LATIN_REGEXP__ = /[\p{sc=Katakana}\p{sc=Hiragana}\p{sc=Han}]/gu;

export function calcArticleWordCount(article: GatsbyTypes.MarkdownRemark): number {
  const { html, wordCount } = article;
  const words = wordCount?.words;
  return (html?.match(__NON_LATIN_REGEXP__)?.length || 0) + (words || 0);
}

/**
 * navigate to article page
 * @param slug article slug
 */
export function navigateToArticle(slug: string) {
  navigate(`/articles${slug}`);
}
/**
 * navigate to search result page
 * @param query query keyword
 * @param page page
 */
export function navigateToSearchPage(query: string, page = 1) {
  navigate(`/articles/search?query=${query}${page > 1 ? `&page=${page}` : ''}`);
}
