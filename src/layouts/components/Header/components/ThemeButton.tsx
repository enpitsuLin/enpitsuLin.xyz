import React, { FunctionComponent } from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeButton: FunctionComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={() => {
        toggleColorMode();
      }}
      aria-label="Theme"
      icon={colorMode == 'light' ? <FaMoon /> : <FaSun />}
    />
  );
};

export default ThemeButton;
