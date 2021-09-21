import React, { FunctionComponent } from 'react';
import { PageRendererProps } from 'gatsby';

import { BasicLayout } from '@/layouts/';
import Seo from '@/components/seo';
import AnimatedContent from '@/components/AnimatedContent';
import { Box, Container, Flex } from '@chakra-ui/layout';

type Props = PageRendererProps;

const About: FunctionComponent<Props> = ({ location }) => {
  return (
    <BasicLayout location={location}>
      <Seo title="关于" />
      <AnimatedContent>
        <Container maxW="container.xl">
          <Flex>
            <Box w="full">关于我</Box>
          </Flex>
        </Container>
      </AnimatedContent>
    </BasicLayout>
  );
};

export default About;
