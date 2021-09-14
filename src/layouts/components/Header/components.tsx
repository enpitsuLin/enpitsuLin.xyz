import { Box, BoxProps, Button, ButtonProps, useStyleConfig } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';

export const HeaderWrap: FunctionComponent<BoxProps> = ({ ...props }) => {
  const styles = useStyleConfig('HeaderWrap', {});
  return <Box as="header" sx={styles} {...props} />;
};

export const LinkButton: FunctionComponent<ButtonProps> = props => {
  const { children, ...rest } = props;
  const styles = useStyleConfig('LinkButton', {});
  return (
    <Button as="button" sx={styles} {...rest}>
      {children}
    </Button>
  );
};
