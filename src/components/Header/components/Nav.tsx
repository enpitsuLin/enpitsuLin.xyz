import React, { FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { CloseButton } from '@chakra-ui/close-button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Button, IconButton, Box, HStack, VStack, useDisclosure, Slide } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Theme from './Theme';

interface Props {
  NavList: { name: string; link: string; icon: IconType }[];
}

const Nav: FunctionComponent<Props> = ({ NavList }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  return (
    <HStack display="flex" alignItems="center" spacing={1}>
      <HStack spacing={1} mr={1} display={{ base: 'none', md: 'inline-flex' }}>
        {NavList.map(item => (
          <Button
            key={item.name}
            variant="ghost"
            fontWeight="normal"
            leftIcon={<item.icon />}
            size="sm"
            onClick={() => {
              navigate(item.link);
            }}
          >
            {item.name}
          </Button>
        ))}
      </HStack>
      <Theme />
      <Box display={{ base: 'inline-flex', md: 'none' }}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="Open menu"
          fontSize="20px"
          color={useColorModeValue('gray.800', 'inherit')}
          variant="ghost"
          icon={<FaBars />}
          onClick={mobileNav.onOpen}
        />
        <Slide direction="top" in={mobileNav.isOpen} unmountOnExit>
          <VStack display="flex" flexDirection="column" p={2} pb={4} bg={bg} spacing={3} rounded="sm" shadow="sm">
            <CloseButton aria-label="Close menu" onClick={() => mobileNav.onClose()} />

            {NavList.map(item => (
              <Button
                key={item.name}
                w="full"
                variant="ghost"
                leftIcon={<item.icon />}
                onClick={() => {
                  navigate(item.link);
                }}
              >
                {item.name}
              </Button>
            ))}
          </VStack>
        </Slide>
      </Box>
    </HStack>
  );
};

export default Nav;
