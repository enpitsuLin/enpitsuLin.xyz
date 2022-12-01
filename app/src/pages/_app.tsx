import '@/css/disqusjs.css'
import '@/css/prism.css'
import '@/css/windi.css'
import 'katex/dist/katex.css'
import 'windi.css'

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import siteMetadata from 'data/siteMetadata'

import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <style jsx global>
        {`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}

export default App
