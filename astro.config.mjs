import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import Unocss from 'unocss/astro';
import vue from '@astrojs/vue';

export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), vue(), Unocss()]
});
