import { ListLayout } from '~/components/ListLayout';
import { Props } from './blog.page.server';

export const Page: React.FC<Props> = (props) => {
  return (
    <>
      <ListLayout
        title="title"
        posts={props.posts}
        initialDisplayPosts={props.posts.filter((_, i) => i < 5)}
        pagination={props.pagination}
      />
    </>
  );
};
