import { BarChart3, TrendingUp, Activity } from 'lucide-react'
import Card from '../components/ui/Card'

export default function Analytics() {
  const metrics = [
    { icon: BarChart3, label: 'Page Views', value: '45,230', change: '+12.3%' },
    { icon: TrendingUp, label: 'Bounce Rate', value: '32.1%', change: '-2.4%' },
    { icon: Activity, label: 'Avg. Session', value: '4m 32s', change: '+8.1%' },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text)]">Analytics</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Detailed analytics and reporting
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {metrics.map((item, i) => {
          const Icon = item.icon
          return (
            <Card
              key={i}
              className="p-5 animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-bg)] flex items-center justify-center">
                  <Icon size={20} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">{item.label}</p>
                  <p className="text-lg font-bold text-[var(--color-text)]">{item.value}</p>
                  <p className="text-xs text-[var(--color-success)]">{item.change}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
