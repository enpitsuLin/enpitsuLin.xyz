import React, { FunctionComponent, useEffect, useState } from 'react';
import { PageRendererProps } from 'gatsby';
import styled from 'styled-components';
import { BasicLayout } from '@/layouts/';
import Seo from '@/components/seo';
import useTypeWriter from '@/hooks/useTypewriter';
import AnimatedContent from '@/components/AnimatedContent';

type Props = PageRendererProps;

const BlogIndexContainer = styled.div`
  height: 100vh;
`;

const BackgroundContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(/images/blog-home-pic.png);
  background-size: cover;
  background-position: center center;
`;

const AlignCenterText = styled.div`
  color: var(--text-color);
  text-align: center;
  > p {
    font-size: 3rem;
    line-height: 1;
    font-weight: 500;
    padding: 0.25rem 0;
    margin: 0.75rem 0;
  }
  > div {
    padding: 0.25rem 0;
    margin: 0.5rem 0;
    height: 1.5rem;
  }
`;

const maxims = ['Sow nothing, reap noting', 'Do what you love, Love what you do', 'Man proposes, God disposes'];

const BlogIndex: FunctionComponent<Props> = ({ location }) => {
  const [maxim, setMaxim] = useState(maxims[0]);
  const text = useTypeWriter(maxim);
  useEffect(() => {
    const timer = setInterval(() => {
      setMaxim(maxims[Math.floor(Math.random() * maxims.length)]);
    }, 7000);
    return () => {
      clearInterval(timer);
    };
  }, [maxim]);
  return (
    <BasicLayout location={location}>
      <Seo title="首页" />
      <AnimatedContent>
        <BlogIndexContainer>
          <BackgroundContent>
            <AlignCenterText>
              <p>你好</p>
              <div>
                <span>{text || ' '}</span>
              </div>
            </AlignCenterText>
          </BackgroundContent>
        </BlogIndexContainer>
      </AnimatedContent>
    </BasicLayout>
  );
};

export default BlogIndex;
