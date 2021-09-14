import { extendTheme } from '@chakra-ui/react';
import { mode, Styles } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'dark'
};

const styles: Styles = {
  global: props => ({
    body: {
      fontFamily: 'body',
      color: mode('gray.700', 'whiteAlpha.900')(props),
      bg: mode('gray.50', 'gray.900')(props),
      lineHeight: 'base'
    }
  })
};

const DefaultTheme = extendTheme({
  config,
  styles,
  components: {
    HeaderWrap: {
      baseStyle: ({ colorMode }) => ({
        /*  position: 'fixed',
        width: '100%', */
        borderBottomWidth: '2px',
        borderBottomColor: colorMode === 'dark' ? 'gray.700' : 'gray.100',
        bg: colorMode === 'dark' ? 'gray.800' : 'white'
      })
    },
    FooterWrap: {
      baseStyle: ({ colorMode }) => ({
        borderTopWidth: '2px',
        borderTopColor: colorMode === 'dark' ? 'gray.700' : 'gray.100',
        bg: colorMode === 'dark' ? 'gray.800' : 'white'
      })
    }
  }
});

export default DefaultTheme;
