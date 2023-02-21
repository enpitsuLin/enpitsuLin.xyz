import {
  defineConfig,
  presetUno,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  preflights: [
    {
      getCSS: () =>
        [
          `:root{--e-bg:#fff;--e-scrollbar:#eee;--e-scrollbar-hover:#bbb}`,
          `.dark{--e-bg:#2a2b2d;--e-scrollbar:#3b3c40;--e-scrollbar-hover:#74777b}`,
          `*{scrollbar-color:var(--e-scrollbar) var(--e-bg)}`,
          `::-webkit-scrollbar{width:6px;height:6px}`,
          `::-webkit-scrollbar-track,::-webkit-scrollbar-corner{background: var(--e-bg);border-radius: 10px}`,
          `::-webkit-scrollbar-thumb{transition:background 0.3s cubic-bezier(0.4,0,0.2,1);border-radius:0.75rem;background:var(--e-scrollbar)}`,
          `::-webkit-scrollbar-thumb:hover{background:var(--e-scrollbar-hover)}`
        ].join('\n')
    }
  ]
});
