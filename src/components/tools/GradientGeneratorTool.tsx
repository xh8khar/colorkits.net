'use client'

import { useState, useMemo, useCallback } from 'react'
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

  return (
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
                {(gradientType === 'svg' || gradientType === 'svg-mesh') && (
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
  )
}
