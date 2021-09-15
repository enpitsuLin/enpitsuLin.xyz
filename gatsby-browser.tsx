import React from 'react';
import './src/styles/index.css';
import { ChakraProvider } from '@chakra-ui/react';
import DefaultTheme from './src/theme';

export const wrapRootElement = ({ element }) => <ChakraProvider theme={DefaultTheme}>{element}</ChakraProvider>;
