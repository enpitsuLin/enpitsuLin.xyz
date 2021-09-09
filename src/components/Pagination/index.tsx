import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

interface Props {
  pageCount: number;
  currentPage: number;
  onChange?: (targetVal: number) => void;
}

const Pagination: FunctionComponent<Props> = ({ currentPage, pageCount, onChange }) => {
  const [current, setCurrent] = useState(currentPage);

  const pageItemCls = classNames('hover:bg-primary-100', 'leading-8 text-center text-white', 'h-8 w-8');
  return (
    <div>
      <ul className="flex select-none cursor-pointer">
        <li
          className={classNames(pageItemCls, 'bg-primary-200')}
          style={{ borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}
        >
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
              className={classNames(current == index + 1 ? 'bg-primary-100' : 'bg-primary-200', pageItemCls)}
            >
              <span>{index + 1}</span>
            </li>
          );
        })}
        <li
          className={classNames(pageItemCls, 'bg-primary-200')}
          style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}
        >
          <span>›</span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
