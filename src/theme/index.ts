import { extendTheme } from '@chakra-ui/react';
import { mode, Styles } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'dark'
};

const styles: Styles = {
  global: props => ({
    body: {
      fontFamily: `Overpass, 'GlowSansSC', 'Helvetica Neue', 'microsoft yahei', -apple-system, BlinkMacSystemFont, Arial,
      sans-serif`,
      color: mode('gray.700', 'whiteAlpha.900')(props),
      bg: mode('gray.50', 'gray.900')(props),
      lineHeight: 'base'
    }
  })
};

const DefaultTheme = extendTheme({
  config,
  styles
});

export default DefaultTheme;
