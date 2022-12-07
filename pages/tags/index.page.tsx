import { ListLayout } from '~/components/ListLayout';
import { Props } from './index.page.server';

export const Page: React.FC<Props> = ({ tag, posts }) => {
  return <ListLayout posts={posts} title={tag} />;
};
