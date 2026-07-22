import { useState, useEffect, useRef } from 'react'
import { Search, Download, MoreHorizontal, X, Package, Calendar, DollarSign } from 'lucide-react'
import { orders as allOrders, orderStatuses } from '../data/ordersData'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Skeleton from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'
import useClickOutside from '../hooks/useClickOutside'

const statusVariant = {
  delivered: 'success',
  shipped: 'primary',
  processing: 'warning',
  pending: 'default',
  cancelled: 'error',
}

const ITEMS_PER_PAGE = 5

export default function Orders() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const modalRef = useRef(null)

  useClickOutside(modalRef, () => setSelectedOrder(null), !!selectedOrder)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!selectedOrder) return
    const handler = (e) => { if (e.key === 'Escape') setSelectedOrder(null) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [selectedOrder])

  const filtered = allOrders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
                        o.customer.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const openModal = (order) => {
    setModalLoading(true)
    setSelectedOrder(order)
    setTimeout(() => setModalLoading(false), 400)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)]">Orders</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{allOrders.length} total orders</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] flex-1 max-w-md">
          <Search size={16} className="text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="bg-transparent border-none outline-none text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] w-full"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
              <X size={14} />
            </button>
          )}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] border-none text-sm text-[var(--color-text)] outline-none cursor-pointer capitalize"
        >
          {orderStatuses.map(s => (
            <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s}</option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <Card className="p-4">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton width={40} height={40} borderRadius="var(--radius-md)" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton width="30%" height={14} />
                  <Skeleton width="50%" height={12} />
                </div>
                <Skeleton width={70} height={22} borderRadius="var(--radius-full)" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <Card className="p-6">
          <EmptyState icon={Package} title="No orders found" message="Try adjusting your search or filter criteria." />
        </Card>
      )}

      {/* Orders Table */}
      {!loading && filtered.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Card className="overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50">
                    <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Order ID</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Customer</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Product</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Amount</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Date</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((order, i) => (
                    <tr
                      key={order.id}
                      className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)]/30 cursor-pointer transition-colors animate-fadeIn"
                      style={{ animationDelay: `${i * 50}ms` }}
                      onClick={() => openModal(order)}
                    >
                      <td className="py-3 px-4 font-medium text-[var(--color-text)]">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-[var(--color-text)]">{order.customer}</p>
                          <p className="text-xs text-[var(--color-text-muted)]">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[var(--color-text-muted)]">{order.product}</td>
                      <td className="py-3 px-4 text-right font-medium text-[var(--color-text)]">${order.amount.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={statusVariant[order.status] || 'default'} size="sm">{order.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-[var(--color-text-muted)] text-sm">{order.date}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {paginated.map((order, i) => (
              <Card key={order.id} hoverable className="p-4 animate-fadeInUp" style={{ animationDelay: `${i * 50}ms` }} onClick={() => openModal(order)}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[var(--color-text)]">{order.id}</span>
                  <Badge variant={statusVariant[order.status] || 'default'} size="sm">{order.status}</Badge>
                </div>
                <p className="text-sm text-[var(--color-text)]">{order.customer}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{order.product}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[var(--color-text-muted)]">{order.date}</span>
                  <span className="text-sm font-semibold text-[var(--color-text)]">${order.amount.toFixed(2)}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] disabled:opacity-40 hover:bg-[var(--color-border)] transition-colors"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] disabled:opacity-40 hover:bg-[var(--color-border)] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setSelectedOrder(null)}>
          <div ref={modalRef} className="w-full max-w-lg rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-xl)] overflow-hidden" onClick={e => e.stopPropagation()}>
            {modalLoading ? (
              <div className="p-6 space-y-4">
                <Skeleton width="40%" height={20} />
                <Skeleton width="100%" height={80} borderRadius="var(--radius-md)" />
                <Skeleton width="100%" height={60} borderRadius="var(--radius-md)" />
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-[var(--color-border)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">{selectedOrder.id}</h3>
                      <Badge variant={statusVariant[selectedOrder.status] || 'default'} size="md" className="mt-1">
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="p-1.5 rounded-lg hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]">
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <p className="text-xs text-[var(--color-text-muted)] mb-1 flex items-center gap-1"><Package size={12} />Product</p>
                      <p className="text-sm font-medium text-[var(--color-text)]">{selectedOrder.product}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{selectedOrder.items} item{selectedOrder.items > 1 ? 's' : ''}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">Customer</p>
                      <p className="text-sm font-medium text-[var(--color-text)]">{selectedOrder.customer}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1 flex items-center gap-1"><DollarSign size={12} />Amount</p>
                      <p className="text-lg font-bold text-[var(--color-text)]">${selectedOrder.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1 flex items-center gap-1"><Calendar size={12} />Date</p>
                      <p className="text-sm text-[var(--color-text)]">{selectedOrder.date}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[var(--color-bg-secondary)]/50 flex justify-end gap-2">
                  <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 text-sm rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-colors">
                    Close
                  </button>
                  <button className="px-4 py-2 text-sm rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors">
                    Update Status
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
