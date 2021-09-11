import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

const Pager = styled.ul`
  display: flex;
  user-select: none;
  cursor: pointer;
  li {
    display: block;
    background-color: var(--primary-200);
    color: #fff;
    height: 2rem;
    width: 2rem;
    text-align: center;
    line-height: 2rem;

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    &:hover,
    &.current {
      background-color: var(--primary-100);
    }
  }
`;

interface Props {
  pageCount: number;
  currentPage: number;
  onChange?: (targetVal: number) => void;
}

const Pagination: FunctionComponent<Props> = ({ currentPage, pageCount, onChange }) => {
  const [current, setCurrent] = useState(currentPage);

  return (
    <div>
      <Pager>
        <li>
          <span>‹</span>
        </li>
        {Array.from({ length: pageCount }).map((_, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                onChange && onChange(index + 1);
                setCurrent(index + 1);
              }}
              className={classNames(current == index + 1 && 'current')}
            >
              <span>{index + 1}</span>
            </li>
          );
        })}
        <li>
          <span>›</span>
        </li>
      </Pager>
    </div>
  );
};

export default Pagination;
