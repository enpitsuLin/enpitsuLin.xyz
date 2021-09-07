import Affix from '@/components/Affix';
import React, { FunctionComponent } from 'react';
import { FaListUl } from 'react-icons/fa';

interface Props {
  headings: GatsbyTypes.MarkdownHeading[];
  onTocClick: (id: HTMLHeadingElement['id']) => void;
}

const ArticleToc: FunctionComponent<Props> = ({ headings, onTocClick }) => {
  return (
    <div className="hidden w-1/4 text-sm md:block">
      <Affix offsetTop={52.5} className="w-80">
        <div className="border-l border-white border-opacity-25 pl-4 py-1 mt-6 ml-4">
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
                  className="py-1 cursor-pointer hover:text-primary-400"
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
