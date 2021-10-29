import { navigateToArticle } from '@/utils/article';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';

interface Props {
  previous: GatsbyTypes.MarkdownRemark;
  next: GatsbyTypes.MarkdownRemark;
}

const ArticleNav: FunctionComponent<Props> = ({ previous, next }) => {
  return (
    <Flex justifyContent="space-between" mt={16} mb={10}>
      {previous && (
        <Button
          p={3}
          fontSize="sm"
          leftIcon={<ArrowLeftIcon />}
          onClick={() => {
            navigateToArticle(previous.fields?.slug as string);
          }}
        >
          {previous.frontmatter?.title}
        </Button>
      )}

      {next && (
        <Button
          p={3}
          fontSize="sm"
          rightIcon={<ArrowRightIcon />}
          onClick={() => {
            navigateToArticle(next.fields?.slug as string);
          }}
        >
          {next.frontmatter?.title}
        </Button>
      )}
    </Flex>
  );
};

export default ArticleNav;
