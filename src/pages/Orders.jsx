import { ShoppingCart } from 'lucide-react'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'

export default function Orders() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text)]">Orders</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Track and manage customer orders
        </p>
      </div>
      <Card className="p-6">
        <EmptyState
          icon={ShoppingCart}
          title="Order Management"
          message="Order management features are coming soon. You'll be able to view, filter, and process customer orders from this page."
        />
      </Card>
    </div>
  )
}
