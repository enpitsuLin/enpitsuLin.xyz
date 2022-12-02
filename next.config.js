const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const nextTranslate = require('next-translate')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  images: {
    domains: ['images-enpitsulin.oss-cn-beijing.aliyuncs.com', 's3.bmp.ovh'],
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
    config.plugins.push(new WindiCSSWebpackPlugin())
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

    config.plugins.push(
      require('unplugin-icons/webpack')({
        compiler: 'jsx',
        jsx: 'react',
        autoInstall: true,
      })
    )

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
// @ts-ignore
module.exports = nextTranslate(withBundleAnalyzer(config))
