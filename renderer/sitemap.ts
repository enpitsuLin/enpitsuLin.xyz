import { writeFile } from 'fs/promises';
import { siteMeta } from '~/package.json';

export { buildSitemap };

const createSitemap = (urls: string[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => `<url><loc>${`${siteMeta.siteUrl}${url}`}</loc></url> `).join('\n    ')}
</urlset>
`;
};

async function buildSitemap(urls: string[]) {
  const sitemap = createSitemap(urls);
  await writeFile('./dist/client/sitemap.xml', sitemap);
}
