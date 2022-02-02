import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import DefaultTheme from './src/styles/theme';
import './src/styles/index.css';
import '@enpitsulin/gatsby-remark-shiki/style/toolbar.css';

export const wrapRootElement = props => {
  const { element } = props;
  return <ChakraProvider theme={DefaultTheme}>{element}</ChakraProvider>;
};
