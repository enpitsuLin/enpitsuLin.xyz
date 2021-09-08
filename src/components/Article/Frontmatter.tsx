import classNames from 'classnames';
import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { FaCalendar, FaTags, FaFileSignature, FaStopwatch } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { calcArticleWordCount } from '@/utils/article';

type Props = {
  article: GatsbyTypes.MarkdownRemark;
};

const FrontMatterItem: FunctionComponent<{ icon: IconType; label?: string }> = props => (
  <span className="inline-flex items-center mr-1">
    <props.icon className="my-auto mr-1" />
    <span>{props.label || props.children}</span>
  </span>
);

const Frontmatter: FunctionComponent<Props> = ({ article }) => {
  const frontmatter = article.frontmatter;
  const timeToRead = article.timeToRead;
  const words = calcArticleWordCount(article);

  const { date, tags } = frontmatter as GatsbyTypes.Frontmatter;
  return (
    <div className="py-2 text-xs">
      <FrontMatterItem icon={FaTags}>
        {tags?.map(tag => (
          <Link
            key={tag}
            to="/"
            className={classNames(
              'rounded-md',
              'mr-1 px-2 py-0.5',
              'leading-tight text-white',
              'bg-primary-200 hover:bg-primary-300'
            )}
          >
            {tag}
          </Link>
        ))}
      </FrontMatterItem>
      <FrontMatterItem icon={FaCalendar} label={date} />
      <FrontMatterItem icon={FaStopwatch} label={`可能需要${timeToRead}分钟阅读`} />
      <FrontMatterItem icon={FaFileSignature} label={`${words}字`} />
    </div>
  );
};

export default Frontmatter;
