const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  }
});
module.exports = withMDX({
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
});
