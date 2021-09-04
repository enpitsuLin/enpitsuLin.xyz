/**
 * BorderColor plugin
 * @desc for change border color to individual edge utilities
 * @link https://github.com/tailwindlabs/tailwindcss/pull/560#issuecomment-670045304
 */
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

module.exports = ({ addUtilities, theme, variants }) => {
  const colors = flattenColorPalette(theme('borderColor'));
  delete colors['default'];

  const colorMap = Object.keys(colors).map(color => ({
    [`.border-${color}`]: { borderColor: colors[color] },
    [`.border-t-${color}`]: { borderTopColor: colors[color] },
    [`.border-r-${color}`]: { borderRightColor: colors[color] },
    [`.border-b-${color}`]: { borderBottomColor: colors[color] },
    [`.border-l-${color}`]: { borderLeftColor: colors[color] }
  }));
  const utilities = Object.assign({}, ...colorMap);
  console.log('border-color compiled:', utilities);
  addUtilities(utilities, variants('borderColor'));
};
