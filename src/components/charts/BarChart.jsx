import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import './chartSetup.js'

export default function BarChart({ data, height = 300, stacked = false }) {
  const { theme } = useTheme()

  const textColor = 'var(--color-text-muted)'
  const borderColor = 'var(--color-border)'
  const primaryColor = 'var(--color-primary)'
  const primaryLight = 'var(--color-primary-light)'

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'var(--color-surface)',
        titleColor: 'var(--color-text)',
        bodyColor: 'var(--color-text-secondary)',
        borderColor: 'var(--color-border)',
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
        grid: { color: borderColor, drawBorder: false },
        ticks: { color: textColor, font: { size: 11 } },
        border: { display: false },
        stacked,
        max: 100,
      },
      y: {
        grid: { display: false },
        ticks: { color: textColor, font: { size: 11 } },
        border: { display: false },
        stacked,
      },
    },
  }), [theme, stacked])

  const chartData = useMemo(() => ({
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          primaryColor,
          primaryLight,
          'var(--color-success)',
          'var(--color-warning)',
          'var(--color-error)',
          'var(--color-bg-secondary)',
        ],
        borderColor: 'var(--color-surface)',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 14,
      },
    ],
  }), [data, theme])

  return (
    <div style={{ height }}>
      <Bar options={options} data={chartData} />
    </div>
  )
}
