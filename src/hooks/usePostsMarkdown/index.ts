import { useStaticQuery, graphql } from 'gatsby';

/**
 * 获取所有属于`post`源的md文件列表
 * @returns {GatsbyTypes.MarkdownRemark[]} md文件列表
 */
export default function usePostsMarkdown() {
  const {
    allFile: { nodes }
  } = useStaticQuery<GatsbyTypes.queryPostsMarkdownQuery>(
    graphql`
      query queryPostsMarkdown {
        allFile(
          filter: { sourceInstanceName: { eq: "posts" }, extension: { eq: "md" } }
          sort: { fields: childrenMarkdownRemark___frontmatter___date, order: DESC }
        ) {
          nodes {
            childMarkdownRemark {
              excerpt(format: HTML)
              fields {
                slug
              }
              frontmatter {
                categories
                date(formatString: "YYYY 年 MM月 DD日")
                description
                tags
                title
                toc
              }
            }
          }
        }
      }
    `
  );
  return nodes.map(item => item.childMarkdownRemark) as GatsbyTypes.MarkdownRemark[];
}
