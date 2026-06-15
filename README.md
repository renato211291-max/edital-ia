# 🚀 Edital IA

> Plataforma SaaS B2B de gestão de licitações públicas com inteligência artificial

**Operado por:** Licitare Consultoria e Gestão Empresarial Ltda
**CNPJ:** 65.648.629/0001-98
**Domínio:** licitarestrategy.com.br

---

## Sobre o produto

O Edital IA combina três pilares para revolucionar a participação de PMEs em licitações públicas:

1. **🔍 Busca automatizada** de editais no PNCP (Portal Nacional de Contratações Públicas)
2. **🤖 Análise por IA** (Claude API) que lê o edital, gera resumo, score de viabilidade, exigências e checklist
3. **👨‍💼 Execução humana especializada** que prepara documentação e envia a licitação

### Diferencial competitivo

| Player | Tem busca? | Tem IA? | Gera docs? | Tem jurídico? | Cobra success fee? |
|---|---|---|---|---|---|
| LicitaFree | ✓ | Parcial | ✓ | ✗ | ✗ |
| Effecti/ConLicitação | ✓ | Parcial | ✗ | ✗ | ✗ |
| Consultorias humanas | ✗ | ✗ | ✓ | ✓ | ✓ |
| **Edital IA** | **✓** | **✓** | **✓** | **✓** | **✓** |

---

## Stack tecnológica

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Next.js API Routes + Supabase Edge Functions
- **Banco:** PostgreSQL (Supabase) com Row Level Security
- **Auth:** Supabase Auth (email + magic link)
- **Storage:** Supabase Storage
- **IA:** Claude API (Sonnet 4.5 + Haiku 4.5)
- **Pagamentos:** Asaas (PIX + boleto + cartão recorrente)
- **E-mail:** Resend
- **Hospedagem:** Vercel
- **Monitoramento:** Sentry

---

## Estrutura de planos

| Plano | Mensalidade | Success Fee | Editais/mês | Recursos jurídicos |
|---|---|---|---|---|
| **Starter** | R$ 397 | 8% | 5 | — |
| **Pro** | R$ 1.197 | 8% | 50 | 3/mês |
| **Enterprise** | R$ 3.497 | 6% | Ilimitado | Ilimitado |

---

## Setup local (para desenvolvedores)

### Pré-requisitos

- Node.js 20+
- npm ou pnpm
- Conta Supabase
- Conta Anthropic
- Conta Asaas (sandbox para desenvolvimento)

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/[ORG]/edital-ia.git
cd edital-ia

# 2. Instalar dependências
npm install

# 3. Copiar variáveis de ambiente
cp .env.example .env.local

# 4. Preencher .env.local com suas chaves (Supabase, Anthropic, Asaas, Resend)

# 5. Rodar localmente
npm run dev
```

Acesse http://localhost:3000

### Deploy

Deploy automático na Vercel a cada push para a branch `main`.

---

## Estrutura de pastas

```
edital-ia/
├── src/
│   ├── app/              # Rotas Next.js (App Router)
│   ├── components/       # Componentes React reutilizáveis
│   │   └── ui/           # Componentes base (shadcn/ui)
│   ├── lib/              # Funções utilitárias, clients Supabase/Claude
│   └── types/            # Tipos TypeScript
├── supabase/
│   └── migrations/       # Migrations do banco de dados
├── public/               # Assets estáticos
├── docs/                 # Documentação técnica
└── .github/
    └── workflows/        # CI/CD GitHub Actions
```

---

## Roadmap

- [x] **Sprint 0**: Setup inicial do projeto
- [ ] **Sprint 1**: Setup técnico + autenticação + cadastro de empresa
- [ ] **Sprint 2**: Ingestão de editais do PNCP
- [ ] **Sprint 3**: Análise por IA (Claude API)
- [ ] **Sprint 4**: Seleção de editais + geração de documentos
- [ ] **Sprint 5**: Pagamentos via Asaas (PIX/cartão/boleto)
- [ ] **Sprint 6**: Lançamento público

---

## Documentação adicional

- 📄 [Arquitetura Técnica](./docs/ARCHITECTURE.md)
- 💰 [Modelo Financeiro](./docs/FINANCIAL_MODEL.md)
- 📋 [Roadmap Detalhado](./docs/ROADMAP.md)
- 🔒 [Segurança e LGPD](./docs/SECURITY.md)

---

## Time

- **Renato Bernardes Filho** — Administrador / Product Owner
- **Sócio Advogado** — Jurídico / Legal Lead
- **Claude (Anthropic)** — Engenheiro de Software

---

## Licença

Proprietário. Todos os direitos reservados — Licitare Consultoria e Gestão Empresarial Ltda.
 
