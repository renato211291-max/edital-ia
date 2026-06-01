# 🛠️ Guia de Setup — Edital IA

Este documento te guia passo-a-passo para configurar o ambiente de desenvolvimento e colocar o projeto rodando.

---

## Pré-requisitos

- **Node.js 20+** ([baixar aqui](https://nodejs.org/))
- **Git** ([baixar aqui](https://git-scm.com/))
- **Editor de código**: VS Code recomendado ([baixar aqui](https://code.visualstudio.com/))

---

## Passo 1 — Criar as contas necessárias

Antes de mexer no código, você precisa criar 5 contas. Cada uma fornece uma peça do produto:

### 1.1. GitHub (versionamento de código)

1. Acesse https://github.com → **Sign up**
2. Crie conta com seu e-mail principal
3. Crie uma **Organization** chamada `licitare-tech` (ou similar)
4. Crie um **repositório privado** chamado `edital-ia`
5. **NÃO** marque "Initialize with README"

**Copie:** URL do repositório (ex: `https://github.com/licitare-tech/edital-ia`)

### 1.2. Supabase (banco + auth)

1. Acesse https://supabase.com → **Start your project**
2. Faça login com GitHub
3. **New project**:
   - Name: `editalia-prod`
   - Database Password: gere uma forte e **anote**
   - Region: **South America (São Paulo)**
   - Plan: **Free**
4. Aguarde 2-3 minutos a criação
5. Vá em **Settings → API**

**Copie:**
- Project URL
- anon public key
- service_role key (mantenha em segredo!)

### 1.3. Vercel (hospedagem)

1. Acesse https://vercel.com → **Sign Up**
2. Continue with GitHub (autorize)
3. Não importe projeto ainda (faremos depois)

**Apenas confirme login.**

### 1.4. Anthropic (Claude API)

1. Acesse https://console.anthropic.com
2. Crie conta
3. **Settings → Billing** → adicione US$ 50
4. **Settings → API Keys → Create Key**:
   - Name: `edital-ia-prod`
   - Permissions: Full access

**Copie:** API key (começa com `sk-ant-api03-...`)

### 1.5. Asaas (pagamentos)

1. Acesse https://www.asaas.com → **Criar conta grátis**
2. Cadastre com **CNPJ Licitare** (65.648.629/0001-98)
3. Envie documentos para validação (1-2 dias úteis)
4. Quando aprovado: **Integrações → Chave de API**
5. Crie chave de **Sandbox** primeiro (testes)

**Copie:** Chave de Sandbox

---

## Passo 2 — Configurar o projeto localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU-USUARIO/edital-ia.git
cd edital-ia

# 2. Instalar dependências
npm install

# 3. Copiar arquivo de variáveis
cp .env.example .env.local
```

### 2.1. Preencher `.env.local`

Abra `.env.local` no VS Code e preencha com as chaves obtidas no Passo 1:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://SEUPROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ANTHROPIC_API_KEY=sk-ant-api03-...
ASAAS_API_KEY=$aact_...
ASAAS_ENV=sandbox
RESEND_API_KEY=re_...  # criar conta em resend.com depois
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2.2. Aplicar o schema do banco

1. No dashboard do Supabase, vá em **SQL Editor**
2. Abra o arquivo `supabase/migrations/0001_initial_schema.sql` no editor
3. Copie todo o conteúdo
4. Cole no SQL Editor do Supabase e clique em **Run**
5. Verifique em **Table Editor** se as 7 tabelas foram criadas

---

## Passo 3 — Rodar o projeto

```bash
npm run dev
```

Acesse http://localhost:3000

**Você deve ver a landing page do Edital IA.** Se ver, parabéns — o setup base está funcionando.

---

## Passo 4 — Deploy na Vercel

```bash
# 1. Faça push do código
git add .
git commit -m "Initial commit"
git push

# 2. No dashboard Vercel
# - Add New → Project
# - Import do GitHub (edital-ia)
# - Adicionar TODAS as variáveis de ambiente do .env.local
# - Deploy
```

Em 2-3 minutos sua landing page estará no ar em `https://edital-ia.vercel.app`.

---

## Próximos Passos

Você tem o esqueleto pronto. Para começar a construir features de verdade, abra uma conversa nova com o Claude com o título:

**"Edital IA — Sprint 1: Setup + Auth"**

Cole na primeira mensagem:
- URL do GitHub
- Project URL e anon key do Supabase
- API key da Anthropic
- Anexe 3-5 editais reais em PDF

Claude vai começar a construir as features.

---

## Estrutura de Arquivos

```
edital-ia/
├── src/
│   ├── app/                # Rotas Next.js
│   │   ├── layout.tsx      # Layout raiz
│   │   ├── page.tsx        # Landing page
│   │   └── globals.css     # CSS global
│   ├── components/         # Componentes React
│   │   └── ui/             # shadcn/ui base
│   ├── lib/                # Utilitários
│   │   ├── supabase/       # Clients Supabase
│   │   ├── anthropic.ts    # Cliente Claude
│   │   └── utils.ts        # cn(), formatBRL, etc.
│   ├── types/              # TypeScript types
│   │   └── database.ts     # Tipos do banco
│   └── middleware.ts       # Proteção de rotas
├── supabase/
│   └── migrations/         # SQL migrations
├── docs/                   # Documentação
├── .env.example            # Template de env vars
├── package.json            # Dependências
├── tailwind.config.ts      # Tema Tailwind
├── tsconfig.json           # Config TypeScript
└── next.config.js          # Config Next.js
```

---

## Comandos Úteis

```bash
npm run dev         # Roda em desenvolvimento (localhost:3000)
npm run build       # Build de produção
npm run start       # Roda build de produção
npm run lint        # Verifica erros de lint
npm run type-check  # Verifica erros de TypeScript
```

---

## Troubleshooting

### Erro: "Failed to fetch" no Supabase
- Verifique se as URLs e keys estão corretas no `.env.local`
- Reinicie o servidor (`Ctrl+C` e `npm run dev`)

### Erro de build na Vercel
- Verifique se TODAS as variáveis de ambiente foram adicionadas no dashboard Vercel
- Force redeploy: **Deployments → ... → Redeploy**

### Schema não criou no Supabase
- Verifique se você está no projeto correto
- Execute as queries em ordem, não tudo de uma vez se der erro
- Verifique extensões necessárias: `uuid-ossp` deve estar habilitada
