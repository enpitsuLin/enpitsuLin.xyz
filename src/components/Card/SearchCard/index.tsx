import useAllArticles from '@/hooks/useAllArticles';
import { navigateToSearchPage } from '@/utils/article';
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import React, { FunctionComponent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Card from '../';

const SearchCard: FunctionComponent = () => {
  const [query, setQuery] = useState('');
  const articleCount = useAllArticles().length;
  return (
    <Card hover={false}>
      <InputGroup>
        <Input
          value={query}
          variant="outline"
          placeholder={`在${articleCount}篇文章中搜索`}
          _placeholder={{ position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)' }}
          onChange={val => {
            setQuery(val.target.value);
          }}
          onKeyUp={e => {
            e.preventDefault();
            if (e.code == 'Enter') {
              navigateToSearchPage(query);
            }
          }}
        />
        <InputRightAddon
          children={<FaSearch color="gray.300" />}
          cursor="pointer"
          onClick={() => {
            navigateToSearchPage(query);
          }}
        />
      </InputGroup>
    </Card>
  );
};

export default SearchCard;
