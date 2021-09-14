import React, { FunctionComponent } from 'react';

import { navigate } from 'gatsby';
import { Link, Text, Box, Button, Stack } from '@chakra-ui/react';

const MenuItem: FunctionComponent<{ to: string }> = ({ children, to = '/', ...rest }) => {
  return (
    <Link
      onClick={() => {
        navigate(to);
      }}
    >
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

interface Props {
  isOpen: boolean;
}

const MenuLinks: FunctionComponent<Props> = ({ isOpen }) => {
  return (
    <Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[5, 5, 0, 0]}
      >
        <MenuItem to="/">主页</MenuItem>
        <MenuItem to="/articles">文章 </MenuItem>
        <MenuItem to="/about">关于</MenuItem>
      </Stack>
    </Box>
  );
};

export default MenuLinks;
