import React, { FunctionComponent, useState } from 'react';
import { Container as HeaderContainer, Flex } from '@chakra-ui/react';
import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';
import MenuLinks from './components/MenuLinks';
import Brand from './components/Brand';
import MenuToggle from './components/MenuToggle';

const HeaderWrap: FunctionComponent<BoxProps> = ({ ...props }) => {
  const styles = useStyleConfig('HeaderWrap', {});
  return <Box as="header" sx={styles} {...props} />;
};
const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py={3}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      {...props}
    >
      {children}
    </Flex>
  );
};
interface Props {
  title: string;
}

const Header: FunctionComponent<Props> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <HeaderWrap id="header">
      <HeaderContainer maxW="container.xl" px={10}>
        <NavBarContainer>
          <Brand title={title} />
          <MenuToggle toggle={toggle} isOpen={isOpen} />
          <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
      </HeaderContainer>
    </HeaderWrap>
  );
};

export default Header;
