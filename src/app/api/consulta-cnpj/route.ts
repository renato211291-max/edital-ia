import { NextResponse } from 'next/server'
import { lookupCnpj } from '@/lib/cnpj-lookup'
import { consultarOportunidades } from '@/lib/pncp-consulta'
import { onlyDigits } from '@/lib/cnpj'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const cnpjRaw = body?.cnpj ?? ''
  const cnpj = onlyDigits(String(cnpjRaw))

  if (cnpj.length !== 14) {
    return NextResponse.json({ error: 'CNPJ inválido.' }, { status: 400 })
  }

  const empresa = await lookupCnpj(cnpj)

  if (!empresa || !empresa.uf) {
    return NextResponse.json(
      { error: 'Não foi possível localizar dados para este CNPJ.' },
      { status: 404 }
    )
  }

  const cnaePrincipal = empresa.cnaes[0]?.descricao ?? ''

  const resultado = await consultarOportunidades(empresa.uf, cnaePrincipal)

  return NextResponse.json({
    count: resultado.total,
    categoria: resultado.categoriaLabel,
    items: resultado.exemplos.map((item) => ({
      orgao: item.orgao,
      obj: item.objeto,
      valor: item.valorEstimado
        ? item.valorEstimado.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 0,
          })
        : 'Não informado',
      prazo: item.dataEncerramentoProposta
        ? new Date(item.dataEncerramentoProposta).toLocaleDateString('pt-BR')
        : 'A confirmar',
    })),
  })
}