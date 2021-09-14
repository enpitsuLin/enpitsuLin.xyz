import { Link } from 'gatsby';
import React, { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';

const BrandLink = styled(Link)`
  overflow-wrap: break-word;
  display: inline-flex;
  font-size: 1.125rem;
  line-height: 1.25rem;
  white-space: no-wrap;
  align-items: center;
  
  &:hover {
    text-decoration: none;
  }
`;

interface Props {
  title: string;
  logo: ReactElement;
}

const Brand: FunctionComponent<Props> = ({ title, logo }) => {
  return (
    <BrandLink to="/" id="brand">
      {logo}
      {title}
    </BrandLink>
  );
};

export default Brand;
