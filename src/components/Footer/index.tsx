import React, { FunctionComponent } from 'react';
import { Container as FooterContainer, Flex, Box, Center, useColorModeValue } from '@chakra-ui/react';
import List from './components/List';
import Bio from './components/Bio';
import { BoxProps } from '@chakra-ui/react';

export const FooterWrap: FunctionComponent<BoxProps> = props => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderTopColor = useColorModeValue('gray.100', 'gray.700');
  const boxShadow = useColorModeValue('0 0 10px 0 rgb(0 0 0 / 4%)', 'rgb(0 0 0 / 4%) 0px 0px 10px 0px');
  return <Box as="footer" bg={bg} borderTopColor={borderTopColor} boxShadow={boxShadow} {...props} />;
};

const poweredBy = [
  { name: 'React', link: 'https://reactjs.org/' },
  { name: 'Gatsby', link: 'https://www.gatsbyjs.org/' },
  { name: 'GitHub Pages', link: 'https://pages.github.com/' },
  { name: 'Typescript', link: 'https://www.typescriptlang.org/' }
];
const themedWith = [
  { name: 'Chakra UI', link: 'https://chakra-ui.com/' },
  { name: 'React Icons', link: 'https://react-icons.github.io/react-icons/' },
  { name: 'emotion', link: 'https://emotion.sh/docs/introduction' }
];

const Footer: FunctionComponent = () => {
  return (
    <FooterWrap id="footer">
      <FooterContainer maxW="container.xl" pt={10} px={[4, 4, 10, 10]}>
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

        <Center pt={6} pb={10} fontSize="sm">
          &copy;{new Date().getFullYear()} | 用 ❤ 制作
        </Center>
      </FooterContainer>
    </FooterWrap>
  );
};

export default Footer;
