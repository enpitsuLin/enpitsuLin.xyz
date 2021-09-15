import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { FunctionComponent } from 'react';
import Frontmatter from './Frontmatter';

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}

const ArticleHeader: FunctionComponent<Props> = ({ article }) => {
  return (
    <Flex justifyContent="center" alignItems="center" height="64">
      <Box textAlign="center">
        <Text fontSize="3xl" mb="2">
          {article.frontmatter?.title || '无标题'}
        </Text>
        <Frontmatter article={article} />
      </Box>
    </Flex>
  );
};

export default ArticleHeader;
