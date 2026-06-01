/**
 * Tipos TypeScript do banco de dados Supabase.
 * 
 * Estes tipos refletem o schema definido em supabase/migrations/0001_initial_schema.sql
 * 
 * Em produção, você pode gerar automaticamente via:
 *   npx supabase gen types typescript --project-id SEU_PROJECT_ID > src/types/database.ts
 */

export type PlanoTipo = 'starter' | 'pro' | 'enterprise';
export type PlanoStatus = 'ativo' | 'inadimplente' | 'cancelado' | 'trial';
export type UserRole = 'owner' | 'manager' | 'operator' | 'admin_editalia';
export type EditalStatus =
  | 'novo'
  | 'analisado'
  | 'selecionado'
  | 'preparando'
  | 'submetido'
  | 'vencido'
  | 'perdido'
  | 'cancelado';
export type DocStatus = 'vigente' | 'proximo_vencimento' | 'vencido' | 'nao_aplicavel';

export interface Organization {
  id: string;
  razao_social: string;
  nome_fantasia: string | null;
  cnpj: string;
  inscricao_estadual: string | null;
  cnaes: string[];
  porte: string | null;
  regime_tributario: string | null;
  endereco: {
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
  } | null;
  contato: {
    nome?: string;
    email?: string;
    telefone?: string;
    cargo?: string;
  } | null;
  plano: PlanoTipo;
  status: PlanoStatus;
  asaas_customer_id: string | null;
  data_inicio_plano: string | null;
  proximo_vencimento: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface User {
  id: string;
  auth_id: string;
  organization_id: string | null;
  email: string;
  nome: string | null;
  telefone: string | null;
  role: UserRole;
  ativo: boolean;
  ultimo_acesso: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface Edital {
  id: string;
  pncp_id: string | null;
  numero: string;
  fonte: string;
  orgao: string | null;
  modalidade: string | null;
  objeto: string;
  valor_estimado: number | null;
  data_abertura: string | null;
  data_limite_propostas: string | null;
  data_publicacao: string | null;
  uf: string | null;
  municipio: string | null;
  cnaes_relacionados: string[];
  categoria: string | null;
  palavras_chave: string[];
  pdf_url: string | null;
  raw_data: Record<string, unknown> | null;
  criado_em: string;
  atualizado_em: string;
}

export interface AnaliseIA {
  id: string;
  edital_id: string;
  organization_id: string;
  score_viabilidade: number | null;
  resumo_executivo: string | null;
  exigencias_criticas: Record<string, unknown> | null;
  checklist_documentos: Record<string, unknown> | null;
  alertas_juridicos: Record<string, unknown> | null;
  estimativa_preco: Record<string, unknown> | null;
  modelo_usado: string | null;
  tokens_input: number | null;
  tokens_output: number | null;
  custo_estimado: number | null;
  duracao_ms: number | null;
  criado_em: string;
}

export interface Participacao {
  id: string;
  edital_id: string;
  organization_id: string;
  status: EditalStatus;
  responsavel_id: string | null;
  valor_proposta: number | null;
  observacoes_internas: string | null;
  venceu: boolean | null;
  valor_homologado: number | null;
  data_homologacao: string | null;
  success_fee_calculado: number | null;
  success_fee_status: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface Documento {
  id: string;
  organization_id: string;
  tipo: string;
  nome: string;
  descricao: string | null;
  arquivo_url: string | null;
  validade_ate: string | null;
  status: DocStatus;
  notificacao_enviada_em: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface TransacaoFinanceira {
  id: string;
  organization_id: string;
  tipo: string;
  valor: number;
  status: string;
  asaas_payment_id: string | null;
  asaas_invoice_url: string | null;
  metodo_pagamento: string | null;
  participacao_id: string | null;
  vencimento: string;
  pago_em: string | null;
  criado_em: string;
}

/**
 * Database — tipo principal usado pelos clients Supabase.
 */
export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: Organization;
        Insert: Omit<Organization, 'id' | 'criado_em' | 'atualizado_em'>;
        Update: Partial<Organization>;
      };
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'criado_em' | 'atualizado_em'>;
        Update: Partial<User>;
      };
      editais: {
        Row: Edital;
        Insert: Omit<Edital, 'id' | 'criado_em' | 'atualizado_em'>;
        Update: Partial<Edital>;
      };
      analises_ia: {
        Row: AnaliseIA;
        Insert: Omit<AnaliseIA, 'id' | 'criado_em'>;
        Update: Partial<AnaliseIA>;
      };
      participacoes: {
        Row: Participacao;
        Insert: Omit<Participacao, 'id' | 'criado_em' | 'atualizado_em'>;
        Update: Partial<Participacao>;
      };
      documentos: {
        Row: Documento;
        Insert: Omit<Documento, 'id' | 'criado_em' | 'atualizado_em'>;
        Update: Partial<Documento>;
      };
      transacoes_financeiras: {
        Row: TransacaoFinanceira;
        Insert: Omit<TransacaoFinanceira, 'id' | 'criado_em'>;
        Update: Partial<TransacaoFinanceira>;
      };
    };
  };
};
