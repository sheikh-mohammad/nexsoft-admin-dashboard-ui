import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useThemeColors } from '../../hooks/useThemeColors'
import './chartSetup.js'

export default function DoughnutChart({ data, height = 280, cutout = '70%' }) {
  const colors = useThemeColors()

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: colors.textColor,
          font: { size: 11, family: "'Inter', sans-serif" },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 12,
        },
      },
      tooltip: {
        backgroundColor: colors.surfaceColor,
        titleColor: colors.textPrimary,
        bodyColor: colors.textSecondary,
        borderColor: colors.borderColor,
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  }), [colors, cutout])

  const chartData = useMemo(() => ({
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.colors || [
          '#6B0F1A', '#8B1A2B', '#A52A3A', '#C04050', '#D46070', '#E8D5D0',
        ],
        borderColor: colors.surfaceColor,
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  }), [data, colors])

  if (!data || !data.labels || data.labels.length === 0) {
    return (
      <div style={{ height }} className="flex items-center justify-center text-sm text-[var(--color-text-muted)]">
        No data available
      </div>
    )
  }

  return (
    <div style={{ height }}>
      <Doughnut options={options} data={chartData} />
    </div>
  )
}
