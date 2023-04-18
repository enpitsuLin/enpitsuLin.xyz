import {
  defineConfig,
  presetUno,
  presetTypography,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import type { Theme } from 'unocss/preset-uno';

export default defineConfig<Theme>({
  shortcuts: [
    {
      'lodash-effect': [
        'relative after:absolute after:content-empty after:h-1 after:w-full after:bottom-0 after:left-0 ',
        'after:scale-0 hover:after:scale-100 after:transition-transform after:origin-l'
      ].join(' ')
    }
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography({
      cssExtend: {
        'h1,h2,h3,h4,h5,h6': {
          'font-weight': '500',
          position: 'relative'
        },
        'p,ul,ol,pre': {
          'font-size': '0.9375rem'
        },
        'p:has(> img)': {
          display: 'flex',
          'justify-content': 'center'
        }
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
