import {
  defineConfig,
  presetUno,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import type { Theme } from 'unocss/preset-uno';

export default defineConfig<Theme>({
  theme: {
    fontFamily: {
      sans: `'LXGW WenKai'`
    }
  },
  presets: [presetUno(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
