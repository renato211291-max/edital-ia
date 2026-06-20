export const metadata = {
  title: 'Termos de Uso | Edital IA',
  description: 'Termos de Uso da Plataforma Edital IA — Licitare Consultoria e Gestão Empresarial Ltda.',
};

export default function TermosDeUso() {
  return (
    <div style={{ background: '#060D1A', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 96px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '32px', fontSize: '14px', color: '#7EB8FF', textDecoration: 'none' }}>
          ← Voltar para o início
        </a>

        <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '2rem', marginBottom: '8px' }}>
          Termos de Uso
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginBottom: '40px' }}>
          Plataforma Edital IA — Licitare Consultoria e Gestão Empresarial Ltda · Versão 1.0
        </p>

        <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>

          <h2 style={sectionStyle}>1. Identificação das Partes</h2>
          <p style={pStyle}>1.1. CONTRATADA: Licitare Consultoria e Gestão Empresarial Ltda, pessoa jurídica de direito privado, inscrita no CNPJ sob o n.º 65.648.629/0001-98, doravante denominada simplesmente "Licitare" ou "Plataforma".</p>
          <p style={pStyle}>1.2. CONTRATANTE (USUÁRIO): pessoa jurídica que aceitou eletronicamente os presentes Termos de Uso ao realizar o cadastro e o pagamento na Plataforma Edital IA, doravante denominada "Cliente" ou "Usuário".</p>

          <h2 style={sectionStyle}>2. Objeto</h2>
          <p style={pStyle}>2.1. Os presentes Termos de Uso regem o acesso e a utilização da Plataforma Edital IA, sistema SaaS (Software as a Service) destinado a auxiliar empresas na identificação, análise e acompanhamento de licitações públicas, nos termos da Lei Federal n.º 14.133/2021 e demais normas aplicáveis.</p>
          <p style={pStyle}>2.2. A Plataforma oferece as seguintes funcionalidades, conforme o plano contratado:</p>
          <ul style={ulStyle}>
            <li>Busca e monitoramento de editais no Portal Nacional de Contratações Públicas (PNCP);</li>
            <li>Análise automatizada de editais por inteligência artificial;</li>
            <li>Triagem semanal de licitações relevantes ao perfil da empresa;</li>
            <li>Abertura e acompanhamento de demandas de elaboração de propostas;</li>
            <li>Comunicação direta entre o Cliente e a equipe da Licitare;</li>
            <li>Armazenamento e entrega de documentos relativos a cada licitação.</li>
          </ul>

          <h2 style={sectionStyle}>3. Cadastro e Acesso</h2>
          <p style={pStyle}>3.1. O acesso à Plataforma é condicionado ao cadastro completo, com informações verdadeiras e atualizadas da empresa, e ao pagamento da mensalidade do plano escolhido.</p>
          <p style={pStyle}>3.2. O Cliente é responsável pela guarda e sigilo de suas credenciais de acesso, incluindo links de autenticação e tokens de sessão, sendo vedado o compartilhamento com terceiros não autorizados.</p>
          <p style={pStyle}>3.3. Cada conta é vinculada a um CNPJ único. O cadastro de múltiplos usuários sob a mesma conta é permitido conforme as limitações de cada plano.</p>
          <p style={pStyle}>3.4. A Licitare reserva-se o direito de suspender ou encerrar o acesso de contas que apresentem indícios de uso indevido, fraude ou violação destes Termos.</p>

          <h2 style={sectionStyle}>4. Planos e Pagamento</h2>
          <p style={pStyle}>4.1. A utilização da Plataforma é remunerada mediante assinatura mensal, nos valores e condições descritos na página de planos disponível no Site.</p>
          <p style={pStyle}>4.2. Na primeira mensalidade, é concedido desconto de 50% (cinquenta por cento) sobre o valor do plano escolhido, independentemente da modalidade de pagamento.</p>
          <p style={pStyle}>4.3. O pagamento é processado pela plataforma Asaas, podendo ser realizado via PIX, cartão de crédito ou boleto bancário.</p>
          <p style={pStyle}>4.4. Em caso de inadimplência por mais de 15 (quinze) dias corridos, o acesso à Plataforma poderá ser suspenso automaticamente, sem prejuízo da cobrança dos valores devidos.</p>
          <p style={pStyle}>4.5. O Cliente poderá realizar upgrade ou downgrade de plano a qualquer momento pelo próprio Dashboard, com efeito na próxima data de cobrança.</p>
          <p style={pStyle}>4.6. Não há reembolso de mensalidades já pagas, salvo em caso de falha técnica comprovada de responsabilidade exclusiva da Licitare.</p>

          <h2 style={sectionStyle}>5. Obrigações da Licitare</h2>
          <p style={pStyle}>5.1. São obrigações da Licitare:</p>
          <ul style={ulStyle}>
            <li>Disponibilizar a Plataforma com disponibilidade mínima de 95% ao mês (SLA), excluídos períodos de manutenção programada comunicados com antecedência mínima de 24 horas;</li>
            <li>Analisar e processar as demandas abertas pelo Cliente nos prazos estabelecidos em cada demanda;</li>
            <li>Manter sigilo sobre as informações confidenciais do Cliente;</li>
            <li>Notificar o Cliente sobre editais relevantes ao seu perfil conforme a periodicidade do plano contratado;</li>
            <li>Entregar os documentos elaborados dentro do prazo informado em cada demanda;</li>
            <li>Comunicar ao Cliente quaisquer alterações relevantes nos presentes Termos com antecedência mínima de 30 (trinta) dias.</li>
          </ul>

          <h2 style={sectionStyle}>6. Obrigações do Cliente</h2>
          <p style={pStyle}>6.1. São obrigações do Cliente:</p>
          <ul style={ulStyle}>
            <li>Fornecer informações verdadeiras, completas e atualizadas no cadastro e nas demandas abertas;</li>
            <li>Manter os dados cadastrais atualizados, especialmente e-mail de contato e CNPJ;</li>
            <li>Efetuar os pagamentos nas datas de vencimento;</li>
            <li>Utilizar a Plataforma em conformidade com a legislação vigente, especialmente a Lei de Licitações (Lei n.º 14.133/2021) e a LGPD (Lei n.º 13.709/2018);</li>
            <li>Não utilizar a Plataforma para fins ilícitos, fraudulentos ou que violem direitos de terceiros;</li>
            <li>Fazer download e enviar ao portal de licitações os documentos elaborados pela Licitare, sendo esta etapa de responsabilidade exclusiva do Cliente;</li>
            <li>Não reproduzir, copiar, vender ou sublicenciar o acesso à Plataforma a terceiros.</li>
          </ul>

          <h2 style={sectionStyle}>7. Limitação de Responsabilidade</h2>
          <p style={pStyle}>7.1. A Licitare não garante o êxito do Cliente em nenhuma licitação, sendo a Plataforma uma ferramenta de apoio à participação em processos licitatórios.</p>
          <p style={pStyle}>7.2. A Licitare não se responsabiliza por decisões administrativas de comissões de licitação, por erros na documentação fornecida pelo Cliente, ou por atrasos decorrentes de falhas em serviços de terceiros (operadoras de pagamento, provedores de nuvem, PNCP).</p>
          <p style={pStyle}>7.3. Em nenhuma hipótese a responsabilidade da Licitare excederá o valor total pago pelo Cliente nos últimos 3 (três) meses de assinatura.</p>

          <h2 style={sectionStyle}>8. Propriedade Intelectual</h2>
          <p style={pStyle}>8.1. Todo o conteúdo da Plataforma, incluindo código-fonte, interfaces, algoritmos, marca e documentação, é de propriedade exclusiva da Licitare, protegido pela Lei n.º 9.610/1998 (Lei de Direitos Autorais) e demais normas aplicáveis.</p>
          <p style={pStyle}>8.2. Os documentos elaborados pela Licitare para o Cliente, em atendimento a demandas específicas, são de uso exclusivo do Cliente para a finalidade contratada.</p>

          <h2 style={sectionStyle}>9. Rescisão</h2>
          <p style={pStyle}>9.1. O Cliente pode cancelar sua assinatura a qualquer momento pelo Dashboard ou por solicitação à equipe de suporte, com efeito no final do período vigente.</p>
          <p style={pStyle}>9.2. A Licitare pode rescindir o contrato imediatamente, sem aviso prévio, em caso de:</p>
          <ul style={ulStyle}>
            <li>Uso fraudulento da Plataforma;</li>
            <li>Inadimplência superior a 30 (trinta) dias;</li>
            <li>Violação de qualquer cláusula destes Termos.</li>
          </ul>
          <p style={pStyle}>9.3. Após o encerramento da conta, os dados do Cliente serão mantidos por 90 (noventa) dias para fins de auditoria e, após esse prazo, excluídos conforme a Política de Privacidade.</p>

          <h2 style={sectionStyle}>10. Disposições Gerais</h2>
          <p style={pStyle}>10.1. Estes Termos são regidos pela legislação brasileira.</p>
          <p style={pStyle}>10.2. Fica eleito o foro da comarca de Porto Alegre, Estado do Rio Grande do Sul para dirimir quaisquer controvérsias decorrentes deste instrumento, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>
          <p style={pStyle}>10.3. A Licitare pode atualizar estes Termos a qualquer tempo, notificando o Cliente por e-mail com antecedência mínima de 30 (trinta) dias. O uso continuado da Plataforma após a notificação implica aceitação dos novos termos.</p>
          <p style={pStyle}>10.4. Caso qualquer cláusula destes Termos seja considerada inválida ou inexequível, as demais permanecem em plena vigência.</p>

          <p style={{ ...pStyle, marginTop: '32px', fontWeight: 600, color: '#fff' }}>
            Ao clicar em "Aceito os Termos de Uso" durante o processo de contratação, o Usuário declara ter lido, compreendido e concordado integralmente com as condições aqui estabelecidas.
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