'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import ToolContent from './ToolContent'
import { getToolContent } from '@/lib/toolContent'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import {
  hexToRgbValues,
  rgbToHslValues,
  hslToRgbValues,
  rgbToHexValues,
  complementaryColor,
  randomColor,
} from '@/lib/converters'

interface PaletteColor {
  hex: string
  locked: boolean
}

interface PaletteGeneratorToolProps {
  title: string
  description: string
  paletteType: PaletteType
}

type PaletteType = 'random' | 'ai' | 'brand' | 'ui' | 'material' | 'tailwind' | 'bootstrap' | 'dark-theme' | 'light-theme' | 'pastel' | 'neon' | 'vintage' | 'retro' | 'nature' | 'ocean' | 'sunset' | 'autumn' | 'spring' | 'winter' | 'summer' | 'monochromatic' | 'analogous' | 'complementary' | 'split-complementary' | 'triadic' | 'tetradic' | 'square' | 'rainbow' | 'earth-tone' | 'flat-ui' | 'corporate' | 'luxury' | 'gaming' | 'ecommerce' | 'dashboard' | 'mobile-app' | 'saas' | 'logo' | 'fashion' | 'food'

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}

function toHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgbValues(hex)
  return rgbToHslValues(r, g, b)
}

function fromHsl(h: number, s: number, l: number): string {
  const [r, g, b] = hslToRgbValues(((h % 360) + 360) % 360, s, l)
  return rgbToHexValues(r, g, b)
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgbValues(hex)
  const rs = r / 255, gs = g / 255, bs = b / 255
  const rl = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4)
  const gl = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4)
  const bl = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4)
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl
}

function textColorForBg(hex: string): string {
  return luminance(hex) > 0.5 ? '#0f172a' : '#ffffff'
}

const ch = (h: number) => ((h % 360) + 360) % 360

function generatePalette(baseColor: string, type: PaletteType): string[] {
  const [bh, bs, bl] = toHsl(baseColor)

  switch (type) {
    case 'monochromatic': {
      const colors: string[] = [baseColor]
      for (let i = 0; i < 3; i++) {
        const pct = (i + 1) / 5
        colors.push(fromHsl(bh, bs, Math.round(bl * (1 - pct))))
      }
      for (let i = 0; i < 3; i++) {
        const pct = (i + 1) / 5
        colors.push(fromHsl(bh, bs, Math.round(bl + (100 - bl) * pct)))
      }
      return colors
    }
    case 'analogous':
      return [baseColor, ...[-40, -20, 20, 40].map(o => fromHsl(ch(bh + o), bs, bl))]
    case 'complementary': {
      const comp = complementaryColor(baseColor)
      const [ch_, cs, cl_] = toHsl(comp)
      return [
        baseColor,
        comp,
        fromHsl(ch(ch_ + 150), cs, cl_),
        fromHsl(ch(ch_ + 210), cs, cl_),
        fromHsl(ch(ch_ + 30), clamp(cs * 0.5, 20, 50), clamp(cl_ + 15, 50, 80)),
      ]
    }
    case 'split-complementary':
      return [baseColor, fromHsl(ch(bh + 150), bs, bl), fromHsl(ch(bh + 210), bs, bl), fromHsl(ch(bh + 150), clamp(bs * 0.5, 25, 55), clamp(bl + 20, 55, 85)), fromHsl(ch(bh + 210), bs, clamp(bl * 0.6, 15, 40))]
    case 'triadic': {
      const t1 = fromHsl(ch(bh + 120), bs, bl)
      const t2 = fromHsl(ch(bh + 240), bs, bl)
      return [baseColor, t1, t2, fromHsl(ch(bh + 120), clamp(bs * 0.5, 20, 50), clamp(bl + 20, 50, 80)), fromHsl(ch(bh + 240), clamp(bs * 0.5, 20, 50), clamp(bl + 15, 45, 75))]
    }
    case 'tetradic': {
      const offsets = [60, 180, 240]
      const others = offsets.map(o => fromHsl(ch(bh + o), bs, bl))
      return [baseColor, ...others, fromHsl(ch(bh + 120), clamp(bs * 0.4, 20, 45), clamp(bl + 20, 50, 80))]
    }
    case 'square': {
      const offsets = [90, 180, 270]
      const others = offsets.map(o => fromHsl(ch(bh + o), bs, bl))
      return [baseColor, ...others, fromHsl(ch(bh + 45), clamp(bs * 0.5, 25, 55), clamp(bl + 15, 45, 75))]
    }
    case 'rainbow':
      return [0, 50, 100, 150, 200, 250, 300].map(h => fromHsl(h, 80, 55))
    case 'pastel': {
      const s = clamp(bs * 0.35, 18, 40)
      const l = clamp(bl + 25, 75, 92)
      return [-40, -20, 0, 20, 40].map(o => fromHsl(ch(bh + o), s, l))
    }
    case 'neon':
      return [-40, -20, 0, 20, 40].map(o => fromHsl(ch(bh + o), 95, 55))
    case 'dark-theme': {
      const bg = fromHsl(bh, clamp(bs * 0.3, 5, 15), 10)
      const surface = fromHsl(bh, clamp(bs * 0.4, 10, 20), 18)
      const border = fromHsl(bh, clamp(bs * 0.3, 10, 20), 28)
      const muted = fromHsl(bh, clamp(bs * 0.2, 5, 15), 50)
      const text = fromHsl(bh, clamp(bs * 0.1, 0, 10), 90)
      const accent = fromHsl(ch(bh + 180), 70, 60)
      return [bg, surface, border, muted, text, baseColor, accent]
    }
    case 'light-theme': {
      const bg = fromHsl(bh, clamp(bs * 0.1, 0, 10), 98)
      const border = fromHsl(bh, clamp(bs * 0.2, 5, 15), 90)
      const muted = fromHsl(bh, clamp(bs * 0.2, 10, 20), 60)
      const text = fromHsl(bh, clamp(bs * 0.1, 0, 10), 15)
      const accent = fromHsl(ch(bh + 180), 70, 50)
      return ['#ffffff', bg, border, muted, text, baseColor, accent]
    }
    case 'random':
      return Array.from({ length: 6 }, () => randomColor())
    case 'ai':
    case 'brand': {
      const s = fromHsl(ch(bh + 30), clamp(bs - 10, 50, 90), clamp(bl - 5, 30, 60))
      const a1 = fromHsl(ch(bh + 180), 75, 55)
      const a2 = fromHsl(ch(bh - 30), clamp(bs - 10, 40, 80), clamp(bl + 10, 40, 70))
      const n = fromHsl(ch(bh + 10), clamp(bs * 0.2, 2, 10), clamp(bl * 0.3, 10, 25))
      return [baseColor, s, a1, a2, n, '#ffffff']
    }
    case 'vintage':
    case 'retro':
      return [0, 15, 30, 45, 60, 75].map(o => fromHsl(30 + o, 35, 45))
    case 'nature':
      return [120, 90, 150, 30, 60, 200].map(h => fromHsl(h, 55, 45))
    case 'ocean':
      return [190, 200, 210, 220, 180, 170].map(h => fromHsl(h, 60, 45))
    case 'sunset':
      return [10, 20, 350, 330, 40, 50].map(h => fromHsl(h, 75, 55))
    case 'autumn':
      return [20, 30, 10, 40, 350, 45].map(h => fromHsl(h, 65, 45))
    case 'spring':
      return [120, 140, 90, 30, 350, 160].map(h => fromHsl(h, 55, 65))
    case 'winter':
      return [210, 200, 220, 230, 190, 240].map(h => fromHsl(h, 30, 70))
    case 'summer':
      return [40, 50, 30, 10, 350, 60].map(h => fromHsl(h, 70, 55))
    case 'earth-tone':
      return [25, 15, 35, 10, 30, 5].map(h => fromHsl(h, 40, 40))
    case 'flat-ui':
      return [190, 160, 210, 50, 340, 220].map(h => fromHsl(h, 70, 50))
    case 'corporate':
      return [210, 200, 220, 230, 190, 215].map(h => fromHsl(h, 40, 40))
    case 'luxury':
      return [40, 35, 45, 30, 50, 38].map(h => fromHsl(h, 55, 35))
    case 'gaming':
      return [260, 280, 240, 300, 320, 200].map(h => fromHsl(h, 80, 55))
    case 'ecommerce':
      return [210, 160, 50, 340, 220, 190].map(h => fromHsl(h, 65, 50))
    case 'dashboard':
      return [210, 190, 160, 140, 50, 340].map(h => fromHsl(h, 60, 50))
    case 'mobile-app':
      return [210, 200, 230, 160, 340, 50].map(h => fromHsl(h, 65, 55))
    case 'saas':
      return [220, 200, 180, 210, 230, 190].map(h => fromHsl(h, 50, 50))
    case 'logo': {
      const secondary = fromHsl(ch(bh + 40), clamp(bs - 5, 60, 90), clamp(bl - 10, 30, 55))
      const accent = fromHsl(ch(bh + 180), 70, 50)
      const dark = fromHsl(bh, clamp(bs * 0.2, 2, 10), clamp(bl * 0.2, 8, 20))
      return [baseColor, secondary, accent, dark, '#ffffff']
    }
    case 'fashion':
      return [340, 350, 330, 320, 10, 20].map(h => fromHsl(h, 60, 55))
    case 'food':
      return [10, 20, 350, 30, 340, 5].map(h => fromHsl(h, 65, 50))
    case 'material':
    case 'tailwind':
    case 'bootstrap':
    case 'ui':
    default: {
      const secondary = fromHsl(ch(bh + 30), clamp(bs - 10, 50, 85), clamp(bl - 8, 35, 60))
      const accent = fromHsl(ch(bh + 180), 70, 50)
      const success = fromHsl(160, 60, 45)
      const warning = fromHsl(45, 85, 50)
      const danger = fromHsl(0, 75, 50)
      const info = fromHsl(200, 65, 50)
      return [baseColor, secondary, accent, success, warning, danger, info]
    }
  }
}

const defaultBaseColors: Record<string, string> = {
  monochromatic: '#3b82f6', analogous: '#8b5cf6', complementary: '#ef4444',
  'split-complementary': '#10b981', triadic: '#f59e0b', tetradic: '#6366f1',
  square: '#ec4899', rainbow: '#f43f5e', pastel: '#a78bfa', neon: '#f43f5e',
  'dark-theme': '#6366f1', 'light-theme': '#6366f1', random: '#3b82f6',
  ai: '#8b5cf6', brand: '#2563eb', vintage: '#b45309', retro: '#b45309',
  nature: '#16a34a', ocean: '#0891b2', sunset: '#ea580c', autumn: '#d97706',
  spring: '#65a30d', winter: '#0284c7', summer: '#d97706', 'earth-tone': '#92400e',
  'flat-ui': '#0ea5e9', corporate: '#1e40af', luxury: '#ca8a04', gaming: '#7c3aed',
  ecommerce: '#2563eb', dashboard: '#0ea5e9', 'mobile-app': '#6366f1',
  saas: '#4f46e5', logo: '#f43f5e', fashion: '#db2777', food: '#ea580c',
  material: '#6366f1', tailwind: '#0ea5e9', bootstrap: '#7c3aed', ui: '#6366f1',
}

const noBaseColorTypes = new Set([
  'random', 'rainbow', 'vintage', 'retro', 'nature', 'ocean', 'sunset',
  'autumn', 'spring', 'winter', 'summer', 'earth-tone', 'flat-ui',
  'corporate', 'luxury', 'gaming', 'ecommerce', 'dashboard', 'mobile-app',
  'saas', 'fashion', 'food',
])

const typeLabels: Record<string, { name: string; description: string }> = {
  monochromatic: { name: 'Monochromatic', description: 'Multiple shades and tints of a single hue create a clean, unified look.' },
  analogous: { name: 'Analogous', description: 'Colors that sit next to each other on the color wheel for harmonious designs.' },
  complementary: { name: 'Complementary', description: 'Opposite colors on the wheel that create high contrast and visual interest.' },
  'split-complementary': { name: 'Split Complementary', description: 'A base hue paired with two adjacent to its complement for balanced contrast.' },
  triadic: { name: 'Triadic', description: 'Three evenly spaced colors on the wheel for vibrant, balanced palettes.' },
  tetradic: { name: 'Tetradic', description: 'Two complementary pairs forming a rectangle on the color wheel.' },
  square: { name: 'Square', description: 'Four evenly spaced colors creating a balanced, rich palette.' },
  pastel: { name: 'Pastel', description: 'Soft, muted tones with high lightness for gentle and approachable designs.' },
  neon: { name: 'Neon', description: 'Bright, highly saturated colors that pop and demand attention.' },
  'dark-theme': { name: 'Dark Theme', description: 'A complete dark mode palette optimized for low-light environments.' },
  'light-theme': { name: 'Light Theme', description: 'A clean light mode palette with optimal contrast and readability.' },
  random: { name: 'Random', description: 'A completely random palette generated on the fly.' },
  ai: { name: 'AI Palette', description: 'An intelligently balanced palette with harmonious color relationships.' },
  brand: { name: 'Brand Palette', description: 'A professional brand identity palette with primary and accent colors.' },
  vintage: { name: 'Vintage', description: 'Warm, nostalgic tones that evoke a sense of history and craftsmanship.' },
  nature: { name: 'Nature', description: 'Earthy greens and browns inspired by the natural world.' },
  ocean: { name: 'Ocean', description: 'Cool blues and teals that capture the depths of the sea.' },
  sunset: { name: 'Sunset', description: 'Warm oranges, pinks, and purples reminiscent of a setting sun.' },
  autumn: { name: 'Autumn', description: 'Rich oranges, browns, and yellows inspired by fall foliage.' },
  spring: { name: 'Spring', description: 'Fresh greens, pinks, and light tones celebrating renewal.' },
  winter: { name: 'Winter', description: 'Cool, crisp blues and whites evoking a frosty landscape.' },
  summer: { name: 'Summer', description: 'Bright, warm colors that capture the energy of summer.' },
  'earth-tone': { name: 'Earth Tone', description: 'Natural, grounded colors drawn from soil, stone, and clay.' },
  'flat-ui': { name: 'Flat UI', description: 'Modern flat design colors optimized for user interface design.' },
  corporate: { name: 'Corporate', description: 'Professional, trustworthy blues and neutrals for business contexts.' },
  luxury: { name: 'Luxury', description: 'Elegant golds, deep tones, and sophisticated accents.' },
  gaming: { name: 'Gaming', description: 'Vibrant, electric colors with high energy and contrast.' },
  ecommerce: { name: 'E-commerce', description: 'Conversion-optimized colors for online stores and shopping.' },
  dashboard: { name: 'Dashboard', description: 'Data-friendly colors suitable for charts, graphs, and analytics.' },
  'mobile-app': { name: 'Mobile App', description: 'Modern mobile-first color scheme for app interfaces.' },
  saas: { name: 'SaaS', description: 'Clean, professional SaaS product colors with a modern feel.' },
  logo: { name: 'Logo', description: 'A focused brand palette with primary, secondary, and neutral tones.' },
  fashion: { name: 'Fashion', description: 'Trend-forward colors from the world of fashion and style.' },
  food: { name: 'Food', description: 'Appetizing warm colors that evoke flavor and freshness.' },
  material: { name: 'Material Design', description: 'Google Material Design-inspired palette with primary, accent, and semantic colors.' },
  tailwind: { name: 'Tailwind CSS', description: 'A Tailwind CSS-inspired palette with utility-first color tokens.' },
  bootstrap: { name: 'Bootstrap', description: 'A Bootstrap-inspired palette with default theme colors.' },
  ui: { name: 'UI Palette', description: 'A comprehensive interface palette with all essential UI colors.' },
  rainbow: { name: 'Rainbow', description: 'A full spectrum of colors from red through violet.' },
}

export default function PaletteGeneratorTool({ title, description, paletteType }: PaletteGeneratorToolProps) {
  const { addToast } = useToast()
  const [baseColor, setBaseColor] = useState<string>(() => defaultBaseColors[paletteType] || '#f43f5e')
  const [colors, setColors] = useState<PaletteColor[]>([])
  const [genKey, setGenKey] = useState(0)
  const needsBase = !noBaseColorTypes.has(paletteType)

  const pathname = usePathname()
  const toolId = pathname?.replace(/^\//, '')?.replace(/\/$/, '') || ''
  const content = useMemo(() => getToolContent(toolId), [toolId])

  const regenerate = useCallback(() => {
    setColors(prev => {
      const hexes = generatePalette(baseColor, paletteType)
      return hexes.map((hex, i) => ({
        hex,
        locked: prev[i]?.locked || false,
      }))
    })
    setGenKey(k => k + 1)
  }, [baseColor, paletteType])

  useEffect(() => {
    const def = defaultBaseColors[paletteType] || '#f43f5e'
    setBaseColor(def)
    setColors(generatePalette(def, paletteType).map(hex => ({ hex, locked: false })))
    setGenKey(k => k + 1)
  }, [paletteType])

  const handleBaseColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setBaseColor(val)
    if (needsBase) {
      setColors(prev => {
        const hexes = generatePalette(val, paletteType)
        return hexes.map((hex, i) => ({ hex, locked: prev[i]?.locked || false }))
      })
    }
  }, [paletteType, needsBase])

  const handleHexInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setBaseColor(val)
    if (/^#[0-9a-fA-F]{6}$/.test(val) && needsBase) {
      setColors(prev => {
        const hexes = generatePalette(val, paletteType)
        return hexes.map((hex, i) => ({ hex, locked: prev[i]?.locked || false }))
      })
    }
  }, [paletteType, needsBase])

  const toggleLock = useCallback((index: number) => {
    setColors(prev => prev.map((c, i) => i === index ? { ...c, locked: !c.locked } : c))
  }, [])

  const copyColor = useCallback(async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      addToast(`Copied ${hex}`, 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [addToast])

  const exportCss = useCallback(async () => {
    const css = colors.map((c, i) => `  --color-${i}: ${c.hex};`).join('\n')
    const code = `:root {\n${css}\n}`
    try {
      await navigator.clipboard.writeText(code)
      addToast('CSS variables copied', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [colors, addToast])

  const exportJson = useCallback(async () => {
    const json = JSON.stringify(colors.map(c => c.hex), null, 2)
    try {
      await navigator.clipboard.writeText(json)
      addToast('JSON palette copied', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [colors, addToast])

  const exportArray = useCallback(async () => {
    const arr = colors.map(c => `'${c.hex}'`)
    try {
      await navigator.clipboard.writeText(`[${arr.join(', ')}]`)
      addToast('Array copied', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [colors, addToast])

  const anyLocked = colors.some(c => c.locked)

  return (
    <ToolContent title={title} description={description} howToUse={content.howToUse} faq={content.faq} relatedTools={content.relatedTools}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          {typeLabels[paletteType]?.description || description}
        </p>
      </div>

      {needsBase && (
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Base Color</span>
          <input
            type="color"
            value={baseColor}
            onChange={handleBaseColorChange}
            className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent"
          />
          <input
            type="text"
            value={baseColor}
            onChange={handleHexInput}
            className="px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-28 font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            placeholder="#ff0000"
          />
        </div>
      )}

      <div key={genKey} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {colors.map((color, i) => {
          const textColor = textColorForBg(color.hex)
          return (
            <div
              key={`${genKey}-${i}`}
              className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group bg-white dark:bg-slate-800"
            >
              <div
                className="h-24 sm:h-28 cursor-pointer flex items-end justify-center pb-2 transition-transform active:scale-95"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyColor(color.hex)}
                title="Click to copy"
              >
                <span
                  className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white"
                >
                  {color.hex}
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-800">
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">{color.hex.toUpperCase()}</span>
                <button
                  onClick={() => toggleLock(i)}
                  className={`p-1 rounded transition-colors ${
                    color.locked
                      ? 'text-rose-500 hover:text-rose-600'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                  title={color.locked ? 'Unlock color' : 'Lock color'}
                >
                  {color.locked ? (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button onClick={regenerate} icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        }>
          Regenerate
        </Button>
        <Button variant="secondary" onClick={exportCss} icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
        }>
          CSS Variables
        </Button>
        <Button variant="secondary" onClick={exportJson}>JSON</Button>
        <Button variant="secondary" onClick={exportArray}>Array</Button>
        <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
          {anyLocked ? 'Locked colors preserved on regenerate' : 'Click lock icon to preserve colors'}
        </span>
      </div>
    </div>
    </ToolContent>
  )
}
