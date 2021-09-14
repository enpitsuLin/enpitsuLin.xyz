import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import { Link } from '@chakra-ui/react';
import dayjs from 'dayjs';
import useSiteMetadata from '@/hooks/useSiteMetadata';
import RunningTime from './RunningTime';

const Introduction: FunctionComponent<HtmlHTMLAttributes<HTMLDivElement>> = attrs => {
  const { site } = useSiteMetadata();
  const lastUpdateTime = dayjs(site?.siteMetadata?.lastUpdateTime || '');
  return (
    <div {...attrs}>
      <p>
        👨🏼‍💻 本网站由
        <Link href="https://github.com/enpitsulin" target="_blank">
          enpitsulin
        </Link>
        摸鱼时编写
      </p>
      <p>
        📝 本站文章遵循
        <Link href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">
          CC BY-SA 4.0
        </Link>
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
