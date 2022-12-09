import { extractLocale } from '~/lib/locales';
import { PageContextServer } from './types';

export { onBeforeRoute };
function onBeforeRoute(pageContext: PageContextServer) {
  let urlMod = pageContext.urlOriginal;

  const { urlWithoutLocale, locale } = extractLocale(urlMod);
  urlMod = urlWithoutLocale;

  return {
    pageContext: {
      locale,
      urlOriginal: urlMod
    }
  };
}
