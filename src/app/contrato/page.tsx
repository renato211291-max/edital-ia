export const metadata = {
  title: 'Contrato de Prestação de Serviços | Edital IA',
  description: 'Contrato de Prestação de Serviços de Consultoria em Licitações — Plataforma Edital IA.',
};

export default function ContratoPrestacaoServicos() {
  return (
    <div style={{ background: '#060D1A', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 96px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '32px', fontSize: '14px', color: '#7EB8FF', textDecoration: 'none' }}>
          ← Voltar para o início
        </a>

        <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '2rem', marginBottom: '8px' }}>
          Contrato de Prestação de Serviços
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginBottom: '40px' }}>
          Consultoria em Licitações — Plataforma Edital IA · Versão 1.0
        </p>

        <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>

          <h2 style={sectionStyle}>Qualificação das Partes</h2>
          <p style={{ ...pStyle, fontWeight: 600 }}>CONTRATADA:</p>
          <p style={pStyle}>Razão Social: Licitare Consultoria e Gestão Empresarial Ltda<br/>
          CNPJ: 65.648.629/0001-98<br/>
          Endereço: Porto Alegre, Estado do Rio Grande do Sul<br/>
          E-mail: contato@licitarestrategy.com.br</p>
          <p style={pStyle}>Doravante denominada simplesmente "CONTRATADA" ou "Licitare".</p>

          <p style={{ ...pStyle, fontWeight: 600, marginTop: '20px' }}>CONTRATANTE:</p>
          <p style={pStyle}>Razão Social: preenchido automaticamente no momento do cadastro<br/>
          CNPJ: preenchido automaticamente no momento do cadastro<br/>
          E-mail do responsável: preenchido automaticamente no momento do cadastro<br/>
          Plano contratado: conforme seleção no momento da assinatura<br/>
          Valor da mensalidade: conforme tabela de planos vigente na data da assinatura<br/>
          Data do aceite eletrônico: registrada automaticamente pela Plataforma<br/>
          IP de origem do aceite: registrado automaticamente pela Plataforma</p>
          <p style={pStyle}>Doravante denominada simplesmente "CONTRATANTE" ou "Cliente".</p>

          <h2 style={sectionStyle}>Cláusula 1ª — Objeto</h2>
          <p style={pStyle}>1.1. O presente Contrato tem por objeto a prestação, pela CONTRATADA, de serviços de consultoria em licitações públicas, mediante acesso à Plataforma Edital IA (sistema SaaS), compreendendo:</p>
          <ul style={ulStyle}>
            <li>Monitoramento e análise de editais do Portal Nacional de Contratações Públicas (PNCP);</li>
            <li>Análise por inteligência artificial de editais selecionados;</li>
            <li>Triagem semanal de licitações relevantes ao perfil do CONTRATANTE;</li>
            <li>Elaboração de propostas técnicas e documentação de habilitação, mediante abertura de demanda pelo CONTRATANTE, dentro dos prazos estabelecidos;</li>
            <li>Gestão de demandas com controle de prazo e comunicação integrada;</li>
            <li>Suporte técnico e operacional conforme o plano contratado.</li>
          </ul>
          <p style={pStyle}>1.2. O envio da documentação elaborada aos portais de licitação é de responsabilidade exclusiva do CONTRATANTE.</p>

          <h2 style={sectionStyle}>Cláusula 2ª — Prazo</h2>
          <p style={pStyle}>2.1. O presente Contrato tem vigência indeterminada, iniciando-se na data do aceite eletrônico e permanecendo ativo enquanto a assinatura estiver ativa e adimplente.</p>
          <p style={pStyle}>2.2. Qualquer das partes pode rescindir o Contrato nos termos da Cláusula 8ª.</p>

          <h2 style={sectionStyle}>Cláusula 3ª — Remuneração e Condições de Pagamento</h2>
          <p style={pStyle}>3.1. Pelos serviços contratados, o CONTRATANTE pagará à CONTRATADA a mensalidade correspondente ao plano selecionado, conforme tabela vigente na data da assinatura.</p>
          <p style={pStyle}>3.2. Na primeira mensalidade, é concedido desconto de 50% (cinquenta por cento), independentemente do plano escolhido.</p>
          <p style={pStyle}>3.3. O pagamento é processado por meio da plataforma Asaas, nas modalidades PIX, cartão de crédito ou boleto bancário, com vencimento conforme a data da assinatura.</p>
          <p style={pStyle}>3.4. Em caso de atraso superior a 15 (quinze) dias, a CONTRATADA poderá suspender o acesso à Plataforma. Em caso de atraso superior a 30 (trinta) dias, o Contrato poderá ser rescindido.</p>
          <p style={pStyle}>3.5. Os valores poderão ser reajustados anualmente pelo IPCA/IBGE, mediante comunicação ao CONTRATANTE com 30 (trinta) dias de antecedência.</p>

          <h2 style={sectionStyle}>Cláusula 4ª — Plano de Serviço (SLA)</h2>
          <p style={pStyle}>4.1. A CONTRATADA garante disponibilidade mínima da Plataforma de 95% (noventa e cinco por cento) ao mês, excluídas manutenções programadas comunicadas com antecedência mínima de 24 horas.</p>
          <p style={pStyle}>4.2. As demandas abertas pelo CONTRATANTE serão atendidas nos seguintes prazos:</p>
          <ul style={ulStyle}>
            <li>Acuse de recebimento da demanda: até 24 horas úteis;</li>
            <li>Retorno inicial com cronograma de execução: até 48 horas úteis;</li>
            <li>Entrega da proposta e documentação: conforme prazo definido em cada demanda, nunca superior a 3 (três) dias úteis antes do prazo de entrega do edital.</li>
          </ul>
          <p style={pStyle}>4.3. O descumprimento reiterado dos prazos (mais de 3 ocorrências em 90 dias) faculta ao CONTRATANTE a rescisão sem multa.</p>

          <h2 style={sectionStyle}>Cláusula 5ª — Obrigações da CONTRATADA</h2>
          <p style={pStyle}>5.1. São obrigações da CONTRATADA:</p>
          <ul style={ulStyle}>
            <li>Manter a Plataforma funcionando dentro dos parâmetros de SLA estabelecidos;</li>
            <li>Guardar sigilo absoluto sobre as informações confidenciais do CONTRATANTE;</li>
            <li>Elaborar as propostas e documentos com diligência e conformidade às exigências do edital;</li>
            <li>Notificar o CONTRATANTE sobre licitações relevantes ao seu perfil;</li>
            <li>Comunicar previamente qualquer alteração de preços ou condições com antecedência mínima de 30 dias;</li>
            <li>Tratar os dados pessoais do CONTRATANTE em conformidade com a LGPD e com a Política de Privacidade.</li>
          </ul>

          <h2 style={sectionStyle}>Cláusula 6ª — Obrigações do CONTRATANTE</h2>
          <p style={pStyle}>6.1. São obrigações do CONTRATANTE:</p>
          <ul style={ulStyle}>
            <li>Fornecer todas as informações e documentos necessários para a abertura e instrução das demandas, em prazo suficiente para a elaboração das propostas;</li>
            <li>Efetuar os pagamentos nas datas de vencimento;</li>
            <li>Fazer o envio das propostas elaboradas pela CONTRATADA aos portais de licitação, dentro dos prazos legais, sendo esta etapa de sua exclusiva responsabilidade;</li>
            <li>Utilizar a Plataforma em conformidade com a Lei n.º 14.133/2021 e demais normas aplicáveis;</li>
            <li>Não utilizar os documentos elaborados pela CONTRATADA para fins distintos dos contratados.</li>
          </ul>

          <h2 style={sectionStyle}>Cláusula 7ª — Limitação de Responsabilidade e Riscos</h2>
          <p style={pStyle}>7.1. A CONTRATADA atua como prestadora de serviços de apoio à participação em licitações, não garantindo o êxito do CONTRATANTE em nenhum processo licitatório.</p>
          <p style={pStyle}>7.2. A CONTRATADA não se responsabiliza por:</p>
          <ul style={ulStyle}>
            <li>Decisões de comissões ou agentes de contratação pública;</li>
            <li>Erros decorrentes de informações incorretas ou incompletas fornecidas pelo CONTRATANTE;</li>
            <li>Mudanças de edital após a elaboração da proposta;</li>
            <li>Falhas em portais governamentais (PNCP, BEC, ComprasNet e similares);</li>
            <li>Atrasos no envio das propostas pelo CONTRATANTE.</li>
          </ul>
          <p style={pStyle}>7.3. A responsabilidade total da CONTRATADA fica limitada ao valor pago pelo CONTRATANTE nos últimos 3 (três) meses de vigência do Contrato.</p>

          <h2 style={sectionStyle}>Cláusula 8ª — Rescisão</h2>
          <p style={pStyle}>8.1. O CONTRATANTE pode cancelar o Contrato a qualquer momento pelo Dashboard da Plataforma, sem multa, com efeito no final do período de assinatura vigente.</p>
          <p style={pStyle}>8.2. A CONTRATADA pode rescindir o Contrato, com aviso prévio de 30 (trinta) dias, ou imediatamente nas hipóteses de:</p>
          <ul style={ulStyle}>
            <li>Inadimplência superior a 30 dias;</li>
            <li>Uso fraudulento ou ilegal da Plataforma;</li>
            <li>Violação das obrigações da Cláusula 6ª.</li>
          </ul>
          <p style={pStyle}>8.3. Em caso de rescisão, os dados do CONTRATANTE serão mantidos por 90 (noventa) dias e, após esse prazo, excluídos ou anonimizados conforme a Política de Privacidade.</p>

          <h2 style={sectionStyle}>Cláusula 9ª — Confidencialidade</h2>
          <p style={pStyle}>9.1. Cada parte se obriga a manter sigilo sobre as informações confidenciais da outra, inclusive após o término deste Contrato, pelo prazo de 5 (cinco) anos.</p>
          <p style={pStyle}>9.2. Consideram-se confidenciais: estratégias comerciais, listas de clientes, algoritmos, documentos de licitação em elaboração e quaisquer informações assim designadas pela parte divulgadora.</p>

          <h2 style={sectionStyle}>Cláusula 10ª — Proteção de Dados</h2>
          <p style={pStyle}>10.1. O tratamento de dados pessoais no âmbito deste Contrato obedece integralmente à Lei n.º 13.709/2018 (LGPD) e à Política de Privacidade da CONTRATADA, cujo teor o CONTRATANTE declara ter lido e aceito.</p>
          <p style={pStyle}>10.2. O CONTRATANTE consente, expressamente, com o compartilhamento dos dados necessários com os fornecedores de tecnologia utilizados pela CONTRATADA (Supabase, Vercel, Asaas, Anthropic), exclusivamente para a execução deste Contrato.</p>

          <h2 style={sectionStyle}>Cláusula 11ª — Disposições Gerais</h2>
          <p style={pStyle}>11.1. O presente Contrato é firmado eletronicamente, tendo plena validade jurídica nos termos da Medida Provisória n.º 2.200-2/2001, do art. 10, §2.º, e da Lei n.º 14.063/2020, mediante o aceite eletrônico do CONTRATANTE com registro de data, hora e IP de origem.</p>
          <p style={pStyle}>11.2. O aceite eletrônico equivale à assinatura do CONTRATANTE para todos os fins legais.</p>
          <p style={pStyle}>11.3. Fica eleito o foro da comarca de Porto Alegre, Estado do Rio Grande do Sul para dirimir quaisquer controvérsias decorrentes deste Contrato, com renúncia expressa a qualquer outro foro.</p>
          <p style={pStyle}>11.4. Este instrumento integra, juntamente com os Termos de Uso e a Política de Privacidade, o conjunto de documentos que regem a relação entre as partes.</p>
          <p style={pStyle}>11.5. Em caso de conflito entre este Contrato e os Termos de Uso, prevalece o Contrato.</p>

          <p style={{ ...pStyle, marginTop: '32px', fontWeight: 600, color: '#fff' }}>
            Ao clicar em "Aceito o Contrato de Prestação de Serviços" durante o processo de contratação, o CONTRATANTE declara ter lido, compreendido e concordado integralmente com todas as cláusulas acima, reconhecendo o instrumento como legalmente vinculante.
          </p>

          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginTop: '48px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            Versão 1.0 | editalia.licitarestrategy.com.br
          </p>
        </div>
      </div>
    </div>
  );
}

const sectionStyle = { fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1.2rem', marginTop: '32px', marginBottom: '12px', color: '#fff' };
const pStyle = { marginBottom: '14px' };
const ulStyle = { marginBottom: '14px', paddingLeft: '20px', display: 'flex', flexDirection: 'column' as const, gap: '8px' };