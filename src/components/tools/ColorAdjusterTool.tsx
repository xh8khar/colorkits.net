'use client'

import { useState, useMemo, useCallback } from 'react'
import ToolContent from './ToolContent'
import { getToolContent } from '@/lib/toolContent'
import { usePathname } from 'next/navigation'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { hexToRgb, rgbToHex, hexToHsl, rgbToHsl, hexToRgbValues, rgbToHexValues, rgbToHslValues, hslToRgbValues, mixColors } from '@/lib/converters'

interface ColorAdjusterToolProps {
  title: string
  description: string
  adjustmentType: 'tint' | 'shade' | 'tone' | 'saturation' | 'brightness' | 'contrast' | 'hue-rotate' | 'vibrance' | 'gamma' | 'opacity' | 'alpha' | 'lighten' | 'darken' | 'desaturate' | 'invert' | 'grayscale' | 'sepia' | 'temperature' | 'mixer' | 'blend' | 'overlay' | 'multiply' | 'screen' | 'soft-light' | 'hard-light' | 'color-dodge' | 'burn' | 'harmonizer' | 'dynamic-theme' | 'equalizer'
}

type BlendMode = 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light' | 'color-dodge' | 'burn'

function parseHexStrict(hex: string): [number, number, number] {
  const h = hex.replace(/^#/, '')
  if (h.length === 3) return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function clamp(v: number, min = 0, max = 255): number {
  return Math.min(max, Math.max(min, Math.round(v)))
}

function hslToString(h: number, s: number, l: number): string {
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`
}

export default function ColorAdjusterTool({ title, description, adjustmentType }: ColorAdjusterToolProps) {
  const { addToast } = useToast()

  const [baseColor, setBaseColor] = useState('#f43f5e')
  const [secondColor, setSecondColor] = useState('#3b82f6')
  const [amount, setAmount] = useState(50)
  const [hueRotate, setHueRotate] = useState(0)
  const [saturationVal, setSaturationVal] = useState(0)
  const [brightnessVal, setBrightnessVal] = useState(0)
  const [contrastVal, setContrastVal] = useState(0)
  const [gammaVal, setGammaVal] = useState(1)
  const [opacityVal, setOpacityVal] = useState(100)
  const [vibranceVal, setVibranceVal] = useState(0)
  const [blendMode, setBlendMode] = useState<BlendMode>('multiply')
  const [mixRatio, setMixRatio] = useState(50)
  const [invertOn, setInvertOn] = useState(false)
  const [grayscaleOn, setGrayscaleOn] = useState(false)
  const [sepiaOn, setSepiaOn] = useState(false)
  const [tempVal, setTempVal] = useState(0)
  const [redEq, setRedEq] = useState(0)
  const [greenEq, setGreenEq] = useState(0)
  const [blueEq, setBlueEq] = useState(0)

  const adjustedColor = useMemo((): string => {
    try {
      const [r, g, b] = parseHexStrict(baseColor)

      switch (adjustmentType) {
        case 'tint': {
          const w = amount / 100
          return rgbToHexValues(clamp(r + (255 - r) * w), clamp(g + (255 - g) * w), clamp(b + (255 - b) * w))
        }
        case 'shade': {
          const w = amount / 100
          return rgbToHexValues(clamp(r * (1 - w)), clamp(g * (1 - w)), clamp(b * (1 - w)))
        }
        case 'tone': {
          const w = amount / 100
          const gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114)
          return rgbToHexValues(clamp(r + (gray - r) * w), clamp(g + (gray - g) * w), clamp(b + (gray - b) * w))
        }
        case 'lighten': {
          const pct = amount / 100
          return rgbToHexValues(clamp(r + (255 - r) * pct), clamp(g + (255 - g) * pct), clamp(b + (255 - b) * pct))
        }
        case 'darken': {
          const pct = amount / 100
          return rgbToHexValues(clamp(r * (1 - pct)), clamp(g * (1 - pct)), clamp(b * (1 - pct)))
        }
        case 'saturation': {
          const [h, s, l] = rgbToHslValues(r, g, b)
          const newS = clamp(s + saturationVal, 0, 100)
          const [nr, ng, nb] = hslToRgbValues(h, newS, l)
          return rgbToHexValues(nr, ng, nb)
        }
        case 'brightness': {
          const [h, s, l] = rgbToHslValues(r, g, b)
          const newL = clamp(l + brightnessVal, 0, 100)
          const [nr, ng, nb] = hslToRgbValues(h, s, newL)
          return rgbToHexValues(nr, ng, nb)
        }
        case 'contrast': {
          const factor = (100 + contrastVal) / 100
          const mid = 128
          return rgbToHexValues(
            clamp((r - mid) * factor + mid),
            clamp((g - mid) * factor + mid),
            clamp((b - mid) * factor + mid),
          )
        }
        case 'hue-rotate': {
          const [h, s, l] = rgbToHslValues(r, g, b)
          const newH = (h + hueRotate) % 360
          const [nr, ng, nb] = hslToRgbValues(newH, s, l)
          return rgbToHexValues(nr, ng, nb)
        }
        case 'vibrance': {
          const [h, s, l] = rgbToHslValues(r, g, b)
          const boost = vibranceVal / 100
          const newS = clamp(s * (1 + boost), 0, 100)
          const [nr, ng, nb] = hslToRgbValues(h, newS, l)
          return rgbToHexValues(nr, ng, nb)
        }
        case 'gamma': {
          const g = gammaVal
          const correct = (v: number) => 255 * Math.pow(v / 255, 1 / g)
          return rgbToHexValues(clamp(correct(r)), clamp(correct(g)), clamp(correct(b)))
        }
        case 'opacity':
        case 'alpha': {
          return baseColor
        }
        case 'desaturate': {
          const gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114)
          const w = amount / 100
          return rgbToHexValues(clamp(r + (gray - r) * w), clamp(g + (gray - g) * w), clamp(b + (gray - b) * w))
        }
        case 'invert': {
          if (!invertOn) return baseColor
          return rgbToHexValues(255 - r, 255 - g, 255 - b)
        }
        case 'grayscale': {
          if (!grayscaleOn && amount === 0) return baseColor
          const w = amount / 100
          const gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114)
          return rgbToHexValues(clamp(r + (gray - r) * w), clamp(g + (gray - g) * w), clamp(b + (gray - b) * w))
        }
        case 'sepia': {
          if (!sepiaOn && amount === 0) return baseColor
          const w = amount / 100
          const sr = clamp(r * (1 - w) + (r * 0.393 + g * 0.769 + b * 0.189) * w)
          const sg = clamp(g * (1 - w) + (r * 0.349 + g * 0.686 + b * 0.168) * w)
          const sb = clamp(b * (1 - w) + (r * 0.272 + g * 0.534 + b * 0.131) * w)
          return rgbToHexValues(sr, sg, sb)
        }
        case 'temperature': {
          const shift = tempVal / 100
          return rgbToHexValues(
            clamp(r + shift * 20),
            clamp(g),
            clamp(b - shift * 20),
          )
        }
        case 'mixer': {
          return mixColors(baseColor, secondColor, mixRatio)
        }
        case 'blend':
        case 'overlay':
        case 'multiply':
        case 'screen':
        case 'soft-light':
        case 'hard-light':
        case 'color-dodge':
        case 'burn': {
          return blendColors(baseColor, secondColor, blendMode)
        }
        case 'equalizer': {
          const adj = (channel: number, eq: number): number => {
            if (eq >= 0) return channel + (255 - channel) * (eq / 100)
            return channel * (1 + eq / 100)
          }
          return rgbToHexValues(clamp(adj(r, redEq)), clamp(adj(g, greenEq)), clamp(adj(b, blueEq)))
        }
        case 'harmonizer': {
          const [h, s, l] = rgbToHslValues(r, g, b)
          const targetHue = 0
          const diff = ((h - targetHue) % 360 + 360) % 360
          const shift = diff > 180 ? 360 - diff : -diff
          const newH = ((h + shift * (amount / 100)) % 360 + 360) % 360
          const [nr, ng, nb] = hslToRgbValues(newH, s, l)
          return rgbToHexValues(nr, ng, nb)
        }
        case 'dynamic-theme': {
          const [h, s, l] = rgbToHslValues(r, g, b)
          const darkL = Math.max(5, Math.min(25, l * 0.3))
          const lightL = Math.max(75, Math.min(95, l + (100 - l) * 0.7))
          const newL = amount > 50 ? lightL : darkL
          const [nr, ng, nb] = hslToRgbValues(h, s * 0.7, newL)
          return rgbToHexValues(nr, ng, nb)
        }
        default:
          return baseColor
      }
    } catch {
      return baseColor
    }
  }, [baseColor, secondColor, adjustmentType, amount, hueRotate, saturationVal, brightnessVal, contrastVal, gammaVal, opacityVal, vibranceVal, blendMode, mixRatio, invertOn, grayscaleOn, sepiaOn, tempVal, redEq, greenEq, blueEq])

  const adjustedRgb = useMemo(() => {
    try {
      const [r, g, b] = parseHexStrict(adjustedColor)
      return `rgb(${r}, ${g}, ${b})`
    } catch { return '' }
  }, [adjustedColor])

  const adjustedHsl = useMemo(() => {
    try {
      const [r, g, b] = parseHexStrict(adjustedColor)
      const [h, s, l] = rgbToHslValues(r, g, b)
      return hslToString(h, s, l)
    } catch { return '' }
  }, [adjustedColor])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(adjustedColor)
      addToast('Copied to clipboard', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [adjustedColor, addToast])

  const handleCopyRgb = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(adjustedRgb)
      addToast('RGB copied to clipboard', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [adjustedRgb, addToast])

  const handleCopyHsl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(adjustedHsl)
      addToast('HSL copied to clipboard', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [adjustedHsl, addToast])

  const handleRandomColor = useCallback(() => {
    const hex = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`
    setBaseColor(hex)
    addToast('Random color generated', 'info')
  }, [addToast])

  const textColor = useMemo(() => {
    const [r, g, b] = parseHexStrict(baseColor)
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return lum > 0.5 ? '#000000' : '#ffffff'
  }, [baseColor])

  const adjustedTextColor = useMemo(() => {
    const [r, g, b] = parseHexStrict(adjustedColor)
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return lum > 0.5 ? '#000000' : '#ffffff'
  }, [adjustedColor])

  const showSecondColor = adjustmentType === 'mixer' || adjustmentType === 'blend' || adjustmentType === 'overlay' || adjustmentType === 'multiply' || adjustmentType === 'screen' || adjustmentType === 'soft-light' || adjustmentType === 'hard-light' || adjustmentType === 'color-dodge' || adjustmentType === 'burn'

  const pathname = usePathname()
  const toolId = pathname?.replace(/^\//, '')?.replace(/\/$/, '') || ''
  const content = useMemo(() => getToolContent(toolId), [toolId])

  return (
    <ToolContent title={title} description={description} howToUse={content.howToUse} faq={content.faq} relatedTools={content.relatedTools}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-7xl">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Color Input</span>
              <button onClick={handleRandomColor} className="text-xs text-slate-400 hover:text-rose-500 transition-colors">Random</button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={baseColor}
                  onChange={e => setBaseColor(e.target.value)}
                  className="w-14 h-14 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={baseColor}
                  onChange={e => { const v = e.target.value; if (/^#?[0-9a-fA-F]{0,6}$/.test(v)) setBaseColor(v.startsWith('#') ? v : `#${v}`) }}
                  className="flex-1 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  placeholder="#f43f5e"
                />
              </div>
              <div className="flex gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>RGB: {(() => { try { return hexToRgb(baseColor) } catch { return '' } })()}</span>
                <span>HSL: {(() => { try { return hexToHsl(baseColor) } catch { return '' } })()}</span>
              </div>

              {showSecondColor && (
                <div className="flex items-center gap-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-400 w-10">Color 2</span>
                  <input
                    type="color"
                    value={secondColor}
                    onChange={e => setSecondColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={secondColor}
                    onChange={e => { const v = e.target.value; if (/^#?[0-9a-fA-F]{0,6}$/.test(v)) setSecondColor(v.startsWith('#') ? v : `#${v}`) }}
                    className="flex-1 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Adjustment</span>
            </div>
            <div className="p-4 space-y-4">
              {(adjustmentType === 'tint' || adjustmentType === 'shade' || adjustmentType === 'tone' || adjustmentType === 'lighten' || adjustmentType === 'darken' || adjustmentType === 'desaturate') && (
                <SliderControl label="Amount" value={amount} onChange={setAmount} min={0} max={100} suffix="%" />
              )}

              {adjustmentType === 'saturation' && (
                <SliderControl label="Saturation" value={saturationVal} onChange={setSaturationVal} min={-100} max={100} />
              )}

              {adjustmentType === 'brightness' && (
                <SliderControl label="Brightness" value={brightnessVal} onChange={setBrightnessVal} min={-100} max={100} />
              )}

              {adjustmentType === 'contrast' && (
                <SliderControl label="Contrast" value={contrastVal} onChange={setContrastVal} min={-100} max={100} />
              )}

              {adjustmentType === 'hue-rotate' && (
                <SliderControl label="Hue" value={hueRotate} onChange={setHueRotate} min={0} max={360} suffix="°" />
              )}

              {adjustmentType === 'vibrance' && (
                <SliderControl label="Vibrance" value={vibranceVal} onChange={setVibranceVal} min={-100} max={100} />
              )}

              {adjustmentType === 'gamma' && (
                <SliderControl label="Gamma" value={Math.round(gammaVal * 100)} onChange={v => setGammaVal(v / 100)} min={10} max={300} displayValue={gammaVal.toFixed(1)} />
              )}

              {(adjustmentType === 'opacity' || adjustmentType === 'alpha') && (
                <SliderControl label="Opacity" value={opacityVal} onChange={setOpacityVal} min={0} max={100} suffix="%" />
              )}

              {adjustmentType === 'invert' && (
                <ToggleControl label="Invert" value={invertOn} onChange={setInvertOn} />
              )}

              {adjustmentType === 'grayscale' && (
                <>
                  <ToggleControl label="Grayscale" value={grayscaleOn} onChange={setGrayscaleOn} />
                  <SliderControl label="Amount" value={amount} onChange={setAmount} min={0} max={100} suffix="%" />
                </>
              )}

              {adjustmentType === 'sepia' && (
                <>
                  <ToggleControl label="Sepia" value={sepiaOn} onChange={setSepiaOn} />
                  <SliderControl label="Amount" value={amount} onChange={setAmount} min={0} max={100} suffix="%" />
                </>
              )}

              {adjustmentType === 'temperature' && (
                <SliderControl label="Temperature" value={tempVal} onChange={setTempVal} min={-100} max={100} leftLabel="Cool" rightLabel="Warm" />
              )}

              {(adjustmentType === 'blend' || adjustmentType === 'overlay' || adjustmentType === 'multiply' || adjustmentType === 'screen' || adjustmentType === 'soft-light' || adjustmentType === 'hard-light' || adjustmentType === 'color-dodge' || adjustmentType === 'burn') && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Blend Mode</label>
                  <div className="grid grid-cols-2 gap-1">
                    {(['multiply', 'screen', 'overlay', 'soft-light', 'hard-light', 'color-dodge', 'burn'] as const).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setBlendMode(mode)}
                        className={`px-2 py-1.5 text-xs rounded-lg capitalize transition-colors ${
                          blendMode === mode
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {mode.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {adjustmentType === 'mixer' && (
                <SliderControl label="Mix Ratio" value={mixRatio} onChange={setMixRatio} min={0} max={100} leftLabel="Color 1" rightLabel="Color 2" />
              )}

              {adjustmentType === 'harmonizer' && (
                <SliderControl label="Harmony" value={amount} onChange={setAmount} min={0} max={100} suffix="%" />
              )}

              {adjustmentType === 'dynamic-theme' && (
                <SliderControl label="Theme" value={amount} onChange={setAmount} min={0} max={100} leftLabel="Dark" rightLabel="Light" />
              )}

              {adjustmentType === 'equalizer' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Adjust individual RGB channels:</p>
                  <SliderControl label="Red" value={redEq} onChange={setRedEq} min={-100} max={100} />
                  <SliderControl label="Green" value={greenEq} onChange={setGreenEq} min={-100} max={100} />
                  <SliderControl label="Blue" value={blueEq} onChange={setBlueEq} min={-100} max={100} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Comparison</span>
            </div>
            <div className="grid grid-cols-2 gap-0">
              <div className="p-4 text-center">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Original</span>
                <div
                  className="w-full h-32 rounded-lg mt-2 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-sm font-medium transition-all"
                  style={{ backgroundColor: baseColor, color: textColor }}
                >
                  {baseColor}
                </div>
              </div>
              <div className="p-4 text-center">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Adjusted</span>
                <div
                  className="w-full h-32 rounded-lg mt-2 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-sm font-medium transition-all"
                  style={{ backgroundColor: adjustedColor, color: adjustedTextColor }}
                >
                  {adjustedColor}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Output Values</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">HEX</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-slate-800 dark:text-slate-200">{adjustedColor.toUpperCase()}</span>
                  <button onClick={handleCopy} className="text-slate-400 hover:text-rose-500 transition-colors" title="Copy HEX">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">RGB</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-slate-800 dark:text-slate-200">{adjustedRgb}</span>
                  <button onClick={handleCopyRgb} className="text-slate-400 hover:text-rose-500 transition-colors" title="Copy RGB">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">HSL</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-slate-800 dark:text-slate-200">{adjustedHsl}</span>
                  <button onClick={handleCopyHsl} className="text-slate-400 hover:text-rose-500 transition-colors" title="Copy HSL">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700">
              <Button onClick={handleCopy} size="sm" className="w-full justify-center" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              }>Copy HEX</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ToolContent>
  )
}

function SliderControl({ label, value, onChange, min, max, step, suffix, displayValue, leftLabel, rightLabel }: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  suffix?: string
  displayValue?: string
  leftLabel?: string
  rightLabel?: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</label>
        <span className="text-xs font-mono text-slate-700 dark:text-slate-300">
          {displayValue !== undefined ? displayValue : value}{suffix || ''}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer accent-rose-500"
      />
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between mt-0.5">
          <span className="text-xs text-slate-400">{leftLabel || ''}</span>
          <span className="text-xs text-slate-400">{rightLabel || ''}</span>
        </div>
      )}
    </div>
  )
}

function ToggleControl({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</label>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors ${value ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-600'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${value ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  )
}

function blendColors(c1: string, c2: string, mode: BlendMode): string {
  const [r1, g1, b1] = parseHexStrict(c1)
  const [r2, g2, b2] = parseHexStrict(c2)
  const nr = r1 / 255, ng = g1 / 255, nb = b1 / 255
  const mr = r2 / 255, mg = g2 / 255, mb = b2 / 255

  const blend = (a: number, b: number): number => {
    switch (mode) {
      case 'multiply': return a * b
      case 'screen': return 1 - (1 - a) * (1 - b)
      case 'overlay': return a < 0.5 ? 2 * a * b : 1 - 2 * (1 - a) * (1 - b)
      case 'soft-light': return (1 - 2 * b) * a * a + 2 * b * a
      case 'hard-light': return b < 0.5 ? 2 * a * b : 1 - 2 * (1 - a) * (1 - b)
      case 'color-dodge': return a === 1 ? 1 : Math.min(1, b / (1 - a))
      case 'burn': return a === 0 ? 0 : 1 - Math.min(1, (1 - b) / a)
    }
  }

  return rgbToHexValues(
    clamp(blend(nr, mr) * 255),
    clamp(blend(ng, mg) * 255),
    clamp(blend(nb, mb) * 255),
  )
}
