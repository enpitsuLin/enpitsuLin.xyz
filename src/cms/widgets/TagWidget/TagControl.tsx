import { CmsWidgetControlProps } from 'netlify-cms-core';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const TagWrapper = styled.div`
  &::before,
  &::after {
    display: table;
    content: '';
  }
`;

const TagInput = styled.div`
  &::after {
    display: inline-block;
    width: 0;
    visibility: hidden;
    content: '';
    pointer-events: none;
  }
  ul {
    display: inline-block;
    flex-wrap: nowrap;
    overflow: hidden;
    list-style: none;
    margin: 0;
    padding: 0;
    > li {
      height: 24px;
      margin-top: 3px;
      line-height: 22px;
      position: static;
      float: left;
      width: auto;
      max-width: 100%;
      padding: 0;
    }
    .tag-control-choice {
      position: relative;
      float: left;
      max-width: 99%;
      margin-right: 4px;
      padding: 0 20px 0 10px;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.65);
      background-color: #fafafa;
      border: 1px solid #e8e8e8;
      border-radius: 2px;
      cursor: default;
      transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .tag-control-choice__content {
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  .tag-control-choice__remove {
    font-style: normal;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    right: 4px;
    color: rgba(0, 0, 0, 0.45);
    font-weight: 700;
    line-height: inherit;
    cursor: pointer;
    transition: all 0.3s;
    display: inline-block;
    transform: scale(0.83333333) rotate(0deg);
  }
  .tag-control__field {
    position: static;
    float: left;
    width: auto;
    max-width: 100%;
    padding: 0;
  }
`;
//@ts-ignore
const TagControl: React.FC<CmsWidgetControlProps<string[]>> = ({ classNameWrapper, forID, value: originValue = [], onChange, setActiveStyle, setInactiveStyle
}) => {
  const [tags, setTags] = useState<string[]>(originValue);
  const [value, setValue] = useState('');

  const handleTags = (newTags: string[]) => {
    setTags(() => {
      onChange(newTags);
      return newTags;
    });
  };

  return (
    <TagWrapper>
      <TagInput className={['tag-control', classNameWrapper].join(' ')}>
        <ul>
          {tags.map(tag => (
            <li key={tag} className="tag-control-choice">
              <div className="tag-control-choice__content">{tag}</div>
              <RemoveButton
                onClick={() => {
                  handleTags(tags.filter(item => item != tag));
                }}
              />
            </li>
          ))}
          <li className="tag-control__field">
            <input
              type="text"
              id={forID}
              className="tag-control__inner"
              value={value}
              onInput={e => {
                setValue((e.target as HTMLInputElement).value);
              }}
              onKeyDown={e => {
                const tag = (e.target as HTMLInputElement).value;
                if (value !== '' && e.key === 'Enter' && !tags.includes(tag)) {
                  handleTags([...tags, tag]);
                  setValue('');
                } else if (tags.includes(tag)) {
                  console.log(`${tag} exist`);
                }
              }}
              onFocus={setActiveStyle}
              onBlur={setInactiveStyle}
            />
          </li>
        </ul>
      </TagInput>
    </TagWrapper>
  );
};

export default TagControl;

const RemoveIcon = styled.i`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
`;

const RemoveButton: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
> = attr => {
  return (
    <span className="tag-control-choice__remove" {...attr}>
      <RemoveIcon aria-label="close">
        <svg
          viewBox="64 64 896 896"
          data-icon="close"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
        </svg>
      </RemoveIcon>
    </span>
  );
};
