import React, { FunctionComponent } from 'react';
import { Link, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import dayjs from 'dayjs';
import useSiteMetadata from '@/hooks/useSiteMetadata';
import RunningTime from './RunningTime';

const Introduction: FunctionComponent = () => {
  const { site } = useSiteMetadata();
  const lastUpdateTime = dayjs(site?.siteMetadata?.lastUpdateTime || '');
  return (
    <UnorderedList spacing={3} listStyleType="none" marginStart="inherit">
      <ListItem>
        👨🏼‍💻 本网站由
        <Link href="https://github.com/enpitsulin" target="_blank" mx="1">
          enpitsulin
        </Link>
        摸鱼时编写
      </ListItem>
      <ListItem>
        📝 本站文章遵循
        <Link href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" mx="1">
          CC BY-SA 4.0
        </Link>
        协议
      </ListItem>
      <ListItem>
        ⏲️ 最后更新:
        <Text as="strong" mx="1">
          {lastUpdateTime.format('YYYY-MM-DD[T]HH:mm:ssZ[Z]')}
        </Text>
      </ListItem>
      <ListItem>
        <RunningTime />
      </ListItem>
    </UnorderedList>
  );
};

export default Introduction;
