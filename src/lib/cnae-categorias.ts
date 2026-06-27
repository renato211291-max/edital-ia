/**
 * Mapeia descrições de CNAE para uma de 8 categorias amplas,
 * cada uma associada a palavras-chave usadas para filtrar o
 * campo objetoCompra retornado pela API do PNCP.
 *
 * O PNCP não oferece filtro nativo por CNAE, então essa categorização
 * é a forma de aproximar a relevância da oportunidade ao perfil do cliente.
 */

export type Categoria =
  | 'construcao_reforma'
  | 'alimentos_generos'
  | 'saude_hospitalar'
  | 'ti_software'
  | 'limpeza_higiene'
  | 'veiculos_transporte'
  | 'servicos_gerais'
  | 'outros'

type CategoriaConfig = {
  categoria: Categoria
  label: string
  palavrasChave: string[]
}

const CATEGORIAS: CategoriaConfig[] = [
  {
    categoria: 'construcao_reforma',
    label: 'Construção e reforma',
    palavrasChave: [
      'construção', 'reforma', 'obra', 'engenharia', 'pavimentação',
      'esquadria', 'alumínio', 'vidro', 'edificação', 'manutenção predial',
      'instalação elétrica', 'instalação hidráulica', 'pintura',
    ],
  },
  {
    categoria: 'alimentos_generos',
    label: 'Alimentos e gêneros alimentícios',
    palavrasChave: [
      'gêneros alimentícios', 'alimentação', 'merenda', 'hortifruti',
      'carnes', 'panificação', 'refeição', 'nutrição',
    ],
  },
  {
    categoria: 'saude_hospitalar',
    label: 'Saúde e materiais hospitalares',
    palavrasChave: [
      'material médico', 'material hospitalar', 'medicamento', 'saúde',
      'odontológic', 'fisioterapia', 'enfermagem', 'insumos laboratoriais',
      'equipamento médico',
    ],
  },
  {
    categoria: 'ti_software',
    label: 'Tecnologia e software',
    palavrasChave: [
      'software', 'licença', 'tecnologia da informação', 'sistema',
      'suporte técnico', 'nuvem', 'saas', 'infraestrutura de ti',
    ],
  },
  {
    categoria: 'limpeza_higiene',
    label: 'Limpeza e higiene',
    palavrasChave: [
      'material de limpeza', 'higiene', 'desinfecção', 'conservação',
      'asseio',
    ],
  },
  {
    categoria: 'veiculos_transporte',
    label: 'Veículos e transporte',
    palavrasChave: [
      'veículo', 'combustível', 'transporte', 'frota', 'manutenção veicular',
      'pneus', 'peças automotivas',
    ],
  },
  {
    categoria: 'servicos_gerais',
    label: 'Serviços gerais e mão de obra',
    palavrasChave: [
      'prestação de serviços', 'mão de obra', 'terceirização',
      'serviços especializados', 'consultoria',
    ],
  },
  {
    categoria: 'outros',
    label: 'Outros',
    palavrasChave: [],
  },
]

/**
 * Recebe a descrição de um CNAE (texto livre, vindo da Receita Federal
 * via BrasilAPI) e retorna a categoria mais provável.
 */
export function categorizarCnae(descricaoCnae: string): CategoriaConfig {
  const texto = descricaoCnae.toLowerCase()

  for (const config of CATEGORIAS) {
    if (config.categoria === 'outros') continue
    const bateu = config.palavrasChave.some((palavra) =>
      texto.includes(palavra.toLowerCase())
    )
    if (bateu) return config
  }

  return CATEGORIAS.find((c) => c.categoria === 'outros')!
}

/**
 * Verifica se o objetoCompra de um edital do PNCP é aderente
 * à categoria informada, comparando com as palavras-chave.
 */
export function objetoAderente(objetoCompra: string, config: CategoriaConfig): boolean {
  if (config.categoria === 'outros') return true // sem filtro específico, considera tudo
  const texto = objetoCompra.toLowerCase()
  return config.palavrasChave.some((palavra) => texto.includes(palavra.toLowerCase()))
}

export { CATEGORIAS }