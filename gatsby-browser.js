import React from 'react';
// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';
// custom CSS styles
import './src/styles/index.css';
import { ChakraProvider } from '@chakra-ui/react';
import DefaultTheme from './src/utils/theme';
const wrapRootElement = ({ element }) => <ChakraProvider theme={DefaultTheme}>{element}</ChakraProvider>;
module.exports = { wrapRootElement };
