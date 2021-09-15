import useAllTag from '@/hooks/useAllTags';
import { navigateToSearchPage } from '@/utils/article';
import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';

import Card from '..';

const TagsCard: FunctionComponent = () => {
  const allTags = useAllTag();

  const tagBg = useColorModeValue('gray.100', 'rgba(226, 232, 240, 0.16)');
  const tagHoverBg = useColorModeValue('#0003', '#fff3');
  return (
    <Card hover={false}>
      <Flex flexWrap="wrap" alignItems="center">
        {allTags.map(item => {
          return (
            <Box
              as="span"
              key={item.tag}
              bg={tagBg}
              display="inline-block"
              p="1px"
              mr={1}
              mb={1}
              borderRadius="base"
              cursor="pointer"
              _hover={{ bg: tagHoverBg }}
              onClick={() => {
                navigateToSearchPage(item.tag);
              }}
            >
              <Box as="span" fontSize="14" p="4px">
                {item.tag}
              </Box>
              <Box
                as="span"
                fontSize="75%"
                fontWeight="700"
                lineHeight="none"
                bg="teal.400"
                py="0.25rem"
                color="#fff"
                textAlign="center"
                px="0.4rem"
                ml={1}
                borderRadius="base"
              >
                {item.count}
              </Box>
            </Box>
          );
        })}
      </Flex>
    </Card>
  );
};

export default TagsCard;
