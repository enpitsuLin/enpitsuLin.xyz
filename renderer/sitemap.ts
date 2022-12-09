import { writeFile } from 'fs/promises';
import { siteMeta } from '~/package.json';
import { PageContext } from './types';

export { buildSitemap };

const createSitemap = (urls: string[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => `<url><loc>${`${siteMeta.siteUrl}${url}`}</loc></url> `).join('\n    ')}
</urlset>
`;
};

// prevent build twice
let count = 0;
async function buildSitemap(pageContexts: PageContext[]) {
  if (++count > 1) return;
  const sitemap = createSitemap(pageContexts.map((item) => item.urlOriginal));
  await writeFile('./dist/client/sitemap.xml', sitemap);
}
