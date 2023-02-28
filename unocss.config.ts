import {
  defineConfig,
  presetUno,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import type { Theme } from 'unocss/preset-uno';

export default defineConfig<Theme>({
  presets: [
    presetUno(),
    presetTypography({
      cssExtend: {
        'h1,h2,h3,h4,h5,h6': {
          'font-weight': '500',
          position: 'relative'
        },
        'p,ul,ol,pre': {
          'font-size': '0.9375rem'
        }
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
