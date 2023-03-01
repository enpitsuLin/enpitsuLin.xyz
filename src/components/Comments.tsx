import { createEffect, onCleanup } from 'solid-js';
import DisqusJS from 'disqusjs';

type Props = {
  base: string;
  slug: string;
};

export default function Comments(props: Props) {
  let comments: HTMLDivElement | undefined;
  function initDisqus() {
    const disqus = new DisqusJS({
      url: new URL(document.location.pathname, props.base).toString(),
      identifier: props.slug,
      shortname: 'enpitsulin',
      siteName: `enpitsulin's blog`,
      api: 'https://disqusjs.enpitsulin.xyz/',
      apikey: import.meta.env.VITE_DISQUS_APIKEY
    });
    return disqus;
  }
  createEffect(() => {
    const disqus = initDisqus();
    if (!comments) return;
    disqus.render(comments);
    onCleanup(() => {
      if (!comments) return;
      disqus.destroy();
    });
  });
  return (
    <div
      ref={comments}
      id="comment"
      class="min-h-8 pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
      style={{ 'color-scheme': 'light' }}
    ></div>
  );
}
