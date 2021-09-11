import useSiteMetadata from '@/hooks/useSiteMetadata';
import dayjs from 'dayjs';
import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import RunningTime from './RunningTime';

const Introduction: FunctionComponent<HtmlHTMLAttributes<HTMLDivElement>> = attrs => {
  const { site } = useSiteMetadata();
  const lastUpdateTime = dayjs(site?.siteMetadata?.lastUpdateTime || '');
  return (
    <div {...attrs}>
      <p>
        👨🏼‍💻 本网站由
        <a href="https://github.com/enpitsulin" target="_blank" className="text-primary-400 hover:underline mx-1">
          enpitsulin
        </a>
        摸鱼时编写
      </p>
      <p>
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
      <p>
        ⏲️ 最后更新:<strong>{lastUpdateTime.format('YYYY-MM-DD[T]HH:mm:ssZ[Z]')}</strong>
      </p>
      <p>
        <RunningTime />
      </p>
    </div>
  );
};

export default Introduction;
