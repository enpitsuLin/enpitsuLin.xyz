import { extendTheme } from '@chakra-ui/react';
import { mode, Styles } from '@chakra-ui/theme-tools';

const config = {
    initialColorMode: 'dark'
};

const colors = {
    gray: {
        50: '#f7f7f7',
        100: '#ededed',
        200: '#e2e2e2',
        300: '#cbcbcb',
        400: '#a0a0a0',
        500: '#717171',
        600: '#4a4a4a',
        700: '#2d2d2d',
        800: '#1a1a1a',
        900: '#171717'
    }
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

const DefaultTheme = extendTheme({ config, styles, colors });

export default DefaultTheme;
