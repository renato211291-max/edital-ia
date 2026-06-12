import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '../actions'
import type { Company, Profile } from '@/types'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, email, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-lg font-bold text-slate-900">
            Edital IA <span className="text-red-600">· Admin</span>
          </span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">{profile?.email}</span>
            <form action={signOut}>
              <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Empresas" value={String(companies?.length ?? 0)} />
          <Stat label="Usuários" value={String(profiles?.length ?? 0)} />
          <Stat
            label="Admins"
            value={String(
              (profiles ?? []).filter((p) => (p as Profile).role === 'admin').length
            )}
          />
        </div>

        <Section title="Empresas">
          <Table
            headers={['Razão social', 'CNPJ', 'Plano', 'Criada em']}
            rows={(companies ?? []).map((c) => {
              const co = c as Company
              return [
                co.razao_social,
                co.cnpj,
                co.plan,
                new Date(co.created_at).toLocaleDateString('pt-BR'),
              ]
            })}
          />
        </Section>

        <Section title="Usuários">
          <Table
            headers={['Nome', 'E-mail', 'Papel', 'Criado em']}
            rows={(profiles ?? []).map((p) => {
              const pr = p as Profile
              return [
                pr.full_name || '—',
                pr.email,
                pr.role,
                new Date(pr.created_at).toLocaleDateString('pt-BR'),
              ]
            })}
          />
        </Section>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-slate-900">{title}</h2>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        {children}
      </div>
    </section>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="border-b bg-slate-50 text-slate-500">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-4 py-3 font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="px-4 py-6 text-center text-slate-400">
              Nenhum registro.
            </td>
          </tr>
        ) : (
          rows.map((row, i) => (
            <tr key={i} className="border-b last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate-700">{cell}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}