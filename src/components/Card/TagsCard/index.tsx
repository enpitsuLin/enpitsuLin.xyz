import useAllTag from '@/hooks/useAllTags';
import { navigateToTagPage } from '@/utils/article';
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
              as="a"
              key={item.tag}
              bg={tagBg}
              display="inline-block"
              p="2px"
              mr={1}
              mb={1}
              cursor="pointer"
              borderRadius="base"
              title={`搜索带有 ${item.tag} 标签的文章`}
              transition="background-color .2s linear"
              _hover={{ bg: tagHoverBg }}
              onClick={() => {
                navigateToTagPage(item.tag);
              }}
            >
              <Box as="span" fontSize="14" p="4px">
                {item.tag}
              </Box>
              <Box
                as="span"
                display="inline-block"
                borderRadius="base"
                fontSize="75%"
                fontWeight="700"
                lineHeight="none"
                bg="teal.400"
                p=".25em .4em"
                color="#fff"
                textAlign="center"
                verticalAlign="text-bottom"
                whiteSpace="nowrap"
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
