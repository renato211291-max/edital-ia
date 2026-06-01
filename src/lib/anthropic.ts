import Anthropic from '@anthropic-ai/sdk';

/**
 * Cliente Anthropic Claude — usado para análise de editais.
 * 
 * Modelos disponíveis:
 * - claude-sonnet-4-5: análise profunda de editais (recomendado)
 * - claude-haiku-4-5: classificação rápida e barata (triagem inicial)
 */
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const CLAUDE_MODELS = {
  SONNET: 'claude-sonnet-4-5',
  HAIKU: 'claude-haiku-4-5',
} as const;

/**
 * Custos aproximados em USD por 1M de tokens (atualizar conforme tabela Anthropic).
 */
export const CLAUDE_PRICING = {
  SONNET: { input: 3.0, output: 15.0 },
  HAIKU: { input: 0.8, output: 4.0 },
};

/**
 * Calcula o custo aproximado de uma chamada em USD.
 */
export function calculateCost(
  model: keyof typeof CLAUDE_PRICING,
  inputTokens: number,
  outputTokens: number
): number {
  const pricing = CLAUDE_PRICING[model];
  return (
    (inputTokens * pricing.input + outputTokens * pricing.output) / 1_000_000
  );
}
