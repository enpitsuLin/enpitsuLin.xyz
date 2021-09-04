const colors = require('tailwindcss/colors');
const individualBorderColor = require('./plugins/tailwind/individualBorderColor.js');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.trueGray,
      transparent: '#0000'
    },
    fontFamily: {
      title: '"Times New Roman", Georgia, Times, sans-serif;'
    },
    borderColor: theme => ({
      ...theme('colors'),
      /** @description 这里默认的`borderColor`里不会包含从`color`注入的颜色 */
      white: '#fff'
    }),
    extend: {}
  },
  variants: {
    extend: {
      borderWidth: ['hover']
    }
  },
  plugins: [individualBorderColor]
};
