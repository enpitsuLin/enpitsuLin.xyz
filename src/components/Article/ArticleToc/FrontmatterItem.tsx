import React, { FunctionComponent } from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

const Item = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 0.25rem;
`;

const FrontMatterItem: FunctionComponent<{ icon: IconType; label?: string }> = props => {
  return (
    <Item>
      <props.icon />
      <span>{props.label || props.children}</span>
    </Item>
  );
};

export default FrontMatterItem;
