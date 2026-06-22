'use client'

import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { createCompanyAction, type OnboardingState } from './actions'
import { formatCnpj, onlyDigits } from '@/lib/cnpj'
import { lookupCnpj, type CnaeInfo } from '@/lib/cnpj-lookup'

const initial: OnboardingState = {}

const UF_LIST = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB',
  'PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

export default function OnboardingForm() {
  const [state, formAction] = useFormState(createCompanyAction, initial)
  const [cnpj, setCnpj] = useState('')
  const [accepted, setAccepted] = useState(false)

  const [razaoSocial, setRazaoSocial] = useState('')
  const [nomeFantasia, setNomeFantasia] = useState('')
  const [cnaes, setCnaes] = useState<CnaeInfo[]>([])
  const [buscandoCnpj, setBuscandoCnpj] = useState(false)
  const [cnpjEncontrado, setCnpjEncontrado] = useState(false)

  const [estadosSelecionados, setEstadosSelecionados] = useState<string[]>([])
  const [cidades, setCidades] = useState('')
  const [areaAtuacao, setAreaAtuacao] = useState('')
  const [valorLimite, setValorLimite] = useState('')
  const [capacidadeOperacional, setCapacidadeOperacional] = useState('')

  // Dispara busca automática quando o CNPJ tiver 14 dígitos
  useEffect(() => {
    const digits = onlyDigits(cnpj)
    if (digits.length !== 14) {
      setCnpjEncontrado(false)
      return
    }

    let active = true
    setBuscandoCnpj(true)
    setCnpjEncontrado(false)

    lookupCnpj(digits).then((result) => {
      if (!active) return
      setBuscandoCnpj(false)
      if (result) {
        setCnpjEncontrado(true)
        if (!razaoSocial) setRazaoSocial(result.razaoSocial)
        if (!nomeFantasia && result.nomeFantasia) setNomeFantasia(result.nomeFantasia)
        setCnaes(result.cnaes)
        if (result.uf && !estadosSelecionados.includes(result.uf)) {
          setEstadosSelecionados((prev) => [...prev, result.uf!])
        }
        if (result.cidade && !cidades) setCidades(result.cidade)
      }
    })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cnpj])

  function toggleEstado(uf: string) {
    setEstadosSelecionados((prev) =>
      prev.includes(uf) ? prev.filter((x) => x !== uf) : [...prev, uf]
    )
  }

  function formatMoeda(value: string) {
    const digits = value.replace(/\D/g, '')
    if (!digits) return ''
    const num = Number(digits) / 100
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <form action={formAction} className="mt-6 space-y-6">
      <input type="hidden" name="estados" value={estadosSelecionados.join(',')} />
      <input type="hidden" name="cidades" value={cidades} />
      <input type="hidden" name="cnaes_json" value={JSON.stringify(cnaes)} />

      <Section title="Dados da empresa">
        <div>
          <label className="block text-sm font-medium text-slate-700">CNPJ</label>
          <input
            name="cnpj"
            required
            value={cnpj}
            onChange={(e) => setCnpj(formatCnpj(e.target.value))}
            placeholder="00.000.000/0000-00"
            inputMode="numeric"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
          {buscandoCnpj && (
            <p className="mt-1 text-xs text-slate-400">Buscando dados do CNPJ...</p>
          )}
          {cnpjEncontrado && !buscandoCnpj && (
            <p className="mt-1 text-xs text-emerald-600">
              ✓ Dados encontrados e preenchidos automaticamente.
            </p>
          )}
        </div>

        <Field
          label="Razão social"
          name="razao_social"
          required
          value={razaoSocial}
          onChange={setRazaoSocial}
        />
        <Field
          label="Nome fantasia (opcional)"
          name="nome_fantasia"
          value={nomeFantasia}
          onChange={setNomeFantasia}
        />

        <div>
          <label className="block text-sm font-medium text-slate-700">Plano</label>
          <select
            name="plan"
            defaultValue="starter"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          >
            <option value="starter">Starter — R$ 397/mês</option>
            <option value="pro">Pro — R$ 1.197/mês</option>
            <option value="enterprise">Enterprise — R$ 3.497/mês</option>
          </select>
        </div>
      </Section>

      <Section title="Atividades (CNAEs)">
        {cnaes.length === 0 ? (
          <p className="text-sm text-slate-400">
            Os CNAEs aparecem aqui automaticamente após você informar o CNPJ.
          </p>
        ) : (
          <div className="space-y-2">
            {cnaes.map((c) => (
              <div
                key={c.codigo}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              >
                <span className="font-medium text-slate-900">{c.codigo}</span> — {c.descricao}
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Onde sua empresa atua">
        <div>
          <label className="block text-sm font-medium text-slate-700">Área de atuação</label>
          <input
            value={areaAtuacao}
            onChange={(e) => setAreaAtuacao(e.target.value)}
            name="area_atuacao"
            placeholder="Ex: fabricação e instalação de esquadrias de alumínio e vidro"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Estados que atende</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {UF_LIST.map((uf) => {
              const ativo = estadosSelecionados.includes(uf)
              return (
                <button
                  key={uf}
                  type="button"
                  onClick={() => toggleEstado(uf)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition ${
                    ativo
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {uf}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Cidades (opcional)</label>
          <input
            value={cidades}
            onChange={(e) => setCidades(e.target.value)}
            placeholder="Ex: Porto Alegre, Gravataí, Canoas"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
          <p className="mt-1 text-xs text-slate-400">Separe por vírgula. Deixe em branco se atende o estado todo.</p>
        </div>
      </Section>

      <Section title="Capacidade de execução">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Valor limite que sua empresa consegue executar (R$)
          </label>
          <input
            name="valor_limite_execucao"
            value={valorLimite}
            onChange={(e) => setValorLimite(formatMoeda(e.target.value))}
            placeholder="Ex: 500.000,00"
            inputMode="numeric"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
          <p className="mt-1 text-xs text-slate-400">
            Usamos isso para evitar sugerir licitações fora do seu porte.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Capacidade operacional</label>
          <textarea
            name="capacidade_operacional"
            value={capacidadeOperacional}
            onChange={(e) => setCapacidadeOperacional(e.target.value)}
            placeholder="Ex: equipe própria de 12 instaladores, 3 veículos, capacidade de produção de 500m² de esquadrias/mês"
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </Section>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="accept_terms"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <span className="text-sm text-slate-600">
            Li e aceito os{' '}
            <a href="/termos" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-900 underline">
              Termos de Uso
            </a>
            , a{' '}
            <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-900 underline">
              Política de Privacidade
            </a>{' '}
            e o{' '}
            <a href="/contrato" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-900 underline">
              Contrato de Prestação de Serviços
            </a>{' '}
            da Edital IA.
          </span>
        </label>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <SubmitButton accepted={accepted} />
    </form>
  )
}

function SubmitButton({ accepted }: { accepted: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending || !accepted}
      className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
    >
      {pending ? 'Cadastrando...' : 'Criar empresa'}
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      {children}
    </div>
  )
}

function Field({
  label,
  name,
  required,
  value,
  onChange,
}: {
  label: string
  name: string
  required?: boolean
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
      />
    </div>
  )
}