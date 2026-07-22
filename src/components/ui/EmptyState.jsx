import { Inbox } from 'lucide-react'

export default function EmptyState({ icon: Icon, title, message, action }) {
  const IconComponent = Icon || Inbox

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[var(--color-primary-bg)] flex items-center justify-center mb-4">
        <IconComponent size={28} className="text-[var(--color-primary)]" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">{title || 'No data'}</h3>
      {message && (
        <p className="text-sm text-[var(--color-text-muted)] max-w-sm">{message}</p>
      )}
      {action && (
        <div className="mt-4">{action}</div>
      )}
    </div>
  )
}
