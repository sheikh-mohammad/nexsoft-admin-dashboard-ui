const variants = {
  default: {
    bg: 'bg-[var(--color-bg-secondary)]',
    text: 'text-[var(--color-text-secondary)]',
  },
  primary: {
    bg: 'bg-[var(--color-primary-bg)]',
    text: 'text-[var(--color-primary)]',
  },
  success: {
    bg: 'bg-[var(--color-success-bg)]',
    text: 'text-[var(--color-success)]',
  },
  warning: {
    bg: 'bg-[var(--color-warning-bg)]',
    text: 'text-[var(--color-warning)]',
  },
  error: {
    bg: 'bg-[var(--color-error-bg)]',
    text: 'text-[var(--color-error)]',
  },
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-sm',
}

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const v = variants[variant] || variants.default
  const s = sizes[size] || sizes.sm

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${v.bg} ${v.text} ${s} ${className}`}>
      {children}
    </span>
  )
}
