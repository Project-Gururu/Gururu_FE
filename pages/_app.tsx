import ErrorBoundary from 'components/ErrorBoundary'
import type { AppProps } from 'next/app'
import 'styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}
