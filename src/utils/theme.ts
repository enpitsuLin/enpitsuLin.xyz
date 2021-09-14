import theme, { Theme } from '@chakra-ui/theme';
import { mode, Styles, createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1340px'
});

const styles: Styles = {
  ...theme.styles,
  global: props => ({
    ...theme.styles.global,
    fontFamily: 'body',
    fontWeight: 'light',
    color: mode('gray.100', 'whiteAlpha.900')(props),
    bg: mode('gray.700', 'gray.900')(props)
  })
};

const DefaultTheme: Theme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: `"Source Sans Pro",${theme.fonts.body}`,
    heading: `"Source Sans Pro",${theme.fonts.heading}`
  },
  colors: {
    ...theme.colors,
    black: '#131217'
  },
  config: {
    ...theme.config,
    useSystemColorMode: false,
    initialColorMode: 'dark'
  },
  styles,
  breakpoints
};

export default DefaultTheme;
