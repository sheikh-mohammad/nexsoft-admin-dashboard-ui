import { Component } from 'react'
import { AlertCircle } from 'lucide-react'

export default class ChartErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--color-error-bg)] flex items-center justify-center mb-3">
            <AlertCircle size={22} className="text-[var(--color-error)]" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text)]">Chart Error</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Unable to render chart.</p>
        </div>
      )
    }
    return this.props.children
  }
}
