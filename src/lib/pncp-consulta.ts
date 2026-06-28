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

// Modalidades mais comuns no PNCP: Pregão Eletrônico (6), Dispensa (8),
// Concorrência Eletrônica (4) e Pregão Presencial (7). Cobrir essas
// quatro abrange a grande maioria dos editais abertos no portal.
const MODALIDADES = [6, 8, 4, 7]

// Quantas páginas de cada modalidade buscamos, no máximo. Como o PNCP
// não permite busca por palavra-chave via API, precisamos sondar várias
// páginas e filtrar localmente pelo objetoCompra — por isso paralelizamos
// as chamadas (em vez de uma por vez) para manter o tempo de resposta
// aceitável mesmo sondando mais conteúdo.
const PAGINAS_POR_MODALIDADE = 8

function hojeMaisDias(dias: number): string {
  const data = new Date()
  data.setDate(data.getDate() + dias)
  return data.toISOString().slice(0, 10).replace(/-/g, '')
}

async function buscarPagina(
  uf: string,
  modalidade: number,
  pagina: number,
  dataFinal: string
): Promise<any[]> {
  const url = `${PNCP_BASE}?dataFinal=${dataFinal}&codigoModalidadeContratacao=${modalidade}&uf=${uf}&pagina=${pagina}`
  try {
    const res = await fetch(url, {
      headers: { accept: '*/*' },
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.data) ? data.data : []
  } catch {
    return []
  }
}

/**
 * Consulta o PNCP por editais com prazo de proposta ainda aberto na UF
 * informada, e filtra localmente os resultados aderentes à categoria
 * do CNAE do cliente.
 *
 * Importante: o PNCP não oferece filtro nativo por CNAE/categoria/texto
 * via API — a filtragem de aderência é feita aqui, comparando o campo
 * objetoCompra com as palavras-chave da categoria mapeada. Por isso
 * buscamos várias páginas de várias modalidades EM PARALELO.
 */
export async function consultarOportunidades(
  uf: string,
  descricaoCnae: string
): Promise<ConsultaPncpResult> {
  const config = categorizarCnae(descricaoCnae)
  const dataFinal = hojeMaisDias(180)

  // Monta todas as combinações (modalidade x página) e busca tudo
  // em paralelo, em vez de sequencialmente — isso reduz o tempo total
  // de vários segundos sequenciais para o tempo da requisição mais lenta.
  const tarefas: Promise<any[]>[] = []
  for (const modalidade of MODALIDADES) {
    for (let pagina = 1; pagina <= PAGINAS_POR_MODALIDADE; pagina++) {
      tarefas.push(buscarPagina(uf, modalidade, pagina, dataFinal))
    }
  }

  const resultadosPorPagina = await Promise.all(tarefas)

  const todosResultados: OportunidadeEdital[] = []

  for (const itens of resultadosPorPagina) {
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
  }

  return {
    total: todosResultados.length,
    exemplos: todosResultados.slice(0, 3),
    categoriaLabel: config.label,
  }
}