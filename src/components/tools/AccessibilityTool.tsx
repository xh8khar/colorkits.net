'use client'

import { useState, useMemo, useCallback } from 'react'
import ToolContent from './ToolContent'
import { getToolContent } from '@/lib/toolContent'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import {
  contrastRatio, wcagLevel, isValidHex, colorBlindSimulate,
  hexToRgbValues, rgbToHexValues, parseColor, luminance,
} from '@/lib/converters'

interface AccessibilityToolProps {
  title: string
  description: string
  toolType:
    | 'color-blindness-simulator' | 'protanopia' | 'deuteranopia'
    | 'tritanopia' | 'monochrome' | 'readability'
    | 'accessible-palette' | 'accessible-gradient'
    | 'text-contrast' | 'background-contrast'
    | 'button-accessibility' | 'link-accessibility'
    | 'ui-tester' | 'dashboard-checker'
    | 'report-generator' | 'contrast-matrix'
    | 'color-vision' | 'heatmap' | 'contrast-fix'
    | 'dark-mode' | 'light-mode' | 'font-recommender'
    | 'bg-recommender' | 'compliance' | 'wcag-export'
    | 'palette-optimizer'
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

type VisionType = 'Normal' | 'Protanopia' | 'Deuteranopia' | 'Tritanopia' | 'Monochrome'

const visionTypes: { label: VisionType; key: string }[] = [
  { label: 'Normal', key: 'normal' },
  { label: 'Protanopia', key: 'protanopia' },
  { label: 'Deuteranopia', key: 'deuteranopia' },
  { label: 'Tritanopia', key: 'tritanopia' },
  { label: 'Monochrome', key: 'achromatopsia' },
]

const fontSizes = [
  { label: '10px', value: 10 },
  { label: '12px', value: 12 },
  { label: '14px', value: 14 },
  { label: '16px', value: 16 },
  { label: '18px', value: 18 },
  { label: '24px', value: 24 },
  { label: '36px', value: 36 },
]

function generateAccessiblePalette(baseHex: string): { hex: string; ratio: number; level: string }[] {
  const [r, g, b] = hexToRgbValues(baseHex)
  const hslR = r / 255, hslG = g / 255, hslB = b / 255
  const max = Math.max(hslR, hslG, hslB), min = Math.min(hslR, hslG, hslB)
  const l = (max + min) / 2
  const results: { hex: string; ratio: number; level: string }[] = []
  const candidates = ['#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#000000']
  for (const c of candidates) {
    const ratio = contrastRatio(baseHex, c)
    results.push({ hex: c, ratio, level: wcagLevel(ratio) })
  }
  return results.sort((a, b) => b.ratio - a.ratio)
}

function ColorBlindnessSimulator() {
  const [color, setColor] = useState('#f43f5e')
  const [input, setInput] = useState('#f43f5e')
  const [activeVision, setActiveVision] = useState<string>('normal')

  const handleColorChange = useCallback((value: string) => {
    setInput(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if (isValidHex(value) || (value.startsWith('#') && isValidHex(value))) {
      try { parseColor(hex); setColor(hex) } catch {}
    }
  }, [])

  const simulations = useMemo(() => {
    if (activeVision === 'normal') {
      return [{ type: 'Normal', hex: color }]
    }
    const types = activeVision === 'protanopia' ? ['protanopia'] :
      activeVision === 'deuteranopia' ? ['deuteranopia'] :
      activeVision === 'tritanopia' ? ['tritanopia'] :
      activeVision === 'achromatopsia' ? ['achromatopsia'] :
      ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia']
    return types.map(t => ({
      type: t.charAt(0).toUpperCase() + t.slice(1),
      hex: colorBlindSimulate(color, t),
    }))
  }, [color, activeVision])

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Color</label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="color" value={color} onChange={e => { setColor(e.target.value); setInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: color }} />
          </div>
          <input type="text" value={input} onChange={e => handleColorChange(e.target.value)} placeholder="#f43f5e" className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {visionTypes.map(vt => (
          <button
            key={vt.key}
            onClick={() => setActiveVision(vt.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              activeVision === vt.key
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-700'
            }`}
          >
            {vt.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {simulations.map(sim => (
          <div key={sim.type} className="text-center">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{sim.type}</div>
            <div className="h-16 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center" style={{ backgroundColor: sim.hex }}>
              <span className="text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Aa</span>
            </div>
            <div className="mt-1 text-xs font-mono text-slate-400 dark:text-slate-500">{sim.hex}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReadabilityChecker() {
  const [bgColor, setBgColor] = useState('#ffffff')
  const [textColor, setTextColor] = useState('#1e293b')
  const [bgInput, setBgInput] = useState('#ffffff')
  const [textInput, setTextInput] = useState('#1e293b')
  const [fontSize, setFontSize] = useState(16)
  const [sampleText, setSampleText] = useState('The quick brown fox jumps over the lazy dog.')

  const handleColor = useCallback((value: string, setter: React.Dispatch<React.SetStateAction<string>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    inputSetter(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
      try { parseColor(hex); setter(hex) } catch {}
    }
  }, [])

  const ratio = useMemo(() => {
    try { return contrastRatio(textColor, bgColor) } catch { return 0 }
  }, [textColor, bgColor])

  const level = useMemo(() => wcagLevel(ratio), [ratio])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Background</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="color" value={bgColor} onChange={e => { setBgColor(e.target.value); setBgInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: bgColor }} />
            </div>
            <input type="text" value={bgInput} onChange={e => handleColor(e.target.value, setBgColor, setBgInput)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Text Color</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="color" value={textColor} onChange={e => { setTextColor(e.target.value); setTextInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: textColor }} />
            </div>
            <input type="text" value={textInput} onChange={e => handleColor(e.target.value, setTextColor, setTextInput)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Font Size</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {fontSizes.map(fs => (
            <button
              key={fs.value}
              onClick={() => setFontSize(fs.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                fontSize === fs.value
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-rose-300'
              }`}
            >
              {fs.label}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold" style={{ color: textColor, fontSize: `${fontSize * 3}px` }}>Aa</span>
            <div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contrast Ratio: <span className="font-mono">{ratio.toFixed(2)}:1</span></div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${
                level === 'AAA' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
                level === 'AA' || level === 'AA Large' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
                'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
              }`}>
                {level}
              </span>
            </div>
          </div>
        </div>

        <textarea
          value={sampleText}
          onChange={e => setSampleText(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
          rows={2}
          placeholder="Enter sample text..."
        />
      </div>

      <div
        className="rounded-xl p-6 min-h-[120px] border border-slate-200 dark:border-slate-700 transition-all"
        style={{ backgroundColor: bgColor, color: textColor, fontSize: `${fontSize}px` }}
      >
        <p className="leading-relaxed">{sampleText || 'The quick brown fox jumps over the lazy dog.'}</p>
      </div>
    </div>
  )
}

function AccessiblePaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#3b82f6')
  const [input, setInput] = useState('#3b82f6')

  const handleChange = useCallback((value: string) => {
    setInput(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
      try { parseColor(hex); setBaseColor(hex) } catch {}
    }
  }, [])

  const palette = useMemo(() => generateAccessiblePalette(baseColor), [baseColor])

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Base Color</label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="color" value={baseColor} onChange={e => { setBaseColor(e.target.value); setInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: baseColor }} />
          </div>
          <input type="text" value={input} onChange={e => handleChange(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {palette.map(item => {
          const l = luminance(item.hex)
          const textColor = l > 0.5 ? '#000000' : '#ffffff'
          return (
            <div
              key={item.hex}
              className="flex items-center gap-3 rounded-lg p-3 border border-slate-200 dark:border-slate-700"
              style={{ backgroundColor: item.hex }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono font-bold truncate" style={{ color: textColor }}>{item.hex}</div>
                <div className="text-xs mt-0.5" style={{ color: textColor, opacity: 0.8 }}>Ratio: {item.ratio.toFixed(2)}:1</div>
              </div>
              <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-semibold ${
                item.level === 'AAA' ? 'bg-emerald-500 text-white' :
                item.level === 'AA' ? 'bg-amber-500 text-white' :
                item.level === 'AA Large' ? 'bg-blue-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {item.level}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TextContrastChecker() {
  const [fgColor, setFgColor] = useState('#1e293b')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [fgInput, setFgInput] = useState('#1e293b')
  const [bgInput, setBgInput] = useState('#ffffff')

  const handleColor = useCallback((value: string, setter: React.Dispatch<React.SetStateAction<string>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    inputSetter(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
      try { parseColor(hex); setter(hex) } catch {}
    }
  }, [])

  const data = useMemo(() => {
    const ratio = contrastRatio(fgColor, bgColor)
    return { ratio, level: wcagLevel(ratio) }
  }, [fgColor, bgColor])

  const textColor = useMemo(() => {
    return luminance(fgColor) > 0.5 ? '#000000' : '#ffffff'
  }, [fgColor])

  const textColor2 = useMemo(() => {
    return luminance(bgColor) > 0.5 ? '#000000' : '#ffffff'
  }, [bgColor])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Text Color</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="color" value={fgColor} onChange={e => { setFgColor(e.target.value); setFgInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: fgColor }} />
            </div>
            <input type="text" value={fgInput} onChange={e => handleColor(e.target.value, setFgColor, setFgInput)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Background</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="color" value={bgColor} onChange={e => { setBgColor(e.target.value); setBgInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: bgColor }} />
            </div>
            <input type="text" value={bgInput} onChange={e => handleColor(e.target.value, setBgColor, setBgInput)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <div className="text-center">
          <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">{data.ratio.toFixed(2)}<span className="text-2xl text-slate-400 font-normal">:1</span></div>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
            data.level === 'AAA' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
            data.level === 'AA' || data.level === 'AA Large' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
            'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
          }`}>
            {data.level}
          </span>
        </div>
      </div>

      <div
        className="rounded-xl p-8 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center min-h-[160px]"
        style={{ backgroundColor: bgColor }}
      >
        <p className="text-2xl font-bold" style={{ color: fgColor }}>Sample Heading</p>
        <p className="mt-2 text-base max-w-md text-center" style={{ color: fgColor }}>
          This text demonstrates the contrast ratio between foreground and background colors.
        </p>
        <p className="mt-1 text-sm" style={{ color: fgColor }}>Small text sample for WCAG compliance testing.</p>
      </div>
    </div>
  )
}

function UISamplePreview({ fg, bg }: { fg: string; bg: string }) {
  const l = luminance(bg)
  const fgL = luminance(fg)
  const textColor = l > 0.5 ? '#000000' : '#ffffff'
  const isDark = l < 0.5
  const cardBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
  const borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'

  return (
    <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: bg, borderColor }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: cardBg }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isDark ? '#ef4444' : '#ef4444' }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isDark ? '#f59e0b' : '#f59e0b' }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isDark ? '#10b981' : '#10b981' }} />
        </div>
        <span className="text-xs font-medium" style={{ color: textColor, opacity: 0.7 }}>UI Preview</span>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold" style={{ color: fg }}>Button</span>
          <div className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: fg, color: bg }}>Click Me</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm underline" style={{ color: fg }}>Link text</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: fg, color: bg }}>Badge</span>
        </div>
        <div className="pt-3 border-t" style={{ borderColor }}>
          <input
            type="text"
            readOnly
            value="Input field"
            className="w-full px-3 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: cardBg,
              color: textColor,
              border: `1px solid ${borderColor}`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

function ButtonAccessibilityChecker() {
  const [bgColor, setBgColor] = useState('#3b82f6')
  const [textColor, setTextColor] = useState('#ffffff')
  const [bgInput, setBgInput] = useState('#3b82f6')
  const [textInput, setTextInput] = useState('#ffffff')

  const handleColor = useCallback((value: string, setter: React.Dispatch<React.SetStateAction<string>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    inputSetter(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
      try { parseColor(hex); setter(hex) } catch {}
    }
  }, [])

  const data = useMemo(() => {
    const ratio = contrastRatio(textColor, bgColor)
    return { ratio, level: wcagLevel(ratio) }
  }, [textColor, bgColor])

  const hoverColor = useMemo(() => {
    const [r, g, b] = hexToRgbValues(bgColor)
    const [h, s, l] = rgbToHsl(r, g, b)
    const [nr, ng, nb] = hslToRgb(h, s, Math.max(l - 8, 0))
    return rgbToHexValues(nr, ng, nb)
  }, [bgColor])

  const focusColor = useMemo(() => {
    const [r, g, b] = hexToRgbValues(bgColor)
    const [h, s, l] = rgbToHsl(r, g, b)
    const [nr, ng, nb] = hslToRgb(h, Math.min(s + 15, 100), Math.min(l + 5, 100))
    return rgbToHexValues(nr, ng, nb)
  }, [bgColor])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Button Color</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="color" value={bgColor} onChange={e => { setBgColor(e.target.value); setBgInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: bgColor }} />
            </div>
            <input type="text" value={bgInput} onChange={e => handleColor(e.target.value, setBgColor, setBgInput)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Text Color</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="color" value={textColor} onChange={e => { setTextColor(e.target.value); setTextInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: textColor }} />
            </div>
            <input type="text" value={textInput} onChange={e => handleColor(e.target.value, setTextColor, setTextInput)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{data.ratio.toFixed(2)}<span className="text-xl text-slate-400 font-normal">:1</span></div>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
            data.level === 'AAA' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
            data.level === 'AA' || data.level === 'AA Large' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
            'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
          }`}>
            {data.level}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-sm" style={{ backgroundColor: bgColor, color: textColor }}>
            Normal
          </button>
          <button className="px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-sm" style={{ backgroundColor: hoverColor, color: textColor }}>
            Hover
          </button>
          <button className="px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-sm ring-2 ring-offset-2" style={{ backgroundColor: focusColor, color: textColor }}>
            Focus
          </button>
          <button className="px-6 py-3 rounded-lg text-sm font-medium shadow-sm opacity-50 cursor-not-allowed" style={{ backgroundColor: bgColor, color: textColor }}>
            Disabled
          </button>
        </div>
      </div>
    </div>
  )
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 1000) / 10]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0))
  else if (max === g1) h = ((b1 - r1) / d + 2)
  else h = ((r1 - g1) / d + 4)
  h *= 60
  return [Math.round(h * 10) / 10, Math.round(s * 1000) / 10, Math.round(l * 1000) / 10]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const s1 = s / 100, l1 = l / 100
  const c = (1 - Math.abs(2 * l1 - 1)) * s1
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l1 - c / 2
  let r1 = 0, g1 = 0, b1 = 0
  if (h < 60) { r1 = c; g1 = x }
  else if (h < 120) { r1 = x; g1 = c }
  else if (h < 180) { g1 = c; b1 = x }
  else if (h < 240) { g1 = x; b1 = c }
  else if (h < 300) { r1 = x; b1 = c }
  else { r1 = c; b1 = x }
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)]
}

function LinkAccessibilityChecker() {
  const [bgColor, setBgColor] = useState('#ffffff')
  const [linkColor, setLinkColor] = useState('#2563eb')
  const [hoverColor, setHoverColor] = useState('#1d4ed8')
  const [bgInput, setBgInput] = useState('#ffffff')
  const [linkInput, setLinkInput] = useState('#2563eb')
  const [hoverInput, setHoverInput] = useState('#1d4ed8')

  const handleColor = useCallback((value: string, setter: React.Dispatch<React.SetStateAction<string>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    inputSetter(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
      try { parseColor(hex); setter(hex) } catch {}
    }
  }, [])

  const linkRatio = useMemo(() => contrastRatio(linkColor, bgColor), [linkColor, bgColor])
  const hoverRatio = useMemo(() => contrastRatio(hoverColor, bgColor), [hoverColor, bgColor])
  const linkLevel = useMemo(() => wcagLevel(linkRatio), [linkRatio])
  const hoverLevel = useMemo(() => wcagLevel(hoverRatio), [hoverRatio])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { color: bgColor, input: bgInput, label: 'Background', setter: setBgColor, inputSetter: setBgInput },
          { color: linkColor, input: linkInput, label: 'Link Color', setter: setLinkColor, inputSetter: setLinkInput },
          { color: hoverColor, input: hoverInput, label: 'Hover Color', setter: setHoverColor, inputSetter: setHoverInput },
        ].map(item => (
          <div key={item.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">{item.label}</label>
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <input type="color" value={item.color} onChange={e => { item.setter(e.target.value); item.inputSetter(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: item.color }} />
              </div>
              <input type="text" value={item.input} onChange={e => handleColor(e.target.value, item.setter, item.inputSetter)} className="flex-1 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6" style={{ backgroundColor: bgColor }}>
        <p className="mb-4" style={{ color: `rgba(0,0,0,${luminance(bgColor) > 0.5 ? 0.8 : 0.8})` }}>
          This is a paragraph with a{' '}
          <a href="#" className="underline font-medium transition-colors" style={{ color: linkColor }}
            onMouseOver={e => (e.target as HTMLElement).style.color = hoverColor}
            onMouseOut={e => (e.target as HTMLElement).style.color = linkColor}
          >link example</a>{' '}
          that changes color on hover.
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <div>
            <span className="text-xs text-slate-500">Link: </span>
            <span className={`font-semibold ${linkLevel === 'AAA' ? 'text-emerald-600' : linkLevel === 'AA' || linkLevel === 'AA Large' ? 'text-amber-600' : 'text-red-600'}`}>
              {linkRatio.toFixed(2)}:1 ({linkLevel})
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500">Hover: </span>
            <span className={`font-semibold ${hoverLevel === 'AAA' ? 'text-emerald-600' : hoverLevel === 'AA' || hoverLevel === 'AA Large' ? 'text-amber-600' : 'text-red-600'}`}>
              {hoverRatio.toFixed(2)}:1 ({hoverLevel})
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function UITester() {
  const [bgColor, setBgColor] = useState('#ffffff')
  const [fgColor, setFgColor] = useState('#1e293b')
  const [bgInput, setBgInput] = useState('#ffffff')
  const [fgInput, setFgInput] = useState('#1e293b')

  const handleColor = useCallback((value: string, setter: React.Dispatch<React.SetStateAction<string>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    inputSetter(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
      try { parseColor(hex); setter(hex) } catch {}
    }
  }, [])

  const data = useMemo(() => {
    const ratio = contrastRatio(fgColor, bgColor)
    return { ratio, level: wcagLevel(ratio) }
  }, [fgColor, bgColor])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Background</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="color" value={bgColor} onChange={e => { setBgColor(e.target.value); setBgInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: bgColor }} />
            </div>
            <input type="text" value={bgInput} onChange={e => handleColor(e.target.value, setBgColor, setBgInput)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Text Color</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="color" value={fgColor} onChange={e => { setFgColor(e.target.value); setFgInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: fgColor }} />
            </div>
            <input type="text" value={fgInput} onChange={e => handleColor(e.target.value, setFgColor, setFgInput)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{data.ratio.toFixed(2)}<span className="text-xl text-slate-400 font-normal">:1</span></div>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
            data.level === 'AAA' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
            data.level === 'AA' || data.level === 'AA Large' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
            'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
          }`}>
            {data.level}
          </span>
        </div>
      </div>

      <UISamplePreview fg={fgColor} bg={bgColor} />
    </div>
  )
}

function ContrastMatrix() {
  const colors = ['#ffffff', '#f1f5f9', '#cbd5e1', '#94a3b8', '#64748b', '#334155', '#0f172a', '#000000']
  const [baseColor, setBaseColor] = useState('#3b82f6')
  const [input, setInput] = useState('#3b82f6')

  const handleChange = useCallback((value: string) => {
    setInput(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
      try { parseColor(hex); setBaseColor(hex) } catch {}
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Base Color</label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="color" value={baseColor} onChange={e => { setBaseColor(e.target.value); setInput(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: baseColor }} />
          </div>
          <input type="text" value={input} onChange={e => handleChange(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-grid gap-px" style={{ gridTemplateColumns: `100px repeat(${colors.length}, 80px)` }}>
          <div className="bg-slate-100 dark:bg-slate-700 p-2 text-xs font-medium text-slate-600 dark:text-slate-300" />
          {colors.map(c => (
            <div key={c} className="bg-slate-100 dark:bg-slate-700 p-2 text-xs font-mono text-slate-600 dark:text-slate-300 truncate text-center">{c}</div>
          ))}
          {colors.map((rowColor, ri) => (
            <>
              <div key={rowColor} className="bg-slate-100 dark:bg-slate-700 p-2 text-xs font-mono text-slate-600 dark:text-slate-300 truncate flex items-center gap-1">
                <span className="w-3 h-3 rounded shrink-0 inline-block border" style={{ backgroundColor: rowColor }} />
                <span className="truncate">{rowColor}</span>
              </div>
              {colors.map(colColor => {
                const ratio = contrastRatio(rowColor, colColor === rowColor ? baseColor : colColor === baseColor ? rowColor : colColor)
                const level = wcagLevel(ratio)
                const bg = level === 'AAA' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                  level === 'AA' || level === 'AA Large' ? 'bg-amber-100 dark:bg-amber-900/30' :
                  'bg-red-100 dark:bg-red-900/30'
                const text = level === 'AAA' ? 'text-emerald-700 dark:text-emerald-300' :
                  level === 'AA' || level === 'AA Large' ? 'text-amber-700 dark:text-amber-300' :
                  'text-red-700 dark:text-red-300'
                return (
                  <div key={colColor} className={`${bg} ${text} p-2 text-xs font-mono text-center`}>
                    {ratio.toFixed(1)}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

function DarkModePreview() {
  const [bgColor, setBgColor] = useState('#0f172a')
  const [textColor, setTextColor] = useState('#f1f5f9')
  const [accentColor, setAccentColor] = useState('#3b82f6')
  const [bgInput, setBgInput] = useState('#0f172a')
  const [textInput, setTextInput] = useState('#f1f5f9')
  const [accentInput, setAccentInput] = useState('#3b82f6')

  const handleChange = useCallback((value: string, setter: React.Dispatch<React.SetStateAction<string>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    inputSetter(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
      try { parseColor(hex); setter(hex) } catch {}
    }
  }, [])

  const textRatio = useMemo(() => contrastRatio(textColor, bgColor), [textColor, bgColor])
  const accentRatio = useMemo(() => contrastRatio(accentColor, bgColor), [accentColor, bgColor])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { color: bgColor, input: bgInput, label: 'Background', setter: setBgColor, inputSetter: setBgInput },
          { color: textColor, input: textInput, label: 'Text Color', setter: setTextColor, inputSetter: setTextInput },
          { color: accentColor, input: accentInput, label: 'Accent', setter: setAccentColor, inputSetter: setAccentInput },
        ].map(item => (
          <div key={item.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">{item.label}</label>
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <input type="color" value={item.color} onChange={e => { item.setter(e.target.value); item.inputSetter(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: item.color }} />
              </div>
              <input type="text" value={item.input} onChange={e => handleChange(e.target.value, item.setter, item.inputSetter)} className="flex-1 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: bgColor, borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold" style={{ color: textColor }}>Dark Mode Preview</h2>
          <p className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.85 }}>
            This is a dark mode interface preview. Test your color combinations for readability in dark themes.
          </p>
          <div className="flex gap-3">
            <span className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: accentColor, color: bgColor }}>
              Primary Button
            </span>
            <span className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ color: textColor, borderColor: 'rgba(255,255,255,0.2)' }}>
              Secondary
            </span>
          </div>
          <div className="pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex justify-between text-xs" style={{ color: textColor, opacity: 0.6 }}>
              <span>Text contrast: {textRatio.toFixed(2)}:1</span>
              <span>Accent contrast: {accentRatio.toFixed(2)}:1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LightModePreview() {
  const [bgColor, setBgColor] = useState('#ffffff')
  const [textColor, setTextColor] = useState('#0f172a')
  const [accentColor, setAccentColor] = useState('#3b82f6')
  const [bgInput, setBgInput] = useState('#ffffff')
  const [textInput, setTextInput] = useState('#0f172a')
  const [accentInput, setAccentInput] = useState('#3b82f6')

  const handleChange = useCallback((value: string, setter: React.Dispatch<React.SetStateAction<string>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    inputSetter(value)
    const hex = value.startsWith('#') ? value : `#${value}`
    if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
      try { parseColor(hex); setter(hex) } catch {}
    }
  }, [])

  const textRatio = useMemo(() => contrastRatio(textColor, bgColor), [textColor, bgColor])
  const accentRatio = useMemo(() => contrastRatio(accentColor, bgColor), [accentColor, bgColor])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { color: bgColor, input: bgInput, label: 'Background', setter: setBgColor, inputSetter: setBgInput },
          { color: textColor, input: textInput, label: 'Text Color', setter: setTextColor, inputSetter: setTextInput },
          { color: accentColor, input: accentInput, label: 'Accent', setter: setAccentColor, inputSetter: setAccentInput },
        ].map(item => (
          <div key={item.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">{item.label}</label>
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <input type="color" value={item.color} onChange={e => { item.setter(e.target.value); item.inputSetter(e.target.value) }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: item.color }} />
              </div>
              <input type="text" value={item.input} onChange={e => handleChange(e.target.value, item.setter, item.inputSetter)} className="flex-1 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: bgColor, borderColor: '#e2e8f0' }}>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold" style={{ color: textColor }}>Light Mode Preview</h2>
          <p className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.85 }}>
            This is a light mode interface preview. Test your color combinations for readability in light themes.
          </p>
          <div className="flex gap-3">
            <span className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: accentColor, color: bgColor }}>
              Primary Button
            </span>
            <span className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ color: textColor, borderColor: '#e2e8f0' }}>
              Secondary
            </span>
          </div>
          <div className="pt-3 border-t" style={{ borderColor: '#e2e8f0' }}>
            <div className="flex justify-between text-xs" style={{ color: textColor, opacity: 0.6 }}>
              <span>Text contrast: {textRatio.toFixed(2)}:1</span>
              <span>Accent contrast: {accentRatio.toFixed(2)}:1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReportGenerator() {
  type ColorPair = { id: number; fg: string; bg: string; fgInput: string; bgInput: string }
  const [pairs, setPairs] = useState<ColorPair[]>([
    { id: 1, fg: '#1e293b', bg: '#ffffff', fgInput: '#1e293b', bgInput: '#ffffff' },
  ])

  let nextId = 2
  const addPair = useCallback(() => {
    const id = nextId++
    setPairs(prev => [...prev, { id, fg: '#1e293b', bg: '#ffffff', fgInput: '#1e293b', bgInput: '#ffffff' }])
  }, [])

  const removePair = useCallback((id: number) => {
    setPairs(prev => prev.filter(p => p.id !== id))
  }, [])

  const updatePair = useCallback((id: number, field: 'fg' | 'bg' | 'fgInput' | 'bgInput', value: string) => {
    setPairs(prev => prev.map(p => {
      if (p.id !== id) return p
      const next = { ...p, [field]: value }
      if (field === 'fgInput' || field === 'bgInput') {
        const colorField = field === 'fgInput' ? 'fg' : 'bg'
        const hex = value.startsWith('#') ? value : `#${value}`
        if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
          try { parseColor(hex); next[colorField] = hex } catch {}
        }
      }
      return next
    }))
  }, [])

  const results = useMemo(() => pairs.map(p => {
    const ratio = contrastRatio(p.fg, p.bg)
    const level = wcagLevel(ratio)
    return {
      ...p,
      ratio,
      level,
      passNormalText: ratio >= 4.5,
      passLargeText: ratio >= 3,
      passUI: ratio >= 3,
    }
  }), [pairs])

  const summary = useMemo(() => {
    const total = results.length
    const passNormal = results.filter(r => r.passNormalText).length
    const passLarge = results.filter(r => r.passLargeText).length
    return {
      total,
      passNormal,
      passLarge,
      passNormalRate: total ? Math.round((passNormal / total) * 100) : 0,
      passLargeRate: total ? Math.round((passLarge / total) * 100) : 0,
    }
  }, [results])

  const exportText = useMemo(() => {
    const lines = ['WCAG Contrast Report', '====================', '']
    results.forEach((r, i) => {
      lines.push(`Pair ${i + 1}:`)
      lines.push(`  Foreground: ${r.fg}`)
      lines.push(`  Background: ${r.bg}`)
      lines.push(`  Contrast Ratio: ${r.ratio.toFixed(2)}:1`)
      lines.push(`  WCAG Level: ${r.level}`)
      lines.push(`  Normal Text (4.5:1): ${r.passNormalText ? 'PASS' : 'FAIL'}`)
      lines.push(`  Large Text (3:1): ${r.passLargeText ? 'PASS' : 'FAIL'}`)
      lines.push(`  UI Components (3:1): ${r.passUI ? 'PASS' : 'FAIL'}`)
      lines.push('')
    })
    lines.push('--- Summary ---')
    lines.push(`Total Pairs: ${summary.total}`)
    lines.push(`Normal Text Pass Rate: ${summary.passNormal}/${summary.total} (${summary.passNormalRate}%)`)
    lines.push(`Large Text Pass Rate: ${summary.passLarge}/${summary.total} (${summary.passLargeRate}%)`)
    return lines.join('\n')
  }, [results, summary])

  const copyReport = useCallback(async () => {
    try { await navigator.clipboard.writeText(exportText) } catch {}
  }, [exportText])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Color Pairs</h3>
        <Button variant="secondary" size="sm" onClick={addPair}>+ Add Pair</Button>
      </div>

      {results.map((r, i) => (
        <div key={r.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Pair {i + 1}</span>
            {results.length > 1 && (
              <button onClick={() => removePair(r.id)} className="text-xs text-red-500 hover:text-red-600 font-medium">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Foreground</label>
              <div className="flex items-center gap-2">
                <div className="relative shrink-0">
                  <input type="color" value={r.fg} onChange={e => updatePair(r.id, 'fg', e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: r.fg }} />
                </div>
                <input type="text" value={r.fgInput} onChange={e => updatePair(r.id, 'fgInput', e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Background</label>
              <div className="flex items-center gap-2">
                <div className="relative shrink-0">
                  <input type="color" value={r.bg} onChange={e => updatePair(r.id, 'bg', e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: r.bg }} />
                </div>
                <input type="text" value={r.bgInput} onChange={e => updatePair(r.id, 'bgInput', e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-mono font-semibold text-slate-900 dark:text-white">{r.ratio.toFixed(2)}:1</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
              r.level === 'AAA' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
              r.level === 'AA' || r.level === 'AA Large' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
              'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
            }`}>{r.level}</span>
            <span className={`text-xs ${r.passNormalText ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              Normal: {r.passNormalText ? '✓' : '✗'}
            </span>
            <span className={`text-xs ${r.passLargeText ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              Large: {r.passLargeText ? '✓' : '✗'}
            </span>
            <span className={`text-xs ${r.passUI ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              UI: {r.passUI ? '✓' : '✗'}
            </span>
          </div>
          <div className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm font-medium" style={{ backgroundColor: r.bg, color: r.fg }}>
            Sample Text Preview
          </div>
        </div>
      ))}

      {results.length > 0 && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Summary</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{summary.total}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Total Pairs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{summary.passNormalRate}%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Normal Text Pass</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{summary.passLargeRate}%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Large Text Pass</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{summary.passLargeRate}%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">UI Pass</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={copyReport}>Copy Report</Button>
      </div>
    </div>
  )
}

function ComplianceChecker() {
  const [textInput, setTextInput] = useState('#3b82f6\n#ffffff\n#1e293b\n#ef4444\n#10b981')

  const colors = useMemo(() => {
    return textInput.split('\n').map(l => l.trim()).filter(l => l.startsWith('#') && isValidHex(l))
  }, [textInput])

  const matrix = useMemo(() => {
    const results: { fg: string; bg: string; ratio: number; level: string; pass: boolean }[] = []
    for (const fg of colors) {
      for (const bg of colors) {
        if (fg === bg) continue
        const ratio = contrastRatio(fg, bg)
        results.push({ fg, bg, ratio, level: wcagLevel(ratio), pass: ratio >= 4.5 })
      }
    }
    return results
  }, [colors])

  const summary = useMemo(() => {
    const total = matrix.length
    const passing = matrix.filter(m => m.pass).length
    const failing = matrix.filter(m => !m.pass)
    return {
      total,
      passing,
      failingCount: failing.length,
      passRate: total ? Math.round((passing / total) * 100) : 0,
      failingPairs: failing.slice(0, 10),
      hasIssues: failing.length > 0,
    }
  }, [matrix])

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Color Palette (one hex per line)</label>
        <textarea
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
          rows={6}
          placeholder="#3b82f6&#10;#ffffff&#10;#1e293b"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {colors.map(c => (
            <div key={c} className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="w-3 h-3 rounded border border-slate-300 dark:border-slate-600 shrink-0" style={{ backgroundColor: c }} />
              {c}
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-slate-400">{colors.length} valid colors, {matrix.length} combinations</div>
      </div>

      {matrix.length > 0 && (
        <>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Compliance Matrix</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-2 pr-3 text-slate-500 dark:text-slate-400 font-medium">FG / BG</th>
                    {colors.map(c => (
                      <th key={c} className="py-2 px-2 text-center font-medium">
                        <div className="flex items-center justify-center gap-1">
                          <span className="w-3 h-3 rounded border border-slate-300 dark:border-slate-600 shrink-0" style={{ backgroundColor: c }} />
                          <span className="text-xs font-mono truncate max-w-[60px]">{c}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {colors.map(fg => (
                    <tr key={fg} className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded border border-slate-300 dark:border-slate-600 shrink-0" style={{ backgroundColor: fg }} />
                          <span className="text-xs font-mono">{fg}</span>
                        </div>
                      </td>
                      {colors.map(bg => {
                        if (fg === bg) return <td key={bg} className="py-2 px-2 text-center text-slate-300 dark:text-slate-600">—</td>
                        const pair = matrix.find(m => m.fg === fg && m.bg === bg)
                        if (!pair) return <td key={bg} className="py-2 px-2 text-center">—</td>
                        return (
                          <td key={bg} className={`py-2 px-2 text-center font-mono ${
                            pair.level === 'AAA' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' :
                            pair.level === 'AA' || pair.level === 'AA Large' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' :
                            'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                          }`}>
                            {pair.ratio.toFixed(1)}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{summary.total}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Total Combinations</div>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center">
              <div className={`text-2xl font-bold ${summary.passRate >= 80 ? 'text-emerald-600 dark:text-emerald-400' : summary.passRate >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                {summary.passRate}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Pass Rate (4.5:1)</div>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center">
              <div className={`text-2xl font-bold ${summary.failingCount > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {summary.failingCount}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Failing Pairs</div>
            </div>
          </div>

          {summary.hasIssues && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Compliance Issues & Suggestions</h4>
              <div className="space-y-2">
                {summary.failingPairs.map((p, i) => {
                  const [r1, g1, b1] = hexToRgbValues(p.fg)
                  const [r2, g2, b2] = hexToRgbValues(p.bg)
                  const darker = p.fg
                  const lighter = p.bg
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-sm">
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="w-5 h-5 rounded border border-slate-300" style={{ backgroundColor: p.fg }} />
                        <span className="text-xs font-mono text-slate-500">/</span>
                        <span className="w-5 h-5 rounded border border-slate-300" style={{ backgroundColor: p.bg }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-slate-700 dark:text-slate-300">
                          <span className="font-mono">{p.fg}</span> on <span className="font-mono">{p.bg}</span>: ratio {p.ratio.toFixed(2)}:1 ({p.level})
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Suggestion: Darken foreground or lighten background to achieve at least 4.5:1 ratio.
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function WCAGExport() {
  type ExportPair = { id: number; fg: string; bg: string; fgInput: string; bgInput: string }
  const [pairs, setPairs] = useState<ExportPair[]>([
    { id: 1, fg: '#1e293b', bg: '#ffffff', fgInput: '#1e293b', bgInput: '#ffffff' },
    { id: 2, fg: '#ffffff', bg: '#3b82f6', fgInput: '#ffffff', bgInput: '#3b82f6' },
  ])
  const [format, setFormat] = useState<'csv' | 'json' | 'text'>('csv')

  let nextId = 3
  const addPair = useCallback(() => {
    const id = nextId++
    setPairs(prev => [...prev, { id, fg: '#1e293b', bg: '#ffffff', fgInput: '#1e293b', bgInput: '#ffffff' }])
  }, [])

  const removePair = useCallback((id: number) => {
    setPairs(prev => prev.filter(p => p.id !== id))
  }, [])

  const updatePair = useCallback((id: number, field: 'fg' | 'bg' | 'fgInput' | 'bgInput', value: string) => {
    setPairs(prev => prev.map(p => {
      if (p.id !== id) return p
      const next = { ...p, [field]: value }
      if (field === 'fgInput' || field === 'bgInput') {
        const colorField = field === 'fgInput' ? 'fg' : 'bg'
        const hex = value.startsWith('#') ? value : `#${value}`
        if ((value.startsWith('#') && isValidHex(value)) || isValidHex(value)) {
          try { parseColor(hex); next[colorField] = hex } catch {}
        }
      }
      return next
    }))
  }, [])

  const data = useMemo(() => pairs.map(p => {
    const ratio = contrastRatio(p.fg, p.bg)
    const level = wcagLevel(ratio)
    return {
      foreground: p.fg,
      background: p.bg,
      contrastRatio: parseFloat(ratio.toFixed(2)),
      wcagLevel: level,
      passNormalText: ratio >= 4.5,
      passLargeText: ratio >= 3,
      passUIComponents: ratio >= 3,
    }
  }), [pairs])

  const report = useMemo(() => {
    switch (format) {
      case 'csv': {
        const header = 'Foreground,Background,Contrast Ratio,WCAG Level,Normal Text,Large Text,UI Components'
        const rows = data.map(d =>
          `${d.foreground},${d.background},${d.contrastRatio},${d.wcagLevel},${d.passNormalText ? 'PASS' : 'FAIL'},${d.passLargeText ? 'PASS' : 'FAIL'},${d.passUIComponents ? 'PASS' : 'FAIL'}`
        )
        return [header, ...rows].join('\n')
      }
      case 'json':
        return JSON.stringify(data, null, 2)
      case 'text': {
        const lines = ['WCAG Contrast Report', '====================', '']
        data.forEach((d, i) => {
          lines.push(`Pair ${i + 1}: ${d.foreground} / ${d.background}`)
          lines.push(`  Contrast Ratio: ${d.contrastRatio}:1`)
          lines.push(`  WCAG Level: ${d.wcagLevel}`)
          lines.push(`  Normal Text: ${d.passNormalText ? 'PASS' : 'FAIL'}`)
          lines.push(`  Large Text: ${d.passLargeText ? 'PASS' : 'FAIL'}`)
          lines.push(`  UI Components: ${d.passUIComponents ? 'PASS' : 'FAIL'}`)
          lines.push('')
        })
        return lines.join('\n')
      }
    }
  }, [data, format])

  const copyReport = useCallback(async () => {
    try { await navigator.clipboard.writeText(report) } catch {}
  }, [report])

  const downloadReport = useCallback(() => {
    const ext = format === 'json' ? 'json' : format === 'csv' ? 'csv' : 'txt'
    const mime = format === 'json' ? 'application/json' : format === 'csv' ? 'text/csv' : 'text/plain'
    const blob = new Blob([report], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wcag-report.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }, [report, format])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Color Pairs</h3>
        <Button variant="secondary" size="sm" onClick={addPair}>+ Add Pair</Button>
      </div>

      {data.map((d, i) => {
        const p = pairs[i]
        if (!p) return null
        return (
          <div key={p.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Pair {i + 1}</span>
              {pairs.length > 1 && (
                <button onClick={() => removePair(p.id)} className="text-xs text-red-500 hover:text-red-600 font-medium">Remove</button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Foreground</label>
                <div className="flex items-center gap-2">
                  <div className="relative shrink-0">
                    <input type="color" value={p.fg} onChange={e => updatePair(p.id, 'fg', e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: p.fg }} />
                  </div>
                  <input type="text" value={p.fgInput} onChange={e => updatePair(p.id, 'fgInput', e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Background</label>
                <div className="flex items-center gap-2">
                  <div className="relative shrink-0">
                    <input type="color" value={p.bg} onChange={e => updatePair(p.id, 'bg', e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: p.bg }} />
                  </div>
                  <input type="text" value={p.bgInput} onChange={e => updatePair(p.id, 'bgInput', e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Export Format:</span>
          {(['csv', 'json', 'text'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                format === f
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-rose-300'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Preview</label>
          <pre className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-mono overflow-auto max-h-48 whitespace-pre">{report}</pre>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={copyReport}>Copy</Button>
          <Button variant="primary" size="sm" onClick={downloadReport}>Download</Button>
        </div>
      </div>
    </div>
  )
}

export default function AccessibilityTool({ title, description, toolType }: AccessibilityToolProps) {
  const pathname = usePathname()
  const toolId = pathname?.replace(/^\//, '')?.replace(/\/$/, '') || ''
  const content = useMemo(() => getToolContent(toolId), [toolId])

  const renderContent = () => {
    const simulationTypes = ['color-blindness-simulator', 'protanopia', 'deuteranopia', 'tritanopia', 'monochrome', 'color-vision']
    const readabilityTypes = ['readability', 'font-recommender']
    const paletteTypes = ['accessible-palette', 'palette-optimizer']
    const textContrastTypes = ['text-contrast', 'background-contrast', 'bg-recommender']
    const buttonTypes = ['button-accessibility']
    const linkTypes = ['link-accessibility']
    const uiTypes = ['ui-tester', 'dashboard-checker']
    const matrixTypes = ['contrast-matrix', 'heatmap']
    const darkTypes = ['dark-mode']
    const lightTypes = ['light-mode']

    if (simulationTypes.includes(toolType)) return <ColorBlindnessSimulator />
    if (readabilityTypes.includes(toolType)) return <ReadabilityChecker />
    if (paletteTypes.includes(toolType)) return <AccessiblePaletteGenerator />
    if (textContrastTypes.includes(toolType)) return <TextContrastChecker />
    if (buttonTypes.includes(toolType)) return <ButtonAccessibilityChecker />
    if (linkTypes.includes(toolType)) return <LinkAccessibilityChecker />
    if (uiTypes.includes(toolType)) return <UITester />
    if (matrixTypes.includes(toolType)) return <ContrastMatrix />
    if (darkTypes.includes(toolType)) return <DarkModePreview />
    if (lightTypes.includes(toolType)) return <LightModePreview />
    if (toolType === 'report-generator') return <ReportGenerator />
    if (toolType === 'compliance') return <ComplianceChecker />
    if (toolType === 'wcag-export') return <WCAGExport />
    if (toolType === 'contrast-fix' || toolType === 'accessible-gradient') return <ReadabilityChecker />
    return <TextContrastChecker />
  }

  return (
    <ToolContent title={title} description={description} howToUse={content.howToUse} faq={content.faq} relatedTools={content.relatedTools}>
      <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-7xl">{description}</p>
      </div>
      {renderContent()}
    </div>
    </ToolContent>
  )
}
