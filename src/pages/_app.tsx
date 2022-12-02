import 'windi.css'
import '@/css/windi.css'
import '@/css/prism.css'
import '@/css/disqusjs.css'
import 'katex/dist/katex.css'

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import siteMetadata from 'data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'

import { Inter } from '@next/font/google'
const inter = Inter({})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <style jsx global>{`
        html: {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}

export default App
