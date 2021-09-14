import React, { FunctionComponent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getDiffToNow } from '@/utils/datetime';
import { Tooltip } from '@chakra-ui/react';

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
        hasArrow
        placement="right"
        label={__BLOG_START_TIME__.format('YYYY-MM-DD[T]HH:mm:ssZ[Z]')}
        aria-label="running time"
      >
        <span>
          <strong className="font-bold px-1">{Math.floor(diff.asDays())}</strong>天
          <strong className="font-bold px-1">{diff.hours()}</strong>时
          <strong className="font-bold px-1">{diff.minutes()}</strong>分
          <strong className="font-bold px-1">{diff.seconds()}</strong>秒
        </span>
      </Tooltip>
    </span>
  );
};

export default RunningTime;
