import React, { FunctionComponent, useState } from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Props {
  pageCount: number;
  currentPage: number;
  onChange?: (targetVal: number) => void;
}

const Pagination: FunctionComponent<Props> = ({ currentPage, pageCount, onChange }) => {
  const [current, setCurrent] = useState(currentPage);

  const renderPreviousPage = () => {
    if (current != 1)
      return (
        <Button
          size="sm"
          onClick={() => {
            onChange && onChange(current - 1);
          }}
        >
          <FaArrowLeft />
        </Button>
      );
  };
  const renderNextPage = () => {
    if (current != pageCount)
      return (
        <Button
          size="sm"
          onClick={() => {
            onChange && onChange(current + 1);
          }}
        >
          <FaArrowRight />
        </Button>
      );
  };
  const renderPager = () => {
    return Array.from({ length: pageCount }).map((_, index) => {
      return (
        <Button
          size="sm"
          key={index}
          onClick={() => {
            onChange && onChange(index + 1);
            setCurrent(index + 1);
          }}
          bg={current == index + 1 ? 'teal.400' : undefined}
          color={current == index + 1 ? 'white' : undefined}
        >
          <span>{index + 1}</span>
        </Button>
      );
    });
  };
  return (
    <Stack spacing={2} my={4} direction="row" align="center">
      {renderPreviousPage()}
      {renderPager()}
      {renderNextPage()}
    </Stack>
  );
};

export default Pagination;
