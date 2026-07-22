import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { useThemeColors } from '../../hooks/useThemeColors'
import './chartSetup.js'

export default function BarChart({ data, height = 300, stacked = false }) {
  const colors = useThemeColors()

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: colors.surfaceColor,
        titleColor: colors.textPrimary,
        bodyColor: colors.textSecondary,
        borderColor: colors.borderColor,
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `${ctx.raw}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: colors.borderColor, drawBorder: false },
        ticks: { color: colors.textColor, font: { size: 11 } },
        border: { display: false },
        stacked,
        max: 100,
      },
      y: {
        grid: { display: false },
        ticks: { color: colors.textColor, font: { size: 11 } },
        border: { display: false },
        stacked,
      },
    },
  }), [colors, stacked])

  const chartData = useMemo(() => ({
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          colors.primaryColor,
          colors.primaryLight,
          colors.successColor,
          colors.warningColor,
          colors.errorColor,
          colors.bgSecondary,
        ],
        borderColor: colors.surfaceColor,
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 14,
      },
    ],
  }), [data, colors])

  return (
    <div style={{ height }}>
      <Bar options={options} data={chartData} />
    </div>
  )
}
