import { queryClient } from '@/lib/react-query'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createEmotionCache, theme } from '../styles'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
  Component: NextPageWithLayout
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer theme="colored" autoClose={3000} />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
