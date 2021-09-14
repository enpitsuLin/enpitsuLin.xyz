import React, { FunctionComponent } from 'react';
import { Container as FooterContainer, Flex, Box, Center } from '@chakra-ui/react';
import List from './components/List';
import Bio from './components/Bio';
import { BoxProps, useStyleConfig } from '@chakra-ui/react';

export const FooterWrap: FunctionComponent<BoxProps> = props => {
  const styles = useStyleConfig('FooterWrap', {});
  return <Box as="footer" sx={styles} {...props} />;
};

const poweredBy = [
  { name: 'React', link: 'https://reactjs.org/' },
  { name: 'Gatsby', link: 'https://www.gatsbyjs.org/' },
  { name: 'GitHub Pages', link: 'https://pages.github.com/' },
  { name: 'Typescript', link: 'https://www.typescriptlang.org/' }
];
const themedWith = [
  { name: 'Chakra UI', link: 'https://chakra-ui.com/' },
  { name: 'React Icons', link: 'https://react-icons.github.io/react-icons/' }
];

const Footer: FunctionComponent = () => {
  return (
    <FooterWrap id="footer">
      <FooterContainer maxW="container.xl" pt={10} px={10}>
        <Flex w="100%">
          <Box flex="1">
            <Bio />
          </Box>
          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <h6>🚀 强力驱动</h6>
            <List links={poweredBy} />
          </Box>
          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <h6>🎨 描绘主题</h6>
            <List links={themedWith} />
          </Box>
        </Flex>

        <Center py={6} fontSize={12}>
          &copy;{new Date().getFullYear()} | 用 ❤ 制作
        </Center>
      </FooterContainer>
    </FooterWrap>
  );
};

export default Footer;
