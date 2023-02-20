import { defineConfig, presetUno, presetTypography, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
