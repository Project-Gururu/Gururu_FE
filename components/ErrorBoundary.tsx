import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallbackComponent?: ReactNode
}

interface State {
  hasError: boolean
  error: null | Error
  errorInfo: null | ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ hasError: true, error, errorInfo })
    console.log(`componentDidCatch: (${error}, ${JSON.stringify(errorInfo)})`)
  }
  render() {
    if (this.state.hasError) {
      //   if (this.props.fallbackComponent) {
      //     return this.props.fallbackComponent
      //   }
      return (
        <div>
          <h2>Error occured!</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
