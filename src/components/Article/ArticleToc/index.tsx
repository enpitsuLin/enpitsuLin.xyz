import Affix from '@/components/Affix';
import React, { FunctionComponent } from 'react';
import { FaListUl } from 'react-icons/fa';
import { Box, Flex, UnorderedList, ListItem } from '@chakra-ui/layout';

interface Props {
  headings: GatsbyTypes.MarkdownHeading[];
  active: string;
  onTocClick: (id: HTMLHeadingElement['id']) => void;
}

const ArticleToc: FunctionComponent<Props> = ({ headings, active, onTocClick }) => {
  return (
    <Affix fontSize="0.875rem" lineHeight="1.25rem" offsetTop="3.5rem">
      <Box borderStart="1px solid rgba(255, 255, 255, 0.25)" py="1" pl="4" mt="1" ml="4">
        <Flex alignItems="center" py="1">
          <FaListUl size={12} />
          <span>目录</span>
        </Flex>
        <Box>
          <UnorderedList>
            {headings.map(item => (
              <ListItem
                paddingStart={(item?.depth || 1) * 3}
                key={item.id}
                onClick={() => onTocClick(item.id as string)}
                listStyleType="none"
                color={active === item.id ? 'teal.400' : undefined}
                borderStart={active === item.id ? 'solid 3px #fff' : 'solid 3px #0000'}
                cursor="pointer"
                my={1}
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
