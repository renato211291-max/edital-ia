import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Company } from '@/types'
import DocumentsManager from './DocumentsManager'

export interface CompanyDocument {
  id: string
  company_id: string
  categoria: string
  nome: string
  storage_path: string
  validade_ate: string | null
  created_at: string
}

export default async function DocumentosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: true })

  if (!companies || companies.length === 0) redirect('/onboarding')
  const company = companies[0] as Company

  const { data: documentos } = await supabase
    .from('company_documents')
    .select('*')
    .eq('company_id', company.id)
    .order('created_at', { ascending: false })

  return (
    <>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
        Documentos
      </h1>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
        Cofre digital da sua empresa — envie e organize certidões, atestados e contratos com controle automático de vencimento.
      </p>
      <DocumentsManager
        companyId={company.id}
        initialDocuments={(documentos as CompanyDocument[]) || []}
      />
    </>
  )
}