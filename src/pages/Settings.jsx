import { useState } from 'react'
import { User, Palette, Bell, Shield, Save, Check, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
]

function Toggle({ enabled, onChange, label, desc }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-[var(--color-text)]">{label}</p>
        {desc && <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
          enabled ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'
        }`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? 'translate-x-5' : ''
        }`} />
      </button>
    </div>
  )
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  // Profile form
  const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@nexsoft.com', bio: 'Dashboard administrator and platform manager.' })

  // Notification toggles
  const [notifSettings, setNotifSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    orderUpdates: true,
    marketingEmails: false,
  })

  // Password form
  const [password, setPassword] = useState({ current: '', newPass: '', confirm: '' })
  const [passError, setPassError] = useState('')
  const [passSuccess, setPassSuccess] = useState(false)

  const handleSaveProfile = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSavePassword = () => {
    setPassError('')
    setPassSuccess(false)
    if (!password.current || !password.newPass || !password.confirm) {
      setPassError('All fields are required.')
      return
    }
    if (password.newPass.length < 6) {
      setPassError('Password must be at least 6 characters.')
      return
    }
    if (password.newPass !== password.confirm) {
      setPassError('Passwords do not match.')
      return
    }
    setPassSuccess(true)
    setPassword({ current: '', newPass: '', confirm: '' })
    setTimeout(() => setPassSuccess(false), 3000)
  }

  const TabIcon = tabs.find(t => t.id === activeTab)?.icon || User

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text)]">Settings</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Manage your account and application preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <Card className="p-2">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[var(--color-primary-bg)] text-[var(--color-primary)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Tab Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-bg)] flex items-center justify-center">
              <TabIcon size={16} className="text-[var(--color-primary)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text)]">{tabs.find(t => t.id === activeTab)?.label}</h3>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card className="p-5 space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text)] outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text)] outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Bio</label>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text)] outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
                >
                  <Save size={16} />
                  Save Changes
                </button>
                {saved && (
                  <span className="flex items-center gap-1 text-sm text-[var(--color-success)] animate-fadeIn">
                    <Check size={16} /> Saved
                  </span>
                )}
              </div>
            </Card>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <Card className="p-5 space-y-4">
              <div>
                <p className="text-sm font-medium text-[var(--color-text)] mb-1">Theme</p>
                <p className="text-xs text-[var(--color-text-muted)] mb-3">Choose your preferred color scheme</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { if (theme !== 'light') toggleTheme() }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      theme === 'light'
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-bg)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                    }`}
                  >
                    <Sun size={18} className="text-[var(--color-warning)]" />
                    <span className="text-sm font-medium text-[var(--color-text)]">Light</span>
                    {theme === 'light' && <Check size={16} className="text-[var(--color-primary)]" />}
                  </button>
                  <button
                    onClick={() => { if (theme !== 'dark') toggleTheme() }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      theme === 'dark'
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-bg)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                    }`}
                  >
                    <Moon size={18} className="text-[var(--color-primary)]" />
                    <span className="text-sm font-medium text-[var(--color-text)]">Dark</span>
                    {theme === 'dark' && <Check size={16} className="text-[var(--color-primary)]" />}
                  </button>
                </div>
              </div>
              <div className="pt-3 border-t border-[var(--color-border)]">
                <p className="text-sm font-medium text-[var(--color-text)] mb-1">Sidebar</p>
                <p className="text-xs text-[var(--color-text-muted)] mb-2">Sidebar collapses automatically on desktop</p>
                <Badge variant="primary" size="sm">Auto-collapse enabled</Badge>
              </div>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card className="p-5">
              <div className="divide-y divide-[var(--color-border)]">
                <Toggle
                  enabled={notifSettings.emailNotifications}
                  onChange={v => setNotifSettings(s => ({ ...s, emailNotifications: v }))}
                  label="Email Notifications"
                  desc="Receive notifications via email"
                />
                <Toggle
                  enabled={notifSettings.pushNotifications}
                  onChange={v => setNotifSettings(s => ({ ...s, pushNotifications: v }))}
                  label="Push Notifications"
                  desc="Receive push notifications in the browser"
                />
                <Toggle
                  enabled={notifSettings.weeklyDigest}
                  onChange={v => setNotifSettings(s => ({ ...s, weeklyDigest: v }))}
                  label="Weekly Digest"
                  desc="Get a weekly summary of activity"
                />
                <Toggle
                  enabled={notifSettings.orderUpdates}
                  onChange={v => setNotifSettings(s => ({ ...s, orderUpdates: v }))}
                  label="Order Updates"
                  desc="Notifications for order status changes"
                />
                <Toggle
                  enabled={notifSettings.marketingEmails}
                  onChange={v => setNotifSettings(s => ({ ...s, marketingEmails: v }))}
                  label="Marketing Emails"
                  desc="Product updates and promotional content"
                />
              </div>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card className="p-5 space-y-4">
              <div>
                <p className="text-sm font-medium text-[var(--color-text)] mb-2">Change Password</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-[var(--color-text-muted)] mb-1">Current Password</label>
                    <input
                      type="password"
                      value={password.current}
                      onChange={e => setPassword(p => ({ ...p, current: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text)] outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--color-text-muted)] mb-1">New Password</label>
                    <input
                      type="password"
                      value={password.newPass}
                      onChange={e => setPassword(p => ({ ...p, newPass: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text)] outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--color-text-muted)] mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={password.confirm}
                      onChange={e => setPassword(p => ({ ...p, confirm: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text)] outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                </div>
                {passError && (
                  <p className="text-sm text-[var(--color-error)] mt-2 animate-fadeIn">{passError}</p>
                )}
                {passSuccess && (
                  <p className="text-sm text-[var(--color-success)] mt-2 animate-fadeIn flex items-center gap-1">
                    <Check size={16} /> Password updated successfully
                  </p>
                )}
                <button
                  onClick={handleSavePassword}
                  className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
                >
                  <Save size={16} />
                  Update Password
                </button>
              </div>
              <div className="pt-4 border-t border-[var(--color-border)]">
                <p className="text-sm font-medium text-[var(--color-text)] mb-1">Two-Factor Authentication</p>
                <p className="text-xs text-[var(--color-text-muted)] mb-2">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-colors">
                  Enable 2FA
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
