'use client'

import { useActionState, useState } from 'react'
import { createCompanyAction, type OnboardingState } from './actions'
import { formatCnpj } from '@/lib/cnpj'

const initial: OnboardingState = {}

export default function OnboardingForm() {
  const [state, formAction, pending] = useActionState(createCompanyAction, initial)
  const [cnpj, setCnpj] = useState('')

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <Field label="Razão social" name="razao_social" required />
      <Field label="Nome fantasia (opcional)" name="nome_fantasia" />

      <div>
        <label className="block text-sm font-medium text-slate-700">CNPJ</label>
        <input
          name="cnpj"
          required
          value={cnpj}
          onChange={(e) => setCnpj(formatCnpj(e.target.value))}
          placeholder="00.000.000/0000-00"
          inputMode="numeric"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Plano</label>
        <select
          name="plan"
          defaultValue="starter"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
        >
          <option value="starter">Starter — R$ 397/mês</option>
          <option value="pro">Pro — R$ 1.197/mês</option>
          <option value="enterprise">Enterprise — R$ 3.497/mês</option>
        </select>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
      >
        {pending ? 'Cadastrando...' : 'Criar empresa'}
      </button>
    </form>
  )
}

function Field({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        name={name}
        required={required}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
      />
    </div>
  )
}