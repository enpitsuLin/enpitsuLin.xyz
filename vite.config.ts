import * as path from 'path';
import { defineConfig } from 'vite';

import vercelSsr from '@magne4000/vite-plugin-vercel-ssr';
import react from '@vitejs/plugin-react-swc';
import ssr from 'vite-plugin-ssr/plugin';
import vercel from 'vite-plugin-vercel';
import WindiCSS from 'vite-plugin-windicss';

import { visualizer } from 'rollup-plugin-visualizer';
import Icon from 'unplugin-icons/vite';

export default defineConfig(async ({ command }) => {
  const plugins = [
    react(),
    WindiCSS(),
    Icon({ compiler: 'jsx', jsx: 'react', autoInstall: true }),
    ssr({ prerender: { noExtraDir: true } }),
    vercel(),
    vercelSsr()
  ];
  if (process.env.ANALYZE === 'true' && command === 'build')
    plugins.push(visualizer({ filename: './dist/analyze.html' }));
  return {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, '.'),
        'mdx-bundler/client': require.resolve('mdx-bundler/client')
      }
    },
    plugins: plugins,
    vercel: {
      expiration: 25
    },
    server: {
      port: 3000
    }
  };
});
