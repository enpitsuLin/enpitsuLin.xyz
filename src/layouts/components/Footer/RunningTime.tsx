import React, { FunctionComponent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getDiffToNow } from '@/utils/datetime';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
      <OverlayTrigger
        delay={{ show: 250, hide: 400 }}
        placement="right"
        overlay={<Tooltip id="button-tooltip-2">{__BLOG_START_TIME__.format("YYYY-MM-DD[T]HH:mm:ssZ[Z]")}</Tooltip>}
      >
        <span>
          <strong className="font-bold px-1">{Math.floor(diff.asDays())}</strong>天
          <strong className="font-bold px-1">{diff.hours()}</strong>时
          <strong className="font-bold px-1">{diff.minutes()}</strong>分
          <strong className="font-bold px-1">{diff.seconds()}</strong>秒
        </span>
      </OverlayTrigger>
    </span>
  );
};

export default RunningTime;
