import Affix from '@/components/Affix';
import React, { FunctionComponent } from 'react';
import { FaListUl } from 'react-icons/fa';
import classNames from 'classnames';

interface Props {
  headings: GatsbyTypes.MarkdownHeading[];
  active: string;
  onTocClick: (id: HTMLHeadingElement['id']) => void;
}

const ArticleToc: FunctionComponent<Props> = ({ headings, active, onTocClick }) => {
  return (
    <div className={classNames('hidden md:block', 'relative h-auto', 'w-1/4 flex-1/4 text-sm')}>
      <Affix offsetTop="3.5rem" className="pt-1">
        <div className="border-l border-white border-opacity-25 pl-4 py-1 mt-5 ml-4">
          <div className="flex items-center py-1">
            <FaListUl size={12} className="mr-2" />
            <span>目录</span>
          </div>
          <div>
            <ul>
              {headings.map(item => (
                <li
                  key={item.id}
                  style={{ marginLeft: (item?.depth || 1) * 8 }}
                  className={classNames(
                    'py-0.5 cursor-pointer hover:text-primary-400',
                    active === item.id && 'text-primary-400'
                  )}
                  onClick={() => onTocClick(item.id as string)}
                >
                  {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Affix>
    </div>
  );
};

export default ArticleToc;
