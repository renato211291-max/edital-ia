'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        :root { --blue: #1D6AFF; --blue-dark: #0A3FA8; --teal: #00C9A7; --bg: #060D1A; --card: #0D1828; --border: rgba(255,255,255,0.08); }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--bg); color: #fff; font-family: 'Inter', sans-serif; }
        h1,h2,h3,h4 { font-family: 'Sora', sans-serif; }
        .glow-card { position: relative; background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: border-color 0.3s; }
        .glow-card:hover { border-color: rgba(29,106,255,0.4); }
        .glow-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(29,106,255,0.07), transparent 40%); opacity: 0; transition: opacity 0.3s; pointer-events: none; }
        .glow-card:hover::before { opacity: 1; }
        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 100px; border: 1px solid rgba(29,106,255,0.3); background: rgba(29,106,255,0.1); font-size: 13px; font-weight: 500; color: #7EB8FF; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 12px; background: linear-gradient(135deg, var(--blue), var(--blue-dark)); font-family: 'Sora', sans-serif; font-weight: 600; font-size: 15px; color: #fff; cursor: pointer; border: none; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 24px rgba(29,106,255,0.3); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(29,106,255,0.45); }
        .btn-ghost { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 12px; background: transparent; border: 1px solid var(--border); font-family: 'Sora', sans-serif; font-weight: 600; font-size: 15px; color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.2s; }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.3); color: #fff; background: rgba(255,255,255,0.05); }
        .section { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .gradient-text { background: linear-gradient(135deg, #7EB8FF, #00C9A7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .kicker { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue); margin-bottom: 12px; }
        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: none; }
        input[type=text] { width: 100%; padding: 14px 16px; border-radius: 10px; border: 1px solid var(--border); background: rgba(255,255,255,0.04); color: #fff; font-family: 'Inter', sans-serif; font-size: 15px; outline: none; transition: border-color 0.2s; }
        input[type=text]:focus { border-color: rgba(29,106,255,0.6); background: rgba(29,106,255,0.05); }
        input[type=text]::placeholder { color: rgba(255,255,255,0.3); }
        @keyframes pulse-dot { 0%,100% { transform: scale(1); opacity:1 } 50% { transform: scale(1.5); opacity:0.5 } }
        @keyframes shimmer { 0% { background-position: -200% center } 100% { background-position: 200% center } }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal); animation: pulse-dot 2s infinite; }
        .plan-highlight { border-color: var(--blue) !important; background: linear-gradient(160deg, rgba(29,106,255,0.12), rgba(29,106,255,0.04)) !important; }
        .plan-highlight .plan-badge { display: block !important; }
        .plan-badge { display: none; position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: linear-gradient(90deg, var(--blue), #0A3FA8); font-family: 'Sora',sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 14px; border-radius: 100px; white-space: nowrap; }
        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .faq-answer.open { max-height: 200px; }
        .counter { font-variant-numeric: tabular-nums; }
        @media (max-width: 768px) { h1 { font-size: 2rem !important; } .hero-grid { grid-template-columns: 1fr !important; } .plans-grid { grid-template-columns: 1fr !important; } .value-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <BgMesh />
      <Header />
      <Hero />
      <Regularizacao />
      <TrustBar />
      <NotABuscador />
      <ComoFunciona />
      <Valores />
      <Planos />
      <FAQ />
      <LicitareCTA />
      <FinalCTA />
      <Footer />
    </>
  );
}

function BgMesh() {
  return (
    <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'-20%',left:'50%',transform:'translateX(-50%)',width:'900px',height:'600px',background:'radial-gradient(ellipse, rgba(29,106,255,0.15) 0%, transparent 70%)'}} />
      <div style={{position:'absolute',bottom:'10%',right:'-10%',width:'500px',height:'500px',background:'radial-gradient(ellipse, rgba(0,201,167,0.08) 0%, transparent 70%)'}} />
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.04}} xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#fff" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', f);
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header style={{position:'fixed',top:0,left:0,right:0,zIndex:100,transition:'all 0.3s',background:scrolled?'rgba(6,13,26,0.85)':'transparent',backdropFilter:scrolled?'blur(20px)':'none',borderBottom:scrolled?'1px solid rgba(255,255,255,0.07)':'none'}}>
      <div className="section" style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:'68px'}}>
        <Logo />
        <nav style={{display:'flex',gap:'32px',alignItems:'center'}}>
          {[['#diferenca','Por que somos diferentes'],['#como-funciona','Como funciona'],['#planos','Planos']].map(([h,l]) => (
            <a key={h} href={h} style={{fontSize:'14px',color:'rgba(255,255,255,0.65)',textDecoration:'none',transition:'color 0.2s',fontFamily:'Inter,sans-serif'}} onMouseOver={e=>(e.currentTarget.style.color='#fff')} onMouseOut={e=>(e.currentTarget.style.color='rgba(255,255,255,0.65)')}>{l}</a>
          ))}
        </nav>
        <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
          <a href="/login" style={{fontSize:'14px',color:'rgba(255,255,255,0.6)',textDecoration:'none',fontFamily:'Inter,sans-serif'}}>Entrar</a>
          <a href="#consulta" className="btn-primary" style={{padding:'10px 20px',fontSize:'14px'}}>Consultar grátis</a>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <img
      src="/logo.png"
      alt="Edital IA"
      style={{height:'64px',width:'auto'}}
    />
  );
}
}

function Hero() {
  return (
    <section style={{paddingTop:'140px',paddingBottom:'80px',position:'relative',zIndex:1}}>
      <div className="section hero-grid" style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'60px',alignItems:'center'}}>
        <FadeUp>
          <div className="badge" style={{marginBottom:'24px'}}>
            <span className="pulse-dot"/>
            Robô de IA + analistas + advogados
          </div>
          <h1 style={{fontSize:'3.4rem',fontWeight:800,lineHeight:1.06,letterSpacing:'-0.02em',marginBottom:'24px'}}>
            Um <span className="gradient-text">departamento de licitações</span> inteiro trabalhando pela sua empresa.
          </h1>
          <p style={{fontSize:'17px',lineHeight:1.75,color:'rgba(255,255,255,0.65)',maxWidth:'540px',marginBottom:'32px'}}>
            Nosso robô encontra as licitações certas para o seu CNPJ e entrega o resumo e análise de cada uma.{' '}
            <strong style={{color:'rgba(255,255,255,0.9)'}}>Você só escolhe quais disputar — o resto a gente faz.</strong>
          </p>
          <ul style={{listStyle:'none',marginBottom:'36px',display:'flex',flexDirection:'column',gap:'12px'}}>
            {['O robô busca e resume cada edital automaticamente','Você seleciona o que vale a pena em poucos cliques','Nossa equipe prepara documentação e recursos para você vencer'].map(t => (
              <li key={t} style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'15px',color:'rgba(255,255,255,0.75)'}}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{flexShrink:0,marginTop:'1px'}}>
                  <circle cx="10" cy="10" r="9" fill="rgba(0,201,167,0.15)"/>
                  <path d="M6.5 10.5L9 13L13.5 8" stroke="#00C9A7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t}
              </li>
            ))}
          </ul>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
            <a href="#consulta" className="btn-primary">Ver licitações da minha empresa <Arrow/></a>
          </div>
          <p style={{marginTop:'12px',fontSize:'13px',color:'rgba(255,255,255,0.4)'}}>Grátis e sem cadastro. Resultado em 10 segundos.</p>
        </FadeUp>
        <div id="consulta"><CnpjWidget/></div>
      </div>
    </section>
  );
}

function CnpjWidget() {
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null|{count:number;items:{orgao:string;obj:string;valor:string;prazo:string}[]}>(null);
  function fmt(v:string){const d=v.replace(/\D/g,'').slice(0,14);return d.replace(/^(\d{2})(\d)/,'$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3').replace(/\.(\d{3})(\d)/,'.$1/$2').replace(/(\d{4})(\d)/,'$1-$2');}
  function consultar(){
    if(cnpj.replace(/\D/g,'').length<14)return;
    setLoading(true);setResult(null);
    setTimeout(()=>{setLoading(false);setResult({count:43,items:[
      {orgao:'Prefeitura Municipal',obj:'Aquisição de materiais e prestação de serviços',valor:'R$ 248.000',prazo:'8 dias'},
      {orgao:'Governo do Estado',obj:'Contratação de empresa especializada',valor:'R$ 1.200.000',prazo:'12 dias'},
      {orgao:'Órgão Federal',obj:'Registro de preços para fornecimento',valor:'R$ 567.000',prazo:'5 dias'},
    ]});},1800);
  }
  return (
    <div className="glow-card" style={{padding:'2px'}} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',`${e.clientX-r.left}px`);e.currentTarget.style.setProperty('--my',`${e.clientY-r.top}px`);}}>
      <div style={{background:'var(--card)',borderRadius:'14px',padding:'28px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px',fontSize:'13px',fontWeight:600,color:'#7EB8FF'}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#7EB8FF" strokeWidth="1.2"/><circle cx="8" cy="8" r="2" fill="#7EB8FF"/><path d="M8 8L12 4" stroke="#7EB8FF" strokeWidth="1.2" strokeLinecap="round"/></svg>
          O robô está pronto. Faça um teste gratuito.
        </div>
        <h3 style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'20px',marginBottom:'20px',lineHeight:1.3}}>Quantas licitações estão abertas para você agora?</h3>
        {!result&&<>
          <label style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',display:'block',marginBottom:'8px'}}>CNPJ da sua empresa</label>
          <div style={{display:'flex',gap:'10px',marginBottom:'12px'}}>
            <input type="text" value={cnpj} onChange={e=>setCnpj(fmt(e.target.value))} placeholder="00.000.000/0000-00"/>
            <button className="btn-primary" onClick={consultar} disabled={loading||cnpj.replace(/\D/g,'').length<14} style={{whiteSpace:'nowrap',opacity:cnpj.replace(/\D/g,'').length<14?0.4:1}}>
              {loading?'Buscando...':'Consultar'}
            </button>
          </div>
          <p style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',lineHeight:1.5}}>Consultamos o PNCP em tempo real. Sem cadastro, sem cartão.</p>
          {loading&&<>
            {[0,1,2].map(i=><div key={i} style={{height:'56px',borderRadius:'10px',background:'rgba(255,255,255,0.04)',marginTop:'12px',animation:'shimmer 1.5s infinite',backgroundImage:'linear-gradient(90deg,rgba(255,255,255,0.02) 0%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0.02) 100%)',backgroundSize:'200% auto',animationDelay:`${i*200}ms`}}/>)}
            <p style={{textAlign:'center',fontSize:'13px',color:'#7EB8FF',marginTop:'12px'}}>O robô está varrendo o PNCP...</p>
          </>}
        </>}
        {result&&<div style={{animation:'fadeUp 0.5s ease'}}>
          <div style={{background:'rgba(0,201,167,0.1)',border:'1px solid rgba(0,201,167,0.25)',borderRadius:'12px',padding:'16px',textAlign:'center',marginBottom:'16px'}}>
            <div className="counter" style={{fontSize:'3rem',fontWeight:800,fontFamily:'Sora,sans-serif',color:'#00C9A7',lineHeight:1}}>{result.count}</div>
            <div style={{fontSize:'13px',color:'rgba(255,255,255,0.6)',marginTop:'4px'}}>licitações abertas agora para o seu ramo</div>
          </div>
          {result.items.map((it,i)=><div key={i} className="glow-card" style={{padding:'12px 14px',marginBottom:'8px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'4px'}}>
              <span style={{fontSize:'12px',fontWeight:600,color:'#7EB8FF'}}>{it.orgao}</span>
              <span style={{fontSize:'11px',background:'rgba(200,75,49,0.2)',color:'#FF8A6B',padding:'3px 8px',borderRadius:'100px'}}>{it.prazo}</span>
            </div>
            <div style={{fontSize:'13px',color:'rgba(255,255,255,0.7)',marginBottom:'2px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{it.obj}</div>
            <div style={{fontSize:'14px',fontWeight:600,color:'#fff'}}>{it.valor}</div>
          </div>)}
          <div style={{background:'linear-gradient(135deg,rgba(29,106,255,0.15),rgba(29,106,255,0.05))',border:'1px solid rgba(29,106,255,0.2)',borderRadius:'12px',padding:'16px',marginTop:'4px'}}>
            <p style={{fontSize:'13px',color:'rgba(255,255,255,0.75)',marginBottom:'12px',lineHeight:1.6}}><strong style={{color:'#fff'}}>Estas são apenas algumas das {result.count} oportunidades.</strong> Crie sua conta para o robô resumir todas.</p>
            <a href="/cadastro" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',background:'#fff',color:'#060D1A',borderRadius:'10px',padding:'12px',fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'14px',textDecoration:'none',transition:'background 0.2s'}} onMouseOver={e=>e.currentTarget.style.background='#7EB8FF'} onMouseOut={e=>e.currentTarget.style.background='#fff'}>
              Criar conta e ver todas <Arrow dark/>
            </a>
          </div>
          <button onClick={()=>{setResult(null);setCnpj('');}} style={{width:'100%',textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.3)',background:'none',border:'none',cursor:'pointer',marginTop:'10px',fontFamily:'Inter,sans-serif'}}>Consultar outro CNPJ</button>
        </div>}
      </div>
    </div>
  );
}

function Regularizacao() {
  return (
    <section style={{position:'relative',zIndex:1,padding:'0 0 32px'}}>
      <div className="section">
        <div style={{background:'linear-gradient(135deg,rgba(0,201,167,0.08),rgba(29,106,255,0.06))',border:'1px solid rgba(0,201,167,0.2)',borderRadius:'16px',padding:'24px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'24px',flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:'16px',flex:1,minWidth:'280px'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'12px',background:'rgba(0,201,167,0.12)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="#00C9A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <h3 style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'17px',marginBottom:'6px'}}>Não tem a documentação pronta? <span style={{color:'#00C9A7'}}>A gente prepara.</span></h3>
              <p style={{fontSize:'14px',color:'rgba(255,255,255,0.6)',lineHeight:1.6,maxWidth:'560px'}}>Nossa consultoria de <strong style={{color:'rgba(255,255,255,0.85)'}}>regularização para começar a licitar</strong> deixa seu CNPJ 100% habilitado — certidões, atestados e registros, tudo resolvido pela nossa equipe.</p>
            </div>
          </div>
          <a href="#licitare" className="btn-ghost" style={{flexShrink:0,borderColor:'rgba(0,201,167,0.3)',color:'#00C9A7'}} onMouseOver={e=>{e.currentTarget.style.borderColor='rgba(0,201,167,0.6)';e.currentTarget.style.background='rgba(0,201,167,0.08)';}} onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(0,201,167,0.3)';e.currentTarget.style.background='transparent';}}>
            Falar com a equipe <Arrow/>
          </a>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    {v:'R$ 1 tri',l:'em compras públicas/ano no Brasil'},
    {v:'+200 mil',l:'licitações publicadas no PNCP/ano'},
    {v:'80%',l:'das PMEs perdem prazos sem monitoramento'},
    {v:'Lei 14.133',l:'nova lei de licitações já obrigatória'},
  ];
  const [counts, setCounts] = useState([0,0,0,0]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        setCounts([1,200000,80,14133]);
        obs.disconnect();
      }
    },{threshold:0.3});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section ref={ref} style={{borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',background:'rgba(255,255,255,0.01)',position:'relative',zIndex:1}}>
      <div className="section" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'var(--border)'}}>
        {stats.map((s,i)=>(
          <div key={s.l} style={{padding:'28px 20px',textAlign:'center',background:'var(--bg)'}}>
            <div style={{fontFamily:'Sora,sans-serif',fontSize:'1.8rem',fontWeight:800,color:'#7EB8FF',marginBottom:'6px'}}>{s.v}</div>
            <div style={{fontSize:'12px',color:'rgba(255,255,255,0.45)',lineHeight:1.5}}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NotABuscador() {
  return (
    <FadeUp>
      <section id="diferenca" style={{padding:'96px 0',position:'relative',zIndex:1}}>
        <div className="section">
          <div style={{background:'linear-gradient(135deg,rgba(29,106,255,0.08),rgba(6,13,26,0.5))',border:'1px solid rgba(29,106,255,0.2)',borderRadius:'24px',padding:'56px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,right:0,width:'300px',height:'300px',background:'radial-gradient(circle,rgba(29,106,255,0.12),transparent 70%)',pointerEvents:'none'}}/>
            <div style={{position:'relative'}}>
              <span style={{display:'inline-block',background:'rgba(200,75,49,0.15)',border:'1px solid rgba(200,75,49,0.3)',color:'#FF8A6B',fontSize:'12px',fontWeight:600,padding:'5px 14px',borderRadius:'100px',marginBottom:'20px',letterSpacing:'0.05em'}}>BUSCADOR DE EDITAL É COISA DO PASSADO</span>
              <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.4rem',lineHeight:1.1,maxWidth:'700px',marginBottom:'20px',letterSpacing:'-0.02em'}}>
                Não somos mais um site de busca de editais.
                <span className="gradient-text"> Somos o robô que faz o trabalho pra você.</span>
              </h2>
              <p style={{fontSize:'16px',color:'rgba(255,255,255,0.6)',maxWidth:'600px',lineHeight:1.75,marginBottom:'48px'}}>
                Buscadores te entregam uma lista gigante e te abandonam — você lê tudo, entende tudo, corre atrás de tudo. O Edital IA é o contrário.
              </p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
                <div className="glow-card" style={{padding:'28px',background:'rgba(255,60,60,0.04)',borderColor:'rgba(255,60,60,0.15)'}}>
                  <div style={{fontSize:'13px',fontWeight:700,color:'#FF8A6B',marginBottom:'20px',display:'flex',alignItems:'center',gap:'8px'}}>
                    <span style={{fontSize:'18px'}}>✕</span> Buscador comum
                  </div>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'12px'}}>
                    {['Te dá lista enorme de editais','Você lê cada um sozinho','Você decide viabilidade no escuro','Você corre atrás da documentação','Você fica sozinho nos recursos'].map(t=><li key={t} style={{fontSize:'14px',color:'rgba(255,255,255,0.5)',paddingLeft:'14px',borderLeft:'2px solid rgba(255,60,60,0.2)'}}>{t}</li>)}
                  </ul>
                </div>
                <div className="glow-card" style={{padding:'28px',background:'rgba(0,201,167,0.04)',borderColor:'rgba(0,201,167,0.2)'}}>
                  <div style={{fontSize:'13px',fontWeight:700,color:'#00C9A7',marginBottom:'20px',display:'flex',alignItems:'center',gap:'8px'}}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="rgba(0,201,167,0.2)"/><path d="M5 8.5L7 10.5L11 6" stroke="#00C9A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Robô do Edital IA
                  </div>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'12px'}}>
                    {['Encontra só os editais certos pro seu CNPJ','Lê e resume cada um automaticamente','Score de viabilidade pronto','Equipe prepara toda documentação','Advogados cuidam dos recursos'].map(t=><li key={t} style={{fontSize:'14px',color:'rgba(255,255,255,0.85)',paddingLeft:'14px',borderLeft:'2px solid rgba(0,201,167,0.4)'}}>{t}</li>)}
                  </ul>
                </div>
              </div>
              <div style={{textAlign:'center',marginTop:'40px',fontSize:'1.2rem',fontFamily:'Sora,sans-serif',fontWeight:700}}>
                O robô busca e resume. <span style={{color:'#7EB8FF'}}>Você só escolhe o que disputar.</span> <span style={{color:'#00C9A7'}}>A gente faz o resto.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}

function ComoFunciona() {
  const steps = [
    {n:'01',icon:'🤖',t:'O robô encontra e resume',d:'Monitoramos todo o PNCP nacional. O robô filtra os editais certos pro seu CNAE e entrega o resumo com score de viabilidade.'},
    {n:'02',icon:'🎯',t:'Você escolhe o que disputar',d:'Com o resumo na mão, você seleciona com poucos cliques só as licitações que fazem sentido para a sua empresa.'},
    {n:'03',icon:'⚡',t:'A gente faz o resto',d:'Nossa equipe prepara documentação, monta proposta e cuida dos recursos jurídicos. Você foca em vencer.'},
  ];
  return (
    <FadeUp>
      <section id="como-funciona" style={{padding:'96px 0',position:'relative',zIndex:1}}>
        <div className="section">
          <div className="kicker">Como funciona</div>
          <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.6rem',letterSpacing:'-0.02em',marginBottom:'16px',maxWidth:'600px',lineHeight:1.1}}>O robô trabalha. Você decide. A gente executa.</h2>
          <p style={{fontSize:'16px',color:'rgba(255,255,255,0.55)',maxWidth:'540px',marginBottom:'56px',lineHeight:1.75}}>Três passos simples — a tecnologia e a equipe fazem o trabalho pesado enquanto você foca no negócio.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
            {steps.map((s,i)=>(
              <div key={s.n} className="glow-card" style={{padding:'32px',position:'relative'}} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',`${e.clientX-r.left}px`);e.currentTarget.style.setProperty('--my',`${e.clientY-r.top}px`);}}>
                <div style={{fontSize:'3.5rem',fontWeight:800,fontFamily:'Sora,sans-serif',color:'rgba(255,255,255,0.06)',marginBottom:'16px',lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:'2rem',marginBottom:'14px'}}>{s.icon}</div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'17px',marginBottom:'10px'}}>{s.t}</h3>
                <p style={{fontSize:'14px',color:'rgba(255,255,255,0.55)',lineHeight:1.7}}>{s.d}</p>
                {i<2&&<div style={{position:'absolute',right:'-9px',top:'50%',width:'18px',height:'18px',background:'var(--bg)',border:'1px solid var(--border)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',zIndex:10,transform:'translateY(-50%)'}}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M6 3l2 2-2 2" stroke="#7EB8FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}

function Valores() {
  const items = [
    {icon:'🤖',t:'Robô que busca e resume',d:'Monitora o PNCP 24h e entrega só os editais certos para o seu CNPJ.'},
    {icon:'🎯',t:'Score de viabilidade',d:'Cada edital recebe uma nota de quanto vale a pena disputar.'},
    {icon:'📄',t:'Documentação automática',d:'Declarações e documentos gerados e conferidos pela nossa equipe.'},
    {icon:'⚖️',t:'Recursos jurídicos',d:'Impugnações, recursos e contrarrazões por advogados especializados.'},
    {icon:'🔔',t:'Alertas inteligentes',d:'Avisos de novos editais e prazos por e-mail e WhatsApp.'},
    {icon:'📊',t:'Painel completo',d:'Pipeline, taxa de vitória e histórico de tudo num só lugar.'},
  ];
  return (
    <FadeUp>
      <section id="valor" style={{padding:'96px 0',position:'relative',zIndex:1}}>
        <div className="section">
          <div className="kicker">O que você recebe</div>
          <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.6rem',letterSpacing:'-0.02em',marginBottom:'16px',lineHeight:1.1}}>Um departamento completo,<br/>não mais uma ferramenta</h2>
          <p style={{fontSize:'16px',color:'rgba(255,255,255,0.55)',maxWidth:'540px',marginBottom:'56px',lineHeight:1.75}}>Robô de IA + equipe de documentação + advogados especializados — tudo em um só lugar, com success fee só quando você vence.</p>
          <div className="value-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
            {items.map(it=>(
              <div key={it.t} className="glow-card" style={{padding:'28px'}} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',`${e.clientX-r.left}px`);e.currentTarget.style.setProperty('--my',`${e.clientY-r.top}px`);}}>
                <div style={{width:'48px',height:'48px',borderRadius:'12px',background:'rgba(29,106,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',marginBottom:'16px'}}>{it.icon}</div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'16px',marginBottom:'8px'}}>{it.t}</h3>
                <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',lineHeight:1.65}}>{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}

function Planos() {
  const plans = [
    {n:'Starter',p:'397',fee:'8%',d:'Para quem está começando a licitar.',fs:['Triagem automática de editais','5 análises profundas/mês','Score de viabilidade','Cofre de documentos','1 usuário','Suporte por chat'],h:false},
    {n:'Pro',p:'1.197',fee:'8%',d:'Para empresas que querem escalar e ganhar mais.',fs:['Triagem automática de editais','50 análises profundas/mês','Análise de concorrência e preço','Geração de documentos','3 recursos jurídicos/mês','WhatsApp + 5 usuários'],h:true},
    {n:'Enterprise',p:'3.497',fee:'6%',d:'Para quem faz da licitação um pilar do faturamento.',fs:['Triagem automática de editais','Análises profundas ilimitadas','Proposta técnica completa','Recursos jurídicos ilimitados','Gerente de conta dedicado','Usuários ilimitados'],h:false},
  ];
  return (
    <FadeUp>
      <section id="planos" style={{padding:'96px 0',position:'relative',zIndex:1}}>
        <div className="section">
          <div style={{textAlign:'center',marginBottom:'56px'}}>
            <div className="kicker">Planos</div>
            <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.6rem',letterSpacing:'-0.02em',marginBottom:'16px',lineHeight:1.1}}>Você só paga mais quando ganha</h2>
            <p style={{fontSize:'16px',color:'rgba(255,255,255,0.55)',maxWidth:'520px',margin:'0 auto',lineHeight:1.75}}>Mensalidade acessível + taxa de sucesso só quando você vence. Nossos interesses alinhados com os seus.</p>
          </div>
          <div className="plans-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',alignItems:'start'}}>
            {plans.map(p=>(
              <div key={p.n} className={`glow-card${p.h?' plan-highlight':''}`} style={{padding:'32px',position:'relative',marginTop:p.h?'-8px':0}} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',`${e.clientX-r.left}px`);e.currentTarget.style.setProperty('--my',`${e.clientY-r.top}px`);}}>
                <span className="plan-badge">Mais escolhido</span>
                <div style={{fontSize:'13px',fontWeight:700,color:'#7EB8FF',marginBottom:'6px',fontFamily:'Sora,sans-serif'}}>{p.n}</div>
                <div style={{fontSize:'12px',color:'rgba(255,255,255,0.45)',marginBottom:'20px'}}>{p.d}</div>
                <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'4px'}}>
                  <span style={{fontSize:'13px',color:'rgba(255,255,255,0.4)'}}>R$</span>
                  <span style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.6rem',letterSpacing:'-0.02em'}}>{p.p}</span>
                  <span style={{fontSize:'13px',color:'rgba(255,255,255,0.4)'}}>/mês</span>
                </div>
                <div style={{fontSize:'12px',color:'#00C9A7',marginBottom:'24px'}}>+ {p.fee} sobre contratos vencidos</div>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px',marginBottom:'28px'}}>
                  {p.fs.map(f=>(
                    <li key={f} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'13px',color:'rgba(255,255,255,0.7)'}}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0,marginTop:'1px'}}><circle cx="8" cy="8" r="7" fill="rgba(0,201,167,0.12)"/><path d="M5 8.5L7 10.5L11 6" stroke="#00C9A7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#consulta" style={{display:'block',textAlign:'center',padding:'13px',borderRadius:'10px',fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'14px',textDecoration:'none',transition:'all 0.2s',...(p.h?{background:'linear-gradient(135deg,#1D6AFF,#0A3FA8)',color:'#fff'}:{background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.7)',border:'1px solid var(--border)'})}} onMouseOver={e=>{if(!p.h){e.currentTarget.style.background='rgba(255,255,255,0.1)';e.currentTarget.style.color='#fff';}}} onMouseOut={e=>{if(!p.h){e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.color='rgba(255,255,255,0.7)';}}}>
                  Começar agora
                </a>
              </div>
            ))}
          </div>
          <p style={{textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.35)',marginTop:'24px',lineHeight:1.6}}>A taxa de sucesso incide apenas sobre contratos efetivamente homologados, conforme valor publicado no Diário Oficial.</p>
        </div>
      </section>
    </FadeUp>
  );
}

function FAQ() {
  const items = [
    {q:'Funciona para o meu setor?',a:'Sim. Monitoramos todas as categorias — construção, alimentação, TI, uniformes, serviços e muito mais. A busca é baseada no CNAE da sua empresa.'},
    {q:'Minha empresa não tem documentação para licitar. E agora?',a:'A gente resolve. Nossa consultoria de regularização deixa seu CNPJ 100% habilitado — certidões, atestados e registros. Fale com a nossa equipe.'},
    {q:'Vocês são só um buscador?',a:'Não. Buscador te dá lista e te abandona. Nós encontramos, resumimos, analisamos, preparamos documentação e cuidamos dos recursos jurídicos.'},
    {q:'O robô decide por mim?',a:'Não. O robô analisa e recomenda. Você sempre decide o que disputar. A equipe só executa os editais que você selecionar.'},
    {q:'Como funciona a taxa de sucesso?',a:'Você paga apenas quando vence — sobre o valor do contrato homologado. Se não ganhar, não paga taxa nenhuma, só a mensalidade.'},
    {q:'Meus dados ficam seguros?',a:'Sim. Todos os dados são criptografados e isolados por empresa. Seguimos a LGPD e nenhum dado é compartilhado com concorrentes.'},
  ];
  const [open,setOpen] = useState<number|null>(null);
  return (
    <FadeUp>
      <section style={{padding:'96px 0',position:'relative',zIndex:1}}>
        <div className="section" style={{maxWidth:'720px'}}>
          <div className="kicker">Dúvidas frequentes</div>
          <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.4rem',letterSpacing:'-0.02em',marginBottom:'40px',lineHeight:1.1}}>Tudo que você precisa saber antes de começar</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {items.map((it,i)=>(
              <div key={it.q} style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'12px',overflow:'hidden',transition:'border-color 0.2s',...(open===i?{borderColor:'rgba(29,106,255,0.3)'}:{})}}>
                <button onClick={()=>setOpen(open===i?null:i)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 20px',background:'none',border:'none',cursor:'pointer',fontFamily:'Sora,sans-serif',fontWeight:600,fontSize:'15px',color:'#fff',textAlign:'left',gap:'16px'}}>
                  {it.q}
                  <span style={{fontSize:'20px',color:'#7EB8FF',transition:'transform 0.3s',transform:open===i?'rotate(45deg)':'none',flexShrink:0}}>+</span>
                </button>
                <div className={`faq-answer${open===i?' open':''}`}>
                  <p style={{padding:'0 20px 18px',fontSize:'14px',color:'rgba(255,255,255,0.6)',lineHeight:1.75}}>{it.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}

function LicitareCTA() {
  return (
    <FadeUp>
      <section id="licitare" style={{padding:'80px 0',position:'relative',zIndex:1}}>
        <div className="section">
          <div style={{background:'linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'24px',padding:'56px',display:'grid',gridTemplateColumns:'1fr auto',gap:'40px',alignItems:'center',flexWrap:'wrap',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:0,width:'200px',height:'200px',background:'radial-gradient(circle,rgba(255,255,255,0.03),transparent 70%)',pointerEvents:'none'}}/>
            <div>
              <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',marginBottom:'12px'}}>Precisa de algo além da plataforma?</div>
              <div style={{fontFamily:'Georgia,serif',fontSize:'1.8rem',fontWeight:700,letterSpacing:'-0.01em',marginBottom:'12px',color:'#fff'}}>
                <span style={{color:'rgba(255,255,255,0.5)'}}>um produto</span>{' '}
                <span style={{color:'#fff',fontStyle:'italic'}}>Licitare</span>
              </div>
              <p style={{fontSize:'15px',color:'rgba(255,255,255,0.55)',lineHeight:1.75,maxWidth:'480px'}}>
                Para empresas que precisam de consultoria personalizada, treinamento de equipes ou assessoria jurídica completa em contratos públicos — a Licitare oferece atendimento humano premium com especialistas dedicados à sua empresa.
              </p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px',flexShrink:0}}>
              <a href="https://licitarestrategy.com.br" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{textAlign:'center',textDecoration:'none',whiteSpace:'nowrap'}}>
                Conhecer a Licitare <Arrow/>
              </a>
              <p style={{fontSize:'11px',color:'rgba(255,255,255,0.3)',textAlign:'center'}}>licitarestrategy.com.br</p>
            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}

function FinalCTA() {
  return (
    <FadeUp>
      <section style={{padding:'80px 0 96px',position:'relative',zIndex:1}}>
        <div className="section">
          <div style={{background:'linear-gradient(135deg,rgba(29,106,255,0.12),rgba(29,106,255,0.04))',border:'1px solid rgba(29,106,255,0.25)',borderRadius:'24px',padding:'64px',textAlign:'center',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'400px',height:'400px',background:'radial-gradient(circle,rgba(29,106,255,0.15),transparent 70%)',pointerEvents:'none'}}/>
            <div style={{position:'relative'}}>
              <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.8rem',letterSpacing:'-0.02em',lineHeight:1.1,marginBottom:'20px'}}>
                Existem licitações abertas para sua empresa <span className="gradient-text">agora mesmo</span>.
              </h2>
              <p style={{fontSize:'17px',color:'rgba(255,255,255,0.55)',maxWidth:'480px',margin:'0 auto 36px',lineHeight:1.75}}>
                Deixe o robô encontrar e resumir pra você. Grátis, sem cadastro, em 10 segundos.
              </p>
              <a href="#consulta" className="btn-primary" style={{fontSize:'16px',padding:'16px 36px'}}>
                Consultar minha empresa grátis <Arrow/>
              </a>
            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}

function Footer() {
  return (
    <footer style={{borderTop:'1px solid var(--border)',background:'rgba(0,0,0,0.3)',position:'relative',zIndex:1}}>
      <div className="section" style={{padding:'40px 24px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'20px',marginBottom:'24px'}}>
          <Logo/>
          <div style={{display:'flex',gap:'28px',flexWrap:'wrap'}}>
            {[['Entrar','/login'],['Termos de Uso','/termos'],['Privacidade','/privacidade'],['Licitare','https://licitarestrategy.com.br']].map(([l,h])=>(
              <a key={l} href={h} style={{fontSize:'13px',color:'rgba(255,255,255,0.45)',textDecoration:'none',transition:'color 0.2s'}} onMouseOver={e=>e.currentTarget.style.color='#fff'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.45)'}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{borderTop:'1px solid var(--border)',paddingTop:'20px',fontSize:'12px',color:'rgba(255,255,255,0.3)',lineHeight:1.7}}>
          © {new Date().getFullYear()} Edital IA — uma plataforma da Licitare Consultoria e Gestão Empresarial Ltda · CNPJ 65.648.629/0001-98. Dados de licitações consultados no Portal Nacional de Contratações Públicas (PNCP).
        </div>
      </div>
    </footer>
  );
}

function FadeUp({children,delay=0}:{children:React.ReactNode;delay?:number}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis,setVis] = useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:0.08});
    obs.observe(el);return()=>obs.disconnect();
  },[]);
  return <div ref={ref} className={`fade-up${vis?' visible':''}`} style={{transitionDelay:`${delay}ms`}}>{children}</div>;
}

function Arrow({dark}:{dark?:boolean}={}) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 5l4 3-4 3" stroke={dark?'#060D1A':'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
