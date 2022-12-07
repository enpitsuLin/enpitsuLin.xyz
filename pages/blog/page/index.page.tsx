import { ListLayout } from '~/components/ListLayout';
import { Props } from './index.page.server';

export const Page: React.FC<Props> = (props) => {
  return (
    <>
      <ListLayout title="title" {...props} />
    </>
  );
};
