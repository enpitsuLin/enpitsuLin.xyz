const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const IconsPlugin = require('unplugin-icons/webpack')
const nextTranslate = require('next-translate')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const plugins = [new WindiCSSWebpackPlugin(), IconsPlugin({ compiler: 'jsx', jsx: 'react' })]

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  image: {
    loader: 'static',
  },
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
  },
  async redirects() {
    return [{ source: '/sitemap', destination: '/sitemap.xml', permanent: false }]
  },
  webpack: (config, { dev, isServer }) => {
    plugins.forEach((plugin) => {
      config.plugins.push(plugin)
    })
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
}
// @ts-ignore
module.exports = nextTranslate(withBundleAnalyzer(config))
