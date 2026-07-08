export function hexToRgb(input: string): string {
  const hex = parseHex(input)
  const [r, g, b] = hexToRgbValues(hex)
  return `rgb(${r}, ${g}, ${b})`
}

export function rgbToHex(input: string): string {
  const { r, g, b } = parseRgb(input)
  return rgbToHexValues(r, g, b)
}

export function hexToHsl(input: string): string {
  const hex = parseHex(input)
  const [r, g, b] = hexToRgbValues(hex)
  const [h, s, l] = rgbToHslValues(r, g, b)
  return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`
}

export function hslToHex(input: string): string {
  const { h, s, l } = parseHsl(input)
  const [r, g, b] = hslToRgbValues(h, s, l)
  return rgbToHexValues(r, g, b)
}

export function rgbToHsl(input: string): string {
  const { r, g, b } = parseRgb(input)
  const [h, s, l] = rgbToHslValues(r, g, b)
  return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`
}

export function hslToRgb(input: string): string {
  const { h, s, l } = parseHsl(input)
  const [r, g, b] = hslToRgbValues(h, s, l)
  return `rgb(${r}, ${g}, ${b})`
}

export function hexToHsv(input: string): string {
  const hex = parseHex(input)
  const [r, g, b] = hexToRgbValues(hex)
  const [h, s, v] = rgbToHsvValues(r, g, b)
  return `hsv(${h.toFixed(1)}, ${s.toFixed(1)}%, ${v.toFixed(1)}%)`
}

export function hsvToHex(input: string): string {
  const { h, s, v } = parseHsv(input)
  const [r, g, b] = hsvToRgbValues(h, s, v)
  return rgbToHexValues(r, g, b)
}

export function rgbToHsv(input: string): string {
  const { r, g, b } = parseRgb(input)
  const [h, s, v] = rgbToHsvValues(r, g, b)
  return `hsv(${h.toFixed(1)}, ${s.toFixed(1)}%, ${v.toFixed(1)}%)`
}

export function hsvToRgb(input: string): string {
  const { h, s, v } = parseHsv(input)
  const [r, g, b] = hsvToRgbValues(h, s, v)
  return `rgb(${r}, ${g}, ${b})`
}

export function hexToCmyk(input: string): string {
  const hex = parseHex(input)
  const [r, g, b] = hexToRgbValues(hex)
  const [c, m, y, k] = rgbToCmykValues(r, g, b)
  return `cmyk(${c.toFixed(1)}%, ${m.toFixed(1)}%, ${y.toFixed(1)}%, ${k.toFixed(1)}%)`
}

export function cmykToHex(input: string): string {
  const { c, m, y, k } = parseCmyk(input)
  const [r, g, b] = cmykToRgbValues(c, m, y, k)
  return rgbToHexValues(r, g, b)
}

export function rgbToCmyk(input: string): string {
  const { r, g, b } = parseRgb(input)
  const [c, m, y, k] = rgbToCmykValues(r, g, b)
  return `cmyk(${c.toFixed(1)}%, ${m.toFixed(1)}%, ${y.toFixed(1)}%, ${k.toFixed(1)}%)`
}

export function cmykToRgb(input: string): string {
  const { c, m, y, k } = parseCmyk(input)
  const [r, g, b] = cmykToRgbValues(c, m, y, k)
  return `rgb(${r}, ${g}, ${b})`
}

export function hexToRgba(input: string): string {
  const hex = input.trim().replace(/^#/, '')
  let r: number, g: number, b: number, a = 1
  if (hex.length === 3 || hex.length === 4) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
    if (hex.length === 4) a = parseInt(hex[3] + hex[3], 16) / 255
  } else if (hex.length === 6 || hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
    if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16) / 255
  } else {
    throw new Error(`Invalid hex color: ${input}`)
  }
  if ([r, g, b, a].some(isNaN)) throw new Error(`Invalid hex color: ${input}`)
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(4)})`
}

export function rgbaToHex(input: string): string {
  const { r, g, b, a } = parseRgba(input)
  if (a < 1) {
    const aa = Math.round(clamp(a, 0, 1) * 255)
    return `#${[r, g, b, aa].map(c => c.toString(16).padStart(2, '0')).join('')}`
  }
  return rgbToHexValues(r, g, b)
}

export function rgbToHwb(input: string): string {
  const { r, g, b } = parseRgb(input)
  const [h] = rgbToHsvValues(r, g, b)
  const w = Math.min(r, g, b)
  const bl = 255 - Math.max(r, g, b)
  return `hwb(${h.toFixed(1)}, ${(w / 255 * 100).toFixed(1)}%, ${(bl / 255 * 100).toFixed(1)}%)`
}

export function hwbToRgb(input: string): string {
  const { h, w, b } = parseHwb(input)
  const white = w / 100
  const black = b / 100
  if (white + black >= 1) {
    const gray = Math.round(white / (white + black) * 255)
    return `rgb(${gray}, ${gray}, ${gray})`
  }
  const v = 1 - black
  const sv = white < 1 ? 1 - white / v : 0
  const [r, g, bb] = hsvToRgbValues(h, sv * 100, v * 100)
  return `rgb(${r}, ${g}, ${bb})`
}

export function hexToHwb(input: string): string {
  const hex = parseHex(input)
  const [r, g, b] = hexToRgbValues(hex)
  const [h] = rgbToHsvValues(r, g, b)
  const w = Math.min(r, g, b)
  const bl = 255 - Math.max(r, g, b)
  return `hwb(${h.toFixed(1)}, ${(w / 255 * 100).toFixed(1)}%, ${(bl / 255 * 100).toFixed(1)}%)`
}

export function hwbToHex(input: string): string {
  const { h, w, b } = parseHwb(input)
  const s = parseFloat(h as any) || 0
  const white = w / 100
  const black = b / 100
  if (white + black >= 1) {
    const gray = Math.round(white / (white + black) * 255)
    return rgbToHexValues(gray, gray, gray)
  }
  const v = 1 - black
  const sv = white < 1 ? 1 - white / v : 0
  const [r, g, bb] = hsvToRgbValues(s, sv * 100, v * 100)
  return rgbToHexValues(r, g, bb)
}

export function hslaToHex(input: string): string {
  const { h, s, l, a } = parseHsla(input)
  const [r, g, b] = hslToRgbValues(h, s, l)
  if (a < 1) {
    const aa = Math.round(clamp(a, 0, 1) * 255)
    return `#${[r, g, b, aa].map(c => c.toString(16).padStart(2, '0')).join('')}`
  }
  return rgbToHexValues(r, g, b)
}

export function hexToHsla(input: string): string {
  const hex = parseHex(input)
  const [r, g, b] = hexToRgbValues(hex)
  const [h, s, l] = rgbToHslValues(r, g, b)
  return `hsla(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%, 1)`
}

export function hexToLab(input: string): string {
  const hex = parseHex(input)
  const [r, g, b] = hexToRgbValues(hex)
  return rgbToLabStr(r, g, b)
}

export function labToHex(input: string): string {
  const { L, a, b } = parseLab(input)
  const [r, g, bb] = labToSrgbValues(L, a, b)
  return rgbToHexValues(r, g, bb)
}

export function rgbToLab(input: string): string {
  const { r, g, b } = parseRgb(input)
  return rgbToLabStr(r, g, b)
}

export function labToRgb(input: string): string {
  const { L, a, b } = parseLab(input)
  const [r, g, bb] = labToSrgbValues(L, a, b)
  return `rgb(${r}, ${g}, ${bb})`
}

export function hexToLch(input: string): string {
  const hex = parseHex(input)
  const [r, g, b] = hexToRgbValues(hex)
  const [L, c, h] = rgbToLchValues(r, g, b)
  return `lch(${L.toFixed(2)}, ${c.toFixed(2)}, ${h.toFixed(2)})`
}

export function lchToHex(input: string): string {
  const { L, c, h } = parseLch(input)
  const [r, g, b] = lchToSrgbValues(L, c, h)
  return rgbToHexValues(r, g, b)
}

export function rgbToLch(input: string): string {
  const { r, g, b } = parseRgb(input)
  const [L, c, h] = rgbToLchValues(r, g, b)
  return `lch(${L.toFixed(2)}, ${c.toFixed(2)}, ${h.toFixed(2)})`
}

export function lchToRgb(input: string): string {
  const { L, c, h } = parseLch(input)
  const [r, g, b] = lchToSrgbValues(L, c, h)
  return `rgb(${r}, ${g}, ${b})`
}

export function hexToOklab(input: string): string {
  const hex = parseHex(input)
  const [r, g, b] = hexToRgbValues(hex)
  const [L, a, bv] = rgbToOklabValues(r, g, b)
  return `oklab(${L.toFixed(4)}, ${a.toFixed(4)}, ${bv.toFixed(4)})`
}

export function oklabToHex(input: string): string {
  const { L, a, b } = parseOklab(input)
  const [r, g, bb] = oklabToSrgbValues(L, a, b)
  return rgbToHexValues(r, g, bb)
}

export function rgbToOklab(input: string): string {
  const { r, g, b } = parseRgb(input)
  const [L, a, bv] = rgbToOklabValues(r, g, b)
  return `oklab(${L.toFixed(4)}, ${a.toFixed(4)}, ${bv.toFixed(4)})`
}

export function oklabToRgb(input: string): string {
  const { L, a, b } = parseOklab(input)
  const [r, g, bb] = oklabToSrgbValues(L, a, b)
  return `rgb(${r}, ${g}, ${bb})`
}

export function hexToOklch(input: string): string {
  const hex = parseHex(input)
  const [r, g, b] = hexToRgbValues(hex)
  const [L, a, bv] = rgbToOklabValues(r, g, b)
  const c = Math.sqrt(a * a + bv * bv)
  const h = (Math.atan2(bv, a) * 180 / Math.PI + 360) % 360
  return `oklch(${L.toFixed(4)}, ${c.toFixed(4)}, ${h.toFixed(2)})`
}

export function oklchToHex(input: string): string {
  const { L, c, h } = parseOklch(input)
  const a = c * Math.cos(h * Math.PI / 180)
  const bv = c * Math.sin(h * Math.PI / 180)
  const [r, g, b] = oklabToSrgbValues(L, a, bv)
  return rgbToHexValues(r, g, b)
}

export function rgbToOklch(input: string): string {
  const { r, g, b } = parseRgb(input)
  const [L, a, bv] = rgbToOklabValues(r, g, b)
  const c = Math.sqrt(a * a + bv * bv)
  const h = (Math.atan2(bv, a) * 180 / Math.PI + 360) % 360
  return `oklch(${L.toFixed(4)}, ${c.toFixed(4)}, ${h.toFixed(2)})`
}

export function oklchToRgb(input: string): string {
  const { L, c, h } = parseOklch(input)
  const a = c * Math.cos(h * Math.PI / 180)
  const bv = c * Math.sin(h * Math.PI / 180)
  const [r, g, b] = oklabToSrgbValues(L, a, bv)
  return `rgb(${r}, ${g}, ${b})`
}

export function cssColorConverter(input: string): string {
  const fmt = colorFormatDetector(input)
  switch (fmt) {
    case 'hex': return hexToRgb(input)
    case 'rgb': return rgbToHex(input)
    case 'rgba': return rgbaToHex(input)
    case 'hsl': return hslToHex(input)
    case 'hsla': return hslaToHex(input)
    case 'hsv': return hsvToHex(input)
    case 'cmyk': return cmykToHex(input)
    case 'hwb': return hwbToHex(input)
    case 'lab': return labToHex(input)
    case 'lch': return lchToHex(input)
    case 'oklab': return oklabToHex(input)
    case 'oklch': return oklchToHex(input)
    case 'name': {
      const hex = colorNameToHex(input.trim())
      if (hex) return hex
      throw new Error(`Unknown color name: ${input.trim()}`)
    }
    default:
      throw new Error(`Unknown color format: ${input}`)
  }
}

export function colorFormatDetector(input: string): string {
  const s = input.trim()
  if (!s) throw new Error('Empty input')
  if (/^#?[0-9a-fA-F]{3,8}$/.test(s)) return 'hex'
  if (/^rgba?\s*\(/i.test(s)) return /^rgba\s*\(/i.test(s) ? 'rgba' : 'rgb'
  if (/^hsla?\s*\(/i.test(s)) return /^hsla\s*\(/i.test(s) ? 'hsla' : 'hsl'
  if (/^hsv\s*\(/i.test(s)) return 'hsv'
  if (/^cmyk\s*\(/i.test(s)) return 'cmyk'
  if (/^hwb\s*\(/i.test(s)) return 'hwb'
  if (/^lab\s*\(/i.test(s)) return 'lab'
  if (/^lch\s*\(/i.test(s)) return 'lch'
  if (/^oklab\s*\(/i.test(s)) return 'oklab'
  if (/^oklch\s*\(/i.test(s)) return 'oklch'
  if (/^[a-zA-Z]+$/.test(s) && colorNameToHex(s)) return 'name'
  throw new Error(`Unable to detect color format: ${input}`)
}

export function parseColor(input: string): { r: number; g: number; b: number; a: number } | null {
  try {
    const fmt = colorFormatDetector(input)
    switch (fmt) {
      case 'hex': {
        const [r, g, b] = hexToRgbValues(parseHex(input))
        return { r, g, b, a: 1 }
      }
      case 'rgb':
      case 'rgba': {
        const p = parseRgba(input)
        return p
      }
      case 'hsl': {
        const { h, s, l } = parseHsl(input)
        const [r, g, b] = hslToRgbValues(h, s, l)
        return { r, g, b, a: 1 }
      }
      case 'hsla': {
        const { h, s, l, a } = parseHsla(input)
        const [r, g, b] = hslToRgbValues(h, s, l)
        return { r, g, b, a }
      }
      case 'hsv': {
        const { h, s, v } = parseHsv(input)
        const [r, g, b] = hsvToRgbValues(h, s, v)
        return { r, g, b, a: 1 }
      }
      case 'cmyk': {
        const { c, m, y, k } = parseCmyk(input)
        const [r, g, b] = cmykToRgbValues(c, m, y, k)
        return { r, g, b, a: 1 }
      }
      case 'name': {
        const hex = colorNameToHex(input.trim())
        if (hex) {
          const [r, g, b] = hexToRgbValues(hex)
          return { r, g, b, a: 1 }
        }
        return null
      }
      default:
        return null
    }
  } catch {
    return null
  }
}

export function rgbToHslValues(r: number, g: number, b: number): [number, number, number] {
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

export function hslToRgbValues(h: number, s: number, l: number): [number, number, number] {
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

export function rgbToHsvValues(r: number, g: number, b: number): [number, number, number] {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1)
  const v = max
  const d = max - min
  const s = max === 0 ? 0 : d / max
  let h = 0
  if (max !== min) {
    if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0))
    else if (max === g1) h = ((b1 - r1) / d + 2)
    else h = ((r1 - g1) / d + 4)
    h *= 60
  }
  return [Math.round(h * 10) / 10, Math.round(s * 1000) / 10, Math.round(v * 1000) / 10]
}

export function hsvToRgbValues(h: number, s: number, v: number): [number, number, number] {
  const s1 = s / 100, v1 = v / 100
  const c = v1 * s1
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v1 - c
  let r1 = 0, g1 = 0, b1 = 0
  if (h < 60) { r1 = c; g1 = x }
  else if (h < 120) { r1 = x; g1 = c }
  else if (h < 180) { g1 = c; b1 = x }
  else if (h < 240) { g1 = x; b1 = c }
  else if (h < 300) { r1 = x; b1 = c }
  else { r1 = c; b1 = x }
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)]
}

export function rgbToCmykValues(r: number, g: number, b: number): [number, number, number, number] {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255
  const k = 1 - Math.max(r1, g1, b1)
  if (k === 1) return [0, 0, 0, 100]
  const c = (1 - r1 - k) / (1 - k)
  const m = (1 - g1 - k) / (1 - k)
  const y = (1 - b1 - k) / (1 - k)
  return [Math.round(c * 1000) / 10, Math.round(m * 1000) / 10, Math.round(y * 1000) / 10, Math.round(k * 1000) / 10]
}

export function cmykToRgbValues(c: number, m: number, y: number, k: number): [number, number, number] {
  const c1 = c / 100, m1 = m / 100, y1 = y / 100, k1 = k / 100
  const r = Math.round(255 * (1 - c1) * (1 - k1))
  const g = Math.round(255 * (1 - m1) * (1 - k1))
  const b = Math.round(255 * (1 - y1) * (1 - k1))
  return [r, g, b]
}

export function hexToRgbValues(hex: string): [number, number, number] {
  const h = hex.replace(/^#/, '')
  let r: number, g: number, b: number
  if (h.length === 3) {
    r = parseInt(h[0] + h[0], 16)
    g = parseInt(h[1] + h[1], 16)
    b = parseInt(h[2] + h[2], 16)
  } else if (h.length === 6) {
    r = parseInt(h.slice(0, 2), 16)
    g = parseInt(h.slice(2, 4), 16)
    b = parseInt(h.slice(4, 6), 16)
  } else {
    throw new Error(`Invalid hex length: #${h}`)
  }
  if ([r, g, b].some(isNaN)) throw new Error(`Invalid hex color: #${h}`)
  return [r, g, b]
}

export function rgbToHexValues(r: number, g: number, b: number): string {
  const rr = clamp(Math.round(r), 0, 255)
  const gg = clamp(Math.round(g), 0, 255)
  const bb = clamp(Math.round(b), 0, 255)
  return `#${rr.toString(16).padStart(2, '0')}${gg.toString(16).padStart(2, '0')}${bb.toString(16).padStart(2, '0')}`
}

export function isValidHex(input: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(input.trim())
}

export function isValidRgb(input: string): boolean {
  try { parseRgb(input); return true } catch { return false }
}

export function isValidHsl(input: string): boolean {
  try { parseHsl(input); return true } catch { return false }
}

export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1)
  const l2 = luminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function wcagLevel(ratio: number): 'AAA' | 'AA' | 'AA Large' | 'Fail' {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA Large'
  return 'Fail'
}

export function colorName(input: string): string {
  const rgb = parseColor(input)
  if (!rgb) throw new Error(`Invalid color: ${input}`)
  const [r, g, b] = [rgb.r, rgb.g, rgb.b]
  let closest = 'black'
  let minDist = Infinity
  for (const [name, hex] of Object.entries(CSS_NAMED_COLORS)) {
    const [cr, cg, cb] = hexToRgbValues(hex)
    const d = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2)
    if (d < minDist) { minDist = d; closest = name }
  }
  return closest
}

export function mixColors(color1: string, color2: string, weight: number = 50): string {
  const c1 = parseColor(color1)
  const c2 = parseColor(color2)
  if (!c1 || !c2) throw new Error('Invalid color input')
  const w = clamp(weight / 100, 0, 1)
  const r = Math.round(c1.r * w + c2.r * (1 - w))
  const g = Math.round(c1.g * w + c2.g * (1 - w))
  const b = Math.round(c1.b * w + c2.b * (1 - w))
  return rgbToHexValues(r, g, b)
}

export function generateShades(hex: string, count: number = 10): string {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  const [h, s, l] = rgbToHslValues(r, g, b)
  const shades: string[] = []
  for (let i = 0; i < count; i++) {
    const pct = (i + 1) / (count + 1)
    const newL = Math.round(l * (1 - pct))
    const [nr, ng, nb] = hslToRgbValues(h, s, clamp(newL, 0, 100))
    shades.push(rgbToHexValues(nr, ng, nb))
  }
  return JSON.stringify(shades)
}

export function generateTints(hex: string, count: number = 10): string {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  const [h, s, l] = rgbToHslValues(r, g, b)
  const tints: string[] = []
  for (let i = 0; i < count; i++) {
    const pct = (i + 1) / (count + 1)
    const newL = Math.round(l + (100 - l) * pct)
    const [nr, ng, nb] = hslToRgbValues(h, s, clamp(newL, 0, 100))
    tints.push(rgbToHexValues(nr, ng, nb))
  }
  return JSON.stringify(tints)
}

export function complementaryColor(hex: string): string {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  const [h, s, l] = rgbToHslValues(r, g, b)
  const newH = (h + 180) % 360
  const [nr, ng, nb] = hslToRgbValues(newH, s, l)
  return rgbToHexValues(nr, ng, nb)
}

export function analogousColors(hex: string): string {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  const [h, s, l] = rgbToHslValues(r, g, b)
  const colors: string[] = []
  for (const offset of [-30, 30]) {
    const newH = (h + offset + 360) % 360
    const [nr, ng, nb] = hslToRgbValues(newH, s, l)
    colors.push(rgbToHexValues(nr, ng, nb))
  }
  return JSON.stringify(colors)
}

export function triadicColors(hex: string): string {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  const [h, s, l] = rgbToHslValues(r, g, b)
  const colors: string[] = []
  for (const offset of [120, 240]) {
    const newH = (h + offset) % 360
    const [nr, ng, nb] = hslToRgbValues(newH, s, l)
    colors.push(rgbToHexValues(nr, ng, nb))
  }
  return JSON.stringify(colors)
}

export function tetradicColors(hex: string): string {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  const [h, s, l] = rgbToHslValues(r, g, b)
  const colors: string[] = []
  for (const offset of [60, 180, 240]) {
    const newH = (h + offset) % 360
    const [nr, ng, nb] = hslToRgbValues(newH, s, l)
    colors.push(rgbToHexValues(nr, ng, nb))
  }
  return JSON.stringify(colors)
}

export function splitComplementary(hex: string): string {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  const [h, s, l] = rgbToHslValues(r, g, b)
  const colors: string[] = []
  for (const offset of [150, 210]) {
    const newH = (h + offset) % 360
    const [nr, ng, nb] = hslToRgbValues(newH, s, l)
    colors.push(rgbToHexValues(nr, ng, nb))
  }
  return JSON.stringify(colors)
}

export function colorTemperature(hex: string): string {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  if (b > r) return 'cool'
  if (r > b && r > 150 && g > 100) return 'warm'
  const diff = r - b
  if (diff > 30) return 'warm'
  if (diff < -30) return 'cool'
  return 'neutral'
}

export function randomColor(): string {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return rgbToHexValues(r, g, b)
}

export function colorBlindSimulate(hex: string, type: string): string {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  const r1 = r / 255, g1 = g / 255, b1 = b / 255
  let r2 = r1, g2 = g1, b2 = b1
  switch (type) {
    case 'protanopia':
      r2 = 0.56667 * r1 + 0.43333 * g1
      g2 = 0.55833 * r1 + 0.44167 * g1
      b2 = b1
      break
    case 'deuteranopia':
      r2 = 0.625 * r1 + 0.375 * g1
      g2 = 0.7 * r1 + 0.3 * g1
      b2 = b1
      break
    case 'tritanopia':
      r2 = r1
      g2 = 0.95 * g1 + 0.05 * b1
      b2 = 0.05 * g1 + 0.95 * b1
      break
    case 'achromatopsia':
      const gray = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1
      r2 = gray; g2 = gray; b2 = gray
      break
    default:
      throw new Error(`Unknown color blindness type: ${type}. Use: protanopia, deuteranopia, tritanopia, achromatopsia`)
  }
  const rr = Math.round(clamp(r2, 0, 1) * 255)
  const gg = Math.round(clamp(g2, 0, 1) * 255)
  const bb = Math.round(clamp(b2, 0, 1) * 255)
  return rgbToHexValues(rr, gg, bb)
}

export function luminance(hex: string): number {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  const rs = r / 255, gs = g / 255, bs = b / 255
  const rl = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4)
  const gl = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4)
  const bl = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4)
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl
}

export function hexToOklabValues(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgbValues(parseHex(hex))
  return rgbToOklabValues(r, g, b)
}

export function oklabToSrgbValues(L: number, a: number, b: number): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  const rl = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const gl = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  const r = Math.round(clamp(linearToRgb(rl) * 255, 0, 255))
  const g = Math.round(clamp(linearToRgb(gl) * 255, 0, 255))
  const b2 = Math.round(clamp(linearToRgb(bl) * 255, 0, 255))
  return [r, g, b2]
}

export function rgbToLinear(c: number): number {
  const v = c / 255
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

export function linearToRgb(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

export function deltaE(color1: string, color2: string): number {
  const c1 = parseColor(color1)
  const c2 = parseColor(color2)
  if (!c1 || !c2) throw new Error('Invalid color input')
  const [L1, a1, b1] = rgbToLabValues(c1.r, c1.g, c1.b)
  const [L2, a2, b2] = rgbToLabValues(c2.r, c2.g, c2.b)
  return Math.sqrt((L1 - L2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2)
}

export function colorNameToHex(name: string): string | null {
  const key = name.trim().toLowerCase()
  return CSS_NAMED_COLORS[key] || null
}

function parseHex(input: string): string {
  const s = input.trim()
  if (!s) throw new Error('Empty input')
  if (/^#?[0-9a-fA-F]{3}$/.test(s)) {
    const h = s.replace(/^#/, '')
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`
  }
  if (/^#?[0-9a-fA-F]{6}$/.test(s)) {
    return s.startsWith('#') ? s : `#${s}`
  }
  throw new Error(`Invalid hex color: ${input}. Expected format: #RGB or #RRGGBB`)
}

function parseRgb(input: string): { r: number; g: number; b: number } {
  const s = input.trim()
  const m = s.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i)
  if (!m) throw new Error(`Invalid RGB color: ${input}. Expected format: rgb(r, g, b)`)
  const r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3])
  if ([r, g, b].some(v => isNaN(v) || v < 0 || v > 255)) throw new Error(`RGB values out of range: ${input}`)
  return { r, g, b }
}

function parseRgba(input: string): { r: number; g: number; b: number; a: number } {
  const s = input.trim()
  const m = s.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i)
  if (!m) throw new Error(`Invalid RGBA color: ${input}. Expected format: rgba(r, g, b, a)`)
  const r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3])
  const a = m[4] !== undefined ? parseFloat(m[4]) : 1
  if ([r, g, b].some(v => isNaN(v) || v < 0 || v > 255)) throw new Error(`RGB values out of range: ${input}`)
  if (isNaN(a) || a < 0 || a > 1) throw new Error(`Alpha out of range: ${input}`)
  return { r, g, b, a }
}

function parseHsl(input: string): { h: number; s: number; l: number } {
  const s = input.trim()
  const m = s.match(/^hsl\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i)
  if (!m) throw new Error(`Invalid HSL color: ${input}. Expected format: hsl(h, s%, l%)`)
  const h = parseFloat(m[1]), sl = parseFloat(m[2]), l = parseFloat(m[3])
  if ([h, sl, l].some(isNaN)) throw new Error(`Invalid HSL values: ${input}`)
  return { h: ((h % 360) + 360) % 360, s: clamp(sl, 0, 100), l: clamp(l, 0, 100) }
}

function parseHsla(input: string): { h: number; s: number; l: number; a: number } {
  const s = input.trim()
  const m = s.match(/^hsla\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)$/i)
  if (!m) throw new Error(`Invalid HSLA color: ${input}. Expected format: hsla(h, s%, l%, a)`)
  const h = parseFloat(m[1]), sl = parseFloat(m[2]), l = parseFloat(m[3])
  const a = m[4] !== undefined ? parseFloat(m[4]) : 1
  if ([h, sl, l, a].some(isNaN)) throw new Error(`Invalid HSLA values: ${input}`)
  if (isNaN(a) || a < 0 || a > 1) throw new Error(`Alpha out of range: ${input}`)
  return { h: ((h % 360) + 360) % 360, s: clamp(sl, 0, 100), l: clamp(l, 0, 100), a }
}

function parseHsv(input: string): { h: number; s: number; v: number } {
  const s = input.trim()
  const m = s.match(/^hsv\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i)
  if (!m) throw new Error(`Invalid HSV color: ${input}. Expected format: hsv(h, s%, v%)`)
  const h = parseFloat(m[1]), sv = parseFloat(m[2]), v = parseFloat(m[3])
  if ([h, sv, v].some(isNaN)) throw new Error(`Invalid HSV values: ${input}`)
  return { h: ((h % 360) + 360) % 360, s: clamp(sv, 0, 100), v: clamp(v, 0, 100) }
}

function parseCmyk(input: string): { c: number; m: number; y: number; k: number } {
  const s = input.trim()
  const m = s.match(/^cmyk\s*\(\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i)
  if (!m) throw new Error(`Invalid CMYK color: ${input}. Expected format: cmyk(c%, m%, y%, k%)`)
  const c = parseFloat(m[1]), mm = parseFloat(m[2]), y = parseFloat(m[3]), k = parseFloat(m[4])
  if ([c, mm, y, k].some(isNaN)) throw new Error(`Invalid CMYK values: ${input}`)
  return { c: clamp(c, 0, 100), m: clamp(mm, 0, 100), y: clamp(y, 0, 100), k: clamp(k, 0, 100) }
}

function parseHwb(input: string): { h: number; w: number; b: number } {
  const s = input.trim()
  const m = s.match(/^hwb\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i)
  if (!m) throw new Error(`Invalid HWB color: ${input}. Expected format: hwb(h, w%, b%)`)
  const h = parseFloat(m[1]), w = parseFloat(m[2]), b = parseFloat(m[3])
  if ([h, w, b].some(isNaN)) throw new Error(`Invalid HWB values: ${input}`)
  return { h: ((h % 360) + 360) % 360, w: clamp(w, 0, 100), b: clamp(b, 0, 100) }
}

function parseLab(input: string): { L: number; a: number; b: number } {
  const s = input.trim()
  const m = s.match(/^lab\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i)
  if (!m) throw new Error(`Invalid LAB color: ${input}. Expected format: lab(L, a, b)`)
  const L = parseFloat(m[1]), a = parseFloat(m[2]), b = parseFloat(m[3])
  if ([L, a, b].some(isNaN)) throw new Error(`Invalid LAB values: ${input}`)
  return { L, a, b }
}

function parseLch(input: string): { L: number; c: number; h: number } {
  const s = input.trim()
  const m = s.match(/^lch\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i)
  if (!m) throw new Error(`Invalid LCH color: ${input}. Expected format: lch(L, C, H)`)
  const L = parseFloat(m[1]), c = parseFloat(m[2]), h = parseFloat(m[3])
  if ([L, c, h].some(isNaN)) throw new Error(`Invalid LCH values: ${input}`)
  return { L, c, h: ((h % 360) + 360) % 360 }
}

function parseOklab(input: string): { L: number; a: number; b: number } {
  const s = input.trim()
  const m = s.match(/^oklab\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i)
  if (!m) throw new Error(`Invalid OKLab color: ${input}. Expected format: oklab(L, a, b)`)
  const L = parseFloat(m[1]), a = parseFloat(m[2]), b = parseFloat(m[3])
  if ([L, a, b].some(isNaN)) throw new Error(`Invalid OKLab values: ${input}`)
  return { L, a, b }
}

function parseOklch(input: string): { L: number; c: number; h: number } {
  const s = input.trim()
  const m = s.match(/^oklch\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i)
  if (!m) throw new Error(`Invalid OKLCH color: ${input}. Expected format: oklch(L, C, H)`)
  const L = parseFloat(m[1]), c = parseFloat(m[2]), h = parseFloat(m[3])
  if ([L, c, h].some(isNaN)) throw new Error(`Invalid OKLCH values: ${input}`)
  return { L, c, h: ((h % 360) + 360) % 360 }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function rgbToLabStr(r: number, g: number, b: number): string {
  const [L, a, bv] = rgbToLabValues(r, g, b)
  return `lab(${L.toFixed(2)}, ${a.toFixed(2)}, ${bv.toFixed(2)})`
}

function rgbToLabValues(r: number, g: number, b: number): [number, number, number] {
  const rl = rgbToLinear(r)
  const gl = rgbToLinear(g)
  const bl = rgbToLinear(b)
  const x = 0.4124564 * rl + 0.3575761 * gl + 0.1804375 * bl
  const y = 0.2126729 * rl + 0.7151522 * gl + 0.0721750 * bl
  const z = 0.0193339 * rl + 0.1191920 * gl + 0.9503041 * bl
  return xyzToLab(x, y, z)
}

function xyzToLab(x: number, y: number, z: number): [number, number, number] {
  const xn = 0.95047, yn = 1.0, zn = 1.08883
  const fx = labF(x / xn)
  const fy = labF(y / yn)
  const fz = labF(z / zn)
  const L = 116 * fy - 16
  const a = 500 * (fx - fy)
  const b = 200 * (fy - fz)
  return [L, a, b]
}

function labF(t: number): number {
  const d = 6 / 29
  return t > d * d * d ? Math.cbrt(t) : t / (3 * d * d) + 4 / 29
}

function labInvF(t: number): number {
  const d = 6 / 29
  return t > d ? t * t * t : 3 * d * d * (t - 4 / 29)
}

function labToSrgbValues(L: number, a: number, b: number): [number, number, number] {
  const xn = 0.95047, yn = 1.0, zn = 1.08883
  const x = xn * labInvF((L + 16) / 116 + a / 500)
  const y = yn * labInvF((L + 16) / 116)
  const z = zn * labInvF((L + 16) / 116 - b / 200)
  const rl = +3.2404542 * x - 1.5371385 * y - 0.4985314 * z
  const gl = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z
  const bl = +0.0556434 * x - 0.2040259 * y + 1.0572252 * z
  const r = Math.round(clamp(linearToRgb(rl) * 255, 0, 255))
  const g = Math.round(clamp(linearToRgb(gl) * 255, 0, 255))
  const b2 = Math.round(clamp(linearToRgb(bl) * 255, 0, 255))
  return [r, g, b2]
}

function rgbToLchValues(r: number, g: number, b: number): [number, number, number] {
  const [L, a, bv] = rgbToLabValues(r, g, b)
  const c = Math.sqrt(a * a + bv * bv)
  const h = (Math.atan2(bv, a) * 180 / Math.PI + 360) % 360
  return [L, c, h]
}

function lchToSrgbValues(L: number, c: number, h: number): [number, number, number] {
  const a = c * Math.cos(h * Math.PI / 180)
  const b = c * Math.sin(h * Math.PI / 180)
  return labToSrgbValues(L, a, b)
}

function rgbToOklabValues(r: number, g: number, b: number): [number, number, number] {
  const rl = rgbToLinear(r)
  const gl = rgbToLinear(g)
  const bl = rgbToLinear(b)
  const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl
  const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl
  const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const av = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const bv = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
  return [L, av, bv]
}

const CSS_NAMED_COLORS: Record<string, string> = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
}
