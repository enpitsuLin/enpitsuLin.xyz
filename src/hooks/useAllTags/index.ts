import { useStaticQuery, graphql } from 'gatsby';

export default function useAllTag() {
  let tagsCount: { [tag: string]: number } = {};

  const data = useStaticQuery<GatsbyTypes.queryAllTagsQuery>(graphql`
    query queryAllTags {
      allFile(filter: { sourceInstanceName: { eq: "posts" }, extension: { eq: "md" } }) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);
  data.allFile.nodes.map(node => {
    const tags = (node.childMarkdownRemark?.frontmatter?.tags as string[]) || [];
    if (tags.length > 0) {
      for (let tag of tags) {
        tagsCount[tag] = tag in tagsCount ? tagsCount[tag] + 1 : 1;
      }
    }
  });

  return Object.keys(tagsCount)
    .map(tag => ({ tag, count: tagsCount[tag] }))
    .sort((a, b) => b.count - a.count);
}
