'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import {
  hsvToRgbValues,
  rgbToHsvValues,
  rgbToHexValues,
  hexToRgbValues,
  rgbToHslValues,
  hslToRgbValues,
  rgbToCmykValues,
  cmykToRgbValues,
  hexToLab,
  hexToLch,
  hexToOklab,
  hexToOklch,
  hexToHwb,
  hwbToHex,
  labToHex,
  lchToHex,
  oklabToHex,
  oklchToHex,
  randomColor,
  parseColor,
} from '@/lib/converters'

interface ColorPickerToolProps {
  title: string
  description: string
  mode?:
    | 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk'
    | 'lab' | 'lch' | 'oklab' | 'oklch' | 'hwb'
    | 'rgba' | 'hsla' | 'alpha'
    | 'gradient' | 'multi' | 'image'
    | 'website' | 'transparent' | 'random'
    | 'browser' | 'pixel' | 'magnifier'
  showAlpha?: boolean
}

type ColorFormat = NonNullable<ColorPickerToolProps['mode']>

const HUE_COLORS = [
  { p: 0, c: '#ff0000' },
  { p: 17, c: '#ffff00' },
  { p: 33, c: '#00ff00' },
  { p: 50, c: '#00ffff' },
  { p: 67, c: '#0000ff' },
  { p: 83, c: '#ff00ff' },
  { p: 100, c: '#ff0000' },
]

const COMMON_FORMATS: { key: string; label: string }[] = [
  { key: 'hex', label: 'HEX' },
  { key: 'rgb', label: 'RGB' },
  { key: 'hsl', label: 'HSL' },
  { key: 'hsv', label: 'HSV' },
  { key: 'cmyk', label: 'CMYK' },
  { key: 'hwb', label: 'HWB' },
]

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max)
}

function luminance(r: number, g: number, b: number): number {
  const rs = r / 255, gs = g / 255, bs = b / 255
  const rl = rs <= 0.03928 ? rs / 12.92 : ((rs + 0.055) / 1.055) ** 2.4
  const gl = gs <= 0.03928 ? gs / 12.92 : ((gs + 0.055) / 1.055) ** 2.4
  const bl = bs <= 0.03928 ? bs / 12.92 : ((bs + 0.055) / 1.055) ** 2.4
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl
}

function rgbToHwbValues(r: number, g: number, b: number): [number, number, number] {
  const [h] = rgbToHsvValues(r, g, b)
  const w = Math.min(r, g, b) / 255 * 100
  const bl = (255 - Math.max(r, g, b)) / 255 * 100
  return [h, w, bl]
}

function hwbToRgbValues(h: number, w: number, bl: number): [number, number, number] {
  const white = w / 100
  const black = bl / 100
  if (white + black >= 1) {
    const gray = Math.round(white / (white + black) * 255)
    return [gray, gray, gray]
  }
  const v = 1 - black
  const sv = white < 1 ? (1 - white / v) : 0
  return hsvToRgbValues(h, sv * 100, v * 100)
}

function formatColor(r: number, g: number, b: number, a: number, mode: ColorFormat): string {
  switch (mode) {
    case 'hex': return rgbToHexValues(r, g, b)
    case 'rgb': return `rgb(${r}, ${g}, ${b})`
    case 'rgba': return `rgba(${r}, ${g}, ${b}, ${a.toFixed(4).replace(/\.?0+$/, '')})`
    case 'hsl': {
      const [h, s, l] = rgbToHslValues(r, g, b)
      return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`
    }
    case 'hsla': {
      const [h, s, l] = rgbToHslValues(r, g, b)
      return `hsla(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%, ${a.toFixed(4).replace(/\.?0+$/, '')})`
    }
    case 'hsv': {
      const [h, s, v] = rgbToHsvValues(r, g, b)
      return `hsv(${h.toFixed(1)}, ${s.toFixed(1)}%, ${v.toFixed(1)}%)`
    }
    case 'cmyk': {
      const [c, m, y, k] = rgbToCmykValues(r, g, b)
      return `cmyk(${c.toFixed(1)}%, ${m.toFixed(1)}%, ${y.toFixed(1)}%, ${k.toFixed(1)}%)`
    }
    case 'hwb': {
      const [h, w, bl] = rgbToHwbValues(r, g, b)
      return `hwb(${h.toFixed(1)}, ${w.toFixed(1)}%, ${bl.toFixed(1)}%)`
    }
    case 'lab': return hexToLab(rgbToHexValues(r, g, b))
    case 'lch': return hexToLch(rgbToHexValues(r, g, b))
    case 'oklab': return hexToOklab(rgbToHexValues(r, g, b))
    case 'oklch': return hexToOklch(rgbToHexValues(r, g, b))
    default: return rgbToHexValues(r, g, b)
  }
}

function tryParseColor(value: string, mode: ColorFormat): { r: number; g: number; b: number; a: number } | null {
  const parsed = parseColor(value)
  if (parsed) return parsed
  try {
    const converters: Record<string, (s: string) => string> = {
      hwb: hwbToHex,
      lab: labToHex,
      lch: lchToHex,
      oklab: oklabToHex,
      oklch: oklchToHex,
    }
    if (converters[mode]) {
      const hex = converters[mode](value)
      const [r, g, b] = hexToRgbValues(hex)
      return { r, g, b, a: 1 }
    }
  } catch {}
  try {
    const hex = value.startsWith('#') ? value : `#${value}`
    const [r, g, b] = hexToRgbValues(hex)
    return { r, g, b, a: 1 }
  } catch {}
  return null
}

export default function ColorPickerTool({
  title,
  description,
  mode = 'hex',
  showAlpha: showAlphaProp = false,
}: ColorPickerToolProps) {
  const { addToast } = useToast()
  const [hue, setHue] = useState(320)
  const [sat, setSat] = useState(80)
  const [val, setVal] = useState(90)
  const [alpha, setAlpha] = useState(1)
  const [primaryInput, setPrimaryInput] = useState('')
  const [activeTab, setActiveTab] = useState<'picker' | 'sliders' | 'custom'>('picker')
  const [gradientStops, setGradientStops] = useState<string[]>(['#ff0000', '#0000ff'])
  const [multiColors, setMultiColors] = useState<string[]>([])

  const isAlpha = showAlphaProp || mode === 'rgba' || mode === 'hsla' || mode === 'alpha' || mode === 'transparent'
  const showAlphaControl = isAlpha

  const panelRef = useRef<HTMLDivElement>(null)
  const hueRef = useRef<HTMLDivElement>(null)
  const alphaRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const draggingRef = useRef<'none' | 'panel' | 'hue' | 'alpha'>('none')

  const rgb = hsvToRgbValues(hue, sat, val)
  const r = rgb[0]
  const g = rgb[1]
  const b = rgb[2]
  const hex = rgbToHexValues(r, g, b)
  const [hslH, hslS, hslL] = rgbToHslValues(r, g, b)
  const [c, m, y, k] = rgbToCmykValues(r, g, b)
  const [hwH, hwW, hwB] = rgbToHwbValues(r, g, b)

  const isLight = luminance(r, g, b) > 0.5

  const primaryLabel = useMemo(() => mode.toUpperCase(), [mode])

  const formatStrings = useMemo(() => ({
    hex: rgbToHexValues(r, g, b),
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${hslH.toFixed(1)}, ${hslS.toFixed(1)}%, ${hslL.toFixed(1)}%)`,
    hsv: `hsv(${hue.toFixed(1)}, ${sat.toFixed(1)}%, ${val.toFixed(1)}%)`,
    cmyk: `cmyk(${c.toFixed(1)}%, ${m.toFixed(1)}%, ${y.toFixed(1)}%, ${k.toFixed(1)}%)`,
    hwb: `hwb(${hwH.toFixed(1)}, ${hwW.toFixed(1)}%, ${hwB.toFixed(1)}%)`,
    lab: hexToLab(hex),
    lch: hexToLch(hex),
    oklab: hexToOklab(hex),
    oklch: hexToOklch(hex),
  }), [r, g, b, hslH, hslS, hslL, hue, sat, val, c, m, y, k, hwH, hwW, hwB, hex])

  const syncPrimaryInput = useCallback(() => {
    setPrimaryInput(formatColor(r, g, b, alpha, mode))
  }, [r, g, b, alpha, mode])

  const updateFromColor = useCallback((nr: number, ng: number, nb: number, na: number = alpha) => {
    const [nh, ns, nv] = rgbToHsvValues(nr, ng, nb)
    setHue(nh)
    setSat(ns)
    setVal(nv)
    setAlpha(na)
  }, [alpha])

  const handleCopy = useCallback(async (text: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text)
      addToast(`${label || text} copied`, 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [addToast])

  const handlePrimaryInputChange = useCallback((value: string) => {
    setPrimaryInput(value)
    const parsed = tryParseColor(value, mode)
    if (parsed) {
      const [nh, ns, nv] = rgbToHsvValues(parsed.r, parsed.g, parsed.b)
      setHue(nh)
      setSat(ns)
      setVal(nv)
      if (parsed.a !== undefined) setAlpha(parsed.a)
    }
  }, [mode])

  const handlePanelPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    draggingRef.current = 'panel'
    const panel = panelRef.current
    if (!panel) return
    panel.setPointerCapture(e.pointerId)

    const rect = panel.getBoundingClientRect()
    const x = clamp((e.clientX - rect.left) / rect.width * 100, 0, 100)
    const y = clamp((e.clientY - rect.top) / rect.height * 100, 0, 100)
    setSat(x)
    setVal(100 - y)
  }, [])

  const handlePanelPointerMove = useCallback((e: React.PointerEvent) => {
    if (draggingRef.current !== 'panel') return
    const panel = panelRef.current
    if (!panel) return

    const rect = panel.getBoundingClientRect()
    const x = clamp((e.clientX - rect.left) / rect.width * 100, 0, 100)
    const y = clamp((e.clientY - rect.top) / rect.height * 100, 0, 100)
    setSat(x)
    setVal(100 - y)
  }, [])

  const handlePanelPointerUp = useCallback(() => {
    draggingRef.current = 'none'
  }, [])

  const handleHuePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    draggingRef.current = 'hue'
    const el = hueRef.current
    if (!el) return
    el.setPointerCapture(e.pointerId)

    const rect = el.getBoundingClientRect()
    const x = clamp((e.clientX - rect.left) / rect.width * 360, 0, 360)
    setHue(x)
  }, [])

  const handleHuePointerMove = useCallback((e: React.PointerEvent) => {
    if (draggingRef.current !== 'hue') return
    const el = hueRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = clamp((e.clientX - rect.left) / rect.width * 360, 0, 360)
    setHue(x)
  }, [])

  const handleHuePointerUp = useCallback(() => {
    draggingRef.current = 'none'
  }, [])

  const handleAlphaPointerDown = useCallback((e: React.PointerEvent) => {
    if (!showAlphaControl) return
    e.preventDefault()
    draggingRef.current = 'alpha'
    const el = alphaRef.current
    if (!el) return
    el.setPointerCapture(e.pointerId)

    const rect = el.getBoundingClientRect()
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1)
    setAlpha(x)
  }, [showAlphaControl])

  const handleAlphaPointerMove = useCallback((e: React.PointerEvent) => {
    if (draggingRef.current !== 'alpha') return
    const el = alphaRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1)
    setAlpha(x)
  }, [])

  const handleAlphaPointerUp = useCallback(() => {
    draggingRef.current = 'none'
  }, [])

  const handleRandomize = useCallback(() => {
    const newHex = randomColor()
    const [nr, ng, nb] = hexToRgbValues(newHex)
    updateFromColor(nr, ng, nb)
    addToast('Random color generated', 'info')
  }, [updateFromColor, addToast])

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            addToast('Image loaded. Click on the preview to pick colors.', 'info')
          }
        })
      }
      img.src = ev.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [addToast])

  const addGradientStop = useCallback(() => {
    if (gradientStops.length >= 8) {
      addToast('Maximum 8 gradient stops', 'error')
      return
    }
    setGradientStops(prev => [...prev, '#888888'])
  }, [gradientStops.length, addToast])

  const updateGradientStop = useCallback((index: number, color: string) => {
    setGradientStops(prev => prev.map((c, i) => i === index ? color : c))
  }, [])

  const removeGradientStop = useCallback((index: number) => {
    if (gradientStops.length <= 2) {
      addToast('Minimum 2 gradient stops', 'error')
      return
    }
    setGradientStops(prev => prev.filter((_, i) => i !== index))
  }, [gradientStops.length, addToast])

  const addMultiColor = useCallback(() => {
    if (multiColors.length >= 12) {
      addToast('Maximum 12 colors', 'error')
      return
    }
    setMultiColors(prev => [...prev, hex])
  }, [multiColors.length, hex, addToast])

  const removeMultiColor = useCallback((index: number) => {
    setMultiColors(prev => prev.filter((_, i) => i !== index))
  }, [])

  useEffect(() => {
    syncPrimaryInput()
  }, [r, g, b, alpha, mode, syncPrimaryInput])

  const hueSliderBg = `linear-gradient(to right, ${HUE_COLORS.map(hc => `${hc.c} ${hc.p}%`).join(', ')})`

  const panelBg = `
    linear-gradient(to top, #000, transparent),
    linear-gradient(to right, #fff, transparent),
    hsl(${hue}, 100%, 50%)
  `

  const cursorX = sat
  const cursorY = 100 - val

  const alphaBg = `
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%)
  `

  const alphaGradientBg = `linear-gradient(to right, transparent, ${hex})`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-7xl">{description}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Preview</span>
              </div>
              <div className="p-4">
                <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '180px' }}>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: alphaBg,
                      backgroundSize: '16px 16px',
                      backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                    }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: hex, opacity: alpha < 1 ? alpha : 1 }}
                  >
                    <span
                      className={`text-2xl font-mono font-bold tracking-wider ${isLight && alpha > 0.5 ? 'text-black/60' : 'text-white/80'}`}
                      style={{ textShadow: isLight ? 'none' : '0 1px 4px rgba(0,0,0,0.5)' }}
                    >
                      {hex}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {(['hex', 'rgb', 'hsl', 'hsv'] as const).map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => handleCopy(formatStrings[fmt], fmt.toUpperCase())}
                      className="group relative flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-rose-300 dark:hover:border-rose-700 transition-all text-left"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">{fmt}</div>
                        <div className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate mt-0.5">{formatStrings[fmt]}</div>
                      </div>
                      <svg className="w-3.5 h-3.5 shrink-0 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  {(['cmyk', 'hwb', 'lab', 'lch'] as const).map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => handleCopy(formatStrings[fmt], fmt.toUpperCase())}
                      className="group relative flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-rose-300 dark:hover:border-rose-700 transition-all text-left"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">{fmt}</div>
                        <div className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate mt-0.5">{formatStrings[fmt]}</div>
                      </div>
                      <svg className="w-3.5 h-3.5 shrink-0 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Color Picker</span>
              </div>
              <div className="p-4 space-y-4">
                <div
                  ref={panelRef}
                  onPointerDown={handlePanelPointerDown}
                  onPointerMove={handlePanelPointerMove}
                  onPointerUp={handlePanelPointerUp}
                  onPointerCancel={handlePanelPointerUp}
                  className="relative w-full rounded-lg cursor-crosshair select-none touch-none"
                  style={{
                    paddingBottom: '100%',
                    background: panelBg,
                    backgroundBlendMode: 'overlay, overlay, normal',
                  }}
                >
                  <div
                    className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md pointer-events-none"
                    style={{
                      left: `${cursorX}%`,
                      top: `${cursorY}%`,
                      background: hex,
                    }}
                  />
                </div>

                <div
                  ref={hueRef}
                  onPointerDown={handleHuePointerDown}
                  onPointerMove={handleHuePointerMove}
                  onPointerUp={handleHuePointerUp}
                  onPointerCancel={handleHuePointerUp}
                  className="relative w-full h-5 rounded-full cursor-pointer select-none touch-none"
                  style={{ background: hueSliderBg }}
                >
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none bg-white"
                    style={{ left: `${(hue / 360) * 100}%` }}
                  />
                </div>

                {showAlphaControl && (
                  <div
                    ref={alphaRef}
                    onPointerDown={handleAlphaPointerDown}
                    onPointerMove={handleAlphaPointerMove}
                    onPointerUp={handleAlphaPointerUp}
                    onPointerCancel={handleAlphaPointerUp}
                    className="relative w-full h-5 rounded-full cursor-pointer select-none touch-none overflow-hidden"
                    style={{
                      background: `${alphaBg}, ${alphaGradientBg}`,
                      backgroundSize: '16px 16px, 100% 100%',
                      backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px, 0 0',
                    }}
                  >
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none bg-white"
                      style={{ left: `${alpha * 100}%` }}
                    />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 w-10">{primaryLabel}</span>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={primaryInput}
                      onChange={e => handlePrimaryInputChange(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                  <button
                    onClick={() => handleCopy(primaryInput, primaryLabel)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors"
                    title={`Copy ${primaryLabel}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {(mode === 'gradient' || mode === 'multi') && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {mode === 'gradient' ? 'Gradient Stops' : 'Multi-Color Palette'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={mode === 'gradient' ? addGradientStop : addMultiColor}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  }
                >
                  Add
                </Button>
              </div>
              <div className="p-4 space-y-3">
                {mode === 'gradient' && (
                  <>
                    <div
                      className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-600"
                      style={{
                        background: `linear-gradient(90deg, ${gradientStops.join(', ')})`,
                      }}
                    />
                    {gradientStops.map((stop, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <input
                          type="color"
                          value={stop}
                          onChange={e => updateGradientStop(i, e.target.value)}
                          className="w-10 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={stop}
                          onChange={e => updateGradientStop(i, e.target.value)}
                          className="flex-1 px-2 py-1.5 text-xs font-mono rounded border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                        />
                        <button
                          onClick={() => removeGradientStop(i)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCopy(`linear-gradient(90deg, ${gradientStops.join(', ')})`, 'Gradient CSS')}
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      }
                    >
                      Copy Gradient CSS
                    </Button>
                  </>
                )}

                {mode === 'multi' && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {multiColors.map((c, i) => (
                      <div key={i} className="group relative">
                        <div
                          className="w-full aspect-square rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer"
                          style={{ backgroundColor: c }}
                          onClick={() => {
                            const [nr, ng, nb] = hexToRgbValues(c)
                            updateFromColor(nr, ng, nb)
                          }}
                        />
                        <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate mt-1 text-center">{c}</span>
                        <button
                          onClick={() => removeMultiColor(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {multiColors.length === 0 && (
                      <div className="col-span-full text-center py-8 text-slate-400 dark:text-slate-500 text-sm">
                        No colors yet. Click "Add" to save the current color.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</span>
            </div>
            <div className="p-4 space-y-2">
              <Button size="sm" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              } onClick={() => handleCopy(hex, 'HEX')}>Copy HEX</Button>
              <Button size="sm" variant="secondary" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              } onClick={() => handleCopy(formatStrings.rgb, 'RGB')}>Copy RGB</Button>
              <Button size="sm" variant="secondary" className="w-full justify-start" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              } onClick={() => handleCopy(formatStrings.hsl, 'HSL')}>Copy HSL</Button>

              {(mode === 'random' || mode === 'image' || mode === 'website' || mode === 'pixel' || mode === 'magnifier') && (
                <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-3 space-y-2">
                  {mode === 'random' && (
                    <Button size="sm" className="w-full justify-start" icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    } onClick={handleRandomize}>Random Color</Button>
                  )}

                  {mode === 'image' && (
                    <>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-full justify-start"
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        }
                        onClick={() => fileRef.current?.click()}
                      >
                        Upload Image
                      </Button>
                    </>
                  )}

                  {(mode === 'pixel' || mode === 'magnifier' || mode === 'website') && (
                    <div className="text-xs text-slate-400 dark:text-slate-500 text-center py-2">
                      {mode === 'pixel' && 'Pixel-level picking requires a browser extension.'}
                      {mode === 'magnifier' && 'Magnifier picking works best with the native browser color picker.'}
                      {mode === 'website' && 'Website color extraction requires the page to be loaded in an iframe or screenshot tool.'}
                    </div>
                  )}
                </div>
              )}

              <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-3 space-y-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  }
                  onClick={handleRandomize}
                >
                  Random
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'color'
                    input.value = hex
                    input.addEventListener('input', (e) => {
                      const val = (e.target as HTMLInputElement).value
                      const [nr, ng, nb] = hexToRgbValues(val)
                      updateFromColor(nr, ng, nb)
                    })
                    input.click()
                  }}
                >
                  Browser Picker
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Color Values</span>
            </div>
            <div className="p-4 space-y-3">
              {COMMON_FORMATS.map(fmt => {
                const val = formatStrings[fmt.key as keyof typeof formatStrings]
                return (
                  <div key={fmt.key}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">{fmt.label}</span>
                      <button
                        onClick={() => handleCopy(val, fmt.label)}
                        className="text-[10px] text-rose-500 hover:text-rose-600 opacity-0 hover:opacity-100 transition-opacity"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-0.5 truncate">{val}</p>
                  </div>
                )
              })}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">Alpha</span>
                {showAlphaControl ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={alpha}
                      onChange={e => setAlpha(Number(e.target.value))}
                      className="flex-1 h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer accent-rose-500"
                    />
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 w-12 text-right">
                      {Math.round(alpha * 100)}%
                    </span>
                  </div>
                ) : (
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">100% (no alpha)</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Harmonies</span>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label: 'Complementary', offset: 180 },
                { label: 'Triadic 1', offset: 120 },
                { label: 'Triadic 2', offset: 240 },
                { label: 'Analogous 1', offset: -30 },
                { label: 'Analogous 2', offset: 30 },
              ].map(harmony => {
                const newHue = ((hue + harmony.offset) % 360 + 360) % 360
                const [hr, hg, hb] = hsvToRgbValues(newHue, sat, val)
                const hHex = rgbToHexValues(hr, hg, hb)
                return (
                  <div
                    key={harmony.label}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setHue(newHue)
                      addToast(`Switched to ${harmony.label}`, 'info')
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-600 shrink-0"
                      style={{ backgroundColor: hHex }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{harmony.label}</p>
                      <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 truncate">{hHex}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopy(hHex, harmony.label)
                      }}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
