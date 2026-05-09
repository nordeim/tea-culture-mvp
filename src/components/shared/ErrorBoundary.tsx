import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ivory-100">
          <div className="text-center px-6">
            <h1 className="font-display text-3xl font-semibold text-bark-800 mb-4">
              Something went wrong
            </h1>
            <p className="text-bark-700/70 mb-8 max-w-md mx-auto">
              We encountered an unexpected error. Please try again.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 bg-bark-800 text-ivory-100 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-bark-900 transition-all active:scale-[0.97]"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
