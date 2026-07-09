import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Company } from '@/types'

const PLAN_LABEL: Record<string, string> = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
}

const PLAN_COLOR: Record<string, string> = {
  starter: 'rgba(126,184,255,0.15)',
  pro: 'linear-gradient(135deg,#1D6AFF,#0A3FA8)',
  enterprise: 'linear-gradient(135deg,#00C9A7,#0A3FA8)',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: true })

  if (!companies || companies.length === 0) redirect('/onboarding')

  const company = companies[0] as Company
  const firstName = profile?.full_name?.split(' ')[0] || 'bem-vindo'

  return (
    <>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '28px' }}>
        Olá, {firstName} 👋
      </h1>

      <div className="glow-card" style={{ padding: '28px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px' }}>
            {company.razao_social}
          </h2>
          {company.nome_fantasia && (
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '6px' }}>
              {company.nome_fantasia}
            </p>
          )}
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
            CNPJ: {company.cnpj}
          </p>
        </div>
        <span style={{
          padding: '8px 18px',
          borderRadius: '100px',
          fontSize: '13px',
          fontWeight: 700,
          fontFamily: 'Sora, sans-serif',
          background: PLAN_COLOR[company.plan] ?? 'rgba(255,255,255,0.1)',
          color: '#fff',
        }}>
          {PLAN_LABEL[company.plan] ?? company.plan}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <Stat label="Editais analisados" value="0" icon="📄" accent="#7EB8FF" />
        <Stat label="Em andamento" value="0" icon="⚡" accent="#00C9A7" />
        <Stat label="Vencidas" value="0" icon="🏆" accent="#FFD166" />
      </div>

      <div className="glow-card" style={{ padding: '40px', textAlign: 'center', borderStyle: 'dashed' }}>
        <div style={{ fontSize: '28px', marginBottom: '12px' }}>🤖</div>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
          A busca de editais no PNCP já está disponível na landing page. A análise por IA (Resumo Inteligente) chega no Sprint 4.
        </p>
      </div>
    </>
  )
}

function Stat({ label, value, icon, accent }: { label: string; value: string; icon: string; accent: string }) {
  return (
    <div className="glow-card" style={{ padding: '24px' }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: `${accent}1A`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        marginBottom: '14px',
      }}>
        {icon}
      </div>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>{label}</p>
      <p style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Sora, sans-serif', color: accent }}>{value}</p>
    </div>
  )
}