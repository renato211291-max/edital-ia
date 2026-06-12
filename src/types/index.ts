export type UserRole = 'client' | 'admin'
export type MemberRole = 'owner' | 'member'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  razao_social: string
  nome_fantasia: string | null
  cnpj: string
  plan: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface CompanyMember {
  company_id: string
  user_id: string
  role: MemberRole
  created_at: string
}