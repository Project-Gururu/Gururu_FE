import type { AppProps } from 'next/app'
import { persistor, store } from 'redux/store'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from 'redux-persist/integration/react'

import ErrorBoundary from 'components/common/ErrorBoundary'

import 'styles/global.scss'
import 'styles/lib/Calendar.scss'
import 'styles/lib/BottomSheet.scss'

declare global {
  interface Window {
    kakao: any
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  })

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}
