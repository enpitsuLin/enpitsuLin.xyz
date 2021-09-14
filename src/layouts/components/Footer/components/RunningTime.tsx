import React, { FunctionComponent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getDiffToNow } from '@/utils/datetime';
import { Tooltip, Text } from '@chakra-ui/react';

const __BLOG_START_TIME__ = dayjs('2019-03-26 19:00:00');

const getBlogDuration = () => {
  return getDiffToNow(__BLOG_START_TIME__);
};

const RunningTime: FunctionComponent = () => {
  const [diff, setDiff] = useState(getBlogDuration());

  useEffect(() => {
    const timer = setInterval(() => {
      setDiff(getBlogDuration());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <span>
      📅 博客已经运行
      <Tooltip
        borderRadius="md"
        hasArrow
        placement="right"
        label={__BLOG_START_TIME__.format('YYYY-MM-DD[T]HH:mm:ssZ[Z]')}
        aria-label="running time"
      >
        <Text as="span" mx="0.5">
          <Text as="strong" mx="0.5" className="font-bold px-1">
            {Math.floor(diff.asDays())}
          </Text>
          天
          <Text as="strong" mx="0.5" className="font-bold px-1">
            {diff.hours()}
          </Text>
          时
          <Text as="strong" mx="0.5" className="font-bold px-1">
            {diff.minutes()}
          </Text>
          分
          <Text as="strong" mx="0.5" className="font-bold px-1">
            {diff.seconds()}
          </Text>
          秒
        </Text>
      </Tooltip>
    </span>
  );
};

export default RunningTime;
