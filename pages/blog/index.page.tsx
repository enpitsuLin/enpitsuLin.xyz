import { PostWrapper } from './PostWrapper';

export const Page: React.FC<any> = (props) => {
  return (
    <PostWrapper>
      <div dangerouslySetInnerHTML={{ __html: props.html }}></div>
    </PostWrapper>
  );
};
