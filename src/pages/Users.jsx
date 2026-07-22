import { useState, useEffect, useRef } from 'react'
import { Search, Plus, MoreHorizontal, X, User as UserIcon, Mail, Calendar, Clock } from 'lucide-react'
import { users as allUsers, userRoles, userStatuses } from '../data/usersData'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Skeleton from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'
import useClickOutside from '../hooks/useClickOutside'

const roleBadgeVariant = { admin: 'primary', editor: 'default', viewer: 'default' }
const statusBadgeVariant = { active: 'success', inactive: 'warning', suspended: 'error' }

const ITEMS_PER_PAGE = 5

export default function Users() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const modalRef = useRef(null)

  useClickOutside(modalRef, () => setSelectedUser(null), !!selectedUser)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Close modal on Escape
  useEffect(() => {
    if (!selectedUser) return
    const handler = (e) => { if (e.key === 'Escape') setSelectedUser(null) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [selectedUser])

  const filtered = allUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    const matchStatus = statusFilter === 'all' || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const openModal = (user) => {
    setModalLoading(true)
    setSelectedUser(user)
    setTimeout(() => setModalLoading(false), 400)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)]">Users</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{allUsers.length} total users</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors">
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] flex-1 max-w-md">
          <Search size={16} className="text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search users..."
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
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(1) }}
          className="px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] border-none text-sm text-[var(--color-text)] outline-none cursor-pointer"
        >
          <option value="all">All Roles</option>
          {userRoles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] border-none text-sm text-[var(--color-text)] outline-none cursor-pointer"
        >
          <option value="all">All Statuses</option>
          {userStatuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <Card className="p-4">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton width={36} height={36} borderRadius="50%" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton width="40%" height={14} />
                  <Skeleton width="60%" height={12} />
                </div>
                <Skeleton width={60} height={22} borderRadius="var(--radius-full)" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <Card className="p-6">
          <EmptyState icon={UserIcon} title="No users found" message="Try adjusting your search or filter criteria." />
        </Card>
      )}

      {/* User Table */}
      {!loading && filtered.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Card className="overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50">
                    <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">User</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Email</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Role</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Joined</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-[var(--color-text-muted)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((user, i) => (
                    <tr
                      key={user.id}
                      className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)]/30 cursor-pointer transition-colors animate-fadeIn"
                      style={{ animationDelay: `${i * 50}ms` }}
                      onClick={() => openModal(user)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                            user.role === 'admin' ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-text-muted)]'
                          }`}>
                            {user.avatar}
                          </div>
                          <span className="font-medium text-[var(--color-text)]">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[var(--color-text-muted)]">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant={roleBadgeVariant[user.role]} size="sm">{user.role}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={statusBadgeVariant[user.status]} size="sm">{user.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-[var(--color-text-muted)] text-sm">{user.joined}</td>
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
            {paginated.map((user, i) => (
              <Card key={user.id} hoverable className="p-4 animate-fadeInUp" style={{ animationDelay: `${i * 50}ms` }} onClick={() => openModal(user)}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                    user.role === 'admin' ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-text-muted)]'
                  }`}>
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text)] truncate">{user.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)] truncate">{user.email}</p>
                  </div>
                  <Badge variant={statusBadgeVariant[user.status]} size="sm">{user.status}</Badge>
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

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setSelectedUser(null)}>
          <div ref={modalRef} className="w-full max-w-lg rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-xl)] overflow-hidden" onClick={e => e.stopPropagation()}>
            {modalLoading ? (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton width={48} height={48} borderRadius="50%" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton width="50%" height={18} />
                    <Skeleton width="70%" height={14} />
                  </div>
                </div>
                <Skeleton width="100%" height={100} borderRadius="var(--radius-md)" />
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-[var(--color-border)]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium text-white ${
                        selectedUser.role === 'admin' ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-text-muted)]'
                      }`}>
                        {selectedUser.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--color-text)]">{selectedUser.name}</h3>
                        <p className="text-sm text-[var(--color-text-muted)]">{selectedUser.email}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedUser(null)} className="p-1.5 rounded-lg hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]">
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">Role</p>
                      <Badge variant={roleBadgeVariant[selectedUser.role]} size="md">{selectedUser.role}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">Status</p>
                      <Badge variant={statusBadgeVariant[selectedUser.status]} size="md">{selectedUser.status}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1 flex items-center gap-1"><Calendar size={12} /> Joined</p>
                      <p className="text-sm text-[var(--color-text)]">{selectedUser.joined}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1 flex items-center gap-1"><Clock size={12} /> Last Active</p>
                      <p className="text-sm text-[var(--color-text)]">{selectedUser.lastActive}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[var(--color-bg-secondary)]/50 flex justify-end gap-2">
                  <button onClick={() => setSelectedUser(null)} className="px-4 py-2 text-sm rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-colors">
                    Close
                  </button>
                  <button className="px-4 py-2 text-sm rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors">
                    Edit User
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
