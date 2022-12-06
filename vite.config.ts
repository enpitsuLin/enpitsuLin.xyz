import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import ssr from 'vite-plugin-ssr/plugin';
import vercel from 'vite-plugin-vercel';
import vercelSsr from '@magne4000/vite-plugin-vercel-ssr';
import WindiCSS from 'vite-plugin-windicss';
import Icon from 'unplugin-icons/vite';

export default defineConfig(async () => {
  return {
    plugins: [
      react(),
      WindiCSS(),
      Icon({ compiler: 'jsx', jsx: 'react', autoInstall: true }),
      ssr({
        prerender: {
          noExtraDir: true
        }
      }),
      vercel(),
      vercelSsr()
    ],
    vercel: {
      expiration: 25
    },
    server: {
      port: 3000
    }
  };
});
