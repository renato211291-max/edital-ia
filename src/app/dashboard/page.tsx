import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '../actions'
import type { Company } from '@/types'

const PLAN_LABEL: Record<string, string> = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
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

  if (profile?.role === 'admin') redirect('/admin')

  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: true })

  if (!companies || companies.length === 0) redirect('/onboarding')

  const company = companies[0] as Company

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <span className="text-lg font-bold text-slate-900">Edital IA</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {profile?.full_name || profile?.email}
            </span>
            <form action={signOut}>
              <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Olá, {profile?.full_name?.split(' ')[0] || 'bem-vindo'} 👋
        </h1>

        <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {company.razao_social}
            </h2>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              {PLAN_LABEL[company.plan] ?? company.plan}
            </span>
          </div>
          {company.nome_fantasia && (
            <p className="mt-1 text-sm text-slate-500">{company.nome_fantasia}</p>
          )}
          <p className="mt-2 text-sm text-slate-500">CNPJ: {company.cnpj}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Stat label="Editais analisados" value="0" />
          <Stat label="Em andamento" value="0" />
          <Stat label="Vencidas" value="0" />
        </div>

        <div className="mt-6 rounded-xl border border-dashed bg-white p-8 text-center">
          <p className="text-sm text-slate-500">
            A busca de editais no PNCP e a análise por IA chegam no Sprint 2.
          </p>
        </div>
      </main>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  )
}