'use client'

import { useState, useCallback, useMemo } from 'react'
import ToolLayout from './ToolLayout'
import ToolContent from './ToolContent'
import { getToolContent } from '@/lib/toolContent'
import { usePathname } from 'next/navigation'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import {
  colorFormatDetector,
  cssColorConverter,
  hexToRgb,
  hexToHsl,
  hexToHsv,
  hexToCmyk,
  hexToHwb,
  hexToLab,
  hexToLch,
  hexToOklab,
  hexToOklch,
} from '@/lib/converters'

type Mode = 'simple' | 'batch' | 'detect'

interface ColorConverterToolProps {
  title: string
  description: string
  convertFn?: (input: string) => string | Promise<string>
  reverseFn?: (input: string) => string | Promise<string>
  exampleInput?: string
  colorPreview?: string
  bidirectional?: boolean
  mode?: Mode
}

interface BatchRow {
  input: string
  output: string
  error?: string
}

const FORMAT_LABEL: Record<string, string> = {
  hex: 'HEX', rgb: 'RGB', rgba: 'RGBA', hsl: 'HSL',
  hsla: 'HSLA', hsv: 'HSV', cmyk: 'CMYK', hwb: 'HWB',
  lab: 'LAB', lch: 'LCH', oklab: 'OKLAB', oklch: 'OKLCH',
  name: 'Named Color',
}

const FORMAT_BADGE: Record<string, string> = {
  hex: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  rgb: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  rgba: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  hsl: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  hsla: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  hsv: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  cmyk: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  hwb: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  lab: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  lch: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  oklab: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  oklch: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  name: 'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300',
}

const CONVERT_ORDER = [
  { key: 'hex', label: 'HEX', fn: (v: string) => v },
  { key: 'rgb', label: 'RGB', fn: (v: string) => hexToRgb(v) },
  { key: 'hsl', label: 'HSL', fn: (v: string) => hexToHsl(v) },
  { key: 'hsv', label: 'HSV', fn: (v: string) => hexToHsv(v) },
  { key: 'cmyk', label: 'CMYK', fn: (v: string) => hexToCmyk(v) },
  { key: 'hwb', label: 'HWB', fn: (v: string) => hexToHwb(v) },
  { key: 'lab', label: 'LAB', fn: (v: string) => hexToLab(v) },
  { key: 'lch', label: 'LCH', fn: (v: string) => hexToLch(v) },
  { key: 'oklab', label: 'OKLAB', fn: (v: string) => hexToOklab(v) },
  { key: 'oklch', label: 'OKLCH', fn: (v: string) => hexToOklch(v) },
]

function safeConvert(fn: (v: string) => string, v: string): string {
  try { return fn(v) } catch { return '—' }
}

export default function ColorConverterTool(props: ColorConverterToolProps) {
  const { title, description, convertFn: propConvertFn, reverseFn, exampleInput, colorPreview, bidirectional, mode = 'simple' } = props
  const { addToast } = useToast()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [batchRows, setBatchRows] = useState<BatchRow[]>([])
  const [detectResult, setDetectResult] = useState<{ format: string; hex: string; values: { label: string; value: string }[] } | null>(null)
  const [detectError, setDetectError] = useState('')

  const pathname = usePathname()
  const toolId = pathname?.replace(/^\//, '')?.replace(/\/$/, '') || ''
  const content = useMemo(() => getToolContent(toolId), [toolId])

  const convertFn = propConvertFn || cssColorConverter

  const handleBatch = useCallback(async () => {
    if (!input.trim()) { addToast('Please enter some input', 'error'); return }
    const lines = input.split('\n').map(l => l.trim()).filter(Boolean)
    if (!lines.length) { addToast('No color values found', 'info'); return }
    setLoading(true)
    const rows: BatchRow[] = []
    for (const line of lines) {
      try {
        const output = await convertFn(line)
        rows.push({ input: line, output })
      } catch (e) {
        rows.push({ input: line, output: '', error: (e as Error).message })
      }
    }
    setBatchRows(rows)
    setLoading(false)
    const ok = rows.filter(r => !r.error).length
    addToast(`Converted ${ok}/${rows.length} colors`, ok === rows.length ? 'success' : 'info')
  }, [input, convertFn, addToast])

  const handleDetect = useCallback(async () => {
    if (!input.trim()) { addToast('Please enter some input', 'error'); return }
    setDetectError('')
    setDetectResult(null)
    setLoading(true)
    try {
      const format = colorFormatDetector(input)
      const hex = await cssColorConverter(input)
      const baseHex = /^#[0-9a-fA-F]{8}$/.test(hex) ? hex.slice(0, 7) : hex
      const values = CONVERT_ORDER.map(({ key, label, fn }) => ({
        label,
        value: key === 'hex' ? hex : safeConvert(fn, baseHex),
      }))
      setDetectResult({ format, hex, values })
      addToast('Format detected', 'success')
    } catch (e) {
      const msg = (e as Error).message
      setDetectError(msg)
      addToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }, [input, addToast])

  const handleCopy = useCallback(async (text: string) => {
    try { await navigator.clipboard.writeText(text); addToast('Copied', 'success') }
    catch { addToast('Failed to copy', 'error') }
  }, [addToast])

  if (mode === 'simple') {
    return (
      <ToolContent title={title} description={description} howToUse={content.howToUse} faq={content.faq} relatedTools={content.relatedTools}>
        <ToolLayout
          title={title}
          description={description}
          onConvert={convertFn}
          onReverse={reverseFn}
          exampleInput={exampleInput}
          colorPreview={colorPreview}
          bidirectional={bidirectional}
        />
      </ToolContent>
    )
  }

  return (
    <ToolContent title={title} description={description} howToUse={content.howToUse} faq={content.faq} relatedTools={content.relatedTools}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-7xl">{description}</p>
      </div>

      <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {mode === 'batch' ? 'Input (one color per line)' : 'Input'}
          </span>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === 'batch' ? '#ff0044\nrgb(255, 0, 68)\nhsl(344, 100%, 50%)' : 'Paste your color value here...'}
          className="w-full min-h-[160px] p-4 font-mono text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-y focus:outline-none"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button
          onClick={mode === 'batch' ? handleBatch : handleDetect}
          loading={loading}
          size="lg"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          }
        >
          {mode === 'batch' ? 'Convert All' : 'Detect Format'}
        </Button>
        {input && (
          <Button variant="ghost" onClick={() => { setInput(''); setBatchRows([]); setDetectResult(null); setDetectError('') }}>
            Clear
          </Button>
        )}
      </div>

      {mode === 'batch' && batchRows.length > 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Input</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Swatch</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Output</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {batchRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-300 max-w-[200px] truncate" title={row.input}>
                    {row.input}
                  </td>
                  <td className="px-4 py-3">
                    {row.output && !row.error ? (
                      <span
                        className="inline-block w-6 h-6 rounded border border-slate-300 dark:border-slate-600"
                        style={{ backgroundColor: row.output }}
                      />
                    ) : (
                      <span className="inline-block w-6 h-6 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-300 max-w-[300px] truncate">
                    {row.error ? (
                      <span className="text-red-500 dark:text-red-400">{row.error}</span>
                    ) : (
                      <span title={row.output}>{row.output}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {row.output && !row.error && (
                      <button
                        onClick={() => handleCopy(row.output)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        title="Copy output"
                      >
                        <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400">
            {batchRows.filter(r => !r.error).length} of {batchRows.length} converted successfully
          </div>
        </div>
      )}

      {mode === 'detect' && detectError && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-sm text-red-600 dark:text-red-400">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <pre className="whitespace-pre-wrap font-mono text-xs">{detectError}</pre>
        </div>
      )}

      {mode === 'detect' && detectResult && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${FORMAT_BADGE[detectResult.format] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
              {FORMAT_LABEL[detectResult.format] || detectResult.format.toUpperCase()}
            </span>
            <span
              className="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-600 shadow-sm"
              style={{ backgroundColor: detectResult.hex }}
            />
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">All Format Values</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {detectResult.values.map(({ label, value }) => (
                <div key={label} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 group">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 w-16 shrink-0">{label}</span>
                  <code className="flex-1 font-mono text-xs text-slate-900 dark:text-white break-all">{value}</code>
                  <button
                    onClick={() => handleCopy(value)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                    title={`Copy ${label}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </ToolContent>
  )
}
