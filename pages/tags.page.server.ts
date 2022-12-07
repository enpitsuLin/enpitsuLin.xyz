import { getTags } from '~/lib/sanity';
import { OnBeforeRenderServer } from '~/renderer/types';

export interface Props {
  tags: Record<string, number>;
}

export const onBeforeRender: OnBeforeRenderServer<Props> = async () => {
  const tags = await getTags();
  return {
    pageContext: {
      pageProps: { tags }
    }
  };
};
