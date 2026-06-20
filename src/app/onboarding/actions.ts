'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { isValidCnpj, onlyDigits } from '@/lib/cnpj'

export type OnboardingState = { error?: string }

const DOCUMENT_VERSION = '1.0'

export async function createCompanyAction(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const razao = String(formData.get('razao_social') ?? '').trim()
  const fantasia = String(formData.get('nome_fantasia') ?? '').trim()
  const cnpjRaw = String(formData.get('cnpj') ?? '')
  const plan = String(formData.get('plan') ?? 'starter')
  const acceptTerms = formData.get('accept_terms') === 'on'

  if (!razao) return { error: 'Informe a razão social.' }
  if (!isValidCnpj(cnpjRaw)) return { error: 'CNPJ inválido.' }
  if (!acceptTerms) return { error: 'É necessário aceitar os Termos de Uso, a Política de Privacidade e o Contrato para continuar.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const headersList = await headers()
  const forwardedFor = headersList.get('x-forwarded-for')
  const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown'
  const userAgent = headersList.get('user-agent') ?? 'unknown'
  const cnpjDigits = onlyDigits(cnpjRaw)

  const documentTypes = ['termos_de_uso', 'politica_privacidade', 'contrato_prestacao_servico'] as const

  const consentRows = documentTypes.map((docType) => ({
    user_id: user.id,
    email: user.email ?? '',
    cnpj: cnpjDigits,
    document_type: docType,
    document_version: DOCUMENT_VERSION,
    ip_address: ipAddress,
    user_agent: userAgent,
  }))

  const { error: consentError } = await supabase
    .from('consent_logs')
    .insert(consentRows)

  if (consentError) {
    return { error: 'Não foi possível registrar o aceite dos termos. Tente novamente.' }
  }

  const { error } = await supabase.rpc('create_company', {
    p_razao_social: razao,
    p_nome_fantasia: fantasia || null,
    p_cnpj: cnpjDigits,
    p_plan: plan,
  })

  if (error) {
    if (error.code === '23505') return { error: 'Este CNPJ já está cadastrado.' }
    return { error: error.message }
  }

  redirect('/dashboard')
}