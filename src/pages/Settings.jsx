import { Settings as SettingsIcon, Bell, Shield, Palette } from 'lucide-react'
import Card from '../components/ui/Card'

export default function Settings() {
  const sections = [
    { icon: Palette, title: 'Appearance', desc: 'Customize your dashboard theme and layout preferences' },
    { icon: Bell, title: 'Notifications', desc: 'Configure which notifications you receive and how' },
    { icon: Shield, title: 'Security', desc: 'Manage password, two-factor authentication, and sessions' },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text)]">Settings</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Manage your account and application preferences
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {sections.map((section, i) => {
          const Icon = section.icon
          return (
            <Card
              key={i}
              hoverable
              className="p-5 animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-bg)] flex items-center justify-center">
                  <Icon size={20} className="text-[var(--color-primary)]" />
                </div>
                <h3 className="font-semibold text-sm text-[var(--color-text)]">{section.title}</h3>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">{section.desc}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
