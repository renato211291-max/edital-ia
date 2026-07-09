'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { CompanyDocument } from './page'

const BUCKET = 'documentos-empresa'

const CATEGORIAS: { value: string; label: string }[] = [
  { value: 'cnd_federal', label: 'Certidão Negativa Federal' },
  { value: 'cnd_estadual', label: 'Certidão Negativa Estadual' },
  { value: 'cnd_municipal', label: 'Certidão Negativa Municipal' },
  { value: 'fgts', label: 'Certidão FGTS (CRF)' },
  { value: 'cndt', label: 'Certidão Trabalhista (CNDT)' },
  { value: 'contrato_social', label: 'Contrato Social / Estatuto' },
  { value: 'atestado_capacidade_tecnica', label: 'Atestado de Capacidade Técnica' },
  { value: 'balanco_patrimonial', label: 'Balanço Patrimonial' },
  { value: 'outro', label: 'Outro' },
]

function categoriaLabel(value: string) {
  return CATEGORIAS.find(c => c.value === value)?.label || value
}

function getStatus(validadeAte: string | null): { label: string; bg: string; color: string } {
  if (!validadeAte) {
    return { label: 'Sem vencimento', bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' }
  }
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const validade = new Date(validadeAte + 'T00:00:00')
  const diffDias = Math.floor((validade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDias < 0) {
    return { label: 'Vencido', bg: 'rgba(255,60,60,0.15)', color: '#FF8A6B' }
  }
  if (diffDias <= 30) {
    return { label: `Vence em ${diffDias}d`, bg: 'rgba(255,209,102,0.15)', color: '#FFD166' }
  }
  return { label: 'Vigente', bg: 'rgba(0,201,167,0.15)', color: '#00C9A7' }
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export default function DocumentsManager({
  companyId,
  initialDocuments,
}: {
  companyId: string
  initialDocuments: CompanyDocument[]
}) {
  const supabase = createClient()
  const [documents, setDocuments] = useState<CompanyDocument[]>(initialDocuments)
  const [file, setFile] = useState<File | null>(null)
  const [categoria, setCategoria] = useState('outro')
  const [nome, setNome] = useState('')
  const [validade, setValidade] = useState('')
  const [uploading, setUploading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file) {
      setErro('Selecione um arquivo para enviar.')
      return
    }
    setUploading(true)
    setErro(null)

    const path = `${companyId}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file)
    if (uploadError) {
      setErro('Não foi possível enviar o arquivo. Tente novamente.')
      setUploading(false)
      return
    }

    const { data: inserted, error: insertError } = await supabase
      .from('company_documents')
      .insert({
        company_id: companyId,
        categoria,
        nome: nome.trim() || file.name,
        storage_path: path,
        validade_ate: validade || null,
      })
      .select()
      .single()

    if (insertError) {
      setErro('Arquivo enviado, mas houve um erro ao salvar os dados. Tente novamente.')
      setUploading(false)
      return
    }

    setDocuments(prev => [inserted as CompanyDocument, ...prev])
    setFile(null)
    setNome('')
    setValidade('')
    setCategoria('outro')
    setUploading(false)
    const fileInput = document.getElementById('doc-file-input') as HTMLInputElement | null
    if (fileInput) fileInput.value = ''
  }

  async function handleDownload(doc: CompanyDocument) {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(doc.storage_path, 60)
    if (error || !data) return
    window.open(data.signedUrl, '_blank')
  }

  async function handleDelete(doc: CompanyDocument) {
    if (!confirm(`Excluir "${doc.nome}"? Essa ação não pode ser desfeita.`)) return
    setDeletingId(doc.id)
    await supabase.storage.from(BUCKET).remove([doc.storage_path])
    const { error } = await supabase.from('company_documents').delete().eq('id', doc.id)
    if (!error) {
      setDocuments(prev => prev.filter(d => d.id !== doc.id))
    }
    setDeletingId(null)
  }

  return (
    <div>
      <form
        onSubmit={handleUpload}
        className="glow-card"
        style={{ padding: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Enviar novo documento</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Categoria</label>
            <select
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
              style={inputStyle}
            >
              {CATEGORIAS.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Validade (opcional)</label>
            <input
              type="date"
              value={validade}
              onChange={e => setValidade(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Nome de exibição (opcional)</label>
          <input
            type="text"
            placeholder="Ex: CND Federal - Janeiro 2026"
            value={nome}
            onChange={e => setNome(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Arquivo</label>
          <input
            id="doc-file-input"
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
            style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}
          />
        </div>

        {erro && <p style={{ fontSize: '13px', color: '#FF8A6B' }}>{erro}</p>}

        <button
          type="submit"
          disabled={uploading}
          style={{
            alignSelf: 'flex-start',
            padding: '10px 24px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg,#1D6AFF,#0A3FA8)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '14px',
            fontFamily: 'Sora, sans-serif',
            border: 'none',
            cursor: uploading ? 'default' : 'pointer',
            opacity: uploading ? 0.6 : 1,
          }}
        >
          {uploading ? 'Enviando...' : 'Enviar documento'}
        </button>
      </form>

      {documents.length === 0 ? (
        <div className="glow-card" style={{ padding: '40px', textAlign: 'center', borderStyle: 'dashed' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>📁</div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>
            Nenhum documento enviado ainda. Comece enviando sua primeira certidão acima.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {documents.map(doc => {
            const status = getStatus(doc.validade_ate)
            return (
              <div
                key={doc.id}
                className="glow-card"
                style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{doc.nome}</span>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: '100px',
                      background: status.bg, color: status.color,
                    }}>
                      {status.label}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                    {categoriaLabel(doc.categoria)} · Validade: {formatDate(doc.validade_ate)}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                  <button
                    onClick={() => handleDownload(doc)}
                    style={smallBtnStyle}
                  >
                    Baixar
                  </button>
                  <button
                    onClick={() => handleDelete(doc)}
                    disabled={deletingId === doc.id}
                    style={{ ...smallBtnStyle, color: '#FF8A6B', borderColor: 'rgba(255,60,60,0.3)' }}
                  >
                    {deletingId === doc.id ? 'Excluindo...' : 'Excluir'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'rgba(255,255,255,0.5)',
  display: 'block',
  marginBottom: '6px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  fontSize: '14px',
  fontFamily: 'Inter, sans-serif',
}

const smallBtnStyle: React.CSSProperties = {
  padding: '7px 14px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'transparent',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
}
