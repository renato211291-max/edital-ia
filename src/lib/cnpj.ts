export function onlyDigits(v: string): string {
  return v.replace(/\D/g, '')
}

export function formatCnpj(v: string): string {
  const d = onlyDigits(v).slice(0, 14)
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export function isValidCnpj(value: string): boolean {
  const cnpj = onlyDigits(value)
  if (cnpj.length !== 14) return false
  if (/^(\d)\1{13}$/.test(cnpj)) return false

  const calc = (base: string, weights: number[]) => {
    const sum = base
      .split('')
      .reduce((acc, n, i) => acc + parseInt(n, 10) * weights[i], 0)
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const d1 = calc(cnpj.slice(0, 12), w1)
  const d2 = calc(cnpj.slice(0, 12) + d1, w2)

  return cnpj.endsWith(`${d1}${d2}`)
}