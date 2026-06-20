export const metadata = {
  title: 'Política de Privacidade | Edital IA',
  description: 'Política de Privacidade da Plataforma Edital IA — Licitare Consultoria e Gestão Empresarial Ltda.',
};

export default function PoliticaPrivacidade() {
  return (
    <div style={{ background: '#060D1A', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 96px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '32px', fontSize: '14px', color: '#7EB8FF', textDecoration: 'none' }}>
          ← Voltar para o início
        </a>

        <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '2rem', marginBottom: '8px' }}>
          Política de Privacidade
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginBottom: '40px' }}>
          Plataforma Edital IA — Licitare Consultoria e Gestão Empresarial Ltda · Versão 1.0
        </p>

        <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>

          <h2 style={sectionStyle}>1. Controlador dos Dados</h2>
          <p style={pStyle}>Os dados pessoais coletados na Plataforma Edital IA são tratados por Licitare Consultoria e Gestão Empresarial Ltda, CNPJ 65.648.629/0001-98, na qualidade de Controladora, nos termos da Lei n.º 13.709/2018 (Lei Geral de Proteção de Dados — LGPD).</p>
          <p style={pStyle}>Contato do encarregado (DPO): privacidade@licitarestrategy.com.br</p>

          <h2 style={sectionStyle}>2. Dados Coletados</h2>
          <p style={{ ...pStyle, fontWeight: 600 }}>2.1. Dados fornecidos pelo Titular</p>
          <ul style={ulStyle}>
            <li>Razão social, nome fantasia e CNPJ da empresa;</li>
            <li>Nome completo e e-mail do(s) usuário(s) cadastrado(s);</li>
            <li>Dados de pagamento (processados exclusivamente pela Asaas — a Licitare não armazena dados de cartão);</li>
            <li>Informações inseridas em demandas e formulários dentro da Plataforma.</li>
          </ul>
          <p style={{ ...pStyle, fontWeight: 600 }}>2.2. Dados coletados automaticamente</p>
          <ul style={ulStyle}>
            <li>Endereço IP e dados de geolocalização aproximada;</li>
            <li>Tipo de dispositivo, navegador e sistema operacional;</li>
            <li>Páginas acessadas, data e hora das sessões;</li>
            <li>Logs de autenticação e registros de aceite de termos.</li>
          </ul>

          <h2 style={sectionStyle}>3. Finalidade do Tratamento</h2>
          <p style={pStyle}>Os dados são tratados exclusivamente para as seguintes finalidades:</p>
          <ul style={ulStyle}>
            <li>Prestação dos serviços contratados (identificação, análise e acompanhamento de licitações);</li>
            <li>Autenticação e controle de acesso à Plataforma;</li>
            <li>Processamento de pagamentos e gestão de assinaturas;</li>
            <li>Comunicação com o Cliente sobre demandas, prazos e atualizações do serviço;</li>
            <li>Cumprimento de obrigações legais e regulatórias;</li>
            <li>Melhoria contínua da Plataforma (dados anonimizados ou agregados);</li>
            <li>Registro de aceite dos Termos de Uso e deste instrumento, para fins de comprovação legal.</li>
          </ul>

          <h2 style={sectionStyle}>4. Base Legal</h2>
          <p style={pStyle}>O tratamento de dados é fundamentado nas seguintes bases legais da LGPD (art. 7.º):</p>
          <ul style={ulStyle}>
            <li>Execução de contrato (art. 7.º, V): dados necessários à prestação do serviço;</li>
            <li>Cumprimento de obrigação legal (art. 7.º, II): retenção de logs e registros;</li>
            <li>Legítimo interesse (art. 7.º, IX): segurança da Plataforma e prevenção a fraudes;</li>
            <li>Consentimento (art. 7.º, I): comunicações de marketing, quando aplicável.</li>
          </ul>

          <h2 style={sectionStyle}>5. Compartilhamento de Dados</h2>
          <p style={pStyle}>5.1. Os dados do Cliente poderão ser compartilhados com:</p>
          <ul style={ulStyle}>
            <li>Asaas Pagamentos S.A.: processamento de cobranças e assinaturas;</li>
            <li>Supabase Inc.: armazenamento seguro em banco de dados em nuvem;</li>
            <li>Vercel Inc.: hospedagem da Plataforma;</li>
            <li>Anthropic PBC: processamento de análises por inteligência artificial (dados anonimizados ou pseudonimizados sempre que possível).</li>
          </ul>
          <p style={pStyle}>5.2. Todos os fornecedores acima foram avaliados quanto à conformidade com a LGPD e normas equivalentes (GDPR, CCPA) e contratualmente obrigados a tratar os dados exclusivamente para as finalidades autorizadas.</p>
          <p style={pStyle}>5.3. A Licitare não vende, aluga ou cede dados pessoais a terceiros para fins comerciais.</p>

          <h2 style={sectionStyle}>6. Transferência Internacional de Dados</h2>
          <p style={pStyle}>6.1. Alguns fornecedores (Supabase, Vercel, Anthropic) operam fora do território nacional. A transferência é realizada com garantias adequadas, incluindo cláusulas contratuais padrão e certificações de conformidade (art. 33, LGPD).</p>

          <h2 style={sectionStyle}>7. Prazo de Retenção</h2>
          <p style={pStyle}>7.1. Os dados são mantidos pelo período necessário para a prestação do serviço e, após o encerramento da conta:</p>
          <ul style={ulStyle}>
            <li>Logs de autenticação e registros de aceite: 5 (cinco) anos, para fins de comprovação legal;</li>
            <li>Dados de pagamento: conforme exigência da Receita Federal (mínimo 5 anos);</li>
            <li>Dados de perfil e demandas: 90 (noventa) dias após o encerramento, após os quais são excluídos ou anonimizados.</li>
          </ul>

          <h2 style={sectionStyle}>8. Direitos do Titular</h2>
          <p style={pStyle}>8.1. O Titular dos dados pode exercer os seguintes direitos a qualquer momento, mediante requisição a privacidade@licitarestrategy.com.br:</p>
          <ul style={ulStyle}>
            <li>Confirmação da existência de tratamento;</li>
            <li>Acesso aos dados tratados;</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
            <li>Portabilidade dos dados a outro fornecedor, mediante requisição formal;</li>
            <li>Informação sobre o compartilhamento realizado;</li>
            <li>Revogação do consentimento, quando aplicável.</li>
          </ul>
          <p style={pStyle}>8.2. As requisições serão respondidas em até 15 (quinze) dias úteis.</p>

          <h2 style={sectionStyle}>9. Segurança da Informação</h2>
          <p style={pStyle}>9.1. A Licitare adota medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda acidental ou destruição, incluindo:</p>
          <ul style={ulStyle}>
            <li>Criptografia em trânsito (TLS 1.2+) e em repouso;</li>
            <li>Autenticação por magic link ou OAuth (sem armazenamento de senhas);</li>
            <li>Controle de acesso baseado em função (RBAC) com segregação entre perfis cliente e admin;</li>
            <li>Monitoramento contínuo de acessos e logs de auditoria;</li>
            <li>Plano de resposta a incidentes com notificação à ANPD e ao Titular em até 72 horas, em caso de vazamento.</li>
          </ul>

          <h2 style={sectionStyle}>10. Cookies e Tecnologias de Rastreamento</h2>
          <p style={pStyle}>10.1. A Plataforma utiliza cookies estritamente necessários para autenticação e sessão. Não são utilizados cookies de rastreamento publicitário de terceiros sem consentimento prévio do Titular.</p>

          <h2 style={sectionStyle}>11. Alterações desta Política</h2>
          <p style={pStyle}>11.1. Esta Política pode ser atualizada a qualquer tempo. Alterações relevantes serão comunicadas por e-mail com antecedência mínima de 15 (quinze) dias. O uso continuado da Plataforma após a comunicação implica aceite das alterações.</p>

          <h2 style={sectionStyle}>12. Foro e Legislação</h2>
          <p style={pStyle}>12.1. Esta Política é regida pela Lei n.º 13.709/2018 (LGPD) e demais normas aplicáveis. Fica eleito o foro da comarca de Porto Alegre, Estado do Rio Grande do Sul para dirimir controvérsias.</p>

          <p style={{ ...pStyle, marginTop: '32px', fontWeight: 600, color: '#fff' }}>
            Ao utilizar a Plataforma Edital IA, o Usuário declara ter lido e compreendido esta Política de Privacidade e consente com o tratamento de seus dados para as finalidades aqui descritas.
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