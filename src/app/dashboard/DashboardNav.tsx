'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/dashboard', label: 'Visão Geral' },
  { href: '/dashboard/documentos', label: 'Documentos' },
]

export default function DashboardNav() {
  const pathname = usePathname()
  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '24px' }}>
      {TABS.map(tab => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`dash-tab${pathname === tab.href ? ' active' : ''}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}
