import theme, { Theme } from '@chakra-ui/theme';
import { mode, Styles } from '@chakra-ui/theme-tools';

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

const customTheme: Theme = {
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
  styles
};

export default customTheme;
