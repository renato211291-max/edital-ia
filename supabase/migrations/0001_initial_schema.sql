-- =====================================================
-- EDITAL IA — Schema Inicial do Banco de Dados
-- =====================================================
-- Migration: 0001_initial_schema
-- Criado em: Sprint 0
-- Descrição: Tabelas core do MVP — organizações, usuários, editais, análises

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE plano_tipo AS ENUM ('starter', 'pro', 'enterprise');
CREATE TYPE plano_status AS ENUM ('ativo', 'inadimplente', 'cancelado', 'trial');
CREATE TYPE user_role AS ENUM ('owner', 'manager', 'operator', 'admin_editalia');
CREATE TYPE edital_status AS ENUM ('novo', 'analisado', 'selecionado', 'preparando', 'submetido', 'vencido', 'perdido', 'cancelado');
CREATE TYPE doc_status AS ENUM ('vigente', 'proximo_vencimento', 'vencido', 'nao_aplicavel');

-- =====================================================
-- TABELA: organizations (empresas clientes)
-- =====================================================

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    razao_social TEXT NOT NULL,
    nome_fantasia TEXT,
    cnpj TEXT UNIQUE NOT NULL,
    inscricao_estadual TEXT,
    cnaes TEXT[] DEFAULT '{}',
    porte TEXT,  -- ME, EPP, Médio, Grande
    regime_tributario TEXT,  -- Simples, Presumido, Real
    endereco JSONB,  -- {logradouro, numero, bairro, cidade, uf, cep}
    contato JSONB,  -- {nome, email, telefone, cargo}
    
    -- Plano e cobrança
    plano plano_tipo DEFAULT 'starter',
    status plano_status DEFAULT 'trial',
    asaas_customer_id TEXT,
    data_inicio_plano TIMESTAMPTZ,
    proximo_vencimento DATE,
    
    -- Metadados
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_organizations_cnpj ON organizations(cnpj);
CREATE INDEX idx_organizations_status ON organizations(status);

-- =====================================================
-- TABELA: users (usuários do sistema)
-- =====================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    nome TEXT,
    telefone TEXT,
    role user_role DEFAULT 'operator',
    ativo BOOLEAN DEFAULT TRUE,
    ultimo_acesso TIMESTAMPTZ,
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_users_auth ON users(auth_id);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================
-- TABELA: editais (oportunidades coletadas do PNCP)
-- =====================================================

CREATE TABLE editais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Identificação
    pncp_id TEXT UNIQUE,  -- ID único do PNCP para evitar duplicatas
    numero TEXT NOT NULL,
    fonte TEXT DEFAULT 'pncp',  -- pncp, comprasnet, bec_sp, etc.
    orgao TEXT,
    modalidade TEXT,
    objeto TEXT NOT NULL,
    
    -- Valores e datas
    valor_estimado NUMERIC(15, 2),
    data_abertura TIMESTAMPTZ,
    data_limite_propostas TIMESTAMPTZ,
    data_publicacao TIMESTAMPTZ,
    
    -- Localização
    uf CHAR(2),
    municipio TEXT,
    
    -- Classificação
    cnaes_relacionados TEXT[] DEFAULT '{}',
    categoria TEXT,
    palavras_chave TEXT[] DEFAULT '{}',
    
    -- Dados completos
    pdf_url TEXT,
    raw_data JSONB,  -- dados originais do PNCP para auditoria
    
    -- Metadados
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_editais_pncp ON editais(pncp_id);
CREATE INDEX idx_editais_data_limite ON editais(data_limite_propostas);
CREATE INDEX idx_editais_uf ON editais(uf);
CREATE INDEX idx_editais_cnaes ON editais USING GIN(cnaes_relacionados);

-- =====================================================
-- TABELA: analises_ia (resultado da análise por IA)
-- =====================================================

CREATE TABLE analises_ia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edital_id UUID NOT NULL REFERENCES editais(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Resultado da análise
    score_viabilidade INTEGER CHECK (score_viabilidade >= 0 AND score_viabilidade <= 100),
    resumo_executivo TEXT,
    exigencias_criticas JSONB,
    checklist_documentos JSONB,
    alertas_juridicos JSONB,
    estimativa_preco JSONB,
    
    -- Metadados técnicos
    modelo_usado TEXT,  -- claude-sonnet-4-5, claude-haiku-4-5
    tokens_input INTEGER,
    tokens_output INTEGER,
    custo_estimado NUMERIC(10, 4),
    duracao_ms INTEGER,
    
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analises_edital ON analises_ia(edital_id);
CREATE INDEX idx_analises_organization ON analises_ia(organization_id);
CREATE UNIQUE INDEX idx_analises_unica ON analises_ia(edital_id, organization_id);

-- =====================================================
-- TABELA: participacoes (empresa decidiu participar)
-- =====================================================

CREATE TABLE participacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edital_id UUID NOT NULL REFERENCES editais(id) ON DELETE RESTRICT,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Status e responsáveis
    status edital_status DEFAULT 'selecionado',
    responsavel_id UUID REFERENCES users(id),  -- user da equipe Edital IA
    
    -- Proposta
    valor_proposta NUMERIC(15, 2),
    observacoes_internas TEXT,
    
    -- Resultado
    venceu BOOLEAN,
    valor_homologado NUMERIC(15, 2),
    data_homologacao DATE,
    success_fee_calculado NUMERIC(15, 2),
    success_fee_status TEXT,  -- pendente, faturado, recebido
    
    -- Metadados
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_participacoes_edital ON participacoes(edital_id);
CREATE INDEX idx_participacoes_organization ON participacoes(organization_id);
CREATE INDEX idx_participacoes_status ON participacoes(status);

-- =====================================================
-- TABELA: documentos (cofre digital da empresa)
-- =====================================================

CREATE TABLE documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    tipo TEXT NOT NULL,  -- cnd_federal, cnd_estadual, cnd_municipal, fgts, trabalhista, etc.
    nome TEXT NOT NULL,
    descricao TEXT,
    arquivo_url TEXT,
    validade_ate DATE,
    status doc_status DEFAULT 'vigente',
    notificacao_enviada_em TIMESTAMPTZ,
    
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documentos_organization ON documentos(organization_id);
CREATE INDEX idx_documentos_validade ON documentos(validade_ate);
CREATE INDEX idx_documentos_status ON documentos(status);

-- =====================================================
-- TABELA: transacoes_financeiras
-- =====================================================

CREATE TABLE transacoes_financeiras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    
    tipo TEXT NOT NULL,  -- mensalidade, success_fee, setup_fee
    valor NUMERIC(15, 2) NOT NULL,
    status TEXT NOT NULL,  -- pendente, pago, vencido, cancelado
    
    -- Asaas
    asaas_payment_id TEXT,
    asaas_invoice_url TEXT,
    metodo_pagamento TEXT,  -- pix, boleto, cartao
    
    -- Referências
    participacao_id UUID REFERENCES participacoes(id),  -- se for success fee
    
    -- Datas
    vencimento DATE NOT NULL,
    pago_em TIMESTAMPTZ,
    
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transacoes_organization ON transacoes_financeiras(organization_id);
CREATE INDEX idx_transacoes_status ON transacoes_financeiras(status);
CREATE INDEX idx_transacoes_vencimento ON transacoes_financeiras(vencimento);
CREATE INDEX idx_transacoes_asaas ON transacoes_financeiras(asaas_payment_id);

-- =====================================================
-- TABELA: audit_logs (auditoria de ações)
-- =====================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    
    acao TEXT NOT NULL,  -- login, criar_participacao, etc.
    entidade TEXT,  -- nome da tabela afetada
    entidade_id UUID,
    
    detalhes JSONB,
    ip_address INET,
    user_agent TEXT,
    
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_organization ON audit_logs(organization_id);
CREATE INDEX idx_audit_acao ON audit_logs(acao);
CREATE INDEX idx_audit_criado ON audit_logs(criado_em);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) — Segurança multi-tenant
-- =====================================================

-- Habilitar RLS em todas as tabelas com dados sensíveis
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE analises_ia ENABLE ROW LEVEL SECURITY;
ALTER TABLE participacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacoes_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Função helper: obter organization_id do usuário logado
CREATE OR REPLACE FUNCTION get_user_organization()
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT organization_id 
        FROM users 
        WHERE auth_id = auth.uid()
        LIMIT 1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função helper: verificar se usuário é admin Edital IA
CREATE OR REPLACE FUNCTION is_admin_editalia()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM users 
        WHERE auth_id = auth.uid() 
        AND role = 'admin_editalia'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Políticas: organizations
CREATE POLICY "Users can view own organization"
    ON organizations FOR SELECT
    USING (id = get_user_organization() OR is_admin_editalia());

CREATE POLICY "Admins can manage all organizations"
    ON organizations FOR ALL
    USING (is_admin_editalia());

-- Políticas: users
CREATE POLICY "Users can view colleagues from same org"
    ON users FOR SELECT
    USING (organization_id = get_user_organization() OR is_admin_editalia());

-- Políticas: analises_ia
CREATE POLICY "Users can view own org analyses"
    ON analises_ia FOR SELECT
    USING (organization_id = get_user_organization() OR is_admin_editalia());

-- Políticas: participacoes
CREATE POLICY "Users can manage own org participations"
    ON participacoes FOR ALL
    USING (organization_id = get_user_organization() OR is_admin_editalia());

-- Políticas: documentos
CREATE POLICY "Users can manage own org documents"
    ON documentos FOR ALL
    USING (organization_id = get_user_organization() OR is_admin_editalia());

-- Políticas: transacoes_financeiras
CREATE POLICY "Users can view own org transactions"
    ON transacoes_financeiras FOR SELECT
    USING (organization_id = get_user_organization() OR is_admin_editalia());

-- Políticas: audit_logs
CREATE POLICY "Users can view own actions"
    ON audit_logs FOR SELECT
    USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()) OR is_admin_editalia());

-- =====================================================
-- TRIGGERS — updated_at automático
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_editais_updated_at BEFORE UPDATE ON editais
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_participacoes_updated_at BEFORE UPDATE ON participacoes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documentos_updated_at BEFORE UPDATE ON documentos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- COMENTÁRIOS PARA DOCUMENTAÇÃO
-- =====================================================

COMMENT ON TABLE organizations IS 'Empresas clientes do Edital IA';
COMMENT ON TABLE users IS 'Usuários do sistema (membros das empresas + admin Edital IA)';
COMMENT ON TABLE editais IS 'Editais de licitação coletados do PNCP e outras fontes';
COMMENT ON TABLE analises_ia IS 'Análises geradas pelo Claude API sobre os editais';
COMMENT ON TABLE participacoes IS 'Editais selecionados pelas empresas para participar';
COMMENT ON TABLE documentos IS 'Cofre digital de documentos das empresas (CNDs, atestados, etc.)';
COMMENT ON TABLE transacoes_financeiras IS 'Histórico financeiro: mensalidades + success fees';
COMMENT ON TABLE audit_logs IS 'Trilha de auditoria de ações sensíveis';
