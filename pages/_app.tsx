import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'

import ErrorBoundary from 'components/common/ErrorBoundary'

import 'styles/global.scss'
import 'styles/lib/Calendar.scss'
import 'styles/lib/BottomSheet.scss'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

declare global {
  interface Window {
    kakao: any
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const queryClient = new QueryClient()

  useEffect(() => storePathValues, [router.asPath])

  function storePathValues() {
    const storage = globalThis?.sessionStorage
    if (!storage) return
    const prevPath = storage.getItem('currentPath')
    storage.setItem('prevPath', prevPath ? prevPath : '')
    storage.setItem('currentPath', globalThis.location.pathname)
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </QueryClientProvider>
    </Provider>
  )
}
