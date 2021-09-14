import React from 'react';
import { Container, Flex, Spacer, Box } from '@chakra-ui/react';
import List from './List';
import Introduction from './introduction';
import styled from 'styled-components';

const FooterWrap = styled.footer`
  padding: 2rem 0;
`;

const FooterBottom = styled.p`
  text-align: center;
  padding-bottom: 1rem;
  font-size: 0.875rem;
  line-height: 1.24rem;
`;

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
    <FooterWrap>
      <Container id="footer" maxW="container.xl" centerContent>
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

        <FooterBottom>&copy;{new Date().getFullYear()} | 用 ❤ 制作</FooterBottom>
      </Container>
    </FooterWrap>
  );
};

export default Footer;
