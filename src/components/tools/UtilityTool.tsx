'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import {
  colorName,
  randomColor,
  deltaE,
  complementaryColor,
  analogousColors,
  triadicColors,
  tetradicColors,
  splitComplementary,
  hexToRgbValues,
  rgbToHexValues,
  rgbToHslValues,
  hslToRgbValues,
  parseColor,
  hexToRgb,
  hexToHsl,
  hexToHsv,
  hexToCmyk,
  hexToLab,
  hexToLch,
  hexToOklab,
  hexToOklch,
} from '@/lib/converters'

interface UtilityToolProps {
  title: string
  description: string
  utilityType:
    | 'color-name'
    | 'similarity'
    | 'duplicate'
    | 'delta-e'
    | 'random'
    | 'color-wheel'
    | 'exporter'
    | 'importer'
    | 'css-variables'
    | 'tailwind-theme'
    | 'figma'
    | 'ase'
    | 'scss'
    | 'json-palette'
    | 'android-xml'
    | 'swift-assets'
    | 'flutter-theme'
    | 'react-theme'
    | 'design-tokens'
    | 'playground'
}

function getTextColor(hex: string): string {
  const [r, g, b] = hexToRgbValues(hex)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

// ---- Color Name ----
function ColorNameFinder() {
  const [hex, setHex] = useState('#ff0044')
  const [name, setName] = useState('')
  const { addToast } = useToast()

  useEffect(() => {
    try {
      setName(colorName(hex))
    } catch {
      setName('Unknown')
    }
  }, [hex])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <input
          type="color"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer"
        />
        <div>
          <input
            type="text"
            value={hex}
            onChange={(e) => {
              const v = e.target.value
              if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setHex(v)
            }}
            className="font-mono text-lg font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent focus:border-rose-500 focus:outline-none"
          />
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Closest CSS color name
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div
          className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-600 shrink-0"
          style={{ backgroundColor: hex }}
        />
        <div>
          <p className="text-xl font-bold text-slate-900 dark:text-white capitalize">{name || 'Unknown'}</p>
          <p className="text-sm font-mono text-slate-500 dark:text-slate-400">{hex}</p>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(name)
            addToast('Copied color name', 'success')
          }}
          className="ml-auto px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          Copy Name
        </button>
      </div>
    </div>
  )
}

// ---- Random Color Generator ----
function RandomColorGenerator() {
  const [color, setColor] = useState(randomColor)
  const { addToast } = useToast()

  const generate = useCallback(() => setColor(randomColor()), [])

  useEffect(() => { generate() }, [])

  const formats = [
    { label: 'HEX', value: color },
    { label: 'RGB', value: hexToRgb(color) },
    { label: 'HSL', value: hexToHsl(color) },
    { label: 'HSV', value: hexToHsv(color) },
    { label: 'CMYK', value: hexToCmyk(color) },
  ]

  return (
    <div className="space-y-6">
      <div
        className="h-40 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all duration-300"
        style={{ backgroundColor: color }}
      >
        <span
          className="text-2xl font-mono font-bold px-4 py-2 rounded-lg backdrop-blur-sm"
          style={{ color: getTextColor(color), backgroundColor: color + '40' }}
        >
          {color}
        </span>
      </div>
      <Button onClick={generate} size="lg" className="w-full">
        Generate New
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {formats.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => {
              navigator.clipboard.writeText(value)
              addToast(`Copied ${value}`, 'success')
            }}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-rose-300 dark:hover:border-rose-700 transition-all group"
          >
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">{label}</span>
            <span className="font-mono text-sm text-slate-900 dark:text-white">{value}</span>
            <svg className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

// ---- Color Wheel ----
function ColorWheel() {
  const { addToast } = useToast()
  const [selectedHex, setSelectedHex] = useState('#ff0044')
  const [harmonies, setHarmonies] = useState<{ label: string; colors: string[] }[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const size = canvas.width
    const cx = size / 2
    const cy = size / 2
    const radius = size / 2 - 8

    ctx.clearRect(0, 0, size, size)

    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = (angle - 90) * Math.PI / 180
      const endAngle = (angle + 1 - 90) * Math.PI / 180

      const sat = 100
      const light = 50
      const [r, g, b] = hslToRgbValues(angle, sat, light)
      const hex = rgbToHexValues(r, g, b)

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = hex
      ctx.fill()
    }

    ctx.beginPath()
    ctx.arc(cx, cy, radius * 0.65, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
  }, [])

  useEffect(() => {
    try {
      const comp = complementaryColor(selectedHex)
      const analogous = JSON.parse(analogousColors(selectedHex)) as string[]
      const triadic = JSON.parse(triadicColors(selectedHex)) as string[]
      const tetradic = JSON.parse(tetradicColors(selectedHex)) as string[]
      const split = JSON.parse(splitComplementary(selectedHex)) as string[]

      setHarmonies([
        { label: 'Complementary', colors: [comp] },
        { label: 'Analogous', colors: analogous },
        { label: 'Triadic', colors: triadic },
        { label: 'Tetradic', colors: tetradic },
        { label: 'Split Complementary', colors: split },
      ])
    } catch {
      setHarmonies([])
    }
  }, [selectedHex])

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ctx = canvas.getContext('2d')!
    const pixel = ctx.getImageData(x, y, 1, 1).data
    if (pixel[3] === 0) return
    const hex = rgbToHexValues(pixel[0], pixel[1], pixel[2])
    setSelectedHex(hex)
  }, [])

  const handleCanvasMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return
    handleCanvasClick(e)
  }, [isDragging, handleCanvasClick])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          onClick={handleCanvasClick}
          onMouseDown={() => setIsDragging(true)}
          onMouseMove={handleCanvasMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          className="rounded-full cursor-crosshair border border-slate-200 dark:border-slate-700"
        />
        <div className="flex items-center gap-3 mt-4">
          <div
            className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-600"
            style={{ backgroundColor: selectedHex }}
          />
          <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedHex}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(selectedHex)
              addToast('Copied', 'success')
            }}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[10px] text-slate-400">Click anywhere on the wheel</span>
        </div>
      </div>
      <div className="space-y-4">
        {harmonies.map((h) => (
          <div key={h.label}>
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">{h.label}</h3>
            <div className="flex gap-2">
              {h.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigator.clipboard.writeText(c)
                    addToast(`Copied ${c}`, 'success')
                  }}
                  className="group relative"
                >
                  <div
                    className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: c }}
                  />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    {c}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---- Similarity / Delta E ----
function ColorSimilarity() {
  const [color1, setColor1] = useState('#ff0044')
  const [color2, setColor2] = useState('#0044ff')
  const [score, setScore] = useState(0)
  const { addToast } = useToast()

  useEffect(() => {
    try {
      const d = deltaE(color1, color2)
      setScore(Math.round(d * 100) / 100)
    } catch {
      setScore(-1)
    }
  }, [color1, color2])

  const getLevel = (d: number) => {
    if (d < 1) return { label: 'Imperceptible', color: 'text-emerald-500' }
    if (d < 2) return { label: 'Very slight difference', color: 'text-green-500' }
    if (d < 5) return { label: 'Slight difference', color: 'text-lime-500' }
    if (d < 10) return { label: 'Moderate difference', color: 'text-yellow-500' }
    if (d < 20) return { label: 'Clear difference', color: 'text-orange-500' }
    return { label: 'Very different', color: 'text-red-500' }
  }

  const level = getLevel(score)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[color1, color2].map((c, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="color"
              value={c}
              onChange={(e) => i === 0 ? setColor1(e.target.value) : setColor2(e.target.value)}
              className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer shrink-0"
            />
            <input
              type="text"
              value={c}
              onChange={(e) => {
                const v = e.target.value
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
                  i === 0 ? setColor1(v) : setColor2(v)
                }
              }}
              className="font-mono text-sm text-slate-900 dark:text-white bg-transparent border-b border-transparent focus:border-rose-500 focus:outline-none w-24"
            />
          </div>
        ))}
      </div>

      {score >= 0 && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Delta E (CIE76)</p>
              <p className={`text-4xl font-bold ${level.color}`}>{score}</p>
            </div>
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-600" style={{ backgroundColor: color1 }} />
              <div className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-600" style={{ backgroundColor: color2 }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(score / 50 * 100, 100)}%`,
                  backgroundColor: score < 5 ? '#10b981' : score < 10 ? '#f59e0b' : '#ef4444',
                }}
              />
            </div>
            <span className={`text-xs font-medium ${level.color}`}>{level.label}</span>
          </div>
        </div>
      )}

      {score < 0 && (
        <p className="text-sm text-red-500">Invalid color input</p>
      )}
    </div>
  )
}

// ---- Exporter ----
type ExportFormat = 'css-variables' | 'scss' | 'json' | 'tailwind' | 'android-xml' | 'swift-assets' | 'flutter-theme' | 'react-theme' | 'design-tokens'

function PaletteExporter() {
  const [paletteInput, setPaletteInput] = useState('#ff0044\n#00ff44\n#0044ff\n#ffaa00\n#ff00aa')
  const [format, setFormat] = useState<ExportFormat>('css-variables')
  const [output, setOutput] = useState('')
  const { addToast } = useToast()

  const exportPalette = useCallback(() => {
    const colors = paletteInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    if (colors.length === 0) {
      addToast('Please enter at least one color', 'error')
      return
    }

    let result = ''
    const paletteName = 'palette'

    switch (format) {
      case 'css-variables':
        result = colors.map((c, i) => `  --${paletteName}-${i + 1}: ${c};`).join('\n')
        result = `:root {\n${result}\n}`
        break
      case 'scss':
        result = colors.map((c, i) => `$${paletteName}-${i + 1}: ${c};`).join('\n')
        break
      case 'json':
        result = JSON.stringify(colors, null, 2)
        break
      case 'tailwind':
        result = `  ${paletteName}: {\n${colors.map((c, i) => `    ${(i + 1) * 100}: '${c}',`).join('\n')}\n  },`
        break
      case 'android-xml':
        result = `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${colors.map((c, i) => `    <color name="${paletteName}_${i + 1}">${c}</color>`).join('\n')}\n</resources>`
        break
      case 'swift-assets':
        result = colors.map((c, i) => `  static let color${i + 1} = Color(hex: "${c}")`).join('\n')
        break
      case 'flutter-theme':
        result = `final ${paletteName} = [\n${colors.map(c => `  Color(0xFF${c.replace('#', '')}),`).join('\n')}\n];`
        break
      case 'react-theme':
        result = `const theme = {\n  colors: {\n${colors.map((c, i) => `    ${paletteName}${i + 1}: '${c}',`).join('\n')}\n  },\n}`
        break
      case 'design-tokens':
        result = `{\n${colors.map((c, i) => `  "${paletteName}-${i + 1}": { "value": "${c}" }`).join(',\n')}\n}`
        break
    }

    setOutput(result)
    addToast('Export generated', 'success')
  }, [paletteInput, format, addToast])

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1.5">
          Palette Colors (one per line)
        </label>
        <textarea
          value={paletteInput}
          onChange={(e) => setPaletteInput(e.target.value)}
          rows={5}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-sm text-slate-900 dark:text-white resize-y focus:outline-none focus:ring-2 focus:ring-rose-500/30"
          spellCheck={false}
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as ExportFormat)}
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
        >
          <option value="css-variables">CSS Variables</option>
          <option value="scss">SCSS Variables</option>
          <option value="json">JSON</option>
          <option value="tailwind">Tailwind Config</option>
          <option value="android-xml">Android XML</option>
          <option value="swift-assets">Swift Assets</option>
          <option value="flutter-theme">Flutter Theme</option>
          <option value="react-theme">React Theme</option>
          <option value="design-tokens">Design Tokens</option>
        </select>
      </div>

      <Button onClick={exportPalette} className="w-full">Generate Export</Button>

      {output && (
        <div className="relative">
          <textarea
            value={output}
            readOnly
            rows={8}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono text-sm text-slate-900 dark:text-white resize-y focus:outline-none"
            spellCheck={false}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(output)
              addToast('Copied to clipboard', 'success')
            }}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

// ---- Playground ----
function ColorPlayground() {
  const [colors, setColors] = useState(['#ff0044', '#0044ff', '#00ff44'])
  const [mixWeight, setMixWeight] = useState(50)
  const [view, setView] = useState<'grid' | 'stripes' | 'gradient'>('grid')

  const updateColor = (i: number, hex: string) => {
    const next = [...colors]
    next[i] = hex
    setColors(next)
  }

  const addColor = () => {
    if (colors.length < 8) setColors([...colors, '#888888'])
  }

  const removeColor = (i: number) => {
    if (colors.length > 2) setColors(colors.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {colors.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="color"
              value={c}
              onChange={(e) => updateColor(i, e.target.value)}
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
            />
            <input
              type="text"
              value={c}
              onChange={(e) => {
                const v = e.target.value
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) updateColor(i, v)
              }}
              className="font-mono text-xs text-slate-900 dark:text-white bg-transparent border-b border-transparent focus:border-rose-500 focus:outline-none w-20"
            />
            {colors.length > 2 && (
              <button
                onClick={() => removeColor(i)}
                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
        {colors.length < 8 && (
          <button
            onClick={addColor}
            className="flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Color
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {(['grid', 'stripes', 'gradient'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${
              view === v
                ? 'bg-rose-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {view === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {colors.map((c, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-full h-20 rounded-xl border border-slate-200 dark:border-slate-600" style={{ backgroundColor: c }} />
              <span className="mt-1 text-[10px] font-mono text-slate-400">{c}</span>
            </div>
          ))}
        </div>
      )}

      {view === 'stripes' && (
        <div className="flex h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600">
          {colors.map((c, i) => (
            <div key={i} className="flex-1 first:rounded-l-xl last:rounded-r-xl transition-all hover:flex-[2]" style={{ backgroundColor: c }} />
          ))}
        </div>
      )}

      {view === 'gradient' && (
        <div
          className="h-24 rounded-xl border border-slate-200 dark:border-slate-600"
          style={{ background: `linear-gradient(90deg, ${colors.join(', ')})` }}
        />
      )}
    </div>
  )
}

export default function UtilityTool({ title, description, utilityType }: UtilityToolProps) {
  const { addToast } = useToast()

  const renderContent = () => {
    switch (utilityType) {
      case 'color-name':
        return <ColorNameFinder />
      case 'random':
        return <RandomColorGenerator />
      case 'similarity':
      case 'duplicate':
      case 'delta-e':
        return <ColorSimilarity />
      case 'exporter':
      case 'css-variables':
      case 'scss':
      case 'json-palette':
      case 'tailwind-theme':
      case 'android-xml':
      case 'swift-assets':
      case 'flutter-theme':
      case 'react-theme':
      case 'figma':
      case 'ase':
      case 'importer':
      case 'design-tokens':
        return <PaletteExporter />
      case 'color-wheel':
        return <ColorWheel />
      case 'playground':
        return <ColorPlayground />
      default:
        return <PlaygroundDefault />
    }
  }

  const getSubtitle = () => {
    switch (utilityType) {
      case 'color-name': return 'Enter any hex color to find its closest CSS color name'
      case 'random': return 'Generate random colors with instant hex, RGB, HSL values'
      case 'similarity':
      case 'duplicate':
      case 'delta-e': return 'Compare two colors using Delta E (CIE76) color difference'
      case 'exporter':
      case 'css-variables': return 'Export your palette as CSS custom properties'
      case 'scss': return 'Export your palette as SCSS variables'
      case 'json-palette': return 'Export your palette as JSON'
      case 'tailwind-theme': return 'Export your palette as Tailwind config'
      case 'android-xml': return 'Export your palette as Android XML resources'
      case 'swift-assets': return 'Export your palette as Swift Color assets'
      case 'flutter-theme': return 'Export your palette as Flutter Theme colors'
      case 'react-theme': return 'Export your palette as React Theme provider'
      case 'figma': return 'Export your palette in Figma-compatible format'
      case 'ase': return 'Export your palette as ASE (Adobe Swatch Exchange)'
      case 'importer': return 'Import palettes from various formats'
      case 'design-tokens': return 'Export your palette as design tokens'
      case 'color-wheel': return 'Click on the wheel to explore color relationships'
      case 'playground': return 'Experiment with multiple colors in real-time'
      default: return ''
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-7xl">{description}</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">{getSubtitle()}</p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        {renderContent()}
      </div>
    </div>
  )
}

function PlaygroundDefault() {
  return <ColorPlayground />
}
