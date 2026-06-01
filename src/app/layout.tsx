import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Edital IA — Encontre e vença licitações públicas com inteligência artificial',
  description:
    'O Edital IA encontra as licitações certas para o seu CNPJ, analisa cada edital com IA e prepara toda a documentação com equipe jurídica especializada. Consulte grátis as oportunidades abertas para a sua empresa.',
  keywords: [
    'licitação',
    'licitações públicas',
    'PNCP',
    'inteligência artificial',
    'edital',
    'compras públicas',
    'pregão',
  ],
  metadataBase: new URL('https://app.licitarestrategy.com.br'),
  openGraph: {
    title: 'Edital IA — Vença licitações públicas com inteligência artificial',
    description:
      'Encontre, analise e vença licitações públicas. Tecnologia + IA + equipe jurídica em uma só plataforma.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
