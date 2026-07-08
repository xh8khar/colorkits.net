'use client'

import { useState, useCallback, useMemo } from 'react'
import ToolContent from './ToolContent'
import { getToolContent } from '@/lib/toolContent'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { contrastRatio, wcagLevel, luminance, isValidHex, colorBlindSimulate, hexToRgbValues, rgbToHexValues, parseColor } from '@/lib/converters'

interface ContrastCheckerToolProps {
  title: string
  description: string
  checkerType: 'wcag' | 'apca' | 'aaa' | 'aa'
}

function hexToRgbStr(hex: string): string {
  const [r, g, b] = hexToRgbValues(hex.replace(/^#/, '').length === 3
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex)
  return `rgb(${r}, ${g}, ${b})`
}

function apcaScore(hexFg: string, hexBg: string): number {
  const [fr, fg, fb] = hexToRgbValues(hexFg.replace(/^#/, ''))
  const [br, bg, bb] = hexToRgbValues(hexBg.replace(/^#/, ''))
  const fl = 0.2126 * ((fr / 255) ** 2.4) + 0.7152 * ((fg / 255) ** 2.4) + 0.0722 * ((fb / 255) ** 2.4)
  const bl = 0.2126 * ((br / 255) ** 2.4) + 0.7152 * ((bg / 255) ** 2.4) + 0.0722 * ((bb / 255) ** 2.4)
  const contrast = (Math.max(fl, bl) + 0.05) / (Math.min(fl, bl) + 0.05)
  let score = (Math.pow(contrast, 0.6) * 100 - 22) * (fl > bl ? 1 : -1)
  return Math.round(score * 100) / 100
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export default function ContrastCheckerTool({ title, description, checkerType }: ContrastCheckerToolProps) {
  const [fgColor, setFgColor] = useState('#1e293b')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [fgInput, setFgInput] = useState('#1e293b')
  const [bgInput, setBgInput] = useState('#ffffff')
  const [error, setError] = useState('')
  const [activeBlindness, setActiveBlindness] = useState<string | null>(null)

  const snapshot = useMemo(() => {
    const fg = fgColor.startsWith('#') ? fgColor : `#${fgColor}`
    const bg = bgColor.startsWith('#') ? bgColor : `#${bgColor}`
    const ratio = contrastRatio(fg, bg)
    const level = wcagLevel(ratio)
    const lFg = luminance(fg)
    const lBg = luminance(bg)
    const apca = apcaScore(fg, bg)
    const fgRgb = hexToRgbStr(fg)
    const bgRgb = hexToRgbStr(bg)
    const largePass = ratio >= 3
    const aaPass = ratio >= 4.5
    const aaaPass = ratio >= 7
    return { fg, bg, ratio, level, lFg, lBg, apca, fgRgb, bgRgb, largePass, aaPass, aaaPass }
  }, [fgColor, bgColor])

  const simulatedColors = useMemo(() => {
    if (!activeBlindness) return null
    const types = ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia']
    return types.map(type => ({
      type,
      fg: colorBlindSimulate(fgColor, type),
      bg: colorBlindSimulate(bgColor, type),
    }))
  }, [fgColor, bgColor, activeBlindness])

  const handleFgChange = useCallback((value: string) => {
    setFgInput(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if (isValidHex(value) || (value.startsWith('#') ? isValidHex(value) : false)) {
      try { parseColor(hex); setFgColor(hex); setError('') } catch {}
    }
  }, [])

  const handleBgChange = useCallback((value: string) => {
    setBgInput(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if (isValidHex(value) || (value.startsWith('#') ? isValidHex(value) : false)) {
      try { parseColor(hex); setBgColor(hex); setError('') } catch {}
    }
  }, [])

  const handleSwap = useCallback(() => {
    setFgColor(bgColor)
    setBgColor(fgColor)
    setFgInput(bgColor)
    setBgInput(fgColor)
  }, [fgColor, bgColor])

  const renderBadge = (label: string, pass: boolean) => (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
      pass
        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
        : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${pass ? 'bg-emerald-500' : 'bg-red-500'}`} />
      {label}: {pass ? 'PASS' : 'FAIL'}
    </span>
  )

  const showAA = checkerType === 'wcag' || checkerType === 'aa'
  const showAAA = checkerType === 'wcag' || checkerType === 'aaa'
  const showAPCA = checkerType === 'apca'
  const showWCAG = checkerType === 'wcag'

  const pathname = usePathname()
  const toolId = pathname?.replace(/^\//, '')?.replace(/\/$/, '') || ''
  const content = useMemo(() => getToolContent(toolId), [toolId])

  return (
    <ToolContent title={title} description={description} howToUse={content.howToUse} faq={content.faq} relatedTools={content.relatedTools}>
      <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-7xl">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Foreground Color</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="color"
                value={fgColor}
                onChange={e => { setFgColor(e.target.value); setFgInput(e.target.value) }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: fgColor }} />
            </div>
            <input
              type="text"
              value={fgInput}
              onChange={e => handleFgChange(e.target.value)}
              placeholder="#1e293b"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-mono">{snapshot.fgRgb}</div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Background Color</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="color"
                value={bgColor}
                onChange={e => { setBgColor(e.target.value); setBgInput(e.target.value) }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: bgColor }} />
            </div>
            <input
              type="text"
              value={bgInput}
              onChange={e => handleBgChange(e.target.value)}
              placeholder="#ffffff"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-mono">{snapshot.bgRgb}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button onClick={handleSwap} variant="secondary" icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
        }>Swap Colors</Button>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Luminance: FG {snapshot.lFg.toFixed(4)} / BG {snapshot.lBg.toFixed(4)}
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Contrast Ratio</h3>
          <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">{snapshot.ratio.toFixed(2)}<span className="text-2xl text-slate-400 dark:text-slate-500 font-normal">:1</span></div>
          <div className="flex flex-wrap gap-2 mb-4">
            {showWCAG && (
              <>
                {renderBadge('AA Large', snapshot.largePass)}
                {renderBadge('AA Normal', snapshot.aaPass)}
                {renderBadge('AAA Normal', snapshot.aaaPass)}
              </>
            )}
            {showAA && (
              <>
                {renderBadge('AA Large', snapshot.largePass)}
                {renderBadge('AA Normal', snapshot.aaPass)}
              </>
            )}
            {showAAA && (
              <>{renderBadge('AAA Normal', snapshot.aaaPass)}</>
            )}
          </div>
          {showAPCA && (
            <div className="mt-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">APCA Contrast: </span>
              <span className={`text-lg font-bold ${Math.abs(snapshot.apca) >= 60 ? 'text-emerald-600 dark:text-emerald-400' : Math.abs(snapshot.apca) >= 45 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                {snapshot.apca.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Visual Preview</h3>
          <div className="rounded-lg p-6 space-y-4" style={{ backgroundColor: bgColor }}>
            <p className="text-2xl font-bold" style={{ color: fgColor }}>Sample Text</p>
            <p className="text-base" style={{ color: fgColor }}>The quick brown fox jumps over the lazy dog.</p>
            <p className="text-sm opacity-80" style={{ color: fgColor }}>Small text example for readability testing.</p>
            <a href="#" className="text-sm underline" style={{ color: fgColor }}>Link example</a>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-6">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Color Blindness Simulation</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Normal', 'Protanopia', 'Deuteranopia', 'Tritanopia', 'Monochrome'].map(type => (
            <button
              key={type}
              onClick={() => setActiveBlindness(activeBlindness === type ? null : type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                activeBlindness === type
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {activeBlindness && simulatedColors && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {simulatedColors.map(sim => (
              <div key={sim.type} className="text-center">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 capitalize">{sim.type}</div>
                <div className="h-12 rounded-lg border border-slate-200 dark:border-slate-700" style={{ backgroundColor: sim.bg }}>
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xs font-bold px-2" style={{ color: sim.fg }}>Aa</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!activeBlindness && (
          <p className="text-sm text-slate-400 dark:text-slate-500">Click a vision type above to preview color blindness simulation.</p>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Luminance Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Foreground</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700" style={{ backgroundColor: fgColor }} />
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300">{fgColor}</span>
              <span className="text-sm text-slate-400">L={snapshot.lFg.toFixed(4)}</span>
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Background</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700" style={{ backgroundColor: bgColor }} />
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300">{bgColor}</span>
              <span className="text-sm text-slate-400">L={snapshot.lBg.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ToolContent>
  )
}
