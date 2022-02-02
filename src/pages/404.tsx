import React from 'react';
import { PageRendererProps, navigate } from 'gatsby';
import { BasicLayout } from '@/components/BasicLayout';
import Seo from '@/components/seo';
import AnimatedContent from '@/components/AnimatedContent';
import { Container, Flex, Box, Badge, Button, Text } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

type Props = PageRendererProps;

const NotFoundPage: React.FC<Props> = ({ location }) => {
  return (
    <BasicLayout location={location}>
      <Seo title="404: Not Found" />
      <AnimatedContent>
        <Container maxW="container.xl">
          <Flex alignItems="center" alignContent="center" justifyContent="center" mt={4}>
            <Box>
              <Badge borderRadius="full" px="2" colorScheme="teal">
                404: Not Found
              </Badge>
              <Text fontSize="2xl">four oh-four~</Text>
              <Text mb={8} fontSize="xl">
                You just hit a route that doesn&#39;t exist... the sadness.
              </Text>

              <Text fontSize="2xl">404~</Text>
              <Text mb={8} fontSize="xl">
                你来到了一个荒无人烟的地方。
              </Text>
              <Button colorScheme="teal" variant="outline" onClick={() => navigate('/')} leftIcon={<FaHome />}>
                回到主页
              </Button>
            </Box>
          </Flex>
        </Container>
      </AnimatedContent>
    </BasicLayout>
  );
};

export default NotFoundPage;
