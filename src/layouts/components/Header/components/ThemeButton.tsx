import React, { FunctionComponent } from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeButton: FunctionComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      variant="ghost"
      aria-label="Theme"
      icon={colorMode == 'light' ? <FaMoon /> : <FaSun />}
      onClick={() => {
        toggleColorMode();
      }}
    />
  );
};

export default ThemeButton;
