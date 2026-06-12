'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isValidCnpj, onlyDigits } from '@/lib/cnpj'

export type OnboardingState = { error?: string }

export async function createCompanyAction(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const razao = String(formData.get('razao_social') ?? '').trim()
  const fantasia = String(formData.get('nome_fantasia') ?? '').trim()
  const cnpjRaw = String(formData.get('cnpj') ?? '')
  const plan = String(formData.get('plan') ?? 'starter')

  if (!razao) return { error: 'Informe a razão social.' }
  if (!isValidCnpj(cnpjRaw)) return { error: 'CNPJ inválido.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase.rpc('create_company', {
    p_razao_social: razao,
    p_nome_fantasia: fantasia || null,
    p_cnpj: onlyDigits(cnpjRaw),
    p_plan: plan,
  })

  if (error) {
    if (error.code === '23505') return { error: 'Este CNPJ já está cadastrado.' }
    return { error: error.message }
  }

  redirect('/dashboard')
}
