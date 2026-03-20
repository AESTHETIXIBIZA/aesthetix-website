'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] text-[#111111]">
            <div className="text-center px-6">
              <h1 className="text-4xl font-bold tracking-tighter mb-4">
                Something went wrong.
              </h1>
              <p className="text-gray-500 mb-8">
                Please try refreshing the page.
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-8 py-3 bg-[#111111] text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
