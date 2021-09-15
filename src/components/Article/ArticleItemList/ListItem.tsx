import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import Frontmatter from '../Frontmatter';
import ArticleContent from '../ArticleContent';
import { Box, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}

const ArticleItem: FunctionComponent<Props> = ({ article }) => {
  const boxShadow = useColorModeValue('base', 'dark-lg');
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} my={2} _hover={{ boxShadow }}>
      <Text as="h1" fontSize="3xl">
        <Link to={`/articles${article.fields?.slug}`}>{article.frontmatter?.title}</Link>
      </Text>
      <Frontmatter article={article} />
      <ArticleContent article={article} excerpt={true} />
    </Box>
  );
};

export default ArticleItem;
