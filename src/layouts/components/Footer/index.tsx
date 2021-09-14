import React from 'react';
import { Container as FooterContainer, Flex, Box, Center } from '@chakra-ui/react';
import List from './List';
import Introduction from './introduction';
import { FooterWrap } from './components';

interface Props {}

const poweredBy = [
  { name: 'React', link: 'https://reactjs.org/' },
  { name: 'Gatsby', link: 'https://www.gatsbyjs.org/' },
  { name: 'GitHub Pages', link: 'https://pages.github.com/' },
  { name: 'Typescript', link: 'https://www.typescriptlang.org/' }
];
const themedWith = [
  { name: 'styled-components', link: 'https://www.styled-components.com/' },
  { name: 'React Icons', link: 'https://react-icons.github.io/react-icons/' },
  { name: 'React Bootstrap', link: 'https://react-bootstrap.github.io/' },
  { name: 'Bootstrap', link: 'https://getbootstrap.com/' }
];

const Footer: React.FC<Props> = () => {
  return (
    <FooterWrap id="footer">
      <FooterContainer maxW="container.xl" pt={10} px={10}>
        <Flex w="100%">
          <Box flex="1">
            <Introduction />
          </Box>
          <Box flex="1">
            <h6>🚀 强力驱动</h6>
            <List links={poweredBy} />
          </Box>
          <Box flex="1">
            <h6>🎨 描绘主题</h6>
            <List links={themedWith} />
          </Box>
        </Flex>

        <Center py={6} fontSize={12}>
          &copy;{new Date().getFullYear()} enpitsulin | 用 ❤ 制作
        </Center>
      </FooterContainer>
    </FooterWrap>
  );
};

export default Footer;
