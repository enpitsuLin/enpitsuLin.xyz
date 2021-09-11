import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { FaCalendar, FaTags, FaFileSignature, FaStopwatch } from 'react-icons/fa';
import styled from 'styled-components';
import { calcArticleWordCount } from '@/utils/article';
import FrontMatterItem from './ArticleToc/FrontmatterItem';

const ArticleFrontMatter = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.75rem;
  line-height: 1.5rem;
`;

const TagLink = styled(Link)`
  border-radius: 0.375rem;
  margin-right: 0.25rem;
  padding: 0.125rem 0.5rem;
  color: #fff;
  background-color: rgb(50, 179, 179);
  &:hover {
    background-color: rgb(25, 169, 169);
  }
`;

type Props = {
  article: GatsbyTypes.MarkdownRemark;
};

const Frontmatter: FunctionComponent<Props> = ({ article }) => {
  const frontmatter = article.frontmatter;
  const timeToRead = article.timeToRead;
  const words = calcArticleWordCount(article);

  const { date, tags } = frontmatter as GatsbyTypes.Frontmatter;
  return (
    <ArticleFrontMatter>
      <FrontMatterItem icon={FaTags}>
        {tags?.map(tag => (
          <TagLink key={tag} to="/">
            {tag}
          </TagLink>
        ))}
      </FrontMatterItem>
      <FrontMatterItem icon={FaCalendar} label={date} />
      <FrontMatterItem icon={FaStopwatch} label={`可能需要${timeToRead}分钟阅读`} />
      <FrontMatterItem icon={FaFileSignature} label={`${words}字`} />
    </ArticleFrontMatter>
  );
};

export default Frontmatter;
