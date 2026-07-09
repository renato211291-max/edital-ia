import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '../actions'
import DashboardNav from './DashboardNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') redirect('/admin')

  return (
    <div style={{ background: '#060D1A', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        h1,h2,h3 { font-family: 'Sora', sans-serif; }
        .glow-card { position: relative; background: #0D1828; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; transition: border-color 0.25s; }
        .glow-card:hover { border-color: rgba(29,106,255,0.35); }
        .dash-tab { font-size: 14px; font-weight: 600; padding: 8px 4px; color: rgba(255,255,255,0.5); text-decoration: none; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; }
        .dash-tab:hover { color: rgba(255,255,255,0.85); }
        .dash-tab.active { color: #fff; border-bottom-color: #1D6AFF; }
      `}</style>

      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(6,13,26,0.85)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 800, fontSize: '18px' }}>
            Edital<span style={{ color: '#00C9A7' }}>IA</span>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>
              {profile?.full_name || profile?.email}
            </span>
            <form action={signOut}>
              <button style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}>
                Sair
              </button>
            </form>
          </div>
        </div>
        <DashboardNav />
      </header>

      <main style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px 80px' }}>
        {children}
      </main>
    </div>
  )
}
