import React, { FunctionComponent } from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

interface Props extends BoxProps {
  /** disable hover boxShadow */
  hover?: boolean;
}

const defaultProps: Props = {
  hover: true
};

const Card: FunctionComponent<Props> = ({ hover, children } = defaultProps) => {
  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('base', 'dark-lg');
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} my={2} bg={bg} _hover={hover ? { boxShadow } : {}}>
      {children}
    </Box>
  );
};

Card.defaultProps = defaultProps;

export default Card;
