import { ListLayout } from '~/components/ListLayout';
import { Props } from './blog.page.server';
import { PageSEO } from '~/components/SEO';

export const Page: React.FC<Props> = (props) => {
  return (
    <>
      <PageSEO title="Blog - enpitsulin" />
      <ListLayout
        title="All posts"
        posts={props.posts}
        initialDisplayPosts={props.posts.filter((_, i) => i < 5)}
        pagination={props.pagination}
      />
    </>
  );
};
