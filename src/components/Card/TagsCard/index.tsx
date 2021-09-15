import useAllTag from '@/hooks/useAllTags';
import { navigateToSearchPage } from '@/utils/article';
import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';

import Card from '..';

const TagsCard: FunctionComponent = () => {
  const allTags = useAllTag();
  const tagBg = useColorModeValue('#eee', '#444');
  const tagHoverBg = useColorModeValue('#ddd', '#555');
  return (
    <Card hover={false}>
      <Flex flexWrap="wrap" alignItems="center">
        {Object.keys(allTags).map(item => {
          return (
            <Box
              as="span"
              key={item}
              bg={tagBg}
              display="inline-block"
              p="1px"
              mr={1}
              mb={1}
              borderRadius="base"
              cursor="pointer"
              _hover={{ bg: tagHoverBg }}
              onClick={() => {
                navigateToSearchPage(item);
              }}
            >
              <Box as="span" fontSize="14" p="4px">
                {item}
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
                {allTags[item]}
              </Box>
            </Box>
          );
        })}
      </Flex>
    </Card>
  );
};

export default TagsCard;
