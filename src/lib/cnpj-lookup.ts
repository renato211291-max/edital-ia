export type CnaeInfo = {
  codigo: string
  descricao: string
}

export type CnpjLookupResult = {
  razaoSocial: string
  nomeFantasia: string | null
  cnaes: CnaeInfo[]
  uf: string | null
  cidade: string | null
}

/**
 * Consulta dados públicos de um CNPJ via BrasilAPI (gratuita, sem necessidade de token).
 * Retorna null em caso de erro ou CNPJ não encontrado.
 *
 * Importante: a BrasilAPI bloqueia (403) requisições sem um User-Agent que
 * pareça vir de um navegador real, quando a chamada parte de datacenters
 * de cloud (como as funções serverless do Vercel). Por isso enviamos um
 * User-Agent explícito de navegador.
 */
export async function lookupCnpj(cnpjDigits: string): Promise<CnpjLookupResult | null> {
  if (cnpjDigits.length !== 14) return null

  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjDigits}`, {
      cache: 'no-store',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
    })

    if (!res.ok) return null

    const data = await res.json()

    const cnaes: CnaeInfo[] = []

    if (data.cnae_fiscal && data.cnae_fiscal_descricao) {
      cnaes.push({ codigo: String(data.cnae_fiscal), descricao: data.cnae_fiscal_descricao })
    }

    if (Array.isArray(data.cnaes_secundarios)) {
      for (const item of data.cnaes_secundarios) {
        if (item?.codigo && item?.descricao) {
          cnaes.push({ codigo: String(item.codigo), descricao: item.descricao })
        }
      }
    }

    return {
      razaoSocial: data.razao_social ?? '',
      nomeFantasia: data.nome_fantasia || null,
      cnaes,
      uf: data.uf ?? null,
      cidade: data.municipio ?? null,
    }
  } catch {
    return null
  }
}