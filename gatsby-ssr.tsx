import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './src/styles/theme';

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<ColorModeScript initialColorMode={theme.config.initialColorMode} key="chakra-ui-no-flash" />]);
};

export { wrapRootElement } from './gatsby-browser';
