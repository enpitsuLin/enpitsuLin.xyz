import React, { FunctionComponent, useEffect, useState, HtmlHTMLAttributes } from 'react';
import dayjs from 'dayjs';
import { getDiffToNow } from '@/utils/datetime';

const __BLOG_START_TIME__ = dayjs('2019-03-26 00:00:00');

const getBlogDuration = () => {
  return getDiffToNow(__BLOG_START_TIME__);
};

const Introduction: FunctionComponent<HtmlHTMLAttributes<HTMLDivElement>> = attrs => {
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
    <div {...attrs}>
      <p className="mb-4 text-base">
        👨🏼‍💻 本网站由
        <a href="https://github.com/enpitsulin" target="_blank" className="text-primary-400 hover:underline mx-1">
          enpitsulin
        </a>
        摸鱼时编写
      </p>
      <p className="mb-4 text-base">
        📝 本站文章遵循
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          className="text-primary-400 hover:underline mx-1"
        >
          CC BY-SA 4.0
        </a>
        协议
      </p>
      <p className="mb-4 text-base">
        <span>
          📅 博客已经运行
          <span className="font-bold px-1">{Math.floor(diff.asDays())}</span>天
          <span className="font-bold px-1">{diff.hours()}</span>时
          <span className="font-bold px-1">{diff.minutes()}</span>分
          <span className="font-bold px-1">{diff.seconds()}</span>秒
        </span>
      </p>
    </div>
  );
};

export default Introduction;
