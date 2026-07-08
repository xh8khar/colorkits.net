'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import InputPanel from './InputPanel'
import OutputPanel from './OutputPanel'

import { SITE_URL } from '@/lib/site'
const MAX_HISTORY = 20

interface HistoryEntry { input: string; output: string; timestamp: number }

function getHistoryKey(slug: string): string { return `ck_history_${slug}` }
function loadHistory(slug: string): HistoryEntry[] {
  try { const raw = localStorage.getItem(getHistoryKey(slug)); return raw ? JSON.parse(raw) : [] } catch { return [] }
}
function saveHistory(slug: string, entry: HistoryEntry): void {
  const entries = loadHistory(slug)
  entries.unshift(entry)
  if (entries.length > MAX_HISTORY) entries.length = MAX_HISTORY
  try { localStorage.setItem(getHistoryKey(slug), JSON.stringify(entries)) } catch {}
}

interface ToolLayoutProps {
  title: string
  description: string
  inputLabel?: string
  outputLabel?: string
  inputPlaceholder?: string
  outputPlaceholder?: string
  convertLabel?: string
  onConvert: (input: string) => string | Promise<string>
  exampleInput?: string
  bidirectional?: boolean
  onReverse?: (input: string) => string | Promise<string>
  colorPreview?: string
  extraActions?: React.ReactNode
  children?: React.ReactNode
  toolSlug?: string
}

export default function ToolLayout({
  title, description, inputLabel = 'Input', outputLabel = 'Output',
  inputPlaceholder = 'Paste your color value here...',
  outputPlaceholder = 'Result will appear here...',
  convertLabel = 'Convert', onConvert: convertFn, exampleInput,
  bidirectional, onReverse, colorPreview,
  extraActions, children, toolSlug,
}: ToolLayoutProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isReversed, setIsReversed] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const slugRef = useRef('')
  const { addToast } = useToast()

  useEffect(() => {
    const slug = toolSlug || window.location.pathname.replace(/^\//, '')
    slugRef.current = slug
    setHistory(loadHistory(slug))
  }, [toolSlug])

  const handleConvert = useCallback(async () => {
    if (!input.trim()) { addToast('Please enter some input', 'error'); return }
    setLoading(true); setError('')
    try {
      const fn = isReversed && onReverse ? onReverse : convertFn
      const result = await fn(input)
      setOutput(result)
      const entry: HistoryEntry = { input, output: result, timestamp: Date.now() }
      saveHistory(slugRef.current, entry)
      setHistory(loadHistory(slugRef.current))
      addToast('Converted successfully', 'success')
    } catch (e) {
      const msg = (e as Error).message
      setError(msg)
      addToast(msg, 'error')
    } finally { setLoading(false) }
  }, [input, isReversed, convertFn, onReverse, addToast])

  const dynamicPreview = useMemo((): string | undefined => {
    const tryParse = (s: string): string | null => {
      const t = s.trim()
      if (/^#[0-9a-fA-F]{3,8}$/.test(t)) return t
      const rgb = t.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      if (rgb) {
        const [r, g, b] = [parseInt(rgb[1]), parseInt(rgb[2]), parseInt(rgb[3])]
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
      }
      return null
    }
    if (output) { const c = tryParse(output); if (c) return c }
    if (input) { const c = tryParse(input); if (c) return c }
    return colorPreview
  }, [input, output, colorPreview])

  const handleCopy = useCallback(async () => {
    if (!output) return
    try { await navigator.clipboard.writeText(output); addToast('Copied to clipboard', 'success') }
    catch { addToast('Failed to copy', 'error') }
  }, [output, addToast])

  const handleSwap = useCallback(() => {
    if (!bidirectional || !onReverse) return
    setIsReversed(!isReversed); setOutput(''); setError('')
    addToast('Swapped input and output', 'info')
  }, [bidirectional, onReverse, isReversed, addToast])

  const loadExample = useCallback(() => {
    if (exampleInput) { setInput(exampleInput); setOutput(''); setError(''); addToast('Example loaded', 'info') }
  }, [exampleInput, addToast])

  const handleClear = useCallback(() => { setInput(''); setOutput(''); setError('') }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-7xl">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <InputPanel label={isReversed && bidirectional ? outputLabel : inputLabel} value={input} onChange={setInput} placeholder={inputPlaceholder} />
        <OutputPanel label={isReversed && bidirectional ? inputLabel : outputLabel} value={output} placeholder={outputPlaceholder} error={error} colorPreview={dynamicPreview} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <Button onClick={handleConvert} loading={loading} size="lg" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>}>{convertLabel}</Button>
        {bidirectional && onReverse && (<Button variant="secondary" onClick={handleSwap} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>}>Swap</Button>)}
        {(input.trim() || output.trim()) && (<><Button variant="secondary" onClick={handleCopy} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}>Copy</Button></>)}
        {exampleInput && (<Button variant="ghost" onClick={loadExample} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>Load Example</Button>)}
        <Button variant="ghost" onClick={handleClear} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}>Clear</Button>
        {extraActions}
        {history.length > 0 && (
          <div className="relative">
            <Button variant="ghost" size="sm" onClick={() => setHistoryOpen(!historyOpen)} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>History ({history.length})</Button>
            {historyOpen && (
              <div className="absolute left-0 top-full mt-1 w-96 max-h-64 overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                {history.map(entry => (
                  <button key={entry.timestamp} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-0 text-sm" onClick={() => { setInput(entry.input); setOutput(entry.output); setError(''); setHistoryOpen(false) }}>
                    <div className="text-slate-500 dark:text-slate-400 text-xs">{new Date(entry.timestamp).toLocaleString()}</div>
                    <div className="truncate text-slate-700 dark:text-slate-300 mt-0.5">{entry.input.substring(0, 80)}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {children}
    </div>
  )
}
