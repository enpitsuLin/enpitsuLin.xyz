import { useStaticQuery, graphql } from 'gatsby';

/**
 * 获取站点`metadata`
 * @returns
 */
export default function useSiteMetadata() {
  const data = useStaticQuery<GatsbyTypes.querySiteMetadataQuery>(graphql`
    query querySiteMetadata {
      site {
        siteMetadata {
          lastUpdateTime
          description
          author
          title
          siteUrl
        }
      }
    }
  `);
  return data;
}
