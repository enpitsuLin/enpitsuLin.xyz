import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import Unocss from 'unocss/astro';

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: 'https://enpitsulin.xyz',
  integrations: [mdx(), sitemap(), Unocss(), solidJs()]
});