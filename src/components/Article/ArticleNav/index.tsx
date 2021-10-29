import { navigateToArticle } from '@/utils/article';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Spacer } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';

interface Props {
  previous: GatsbyTypes.MarkdownRemark;
  next: GatsbyTypes.MarkdownRemark;
}

const ArticleNav: FunctionComponent<Props> = ({ previous, next }) => {
  return (
    <Flex wrap="wrap" mt={16} mb={10}>
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
      <Spacer display={['block', 'block', 'none', 'none']} />
      {next && (
        <Button
          mt={['4', '4', '0', '0']}
          p={3}
          ml="auto"
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
