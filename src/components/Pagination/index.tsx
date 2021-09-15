import React, { FunctionComponent, useState } from 'react';
import { Stack, Button } from '@chakra-ui/react';

interface Props {
  pageCount: number;
  currentPage: number;
  onChange?: (targetVal: number) => void;
}

const Pagination: FunctionComponent<Props> = ({ currentPage, pageCount, onChange }) => {
  const [current, setCurrent] = useState(currentPage);

  return (
    <Stack spacing={2} my={4} direction="row" align="center">
      {Array.from({ length: pageCount }).map((_, index) => {
        return (
          <Button
            size="sm"
            key={index}
            onClick={() => {
              onChange && onChange(index + 1);
              setCurrent(index + 1);
            }}
            colorScheme={current == index + 1 ? 'blue' : undefined}
          >
            <span>{index + 1}</span>
          </Button>
        );
      })}
    </Stack>
  );
};

export default Pagination;
