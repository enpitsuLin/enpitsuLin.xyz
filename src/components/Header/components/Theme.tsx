import React, { FunctionComponent } from 'react';
import { Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import styled from '@emotion/styled';

const ThemeSwitch = styled(Box)`
  &:hover {
    #switch-knob {
      box-shadow: var(--chakra-shadows-outline);
    }
  }
`;

const Theme: FunctionComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const transform = useColorModeValue('translateX(0px)', 'translateX(12px)');
  const borderColor = useColorModeValue('gray.500', 'teal.600');
  const bg = useColorModeValue('gray.500', 'gray.700');
  const color = useColorModeValue('white', 'teal.600');
  return (
    <ThemeSwitch
      as="button"
      type="button"
      role="switch"
      aria-label="toggle light/dark mode"
      display="flex"
      alignItems="center"
      width="30px"
      outline="2px solid #0000"
      outlineOffset="2px"
      pos="relative"
      onClick={() => {
        toggleColorMode();
      }}
    >
      <Box id="switch-track" pos="absolute" borderRadius="full" width="30px" height="3" bg="gray.700"></Box>
      <Box
        id="switch-knob"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="18px"
        height="18px"
        borderRadius="full"
        transform={transform}
        transition="transform 0.2s ease,box-shadow 0.8s ease-out"
        bg={bg}
        borderWidth="1px"
        borderColor={borderColor}
        color={color}
      >
        {colorMode == 'dark' ? <FaMoon size={12} /> : <FaSun size={12} />}
      </Box>
    </ThemeSwitch>
  );
};

export default Theme;
