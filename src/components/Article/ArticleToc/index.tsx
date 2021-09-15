import Affix from '@/components/Affix';
import React, { FunctionComponent } from 'react';
import { FaListUl } from 'react-icons/fa';
import { Box, Flex, UnorderedList, ListItem } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';

interface Props {
  headings: GatsbyTypes.MarkdownHeading[];
  active: string;
  onTocClick: (id: HTMLHeadingElement['id']) => void;
}

const ArticleToc: FunctionComponent<Props> = ({ headings, active, onTocClick }) => {
  const borderStartColor = useColorModeValue('#3334', '#fff4');
  const HeadingBorderStart = useColorModeValue('#3334', '#fff');
  return (
    <Affix lineHeight="1.25rem" offsetTop="66px">
      <Box borderStartWidth="1px" borderStartColor={borderStartColor} py="1" pl="4" mt="1" ml="4">
        <Flex alignItems="center" py="1">
          <FaListUl size={14} />
          <span>目录</span>
        </Flex>
        <Box>
          <UnorderedList>
            {headings.map(item => (
              <ListItem
                fontSize="0.825rem"
                lineHeight="base"
                paddingStart={(item?.depth || 1) * 3}
                key={item.id}
                onClick={() => onTocClick(item.id as string)}
                listStyleType="none"
                color={active === item.id ? 'teal.400' : undefined}
                borderStartWidth="3px"
                borderStartColor={active === item.id ? HeadingBorderStart : '#0000'}
                cursor="pointer"
                my={2}
              >
                {item.value}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Box>
    </Affix>
  );
};

export default ArticleToc;
