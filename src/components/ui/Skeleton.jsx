export default function Skeleton({ width, height = 16, borderRadius = 'var(--radius-md)', className = '', variant = 'text' }) {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width || '100%',
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius,
  }

  return (
    <div
      className={`animate-pulse bg-[var(--color-border)] ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}
