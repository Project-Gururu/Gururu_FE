import ErrorBoundary from 'components/ErrorBoundary'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import 'styles/global.scss'
import 'styles/Calendar.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Provider>
  )
}
