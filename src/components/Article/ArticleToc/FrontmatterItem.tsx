import { Box, Text } from '@chakra-ui/layout';
import React, { FunctionComponent } from 'react';
import { IconType } from 'react-icons';

const FrontMatterItem: FunctionComponent<{ icon: IconType; label?: string }> = props => {
  return (
    <Box display="inline-flex" alignItems="center" marginEnd="0.25rem">
      <props.icon />
      <Text marginStart="0.5">{props.label || props.children}</Text>
    </Box>
  );
};

export default FrontMatterItem;
