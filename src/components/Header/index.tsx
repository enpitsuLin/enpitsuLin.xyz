import React, { FunctionComponent } from 'react';
import { Container as HeaderContainer, Flex, useColorModeValue } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

import Brand from './components/Brand';

import Nav from './components/Nav';

interface Props {
  title: string;
}
const NavList = [
  { name: '主页', link: '/' },
  { name: '文章', link: '/articles' },
  { name: '关于', link: '/about' }
];
const Header: FunctionComponent<Props> = ({ title }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderBottomColor = useColorModeValue('gray.100', 'gray.700');
  const boxShadow = useColorModeValue('0 0 10px 0 rgb(0 0 0 / 4%)', 'rgb(0 0 0 / 4%) 0px 0px 10px 0px');

  return (
    <Box
      as="header"
      position="fixed"
      left="0"
      right="0"
      top="0"
      zIndex="1000"
      bg={bg}
      borderBottomColor={borderBottomColor}
      borderBottomWidth="2px"
      boxShadow={boxShadow}
      id="header"
    >
      <HeaderContainer maxW="container.xl" px={[4, 4, 10, 10]}>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          w="100%"
          py={3}
          bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
        >
          <Brand title={title} />
          <Nav NavList={NavList} />
        </Flex>
      </HeaderContainer>
    </Box>
  );
};

export default Header;
