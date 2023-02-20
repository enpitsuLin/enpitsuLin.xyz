import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import Unocss from 'unocss/astro';
import sanity from 'astro-sanity';

// https://astro.build/config
export default defineConfig({
  site: 'https://enpitsulin.xyz',
  integrations: [
    mdx(),
    sitemap(),
    Unocss(),
    sanity({
      projectId: 'r9a6ysjd',
      dataset: 'production',
      useCdn: true,
      apiVersion: '2022-01-12'
    })
  ]
});
