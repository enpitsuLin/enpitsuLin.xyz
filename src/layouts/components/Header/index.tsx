import React, { FunctionComponent } from 'react';
import { FaHome, FaInfo, FaSun, FaBookOpen, FaComment, FaMoon } from 'react-icons/fa';
import { IconButton, Container as HeaderContainer, Flex, useColorMode } from '@chakra-ui/react';
import { HeaderWrap, LinkButton } from './components';
import { navigate } from 'gatsby';
import Brand from './Brand';
import Logo from '@/assets/images/logo.svg';

interface Props {
  title: string;
}

const Header: FunctionComponent<Props> = ({ title }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navList = [
    { path: '/', title: '首页', icon: FaHome },
    { path: '/articles', title: '文章', icon: FaBookOpen },
    { path: '/comments', title: '留言', icon: FaComment },
    { path: '/about', title: '关于', icon: FaInfo }
  ];

  return (
    <HeaderWrap id="header">
      <HeaderContainer maxW="container.xl" px={10}>
        <Flex justify="space-between" py={2}>
          <Brand title={title} logo={<img src={Logo} style={{ height: 40, width: 40, marginRight: 6 }} />} />
          <Flex>
            {navList.map(item => (
              <LinkButton
                as="button"
                mx={1}
                leftIcon={<item.icon />}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.title}
              </LinkButton>
            ))}
            <IconButton
              ml={5}
              aria-label="Theme"
              icon={colorMode == 'light' ? <FaMoon /> : <FaSun />}
              onClick={() => {
                toggleColorMode();
              }}
            />
          </Flex>
        </Flex>
      </HeaderContainer>
    </HeaderWrap>
  );
};

export default Header;
