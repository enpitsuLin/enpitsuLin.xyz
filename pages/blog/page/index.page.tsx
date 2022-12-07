import { ListLayout } from '../../../components/ListLayout';
import { Props } from '../../blog.page.server';

export const Page: React.FC<Props> = (props) => {
  return (
    <>
      <ListLayout title="title" {...props} />
    </>
  );
};
