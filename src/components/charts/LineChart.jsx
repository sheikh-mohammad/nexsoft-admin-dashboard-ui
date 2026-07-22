import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import './chartSetup.js'

export default function LineChart({ data, height = 300, title }) {
  const { theme } = useTheme()

  const textColor = 'var(--color-text-muted)'
  const borderColor = 'var(--color-border)'
  const primaryColor = 'var(--color-primary)'
  const primaryLight = 'var(--color-primary-light)'

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: textColor,
          font: { size: 12, family: "'Inter', sans-serif" },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: 'var(--color-surface)',
        titleColor: 'var(--color-text)',
        bodyColor: 'var(--color-text-secondary)',
        borderColor: 'var(--color-border)',
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
        ticks: { color: textColor, font: { size: 11 } },
        border: { display: false },
      },
      y: {
        grid: { color: borderColor, drawBorder: false },
        ticks: {
          color: textColor,
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
  }), [theme])

  const chartData = useMemo(() => ({
    labels: data.labels,
    datasets: [
      {
        label: 'Current Year',
        data: data.currentYear,
        borderColor: primaryColor,
        backgroundColor: (ctx) => {
          if (!ctx.chart?.ctx) return 'rgba(107, 15, 26, 0.1)'
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300)
          gradient.addColorStop(0, primaryColor)
          gradient.addColorStop(1, 'transparent')
          return gradient
        },
        fill: true,
        borderWidth: 2.5,
        pointBackgroundColor: primaryColor,
        pointBorderColor: 'var(--color-surface)',
        pointBorderWidth: 2,
      },
      {
        label: 'Previous Year',
        data: data.previousYear,
        borderColor: primaryLight,
        backgroundColor: 'transparent',
        fill: false,
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: primaryLight,
        pointBorderColor: 'var(--color-surface)',
        pointBorderWidth: 2,
        pointRadius: 2,
      },
    ],
  }), [data, theme])

  return (
    <div style={{ height }}>
      <Line options={options} data={chartData} />
    </div>
  )
}
