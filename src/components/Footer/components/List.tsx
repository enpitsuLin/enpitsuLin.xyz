import React from 'react';
import { Link, UnorderedList, ListItem } from '@chakra-ui/react';

interface Props {
  links: { name: string; link: string }[];
}

const List: React.FC<Props> = ({ links }) => {
  return (
    <UnorderedList spacing={1} listStyleType="none" marginStart="inherit">
      {links.map(({ name, link }) => (
        <ListItem key={name}>
          <Link href={link}>{name}</Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default List;
