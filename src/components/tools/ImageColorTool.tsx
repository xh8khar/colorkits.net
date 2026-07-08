'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useToast } from '@/components/ui/Toast'
import { rgbToHexValues } from '@/lib/converters'

interface ColorResult {
  hex: string
  r: number
  g: number
  b: number
  count: number
  percentage: number
}

interface ImageColorToolProps {
  title: string
  description: string
  toolType:
    | 'palette-extractor'
    | 'dominant-color'
    | 'average-color'
    | 'logo-color'
    | 'website-screenshot'
    | 'gradient-from-image'
    | 'image-to-css'
    | 'histogram'
    | 'cluster-analyzer'
    | 'bg-color-detector'
    | 'transparent-detector'
    | 'photo-palette'
    | 'pixel-analyzer'
    | 'color-counter'
    | 'brand-color-finder'
    | 'theme-generator'
    | 'balance-analyzer'
    | 'saturation-analyzer'
    | 'brightness-analyzer'
    | 'vibrance-analyzer'
    | 'temperature-detector'
    | 'shadow-detector'
    | 'highlight-detector'
    | 'mood-generator'
    | 'accent-color-finder'
    | 'screenshot-palette'
    | 'icon-palette'
    | 'artwork-palette'
    | 'wallpaper-palette'
    | 'batch-extractor'
}

function quantizeColor(r: number, g: number, b: number, levels: number = 6): string {
  const step = 256 / levels
  const rr = Math.round(Math.floor(r / step) * step)
  const gg = Math.round(Math.floor(g / step) * step)
  const bb = Math.round(Math.floor(b / step) * step)
  return `${rr},${gg},${bb}`
}

function rgbDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
}

function mergeSimilar(colors: ColorResult[], threshold: number = 60): ColorResult[] {
  const merged: ColorResult[] = []
  for (const c of colors) {
    let found = false
    for (const m of merged) {
      if (rgbDistance(c.r, c.g, c.b, m.r, m.g, m.b) < threshold) {
        const total = m.count + c.count
        m.r = Math.round((m.r * m.count + c.r * c.count) / total)
        m.g = Math.round((m.g * m.count + c.g * c.count) / total)
        m.b = Math.round((m.b * m.count + c.b * c.count) / total)
        m.count = total
        m.hex = rgbToHexValues(m.r, m.g, m.b)
        found = true
        break
      }
    }
    if (!found) merged.push({ ...c })
  }
  merged.sort((a, b) => b.count - a.count)
  const total = merged.reduce((s, c) => s + c.count, 0)
  for (const m of merged) m.percentage = Math.round((m.count / total) * 10000) / 100
  return merged
}

function extractPalette(
  imageData: ImageData,
  maxColors: number = 8
): { colors: ColorResult[]; dominant: ColorResult | null; average: ColorResult } {
  const { data, width, height } = imageData
  const totalPixels = width * height
  const colorMap = new Map<string, { r: number; g: number; b: number; count: number }>()

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]
    if (a < 128) continue
    const key = quantizeColor(r, g, b, 6)
    const existing = colorMap.get(key)
    if (existing) {
      existing.r += r
      existing.g += g
      existing.b += b
      existing.count++
    } else {
      colorMap.set(key, { r, g, b, count: 1 })
    }
  }

  const avgR = Math.round(data.reduce((s, v, i) => (i % 4 === 0 ? s + v : s), 0) / totalPixels)
  const avgG = Math.round(data.reduce((s, v, i) => (i % 4 === 1 ? s + v : s), 0) / totalPixels)
  const avgB = Math.round(data.reduce((s, v, i) => (i % 4 === 2 ? s + v : s), 0) / totalPixels)
  const average: ColorResult = {
    hex: rgbToHexValues(avgR, avgG, avgB),
    r: avgR,
    g: avgG,
    b: avgB,
    count: totalPixels,
    percentage: 100,
  }

  const raw: ColorResult[] = []
  for (const [, v] of colorMap) {
    const count = v.count
    const r = Math.round(v.r / count)
    const g = Math.round(v.g / count)
    const b = Math.round(v.b / count)
    raw.push({ hex: rgbToHexValues(r, g, b), r, g, b, count, percentage: 0 })
  }

  raw.sort((a, b) => b.count - a.count)

  const merged = mergeSimilar(raw, 50)

  const colors = merged.slice(0, maxColors)
  const totalCount = colors.reduce((s, c) => s + c.count, 0)
  for (const c of colors) c.percentage = Math.round((c.count / totalCount) * 10000) / 100

  const dominant = colors.length > 0 ? colors[0] : null

  return { colors, dominant, average }
}

function getHistogram(imageData: ImageData): number[] {
  const bins = 64
  const hist = new Array(bins).fill(0)
  const { data } = imageData
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const luminance = Math.round((r * 0.2126 + g * 0.7152 + b * 0.0722) / 4)
    hist[luminance]++
  }
  const max = Math.max(...hist, 1)
  return hist.map(v => (v / max) * 100)
}

export default function ImageColorTool({ title, description, toolType }: ImageColorToolProps) {
  const [image, setImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [colors, setColors] = useState<ColorResult[]>([])
  const [dominant, setDominant] = useState<ColorResult | null>(null)
  const [average, setAverage] = useState<ColorResult | null>(null)
  const [histogram, setHistogram] = useState<number[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gradientColors, setGradientColors] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const { addToast } = useToast()

  const processImage = useCallback((file: File) => {
    setLoading(true)
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxDim = 300
        let w = img.width
        let h = img.height
        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim / w, maxDim / h)
          w = Math.round(w * ratio)
          h = Math.round(h * ratio)
        }
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, w, h)
        const imageData = ctx.getImageData(0, 0, w, h)

        const result = extractPalette(imageData, toolType === 'average-color' ? 1 : 8)
        setColors(result.colors)
        setDominant(result.dominant)
        setAverage(result.average)
        setHistogram(getHistogram(imageData))

        if (toolType === 'gradient-from-image' && result.colors.length >= 2) {
          setGradientColors(result.colors.slice(0, 4).map(c => c.hex))
        }

        setImage(canvas.toDataURL())
        setLoading(false)
        addToast('Image processed successfully', 'success')
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [toolType, addToast])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) processImage(file)
    else addToast('Please drop an image file', 'error')
  }, [processImage, addToast])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processImage(file)
  }, [processImage])

  const handleCopyColors = useCallback(async () => {
    const hexValues = colors.map(c => c.hex).join(', ')
    try {
      await navigator.clipboard.writeText(hexValues)
      addToast('Colors copied to clipboard', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [colors, addToast])

  const handleCopyDominant = useCallback(async () => {
    if (!dominant) return
    try {
      await navigator.clipboard.writeText(dominant.hex)
      addToast('Dominant color copied', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [dominant, addToast])

  const getResultTitle = () => {
    switch (toolType) {
      case 'dominant-color': return 'Dominant Colors'
      case 'average-color': return 'Average Color'
      case 'palette-extractor':
      case 'photo-palette':
      case 'screenshot-palette':
      case 'icon-palette':
      case 'artwork-palette':
      case 'wallpaper-palette': return 'Extracted Palette'
      case 'gradient-from-image': return 'Gradient Colors'
      case 'histogram': return 'Luminance Histogram'
      case 'color-counter': return 'Color Counts'
      default: return 'Extracted Colors'
    }
  }

  const ColorSwatch = ({ color, label, pct }: { color: string; label: string; pct?: number }) => (
    <button
      onClick={() => {
        navigator.clipboard.writeText(color)
        addToast(`Copied ${color}`, 'success')
      }}
      className="group relative flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-md transition-all duration-200"
    >
      <div
        className="w-full h-16 rounded-lg border border-slate-200 dark:border-slate-600"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">{color}</span>
      {pct !== undefined && (
        <span className="text-[10px] text-slate-400 dark:text-slate-500">{pct}%</span>
      )}
      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-full">{label}</span>
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-hover:ring-rose-500/30 transition-all" />
    </button>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-7xl">{description}</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-12 mb-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
          isDragOver
            ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10'
            : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:border-slate-400 dark:hover:border-slate-500'
        }`}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <svg className="w-10 h-10 animate-spin text-rose-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Processing image...</p>
          </div>
        ) : image ? (
          <div className="flex flex-col items-center gap-3">
            <img src={image} alt="Preview" className="max-h-48 rounded-lg shadow-sm" />
            <p className="text-xs text-slate-400 dark:text-slate-500">{fileName}</p>
            <button
              onClick={(e) => { e.stopPropagation(); setImage(null); setColors([]); setDominant(null); setAverage(null); setHistogram([]) }}
              className="text-xs text-rose-500 hover:text-rose-600 underline"
            >
              Remove & upload another
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <svg className="w-12 h-12 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Drop an image here or click to browse
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Supports JPG, PNG, GIF, WebP</p>
          </div>
        )}
      </div>

      {image && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{getResultTitle()}</h2>
            <div className="flex gap-2">
              {dominant && (
                <button
                  onClick={handleCopyDominant}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Dominant
                </button>
              )}
              {colors.length > 0 && (
                <button
                  onClick={handleCopyColors}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy All
                </button>
              )}
            </div>
          </div>

          {(toolType === 'dominant-color' || toolType === 'average-color') && dominant && (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-6">
                <div
                  className="w-24 h-24 rounded-2xl border-2 border-slate-200 dark:border-slate-600 shadow-lg shrink-0"
                  style={{ backgroundColor: toolType === 'average-color' && average ? average.hex : dominant.hex }}
                />
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white">
                      {toolType === 'average-color' && average ? average.hex : dominant.hex}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(toolType === 'average-color' && average ? average.hex : dominant.hex)
                        addToast('Copied', 'success')
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    RGB({toolType === 'average-color' && average ? `${average.r}, ${average.g}, ${average.b}` : `${dominant.r}, ${dominant.g}, ${dominant.b}`})
                  </p>
                  {dominant.percentage > 0 && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      Covers {dominant.percentage}% of image
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {colors.length > 0 && toolType !== 'average-color' && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {colors.map((c, i) => (
                  <ColorSwatch
                    key={`${c.hex}-${i}`}
                    color={c.hex}
                    label={`#${i + 1}`}
                    pct={c.percentage}
                  />
                ))}
              </div>
            </div>
          )}

          {toolType === 'gradient-from-image' && gradientColors.length >= 2 && (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Generated Gradient</h3>
              <div
                className="h-16 rounded-xl border border-slate-200 dark:border-slate-600"
                style={{
                  background: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
                }}
              />
              <div className="flex gap-2 mt-2">
                {gradientColors.map((g, i) => (
                  <span key={i} className="text-xs font-mono text-slate-500 dark:text-slate-400">{g}</span>
                ))}
              </div>
            </div>
          )}

          {toolType === 'histogram' && histogram.length > 0 && (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Luminance Distribution</h3>
              <div className="flex items-end gap-[2px] h-32">
                {histogram.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-rose-400 dark:bg-rose-500 transition-all duration-300"
                    style={{ height: `${v}%`, opacity: 0.6 + (v / 100) * 0.4 }}
                    title={`Bin ${i * 4}-${(i + 1) * 4}: ${v.toFixed(1)}%`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-slate-400 dark:text-slate-500">
                <span>Dark</span>
                <span>Light</span>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {!image && !loading && (
        <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="text-center text-slate-400 dark:text-slate-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-200 dark:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Upload an image to extract colors</p>
          </div>
        </div>
      )}
    </div>
  )
}
