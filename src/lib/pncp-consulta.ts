import { categorizarCnae, objetoAderente } from './cnae-categorias'

export type OportunidadeEdital = {
  orgao: string
  objeto: string
  valorEstimado: number | null
  dataEncerramentoProposta: string | null
  municipio: string | null
}

export type ConsultaPncpResult = {
  total: number
  exemplos: OportunidadeEdital[]
  categoriaLabel: string
}

// /contratacoes/proposta retorna editais cujo prazo de proposta ainda
// está em aberto na data de hoje — diferente de /contratacoes/publicacao,
// que filtra por data de publicação e pode incluir editais já encerrados.
const PNCP_BASE = 'https://pncp.gov.br/api/consulta/v1/contratacoes/proposta'

// Códigos de modalidade mais comuns: Pregão Eletrônico (6) e Dispensa (8).
// Cobrir essas duas cobre a grande maioria dos editais abertos no portal.
const MODALIDADES = [6, 8]

function hojeMaisDias(dias: number): string {
  const data = new Date()
  data.setDate(data.getDate() + dias)
  return data.toISOString().slice(0, 10).replace(/-/g, '')
}

/**
 * Consulta o PNCP por editais com prazo de proposta ainda aberto na UF
 * informada, e filtra localmente os resultados aderentes à categoria
 * do CNAE do cliente.
 *
 * Importante: o PNCP não oferece filtro nativo por CNAE/categoria —
 * a filtragem de aderência é feita aqui, comparando o campo objetoCompra
 * com as palavras-chave da categoria mapeada.
 */
export async function consultarOportunidades(
  uf: string,
  descricaoCnae: string
): Promise<ConsultaPncpResult> {
  const config = categorizarCnae(descricaoCnae)
  // dataFinal aqui representa "até quando aceitamos olhar prazos de
  // encerramento" — usamos uma janela futura ampla (180 dias) para
  // capturar tanto editais com prazo próximo quanto mais distante.
  const dataFinal = hojeMaisDias(180)

  const todosResultados: OportunidadeEdital[] = []

  for (const modalidade of MODALIDADES) {
    let pagina = 1
    let totalPaginas = 1

    // Limitamos a no máximo 5 páginas por modalidade para manter a
    // resposta do widget rápida.
    while (pagina <= 5 && pagina <= totalPaginas) {
      const url = `${PNCP_BASE}?dataFinal=${dataFinal}&codigoModalidadeContratacao=${modalidade}&uf=${uf}&pagina=${pagina}`

      try {
        const res = await fetch(url, {
          headers: { accept: '*/*' },
          cache: 'no-store',
        })

        if (!res.ok) break

        const data = await res.json()
        totalPaginas = data.totalPaginas ?? 1

        const itens = Array.isArray(data.data) ? data.data : []

        for (const item of itens) {
          const objeto = item.objetoCompra ?? ''
          if (!objetoAderente(objeto, config)) continue

          todosResultados.push({
            orgao: item.orgaoEntidade?.razaoSocial ?? item.unidadeOrgao?.nomeUnidade ?? 'Órgão público',
            objeto,
            valorEstimado: item.valorTotalEstimado ?? null,
            dataEncerramentoProposta: item.dataEncerramentoProposta ?? null,
            municipio: item.unidadeOrgao?.municipioNome ?? null,
          })
        }
      } catch {
        break
      }

      pagina++
    }
  }

  return {
    total: todosResultados.length,
    exemplos: todosResultados.slice(0, 3),
    categoriaLabel: config.label,
  }
}