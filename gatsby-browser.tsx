import React from 'react';
import './src/styles/index.css';
import { ChakraProvider } from '@chakra-ui/react';
import DefaultTheme from './src/theme';
import 'prismjs/plugins/command-line/prism-command-line.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export const wrapRootElement = props => {
  const { element } = props;
  return <ChakraProvider theme={DefaultTheme}>{element}</ChakraProvider>;
};
