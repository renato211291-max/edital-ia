import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import OnboardingForm from './form'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-2xl font-bold text-slate-900">
          Vamos cadastrar sua empresa
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Precisamos de alguns dados para liberar o acesso à plataforma.
        </p>
        <OnboardingForm />
      </main>
    </div>
  )
}