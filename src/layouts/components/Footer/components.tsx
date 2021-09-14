import React, { FunctionComponent } from 'react';
import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

export const FooterWrap: FunctionComponent<BoxProps> = props => {
  const styles = useStyleConfig('FooterWrap', {});
  return <Box as="footer" sx={styles} {...props} />;
};
