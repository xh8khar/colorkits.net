'use client'

import { useState, useMemo, useCallback, type ReactNode } from 'react'
import ToolContent from './ToolContent'
import { getToolContent } from '@/lib/toolContent'
import { usePathname } from 'next/navigation'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'

interface ColorStop {
  id: string
  color: string
  position: number
}

interface GradientGeneratorToolProps {
  title: string
  description: string
  gradientType: 'linear' | 'radial' | 'conic' | 'mesh' | 'css' | 'svg' | 'animated' | 'text' | 'button' | 'background' | 'border' | 'shadow' | 'multi-stop' | 'three-color' | 'four-color' | 'mixer' | 'reverser' | 'angle' | 'preview' | 'exporter' | 'tailwind' | 'bootstrap' | 'glass' | 'aurora' | 'metallic' | 'neon' | 'pastel' | 'instagram' | 'noise' | 'grain' | 'svg-mesh' | 'animation' | 'overlay' | 'code-generator' | 'library'
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9)
}

function hexToRgbValues(hex: string): [number, number, number] {
  const h = hex.replace(/^#/, '')
  if (h.length === 3) {
    return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
  }
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v)))
  return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`
}

function isValidHex(s: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s.trim())
}

const presetGradients: Record<string, { colors: string[]; angle?: number; type: 'linear' | 'radial' | 'conic' }> = {
  instagram: { colors: ['#feda77', '#f58529', '#dd2a7b', '#8134af', '#515bd4'], angle: 45, type: 'linear' },
  aurora: { colors: ['#00d2ff', '#3a7bd5', '#8e44ad', '#e74c3c', '#f39c12'], angle: 135, type: 'linear' },
  neon: { colors: ['#f9d423', '#ff4e50'], angle: 90, type: 'linear' },
  pastel: { colors: ['#ffecd2', '#fcb69f'], angle: 135, type: 'linear' },
  metallic: { colors: ['#e0c3fc', '#8ec5fc'], angle: 90, type: 'linear' },
  glass: { colors: ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)'], angle: 135, type: 'linear' },
}

function CardSection({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</span>
        {actions}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function MeshGradient() {
  const { addToast } = useToast()
  const defaultColors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#9b59b6', '#e67e22', '#1abc9c', '#e74c3c', '#3498db']
  const [points, setPoints] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      color: defaultColors[i],
      row: Math.floor(i / 3),
      col: i % 3,
    }))
  )

  const centers = [
    { x: '0%', y: '0%' }, { x: '50%', y: '0%' }, { x: '100%', y: '0%' },
    { x: '0%', y: '50%' }, { x: '50%', y: '50%' }, { x: '100%', y: '50%' },
    { x: '0%', y: '100%' }, { x: '50%', y: '100%' }, { x: '100%', y: '100%' },
  ]

  const updateColor = (id: number, color: string) => setPoints(prev => prev.map(p => p.id === id ? { ...p, color } : p))

  const meshBackground = useMemo(() =>
    points.map((p, i) => `radial-gradient(ellipse at ${centers[i].x} ${centers[i].y}, ${p.color} 0%, transparent 50%)`).join(', ')
  , [points])

  const meshCss = useMemo(() => {
    const layers = points.map((p, i) => `    radial-gradient(ellipse at ${centers[i].x} ${centers[i].y}, ${p.color} 0%, transparent 50%)`).join(',\n')
    return `.mesh-gradient {\n  background:\n${layers};\n}`
  }, [points])

  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(meshCss); addToast('CSS copied', 'success') }
    catch { addToast('Failed to copy', 'error') }
  }, [meshCss, addToast])

  const handleRandomize = useCallback(() => {
    setPoints(prev => prev.map(p => ({ ...p, color: `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}` })))
    addToast('Randomized', 'info')
  }, [addToast])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CardSection title="Mesh Preview">
            <div className="w-full h-80 rounded-lg border border-slate-200 dark:border-slate-600" style={{ background: meshBackground }} />
          </CardSection>
          <CardSection title="CSS Code" actions={<Button variant="ghost" size="sm" onClick={handleCopy}>Copy CSS</Button>}>
            <pre className="p-4 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre">{meshCss}</pre>
          </CardSection>
        </div>
        <div className="space-y-6">
          <CardSection title="Control Points (3×3)">
            <div className="grid grid-cols-3 gap-3">
              {points.map(p => (
                <div key={p.id} className="flex flex-col items-center gap-1">
                  <input type="color" value={p.color} onChange={e => updateColor(p.id, e.target.value)} className="w-12 h-12 rounded border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent" />
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{p.color}</span>
                </div>
              ))}
            </div>
          </CardSection>
          <CardSection title="Actions">
            <div className="space-y-2">
              <Button onClick={handleCopy} size="sm" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              }>Copy CSS</Button>
              <Button onClick={handleRandomize} variant="secondary" size="sm" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              }>Randomize</Button>
            </div>
          </CardSection>
        </div>
      </div>
    </div>
  )
}

function GrainGradient() {
  const { addToast } = useToast()
  const [stops, setStops] = useState<ColorStop[]>(() => [
    { id: generateId(), color: '#ff6b6b', position: 0 },
    { id: generateId(), color: '#4d96ff', position: 100 },
  ])
  const [intensity, setIntensity] = useState(30)

  const updateStop = (id: string, updates: Partial<ColorStop>) => setStops(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  const sortedStops = useMemo(() => [...stops].sort((a, b) => a.position - b.position), [stops])

  const gradientCss = useMemo(() => {
    const s = sortedStops.map(st => `${st.color} ${st.position}%`).join(', ')
    return `linear-gradient(135deg, ${s})`
  }, [sortedStops])

  const grainSvg = useMemo(() => {
    const stopsXml = sortedStops.map(st => `      <stop offset="${st.position}%" stop-color="${st.color}" />`).join('\n')
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
${stopsXml}
    </linearGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${(intensity / 100).toFixed(2)} 0" in="noise" result="coloredNoise" />
      <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)" filter="url(#grain)" />
</svg>`
  }, [sortedStops, intensity])

  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(grainSvg); addToast('SVG copied', 'success') }
    catch { addToast('Failed to copy', 'error') }
  }, [grainSvg, addToast])

  const addStop = () => {
    if (stops.length >= 4) { addToast('Maximum 4 stops', 'error'); return }
    const last = stops[stops.length - 1]
    setStops(prev => [...prev, { id: generateId(), color: '#888888', position: last ? Math.min(100, last.position + 20) : 50 }])
  }

  const removeStop = (id: string) => {
    if (stops.length <= 2) { addToast('Need at least 2 stops', 'error'); return }
    setStops(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CardSection title="Grain Preview">
            <div className="relative w-full h-64 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
              <div className="absolute inset-0" style={{ background: gradientCss }} />
              <svg className="absolute inset-0 w-full h-full" style={{ opacity: intensity / 100 }}>
                <defs>
                  <filter id="grain-preview">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
                    <feColorMatrix type="saturate" values="0" in="noise" />
                  </filter>
                </defs>
                <rect width="100%" height="100%" filter="url(#grain-preview)" />
              </svg>
            </div>
          </CardSection>
          <CardSection title="SVG Code" actions={<Button variant="ghost" size="sm" onClick={handleCopy}>Copy SVG</Button>}>
            <pre className="p-4 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre">{grainSvg}</pre>
          </CardSection>
        </div>
        <div className="space-y-6">
          <CardSection title="Color Stops">
            <div className="relative h-8 rounded-lg overflow-hidden mb-3" style={{ background: gradientCss }} />
            {stops.map(stop => (
              <div key={stop.id} className="flex items-center gap-2 mb-2">
                <input type="color" value={stop.color} onChange={e => updateStop(stop.id, { color: e.target.value })} className="w-8 h-8 rounded border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent" />
                <input type="text" value={stop.color} onChange={e => { const v = e.target.value; if (isValidHex(v)) updateStop(stop.id, { color: v }) }} className="w-24 px-2 py-1 text-xs font-mono rounded border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200" />
                <input type="range" min={0} max={100} value={stop.position} onChange={e => updateStop(stop.id, { position: Number(e.target.value) })} className="flex-1 h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer accent-rose-500" />
                <span className="text-xs text-slate-400 w-8">{stop.position}%</span>
                <button onClick={() => removeStop(stop.id)} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
            {stops.length < 4 && (
              <button onClick={addStop} className="text-xs text-slate-500 hover:text-rose-500 transition-colors">+ Add stop</button>
            )}
          </CardSection>
          <CardSection title="Grain Intensity">
            <div className="flex items-center gap-4">
              <input type="range" min={0} max={100} value={intensity} onChange={e => setIntensity(Number(e.target.value))} className="flex-1 h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer accent-rose-500" />
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 w-10 text-right">{intensity}%</span>
            </div>
          </CardSection>
          <CardSection title="Actions">
            <Button onClick={handleCopy} size="sm" className="w-full justify-start" icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            }>Copy SVG</Button>
          </CardSection>
        </div>
      </div>
    </div>
  )
}

function NoiseGradient() {
  const { addToast } = useToast()
  const [stops, setStops] = useState<ColorStop[]>(() => [
    { id: generateId(), color: '#2c3e50', position: 0 },
    { id: generateId(), color: '#3498db', position: 100 },
  ])
  const [scale, setScale] = useState(50)
  const [octaves, setOctaves] = useState(3)
  const [blendMode, setBlendMode] = useState('multiply')

  const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference']

  const updateStop = (id: string, updates: Partial<ColorStop>) => setStops(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  const sortedStops = useMemo(() => [...stops].sort((a, b) => a.position - b.position), [stops])

  const gradientCss = useMemo(() => {
    const s = sortedStops.map(st => `${st.color} ${st.position}%`).join(', ')
    return `linear-gradient(135deg, ${s})`
  }, [sortedStops])

  const noiseSvg = useMemo(() => {
    const freq = (scale / 100).toFixed(2)
    const stopsXml = sortedStops.map(st => `      <stop offset="${st.position}%" stop-color="${st.color}" />`).join('\n')
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
${stopsXml}
    </linearGradient>
    <filter id="noise" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${octaves}" result="noise" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" in="noise" result="coloredNoise" />
      <feBlend in="SourceGraphic" in2="coloredNoise" mode="${blendMode}" />
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)" filter="url(#noise)" />
</svg>`
  }, [sortedStops, scale, octaves, blendMode])

  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(noiseSvg); addToast('SVG copied', 'success') }
    catch { addToast('Failed to copy', 'error') }
  }, [noiseSvg, addToast])

  const addStop = () => {
    if (stops.length >= 4) { addToast('Maximum 4 stops', 'error'); return }
    const last = stops[stops.length - 1]
    setStops(prev => [...prev, { id: generateId(), color: '#888888', position: last ? Math.min(100, last.position + 20) : 50 }])
  }

  const removeStop = (id: string) => {
    if (stops.length <= 2) { addToast('Need at least 2 stops', 'error'); return }
    setStops(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CardSection title="Noise Preview">
            <div className="relative w-full h-64 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
              <div className="absolute inset-0" style={{ background: gradientCss }} />
              <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'], opacity: 0.6 }}>
                <defs>
                  <filter id="noise-preview">
                    <feTurbulence type="fractalNoise" baseFrequency={(scale / 100).toFixed(2)} numOctaves={octaves} result="noise" />
                    <feColorMatrix type="saturate" values="0" in="noise" />
                  </filter>
                </defs>
                <rect width="100%" height="100%" filter="url(#noise-preview)" />
              </svg>
            </div>
          </CardSection>
          <CardSection title="SVG Code" actions={<Button variant="ghost" size="sm" onClick={handleCopy}>Copy SVG</Button>}>
            <pre className="p-4 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre">{noiseSvg}</pre>
          </CardSection>
        </div>
        <div className="space-y-6">
          <CardSection title="Color Stops">
            <div className="relative h-8 rounded-lg overflow-hidden mb-3" style={{ background: gradientCss }} />
            {stops.map(stop => (
              <div key={stop.id} className="flex items-center gap-2 mb-2">
                <input type="color" value={stop.color} onChange={e => updateStop(stop.id, { color: e.target.value })} className="w-8 h-8 rounded border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent" />
                <input type="text" value={stop.color} onChange={e => { const v = e.target.value; if (isValidHex(v)) updateStop(stop.id, { color: v }) }} className="w-24 px-2 py-1 text-xs font-mono rounded border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200" />
                <input type="range" min={0} max={100} value={stop.position} onChange={e => updateStop(stop.id, { position: Number(e.target.value) })} className="flex-1 h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer accent-rose-500" />
                <span className="text-xs text-slate-400 w-8">{stop.position}%</span>
                <button onClick={() => removeStop(stop.id)} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
            {stops.length < 4 && (
              <button onClick={addStop} className="text-xs text-slate-500 hover:text-rose-500 transition-colors">+ Add stop</button>
            )}
          </CardSection>
          <CardSection title="Noise Parameters">
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Scale: {scale}</span>
                <input type="range" min={5} max={200} value={scale} onChange={e => setScale(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer accent-rose-500" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Octaves: {octaves}</span>
                <input type="range" min={1} max={8} step={1} value={octaves} onChange={e => setOctaves(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer accent-rose-500" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Blend Mode</span>
                <select value={blendMode} onChange={e => setBlendMode(e.target.value)} className="w-full px-2 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200">
                  {blendModes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
          </CardSection>
          <CardSection title="Actions">
            <Button onClick={handleCopy} size="sm" className="w-full justify-start" icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            }>Copy SVG</Button>
          </CardSection>
        </div>
      </div>
    </div>
  )
}

function SvgMeshGradient() {
  const { addToast } = useToast()
  const defaultColors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#9b59b6', '#e67e22', '#1abc9c', '#e74c3c', '#3498db']
  const [points, setPoints] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      color: defaultColors[i],
      row: Math.floor(i / 3),
      col: i % 3,
    }))
  )

  const updateColor = (id: number, color: string) => setPoints(prev => prev.map(p => p.id === id ? { ...p, color } : p))

  const svgMeshCode = useMemo(() => {
    const cx = (col: number) => (col / 2) * 400
    const cy = (row: number) => (row / 2) * 400

    const circles = points.map(p =>
      `    <circle cx="${cx(p.col)}" cy="${cy(p.row)}" r="200" fill="${p.color}" opacity="0.6" />`
    ).join('\n')

    const gridLines: string[] = []
    for (let r = 0; r < 3; r++) {
      gridLines.push(`    <line x1="${cx(0)}" y1="${cy(r)}" x2="${cx(2)}" y2="${cy(r)}" stroke="rgba(255,255,255,0.3)" stroke-width="2" />`)
    }
    for (let c = 0; c < 3; c++) {
      gridLines.push(`    <line x1="${cx(c)}" y1="${cy(0)}" x2="${cx(c)}" y2="${cy(2)}" stroke="rgba(255,255,255,0.3)" stroke-width="2" />`)
    }

    const dots = points.map(p =>
      `  <circle cx="${cx(p.col)}" cy="${cy(p.row)}" r="8" fill="${p.color}" stroke="white" stroke-width="2" />`
    ).join('\n')

    const beziers: string[] = []
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 2; c++) {
        const x1 = cx(c), y1 = cy(r)
        const x2 = cx(c + 1), y2 = cy(r)
        const midX = (x1 + x2) / 2
        const controlY = y1 + 40
        beziers.push(`    <path d="M ${x1} ${y1} Q ${midX} ${controlY}, ${x2} ${y2}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />`)
      }
    }
    for (let c = 0; c < 3; c++) {
      for (let r = 0; r < 2; r++) {
        const x1 = cx(c), y1 = cy(r)
        const x2 = cx(c), y2 = cy(r + 1)
        const midY = (y1 + y2) / 2
        const controlX = x1 + 40
        beziers.push(`    <path d="M ${x1} ${y1} Q ${controlX} ${midY}, ${x2} ${y2}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />`)
      }
    }

    return `<svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="mesh-blur">
      <feGaussianBlur stdDeviation="80" />
    </filter>
  </defs>
  <rect width="400" height="400" fill="#f8fafc" />
  <g filter="url(#mesh-blur)">
${circles}
  </g>
${beziers.join('\n')}
${gridLines.join('\n')}
${dots}
</svg>`
  }, [points])

  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(svgMeshCode); addToast('SVG copied', 'success') }
    catch { addToast('Failed to copy', 'error') }
  }, [svgMeshCode, addToast])

  const handleRandomize = useCallback(() => {
    setPoints(prev => prev.map(p => ({ ...p, color: `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}` })))
    addToast('Randomized', 'info')
  }, [addToast])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CardSection title="SVG Mesh Preview">
            <div className="w-full h-80 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden bg-white dark:bg-slate-800">
              <svg width="100%" height="100%" viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <filter id="svg-mesh-blur">
                    <feGaussianBlur stdDeviation="80" />
                  </filter>
                </defs>
                <rect width="400" height="400" fill="#f8fafc" className="dark:fill-slate-900" />
                <g filter="url(#svg-mesh-blur)">
                  {points.map(p => (
                    <circle key={p.id} cx={(p.col / 2) * 400} cy={(p.row / 2) * 400} r="200" fill={p.color} opacity="0.6" />
                  ))}
                </g>
                {[0, 1, 2].map(r => [0, 1].map(c => {
                  const x1 = (c / 2) * 400, y1 = (r / 2) * 400
                  const x2 = ((c + 1) / 2) * 400, y2 = (r / 2) * 400
                  const midX = (x1 + x2) / 2
                  return (
                    <path key={`bh-${r}-${c}`} d={`M ${x1} ${y1} Q ${midX} ${y1 + 40}, ${x2} ${y2}`} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  )
                }))}
                {[0, 1, 2].map(c => [0, 1].map(r => {
                  const x1 = (c / 2) * 400, y1 = (r / 2) * 400
                  const x2 = (c / 2) * 400, y2 = ((r + 1) / 2) * 400
                  const midY = (y1 + y2) / 2
                  return (
                    <path key={`bv-${c}-${r}`} d={`M ${x1} ${y1} Q ${x1 + 40} ${midY}, ${x2} ${y2}`} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  )
                }))}
                {[0, 1, 2].map(r => (
                  <line key={`hl-${r}`} x1="0" y1={(r / 2) * 400} x2="400" y2={(r / 2) * 400} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                ))}
                {[0, 1, 2].map(c => (
                  <line key={`vl-${c}`} x1={(c / 2) * 400} y1="0" x2={(c / 2) * 400} y2="400" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                ))}
                {points.map(p => (
                  <circle key={`dot-${p.id}`} cx={(p.col / 2) * 400} cy={(p.row / 2) * 400} r="8" fill={p.color} stroke="white" strokeWidth="2" />
                ))}
              </svg>
            </div>
          </CardSection>
          <CardSection title="SVG Code" actions={<Button variant="ghost" size="sm" onClick={handleCopy}>Copy SVG</Button>}>
            <pre className="p-4 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre">{svgMeshCode}</pre>
          </CardSection>
        </div>
        <div className="space-y-6">
          <CardSection title="Control Points (3×3)">
            <div className="grid grid-cols-3 gap-3">
              {points.map(p => (
                <div key={p.id} className="flex flex-col items-center gap-1">
                  <input type="color" value={p.color} onChange={e => updateColor(p.id, e.target.value)} className="w-12 h-12 rounded border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent" />
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{p.color}</span>
                </div>
              ))}
            </div>
          </CardSection>
          <CardSection title="Actions">
            <div className="space-y-2">
              <Button onClick={handleCopy} size="sm" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              }>Copy SVG</Button>
              <Button onClick={handleRandomize} variant="secondary" size="sm" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              }>Randomize</Button>
            </div>
          </CardSection>
        </div>
      </div>
    </div>
  )
}

export default function GradientGeneratorTool({ title, description, gradientType }: GradientGeneratorToolProps) {
  const { addToast } = useToast()

  const defaultStopsCount = gradientType === 'three-color' ? 3 : gradientType === 'four-color' ? 4 : gradientType === 'multi-stop' ? 5 : 2

  const [stops, setStops] = useState<ColorStop[]>(() =>
    Array.from({ length: defaultStopsCount }, (_, i) => ({
      id: generateId(),
      color: presetGradients.pastel.colors[i] || `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`,
      position: Math.round((i / (defaultStopsCount - 1 || 1)) * 100),
    }))
  )
  const [gradientStyle, setGradientStyle] = useState<'linear' | 'radial' | 'conic'>('linear')
  const [angle, setAngle] = useState(135)
  const [animationDuration, setAnimationDuration] = useState(5)
  const [animate, setAnimate] = useState(false)
  const [showCss, setShowCss] = useState(false)
  const [showSvg, setShowSvg] = useState(false)

  const showTypeSelector = gradientType === 'linear' || gradientType === 'radial' || gradientType === 'conic' || gradientType === 'angle'

  const pathname = usePathname()
  const toolId = pathname?.replace(/^\//, '')?.replace(/\/$/, '') || ''
  const content = useMemo(() => getToolContent(toolId), [toolId])

  const updateStop = useCallback((id: string, updates: Partial<ColorStop>) => {
    setStops(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }, [])

  const addStop = useCallback(() => {
    if (stops.length >= 8) { addToast('Maximum 8 color stops', 'error'); return }
    const last = stops[stops.length - 1]
    const pos = last ? Math.min(100, last.position + 10) : 50
    setStops(prev => [...prev, { id: generateId(), color: '#888888', position: pos }])
  }, [stops, addToast])

  const removeStop = useCallback((id: string) => {
    if (stops.length <= 2) { addToast('Need at least 2 stops', 'error'); return }
    setStops(prev => prev.filter(s => s.id !== id))
  }, [stops.length, addToast])

  const sortedStops = useMemo(() => [...stops].sort((a, b) => a.position - b.position), [stops])

  const gradientStopsStr = useMemo(() =>
    sortedStops.map(s => `${s.color} ${s.position}%`).join(', ')
  , [sortedStops])

  const gradientBackground = useMemo(() => {
    if (gradientStyle === 'radial') return `radial-gradient(circle at center, ${gradientStopsStr})`
    if (gradientStyle === 'conic') return `conic-gradient(from ${angle}deg, ${gradientStopsStr})`
    return `linear-gradient(${angle}deg, ${gradientStopsStr})`
  }, [gradientStyle, gradientStopsStr, angle])

  const cssCode = useMemo(() => {
    const stopsCss = sortedStops.map(s => `  ${s.color} ${s.position}%`).join(',\n')
    const bg = gradientStyle === 'radial'
      ? `radial-gradient(circle at center,\n${stopsCss}\n)`
      : gradientStyle === 'conic'
        ? `conic-gradient(from ${angle}deg,\n${stopsCss}\n)`
        : `linear-gradient(${angle}deg,\n${stopsCss}\n)`

    const lines: string[] = ['.gradient {', `  background: ${bg.replace(/\n/g, '\n  ')};`]
    if (gradientType === 'glass') {
      lines.push('  backdrop-filter: blur(16px);')
      lines.push('  -webkit-backdrop-filter: blur(16px);')
      lines.push('  border: 1px solid rgba(255, 255, 255, 0.2);')
    }
    if (gradientType === 'text') {
      lines.push('  -webkit-background-clip: text;')
      lines.push('  -webkit-text-fill-color: transparent;')
      lines.push('  background-clip: text;')
    }
    if (gradientType === 'animated' || animate) {
      lines.push('  animation: gradient-anim ' + animationDuration + 's ease infinite;')
      lines.push('  background-size: 400% 400%;')
    }
    lines.push('}')
    if (gradientType === 'animated' || animate) {
      lines.push('')
      lines.push('@keyframes gradient-anim {')
      lines.push('  0% { background-position: 0% 50%; }')
      lines.push('  50% { background-position: 100% 50%; }')
      lines.push('  100% { background-position: 0% 50%; }')
      lines.push('}')
    }
    return lines.join('\n')
  }, [sortedStops, gradientStyle, angle, gradientType, animate, animationDuration])

  const svgCode = useMemo(() => {
    const rects = sortedStops.map((s, i) => {
      const next = sortedStops[i + 1]
      if (!next) return ''
      const mid = (s.position + next.position) / 2
      return `<rect x="${s.position}%" width="${next.position - s.position}%" height="100%" fill="url(#g)" />`
    }).filter(Boolean).join('\n  ')

    return `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
${sortedStops.map(s => `      <stop offset="${s.position}%" stop-color="${s.color}" />`).join('\n')}
    </linearGradient>
  </defs>
  ${rects}
</svg>`
  }, [sortedStops])

  const loadPreset = useCallback((name: string) => {
    const preset = presetGradients[name]
    if (!preset) return
    setStops(preset.colors.map((c, i) => ({
      id: generateId(),
      color: c,
      position: Math.round((i / (preset.colors.length - 1 || 1)) * 100),
    })))
    setAngle(preset.angle || 135)
    setGradientStyle(preset.type)
    addToast(`Loaded ${name} preset`, 'info')
  }, [addToast])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cssCode)
      addToast('CSS copied to clipboard', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [cssCode, addToast])

  const handleCopySvg = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(svgCode)
      addToast('SVG copied to clipboard', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [svgCode, addToast])

  const handleReverse = useCallback(() => {
    setStops(prev => [...prev].reverse().map((s, i, arr) => ({
      ...s,
      position: Math.round((i / (arr.length - 1 || 1)) * 100),
    })))
    addToast('Stops reversed', 'info')
  }, [addToast])

  const handleRandomize = useCallback(() => {
    setStops(prev => prev.map(s => ({
      ...s,
      color: `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`,
    })))
    addToast('Randomized colors', 'info')
  }, [addToast])

  const handleLoadExample = useCallback(() => {
    const example = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff']
    setStops(example.map((c, i) => ({
      id: generateId(),
      color: c,
      position: Math.round((i / (example.length - 1)) * 100),
    })))
    setAngle(135)
    setGradientStyle('linear')
    addToast('Example loaded', 'info')
  }, [addToast])

  if (gradientType === 'mesh') {
    return (
      <ToolContent title={title} description={description} howToUse={content.howToUse} faq={content.faq} relatedTools={content.relatedTools}>
        <MeshGradient />
      </ToolContent>
    )
  }
  if (gradientType === 'grain') {
    return (
      <ToolContent title={title} description={description} howToUse={content.howToUse} faq={content.faq} relatedTools={content.relatedTools}>
        <GrainGradient />
      </ToolContent>
    )
  }
  if (gradientType === 'noise') {
    return (
      <ToolContent title={title} description={description} howToUse={content.howToUse} faq={content.faq} relatedTools={content.relatedTools}>
        <NoiseGradient />
      </ToolContent>
    )
  }
  if (gradientType === 'svg-mesh') {
    return (
      <ToolContent title={title} description={description} howToUse={content.howToUse} faq={content.faq} relatedTools={content.relatedTools}>
        <SvgMeshGradient />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Preview</span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 cursor-pointer">
                  <input type="checkbox" checked={animate} onChange={e => setAnimate(e.target.checked)} className="rounded border-slate-300 dark:border-slate-600" />
                  Animate
                </label>
                {(gradientType === 'css' || gradientType === 'code-generator' || gradientType === 'linear') && (
                  <button onClick={() => setShowCss(!showCss)} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline">CSS</button>
                )}
                {(gradientType === 'svg') && (
                  <button onClick={() => setShowSvg(!showSvg)} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline">SVG</button>
                )}
              </div>
            </div>
            <div className="p-4">
              <div
                className={`w-full rounded-lg border border-slate-200 dark:border-slate-600 ${gradientType === 'text' ? '' : 'h-64'}`}
                style={{
                  background: gradientBackground,
                  backgroundSize: animate ? '400% 400%' : undefined,
                  animation: animate ? `gradient-anim ${animationDuration}s ease infinite` : undefined,
                  ...(gradientType === 'glass' ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } : {}),
                  ...(gradientType === 'text' ? {
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '3rem',
                    fontWeight: 800,
                    lineHeight: 1.2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '12rem',
                  } : {}),
                }}
              >
                {gradientType === 'text' && 'Gradient Text'}
                {gradientType === 'glass' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-slate-700 dark:text-slate-300 text-lg font-medium">Glass Effect</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showCss && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">CSS Code</span>
                <Button variant="ghost" size="sm" onClick={handleCopy}>Copy CSS</Button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre">{cssCode}</pre>
            </div>
          )}

          {showSvg && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">SVG Code</span>
                <Button variant="ghost" size="sm" onClick={handleCopySvg}>Copy SVG</Button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre">{svgCode}</pre>
            </div>
          )}

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Color Stops</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="relative h-8 rounded-lg overflow-hidden" style={{ background: gradientBackground }} />
                {stops.map(stop => (
                  <div key={stop.id} className="flex items-center gap-3">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={e => updateStop(stop.id, { color: e.target.value })}
                      className="w-10 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={stop.color}
                      onChange={e => {
                        const val = e.target.value
                        if (isValidHex(val) || val.startsWith('#')) updateStop(stop.id, { color: val })
                      }}
                      className="w-28 px-2 py-1.5 text-xs font-mono rounded border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xs text-slate-400 w-8">{stop.position}%</span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={stop.position}
                        onChange={e => updateStop(stop.id, { position: Number(e.target.value) })}
                        className="flex-1 h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer accent-rose-500"
                      />
                    </div>
                    <button
                      onClick={() => removeStop(stop.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove stop"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {stops.length < 8 && (
                  <button onClick={addStop} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 hover:text-rose-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add stop
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Options</span>
              </div>
              <div className="p-4 space-y-4">
                {showTypeSelector && (
                  <div className="flex gap-2">
                    {(['linear', 'radial', 'conic'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setGradientStyle(type)}
                        className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize transition-colors ${
                          gradientStyle === type
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
                {gradientStyle !== 'radial' && (
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400 w-12">Angle</span>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={angle}
                      onChange={e => setAngle(Number(e.target.value))}
                      className="flex-1 h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer accent-rose-500"
                    />
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 w-10 text-right">{angle}°</span>
                  </div>
                )}
                {gradientStyle === 'radial' && (
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Shape</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Circle at center</span>
                  </div>
                )}
                {(gradientType === 'animated' || gradientType === 'animation') && (
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400 w-12">Duration</span>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      step={0.5}
                      value={animationDuration}
                      onChange={e => setAnimationDuration(Number(e.target.value))}
                      className="flex-1 h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer accent-rose-500"
                    />
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 w-14 text-right">{animationDuration}s</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</span>
            </div>
            <div className="p-4 space-y-2">
              <Button onClick={handleCopy} size="sm" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              }>Copy CSS</Button>
              {gradientType === 'svg' && (
                <Button onClick={handleCopySvg} variant="secondary" size="sm" className="w-full justify-start" icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                }>Copy SVG</Button>
              )}
              <Button onClick={handleReverse} variant="secondary" size="sm" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
              }>Reverse Stops</Button>
              <Button onClick={handleRandomize} variant="secondary" size="sm" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              }>Randomize</Button>
              <Button onClick={handleLoadExample} variant="secondary" size="sm" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              }>Load Example</Button>
            </div>
          </div>

          {(gradientType === 'aurora' || gradientType === 'neon' || gradientType === 'metallic' || gradientType === 'pastel' || gradientType === 'instagram' || gradientType === 'glass' || gradientType === 'code-generator' || gradientType === 'library') && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Presets</span>
              </div>
              <div className="p-4 space-y-2">
                {Object.keys(presetGradients).map(name => (
                  <button
                    key={name}
                    onClick={() => loadPreset(name)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium capitalize text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Output Values</span>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="text-xs text-slate-400">Stops</span>
                <div className="flex gap-1 mt-1">
                  {sortedStops.map((s, i) => (
                    <div key={s.id} className="flex-1 h-8 rounded" style={{ background: s.color }} title={`${s.color} ${s.position}%`} />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Type</span>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200 mt-0.5">{gradientStyle}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Angle</span>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200 mt-0.5">{angle}°</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">CSS</span>
                <pre className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5 truncate">{cssCode.split('\n')[1]?.trim() || ''}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ToolContent>
  )
}
