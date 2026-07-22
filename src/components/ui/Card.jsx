export default function Card({ children, className = '', glass = false, hoverable = false }) {
  return (
    <div
      className={`
        rounded-[var(--radius-lg)]
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        shadow-[var(--shadow-sm)]
        transition-all duration-300
        ${glass ? 'glass' : ''}
        ${hoverable ? 'hover:-translate-y-1 hover:shadow-[var(--shadow-md)] cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
