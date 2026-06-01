# Arquitetura Técnica — Edital IA

## Visão Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                      USUÁRIOS                                    │
│  ┌──────────────────┐         ┌──────────────────┐              │
│  │  Cliente PME     │         │  Admin Edital IA │              │
│  └──────────────────┘         └──────────────────┘              │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│              FRONTEND (Next.js 14 + Vercel)                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐    │
│  │ Landing Page │ │  Dashboard   │ │  Admin Panel         │    │
│  └──────────────┘ └──────────────┘ └──────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│              API ROUTES (Next.js Server)                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐    │
│  │ /api/auth    │ │ /api/editais │ │ /api/asaas-webhook   │    │
│  └──────────────┘ └──────────────┘ └──────────────────────┘    │
└───────────┬────────────────────┬────────────────────┬───────────┘
            │                    │                    │
            ▼                    ▼                    ▼
   ┌──────────────┐      ┌──────────────┐    ┌──────────────┐
   │   SUPABASE   │      │  CLAUDE API  │    │    ASAAS     │
   │  ┌────────┐  │      │              │    │              │
   │  │  Auth  │  │      │  Sonnet 4.5  │    │  PIX         │
   │  │  DB    │  │      │  Haiku 4.5   │    │  Boleto      │
   │  │ Storage│  │      │              │    │  Cartão      │
   │  └────────┘  │      └──────────────┘    └──────────────┘
   └──────────────┘
            │
            ▼
   ┌──────────────┐
   │  WORKER /    │
   │  CRON JOB    │ ──────► PNCP API (busca editais)
   └──────────────┘
```

## Stack Detalhado

### Frontend
- **Next.js 14** com App Router
- **TypeScript** estrito
- **Tailwind CSS** + **shadcn/ui** (Radix UI primitives)
- **React Hook Form** + **Zod** para validação
- **TanStack Query** (React Query) para state management server
- **Lucide React** para ícones

### Backend
- **Next.js API Routes** (serverless functions)
- **Supabase Edge Functions** (Deno) para workers
- **PostgreSQL** via Supabase
- **Row Level Security (RLS)** em todas as tabelas sensíveis

### IA
- **Claude Sonnet 4.5** — análise profunda de editais
- **Claude Haiku 4.5** — classificação rápida e barata

### Integrações
- **Asaas** — gateway de pagamento (PIX + boleto + cartão recorrente)
- **Resend** — e-mail transacional
- **WhatsApp Business API** (futuro — Sprint 8)

### Infraestrutura
- **Vercel** — hospedagem do front e API routes (auto-deploy via Git)
- **Supabase Cloud** — banco + auth + storage
- **GitHub** — versionamento + CI/CD
- **Sentry** — monitoramento de erros (opcional no MVP)

## Padrões de Código

### Server Components vs Client Components
- **Server Components (padrão)**: páginas, layouts, data fetching
- **Client Components ('use client')**: forms, interatividade, hooks

### Server Actions
- Usar para mutations (criar, editar, deletar)
- Validar inputs com Zod
- Sempre verificar autenticação via `createClient()` do server

### Acesso ao Banco
- **Sempre via RLS** — nunca usar `service_role` no client
- Use `createAdminClient()` apenas em rotas de admin e webhooks

## Segurança

1. **Row Level Security ativo** em todas as tabelas com dados de clientes
2. **Validação de inputs** com Zod em toda Server Action
3. **CSRF protection** automática pelo Next.js
4. **Rate limiting** via Vercel (Pro plan)
5. **Auditoria** — toda ação sensível registrada em `audit_logs`

## LGPD Compliance

- Política de privacidade clara e acessível
- Portal de direitos do titular (acesso/exportação/exclusão)
- DPO designado: sócio advogado
- Retenção de dados auditável
- Criptografia em trânsito (TLS 1.3) e em repouso (AES-256)

## Custos Estimados

| Faixa | Vercel | Supabase | Claude API | Total/mês |
|---|---|---|---|---|
| 0-30 clientes | Free | Free | $40 | ~R$ 250 |
| 30-100 clientes | Pro ($20) | Pro ($25) | $200 | ~R$ 1.500 |
| 100-300 clientes | Pro ($20) | Team ($599) | $800 | ~R$ 7.000 |

## Roadmap Técnico

Ver [ROADMAP.md](./ROADMAP.md) para detalhes sprint-a-sprint.
