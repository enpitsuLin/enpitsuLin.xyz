import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import Frontmatter from '../Frontmatter';
import ArticleContent from '../ArticleContent';
import { Text } from '@chakra-ui/layout';
import Card from '@/components/Card';

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}

const ArticleItem: FunctionComponent<Props> = ({ article }) => {
  return (
    <Card>
      <Text as="h1" fontSize="3xl">
        <Link to={`/articles${article.fields?.slug}`}>{article.frontmatter?.title}</Link>
      </Text>
      <Frontmatter article={article} />
      <ArticleContent article={article} excerpt={true} />
    </Card>
  );
};

export default ArticleItem;
