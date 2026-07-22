import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { analyticsStats, analyticsRevenue, analyticsTraffic, analyticsGrowth, topPages } from '../data/analyticsData'
import Card from '../components/ui/Card'
import Skeleton from '../components/ui/Skeleton'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/charts/ChartCard'
import ChartErrorBoundary from '../components/charts/ChartErrorBoundary'
import LineChart from '../components/charts/LineChart'
import BarChart from '../components/charts/BarChart'

const periods = ['7d', '30d', '90d']

const statIcons = {
  pageViews: TrendingUp,
  bounceRate: TrendingDown,
  avgSession: TrendingUp,
  conversionRate: TrendingUp,
}

export default function Analytics() {
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('30d')

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [period])

  const stats = analyticsStats[period]
  const revenue = analyticsRevenue[period]
  const traffic = analyticsTraffic[period]
  const growth = analyticsGrowth[period]

  const statItems = [
    { title: 'Page Views', value: stats.pageViews.value, change: stats.pageViews.change, changeType: stats.pageViews.change > 0 ? 'increase' : 'decrease', icon: TrendingUp },
    { title: 'Bounce Rate', value: stats.bounceRate.value, change: stats.bounceRate.change, changeType: stats.bounceRate.change < 0 ? 'increase' : 'decrease', icon: TrendingDown },
    { title: 'Avg. Session', value: stats.avgSession.value, change: stats.avgSession.change, changeType: stats.avgSession.change > 0 ? 'increase' : 'decrease', icon: TrendingUp },
    { title: 'Conversion Rate', value: stats.conversionRate.value, change: stats.conversionRate.change, changeType: stats.conversionRate.change > 0 ? 'increase' : 'decrease', icon: TrendingUp },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header + Period Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)]">Analytics</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Detailed analytics and reporting
          </p>
        </div>
        <div className="flex rounded-lg bg-[var(--color-bg-secondary)] p-1">
          {periods.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                period === p
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="p-5">
                <Skeleton width="60%" height={14} />
                <Skeleton width="40%" height={28} className="mt-3" />
                <Skeleton width="50%" height={12} className="mt-4" />
              </Card>
            ))}
          </div>
          <Card className="p-5">
            <Skeleton width="40%" height={18} />
            <Skeleton width="100%" height={250} className="mt-4" borderRadius="var(--radius-md)" />
          </Card>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statItems.map((item, i) => (
              <StatCard
                key={item.title}
                title={item.title}
                value={item.value}
                change={Math.abs(item.change)}
                changeType={item.changeType}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
            <ChartCard title="Revenue" subtitle={`Revenue trend (${period})`}>
              <ChartErrorBoundary>
                <LineChart data={{
                  labels: revenue.labels,
                  currentYear: revenue.current,
                  previousYear: revenue.previous,
                }} height={280} />
              </ChartErrorBoundary>
            </ChartCard>
            <ChartCard title="Traffic Sources" subtitle={`Traffic breakdown (${period})`}>
              <ChartErrorBoundary>
                <BarChart data={{
                  labels: traffic.labels,
                  values: traffic.values,
                }} height={280} />
              </ChartErrorBoundary>
            </ChartCard>
          </div>

          {/* User Growth + Top Pages */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
            <ChartCard title="User Growth" subtitle={`New vs Returning (${period})`}>
              <ChartErrorBoundary>
                <LineChart data={{
                  labels: growth.labels,
                  currentYear: growth.newUsers,
                  previousYear: growth.returning,
                }} height={250} />
              </ChartErrorBoundary>
            </ChartCard>

            {/* Top Pages Table */}
            <Card className="p-5">
              <h3 className="font-semibold text-sm text-[var(--color-text)] mb-3">Top Pages</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="text-left py-2 px-1 text-xs font-medium text-[var(--color-text-muted)]">Page</th>
                      <th className="text-right py-2 px-1 text-xs font-medium text-[var(--color-text-muted)]">Views</th>
                      <th className="text-right py-2 px-1 text-xs font-medium text-[var(--color-text-muted)]">Bounce</th>
                      <th className="text-right py-2 px-1 text-xs font-medium text-[var(--color-text-muted)]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPages.map((page, i) => (
                      <tr
                        key={page.page}
                        className="border-b border-[var(--color-border)]/50 animate-fadeIn"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <td className="py-2.5 px-1 text-[var(--color-text)] font-medium">{page.page}</td>
                        <td className="py-2.5 px-1 text-right text-[var(--color-text)]">{page.views.toLocaleString()}</td>
                        <td className="py-2.5 px-1 text-right text-[var(--color-text-muted)]">{page.bounceRate}%</td>
                        <td className="py-2.5 px-1 text-right">
                          {page.status === 'up' ? (
                            <TrendingUp size={14} className="text-[var(--color-success)] inline" />
                          ) : page.status === 'down' ? (
                            <TrendingDown size={14} className="text-[var(--color-error)] inline" />
                          ) : (
                            <Minus size={14} className="text-[var(--color-text-muted)] inline" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
