import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useThemeColors } from '../../hooks/useThemeColors'
import './chartSetup.js'

export default function LineChart({ data, height = 300 }) {
  const colors = useThemeColors()

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: colors.textColor,
          font: { size: 12, family: "'Inter', sans-serif" },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: colors.surfaceColor,
        titleColor: colors.textPrimary,
        bodyColor: colors.textSecondary,
        borderColor: colors.borderColor,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        boxPadding: 4,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: colors.textColor, font: { size: 11 } },
        border: { display: false },
      },
      y: {
        grid: { color: colors.borderColor, drawBorder: false },
        ticks: {
          color: colors.textColor,
          font: { size: 11 },
          padding: 8,
        },
        border: { display: false },
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      line: { tension: 0.4 },
      point: {
        radius: 3,
        hoverRadius: 5,
        hitRadius: 8,
      },
    },
  }), [colors])

  const chartData = useMemo(() => ({
    labels: data.labels,
    datasets: [
      {
        label: 'Current Year',
        data: data.currentYear,
        borderColor: colors.primaryColor,
        backgroundColor: (ctx) => {
          if (!ctx.chart?.ctx) return colors.primaryColor
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300)
          gradient.addColorStop(0, colors.primaryColor)
          gradient.addColorStop(1, 'transparent')
          return gradient
        },
        fill: true,
        borderWidth: 2.5,
        pointBackgroundColor: colors.primaryColor,
        pointBorderColor: colors.surfaceColor,
        pointBorderWidth: 2,
      },
      {
        label: 'Previous Year',
        data: data.previousYear,
        borderColor: colors.primaryLight,
        backgroundColor: 'transparent',
        fill: false,
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: colors.primaryLight,
        pointBorderColor: colors.surfaceColor,
        pointBorderWidth: 2,
        pointRadius: 2,
      },
    ],
  }), [data, colors])

  return (
    <div style={{ height }}>
      <Line options={options} data={chartData} />
    </div>
  )
}
