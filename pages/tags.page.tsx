import { useMemo } from 'react';
import { Tag } from '~/components/Link';
import { Props } from './tags.page.server';

export const Page: React.FC<Props> = ({ tags }) => {
  const sortedTags = useMemo(() => Object.entries(tags).sort((a, b) => b[1] - a[1]), [tags]);
  return (
    <div>
      <div className="pt-6 pb-8 space-x-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Tags
        </h1>
      </div>
      <div className="flex flex-wrap w-full">
        {Object.keys(sortedTags).length === 0 && 'No tags found.'}
        {sortedTags.map(([tag, count]) => (
          <div
            key={tag}
            className="inline-flex flex-row items-center relative font-medium mt-2 mb-2 bg-day dark:bg-night bg-opacity-50 dark:bg-opacity-50"
          >
            <Tag className="px-2 py-1 text-sm font-medium" href={`/tags/${tag}`} key={tag} text={tag}>
              <span className="text-gray-900 dark:text-white ml-2 ">({count})</span>
            </Tag>
          </div>
        ))}
      </div>
    </div>
  );
};
