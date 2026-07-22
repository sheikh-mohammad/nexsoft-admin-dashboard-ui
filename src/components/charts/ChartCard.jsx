import { MoreHorizontal } from 'lucide-react'
import Card from '../ui/Card'

export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <Card className={`p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[var(--color-text)] text-sm">{title}</h3>
          {subtitle && (
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{subtitle}</p>
          )}
        </div>
        <button className="p-1.5 rounded-lg hover:bg-[var(--color-primary-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>
      {children}
    </Card>
  )
}
