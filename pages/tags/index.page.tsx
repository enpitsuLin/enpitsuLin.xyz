import { ListLayout } from '~/components/ListLayout';
import { PageSEO } from '~/components/SEO';
import { Props } from './index.page.server';

export const Page: React.FC<Props> = ({ tag, posts }) => {
  return (
    <>
      <PageSEO title={`${tag} - enpitsulin`} description="Make things happy" />
      <ListLayout posts={posts} title={tag} />
    </>
  );
};
