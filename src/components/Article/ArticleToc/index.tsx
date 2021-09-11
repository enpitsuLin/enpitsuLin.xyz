import Affix from '@/components/Affix';
import React, { FunctionComponent } from 'react';
import { FaListUl } from 'react-icons/fa';
import styled from 'styled-components';
import classNames from 'classnames';

const TocAffix = styled(Affix)`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const TocBody = styled.div`
  border-left: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.25rem 0;
  padding-left: 1rem;
  margin-top: 0.25rem;
  margin-left: 1rem;
`;

const TocTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
`;

const Heading = styled.li<{ depth: number }>`
  cursor: pointer;
  padding: 0.125rem 0;
  margin-left: ${props => props.depth * 0.5}rem;

  &:hover,
  &.active {
    color: rgb(0, 160, 160);
  }
`;

const HeadingList = styled.div`
  /* empty style */
`;

interface Props {
  headings: GatsbyTypes.MarkdownHeading[];
  active: string;
  onTocClick: (id: HTMLHeadingElement['id']) => void;
}

const ArticleToc: FunctionComponent<Props> = ({ headings, active, onTocClick }) => {
  return (
    <TocAffix offsetTop="3.5rem">
      <TocBody>
        <TocTitle>
          <FaListUl size={12} />
          <span>目录</span>
        </TocTitle>
        <HeadingList>
          <ul>
            {headings.map(item => (
              <Heading
                depth={item?.depth || 1}
                key={item.id}
                className={classNames(active === item.id && 'active')}
                onClick={() => onTocClick(item.id as string)}
              >
                {item.value}
              </Heading>
            ))}
          </ul>
        </HeadingList>
      </TocBody>
    </TocAffix>
  );
};

export default ArticleToc;
