import React from 'react';
import styled from 'styled-components';
import { Link } from '@chakra-ui/react';

interface Props {
  links: { name: string; link: string }[];
}

const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const Li = styled.li`
  padding-bottom: 4px;
`;

const List: React.FC<Props> = ({ links }) => {
  return (
    <Ul>
      {links.map(({ name, link }) => (
        <Li key={name}>
          <Link href={link}>{name}</Link>
        </Li>
      ))}
    </Ul>
  );
};

export default List;
