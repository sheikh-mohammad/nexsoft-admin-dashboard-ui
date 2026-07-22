import { TrendingUp, TrendingDown } from 'lucide-react'
import Card from './Card'

export default function StatCard({ title, value, change, changeType = 'increase', icon: Icon, index = 0 }) {
  const isIncrease = changeType === 'increase'
  const isDecrease = changeType === 'decrease'

  return (
    <Card
      hoverable
      className="p-5 animate-fadeInUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[var(--color-text-muted)] truncate">{title}</p>
          <p className="text-2xl font-bold text-[var(--color-text)] mt-1">{value}</p>
        </div>
        {Icon && (
          <div className="w-11 h-11 rounded-xl bg-[var(--color-primary-bg)] flex items-center justify-center flex-shrink-0">
            <Icon size={20} className="text-[var(--color-primary)]" />
          </div>
        )}
      </div>
      <div className="flex items-center gap-1.5 mt-4">
        {isIncrease && <TrendingUp size={15} className="text-[var(--color-success)]" />}
        {isDecrease && <TrendingDown size={15} className="text-[var(--color-error)]" />}
        <span className={`text-sm font-medium ${isIncrease ? 'text-[var(--color-success)]' : isDecrease ? 'text-[var(--color-error)]' : 'text-[var(--color-text-muted)]'}`}>
          {isIncrease ? '+' : ''}{change}%
        </span>
        <span className="text-xs text-[var(--color-text-muted)]">vs last month</span>
      </div>
    </Card>
  )
}
