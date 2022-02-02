import React, { FunctionComponent } from 'react';
import { PageRendererProps } from 'gatsby';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FaClock } from 'react-icons/fa';

import useSiteMetadata from '@/hooks/useSiteMetadata';
import { BasicLayout } from '@/components/BasicLayout';
import Seo from '@/components/seo';
import useTypeWriter from '@/hooks/useTypewriter';
import AnimatedContent from '@/components/AnimatedContent';

import CanvasNest from '@/components/CanvasNest';
import dayjs from 'dayjs';
import Contacts from '@/components/Contacts';

type Props = PageRendererProps;

const maxims = ['来自一个有梦想 、 暂时碌碌无为的人'];

const BlinkCursor = styled(Box)`
  opacity: 0.6;
  animation: blink 1.2s linear infinite;
  @keyframes blink {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    40.1% {
      opacity: 1;
    }
    99.9% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const BlogIndex: FunctionComponent<Props> = ({ location }) => {
  const text = useTypeWriter(maxims);
  const { site } = useSiteMetadata();
  const lastUpdateTime = dayjs(site?.siteMetadata?.lastUpdateTime || '');

  return (
    <BasicLayout location={location}>
      <Seo title="首页" />
      <AnimatedContent>
        <Box h="calc(100vh - 4.5rem)">
          <CanvasNest options={{ color: 'rgb(100,100,100)', maxDist: 10000 }}>
            <Flex alignItems="center" w="full" h="full" justifyContent="center">
              <Box textAlign="center">
                <Text fontSize="3rem" fontWeight="500" py={1} my={3}>
                  你好
                </Text>
                <Text as="p" py={1} my={2} h={6}>
                  <span>{text || ' '}</span>
                  <BlinkCursor as="span">|</BlinkCursor>
                </Text>
                <Box py={1} my={2}></Box>
                <Contacts mb={4} />
                <Text as="p" py={1} my={2}>
                  <Icon as={FaClock} mt="-3px" mr={1} />
                  最后更新
                  <Text as="strong" mx="1">
                    {lastUpdateTime.format('YYYY-MM-DD[T]HH:mm:ssZ[Z]')}
                  </Text>
                </Text>
              </Box>
            </Flex>
          </CanvasNest>
        </Box>
      </AnimatedContent>
    </BasicLayout>
  );
};

export default BlogIndex;
