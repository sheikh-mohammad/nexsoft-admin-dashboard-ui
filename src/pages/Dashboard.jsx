import {
  DollarSign, Users, ShoppingCart, TrendingUp,
} from 'lucide-react'
import { statCards, revenueData, categoryData, trafficSources } from '../data/dashboardData'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/charts/ChartCard'
import ChartErrorBoundary from '../components/charts/ChartErrorBoundary'
import LineChart from '../components/charts/LineChart'
import DoughnutChart from '../components/charts/DoughnutChart'
import BarChart from '../components/charts/BarChart'

const iconMap = {
  DollarSign, Users, ShoppingCart, TrendingUp,
}

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text)]">Overview</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Your business analytics at a glance
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {statCards.map((card, i) => (
          <StatCard
            key={card.id}
            title={card.title}
            value={card.value}
            change={card.change}
            changeType={card.changeType}
            icon={iconMap[card.icon]}
            index={i}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        {/* Revenue Line Chart — spans 2 cols on xl */}
        <div className="lg:col-span-2 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <ChartCard title="Revenue Overview" subtitle="Monthly revenue comparison">
            <ChartErrorBoundary>
              <LineChart data={revenueData} height={300} />
            </ChartErrorBoundary>
          </ChartCard>
        </div>

        {/* Category Doughnut Chart */}
        <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <ChartCard title="Sales by Category" subtitle="Product distribution">
            <ChartErrorBoundary>
              <DoughnutChart data={categoryData} height={280} />
            </ChartErrorBoundary>
          </ChartCard>
        </div>

        {/* Traffic Bar Chart — full width */}
        <div className="lg:col-span-2 xl:col-span-3 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <ChartCard title="Traffic Sources" subtitle="Where your visitors come from">
            <ChartErrorBoundary>
              <BarChart data={trafficSources} height={250} />
            </ChartErrorBoundary>
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
