import { Users as UsersIcon } from 'lucide-react'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'

export default function Users() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text)]">Users</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Manage user accounts and permissions
        </p>
      </div>
      <Card className="p-6">
        <EmptyState
          icon={UsersIcon}
          title="User Management"
          message="User management features are coming soon. You'll be able to view, edit, and manage all user accounts from this page."
        />
      </Card>
    </div>
  )
}
