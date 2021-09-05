import classNames from 'classnames';
import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { FaCalendar, FaTags, FaFileSignature, FaStopwatch } from 'react-icons/fa';
import { IconType } from 'react-icons';

type Props = {
  frontmatter: GatsbyTypes.Frontmatter;
  timeToRead: number;
  words: number;
};

const FrontMatterItem: FunctionComponent<{ icon: IconType; label?: string }> = props => (
  <span className="inline-flex items-center mr-1">
    <props.icon className="my-auto mr-1" />
    <span>{props.label || props.children}</span>
  </span>
);

const Frontmatter: FunctionComponent<Props> = ({ frontmatter, timeToRead, words }) => {
  const { date, tags } = frontmatter;
  return (
    <div className="my-2 text-sm text-gray-500">
      <FrontMatterItem icon={FaCalendar} label={date} />
      <FrontMatterItem icon={FaStopwatch} label={`阅读可能需要${timeToRead}分钟`} />
      <FrontMatterItem icon={FaFileSignature} label={`${words}字`} />
      <FrontMatterItem icon={FaTags}>
        {tags?.map(tag => (
          <Link
            key={tag}
            to="/"
            className={classNames(
              'rounded-sm',
              'mr-1 px-1',
              'leading-tight text-white font-semibold',
              'bg-primary-200 hover:bg-primary-300'
            )}
          >
            {tag}
          </Link>
        ))}
      </FrontMatterItem>
    </div>
  );
};

export default Frontmatter;
