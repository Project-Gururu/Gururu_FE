import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </QueryClientProvider>
    </Provider>
  )
}
