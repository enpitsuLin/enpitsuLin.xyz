import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Text } from '@chakra-ui/react';

interface Props extends BoxProps {
  title: string;
}

const Brand: FunctionComponent<Props> = ({ title, ...props }) => {
  return (
    <Box id="brand" {...props}>
      <Text as={Link} to="/" fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
    </Box>
  );
};

export default Brand;
