import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import Gitalk from 'gitalk';
import GitalkComponent from 'gitalk/dist/gitalk-component';
import './style.css';


const GitalkOptions: Gitalk.GitalkOptions = {
  clientID: '17c3d9f2a6836b2ca90a',
  clientSecret: 'ff16410038d51a8b22a6eefa747cccd110bc023b',
  repo: 'enpitsuLin.github.io',
  owner: 'enpitsuLin',
  admin: ['enpitsuLin'],
  distractionFreeMode: false
};

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}

const ArticleComment: FunctionComponent<Props> = ({ article }) => {
  const [mounted, setMounted] = useState(typeof window != 'undefined');
  const articleId = article.fields?.slug?.replace(/\//g, '') as string;

  useEffect(() => {
    if (typeof window != 'undefined' && !mounted) {
      setMounted(true);
    }
  });
  const options = {
    ...GitalkOptions,
    id: articleId.substring(0, 50),
    title: `[COMMENT] ${article.frontmatter?.title}`
  };
  return <Box>{mounted && <GitalkComponent options={options} />}</Box>;
};

export default ArticleComment;
