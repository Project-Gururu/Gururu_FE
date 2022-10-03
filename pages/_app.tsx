import ErrorBoundary from 'components/common/ErrorBoundary'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import 'styles/global.scss'
import 'styles/lib/Calendar.scss'
import 'styles/lib/BottomSheet.scss'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

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
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Provider>
  )
}
