#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const NAV_JSON_PATH = path.join(__dirname, '..', 'config', 'navigation.json')
const APP_DIR = path.join(__dirname, '..', 'src', 'app')

const navJson = JSON.parse(fs.readFileSync(NAV_JSON_PATH, 'utf-8'))

const categoryFromLabel = {
  'Pickers': 'picker',
  'Converters': 'converter',
  'Palettes': 'palette',
  'Gradients': 'gradient',
  'Accessibility': 'accessibility',
  'Image': 'image',
  'Adjustments': 'adjustment',
  'Reference': 'reference',
  'Utilities': 'utility',
}

const pickerModeMap = {
  'color-picker': 'hex',
  'eye-dropper-tool': 'hex',
  'screen-color-picker': 'rgb',
  'hex-color-picker': 'hex',
  'rgb-color-picker': 'rgb',
  'hsl-color-picker': 'hsl',
  'hsv-color-picker': 'hsv',
  'cmyk-color-picker': 'cmyk',
  'lab-color-picker': 'lab',
  'lch-color-picker': 'lch',
  'oklab-color-picker': 'oklab',
  'oklch-color-picker': 'oklch',
  'hwb-color-picker': 'hwb',
  'rgba-color-picker': 'rgba',
  'hsla-color-picker': 'hsla',
  'alpha-color-picker': 'alpha',
  'gradient-color-picker': 'gradient',
  'multi-color-picker': 'multi',
  'image-color-picker': 'image',
  'website-color-picker': 'website',
  'transparent-color-picker': 'transparent',
  'random-color-picker': 'random',
  'browser-color-picker': 'browser',
  'pixel-color-picker': 'pixel',
  'magnifier-color-picker': 'magnifier',
}

const converterFnMap = {
  'hex-to-rgb': { fn: 'hexToRgb', example: '#ff0044', colorPreview: '#ff0044' },
  'rgb-to-hex': { fn: 'rgbToHex', example: 'rgb(255, 0, 68)', colorPreview: '#ff0044' },
  'hex-to-hsl': { fn: 'hexToHsl', example: '#ff0044', colorPreview: '#ff0044' },
  'hsl-to-hex': { fn: 'hslToHex', example: 'hsl(348, 100%, 50%)', colorPreview: '#ff0044' },
  'hex-to-hsv': { fn: 'hexToHsv', example: '#ff0044', colorPreview: '#ff0044' },
  'hsv-to-hex': { fn: 'hsvToHex', example: 'hsv(348, 100%, 100%)', colorPreview: '#ff0044' },
  'rgb-to-hsl': { fn: 'rgbToHsl', example: 'rgb(255, 0, 68)', colorPreview: '#ff0044' },
  'hsl-to-rgb': { fn: 'hslToRgb', example: 'hsl(348, 100%, 50%)', colorPreview: '#ff0044' },
  'rgb-to-hsv': { fn: 'rgbToHsv', example: 'rgb(255, 0, 68)', colorPreview: '#ff0044' },
  'hsv-to-rgb': { fn: 'hsvToRgb', example: 'hsv(348, 100%, 100%)', colorPreview: '#ff0044' },
  'rgb-to-cmyk': { fn: 'rgbToCmyk', example: 'rgb(255, 0, 68)', colorPreview: '#ff0044' },
  'cmyk-to-rgb': { fn: 'cmykToRgb', example: 'cmyk(0, 100%, 73%, 0%)', colorPreview: '#ff0044' },
  'hex-to-cmyk': { fn: 'hexToCmyk', example: '#ff0044', colorPreview: '#ff0044' },
  'cmyk-to-hex': { fn: 'cmykToHex', example: 'cmyk(0, 100%, 73%, 0%)', colorPreview: '#ff0044' },
  'hex-to-lab': { fn: 'hexToLab', example: '#ff0044', colorPreview: '#ff0044' },
  'lab-to-hex': { fn: 'labToHex', example: 'lab(50%, 70, 30)', colorPreview: '#ff0044' },
  'rgb-to-lab': { fn: 'rgbToLab', example: 'rgb(255, 0, 68)', colorPreview: '#ff0044' },
  'lab-to-rgb': { fn: 'labToRgb', example: 'lab(50%, 70, 30)', colorPreview: '#ff0044' },
  'hex-to-lch': { fn: 'hexToLch', example: '#ff0044', colorPreview: '#ff0044' },
  'lch-to-hex': { fn: 'lchToHex', example: 'lch(50%, 76, 23)', colorPreview: '#ff0044' },
  'rgb-to-lch': { fn: 'rgbToLch', example: 'rgb(255, 0, 68)', colorPreview: '#ff0044' },
  'lch-to-rgb': { fn: 'lchToRgb', example: 'lch(50%, 76, 23)', colorPreview: '#ff0044' },
  'hex-to-oklab': { fn: 'hexToOklab', example: '#ff0044', colorPreview: '#ff0044' },
  'oklab-to-hex': { fn: 'oklabToHex', example: 'oklab(0.5, 0.3, 0.1)', colorPreview: '#ff0044' },
  'rgb-to-oklab': { fn: 'rgbToOklab', example: 'rgb(255, 0, 68)', colorPreview: '#ff0044' },
  'oklab-to-rgb': { fn: 'oklabToRgb', example: 'oklab(0.5, 0.3, 0.1)', colorPreview: '#ff0044' },
  'hex-to-oklch': { fn: 'hexToOklch', example: '#ff0044', colorPreview: '#ff0044' },
  'oklch-to-hex': { fn: 'oklchToHex', example: 'oklch(0.5, 0.3, 23)', colorPreview: '#ff0044' },
  'rgb-to-oklch': { fn: 'rgbToOklch', example: 'rgb(255, 0, 68)', colorPreview: '#ff0044' },
  'oklch-to-rgb': { fn: 'oklchToRgb', example: 'oklch(0.5, 0.3, 23)', colorPreview: '#ff0044' },
  'rgb-to-hwb': { fn: 'rgbToHwb', example: 'rgb(255, 0, 68)', colorPreview: '#ff0044' },
  'hwb-to-rgb': { fn: 'hwbToRgb', example: 'hwb(348, 0%, 0%)', colorPreview: '#ff0044' },
  'hex-to-hwb': { fn: 'hexToHwb', example: '#ff0044', colorPreview: '#ff0044' },
  'hwb-to-hex': { fn: 'hwbToHex', example: 'hwb(348, 0%, 0%)', colorPreview: '#ff0044' },
  'rgba-to-hex': { fn: 'rgbaToHex', example: 'rgba(255, 0, 68, 0.8)', colorPreview: '#ff0044' },
  'hex-to-rgba': { fn: 'hexToRgba', example: '#ff0044cc', colorPreview: '#ff0044' },
  'hsla-to-hex': { fn: 'hslaToHex', example: 'hsla(348, 100%, 50%, 0.8)', colorPreview: '#ff0044' },
  'hex-to-hsla': { fn: 'hexToHsla', example: '#ff0044cc', colorPreview: '#ff0044' },
  'css-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'tailwind-color-converter': { fn: 'cssColorConverter', example: 'slate-500' },
  'material-color-converter': { fn: 'cssColorConverter', example: 'red-500' },
  'android-xml-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'swift-uicolor-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'flutter-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'kotlin-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'java-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'csharp-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'python-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'css-variable-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'json-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'scss-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'less-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'color-format-detector': { fn: 'colorFormatDetector', example: '#ff0044' },
  'universal-color-converter': { fn: 'cssColorConverter', example: '#ff0044', colorPreview: '#ff0044' },
  'batch-color-converter': { fn: 'cssColorConverter', example: '#ff0044' },
}

const paletteTypeMap = {
  'random-palette-generator': 'random',
  'ai-palette-generator': 'ai',
  'brand-palette-generator': 'brand',
  'ui-palette-generator': 'ui',
  'material-palette-generator': 'material',
  'tailwind-palette-generator': 'tailwind',
  'bootstrap-palette-generator': 'bootstrap',
  'dark-theme-palette': 'dark-theme',
  'light-theme-palette': 'light-theme',
  'pastel-palette-generator': 'pastel',
  'neon-palette-generator': 'neon',
  'vintage-palette-generator': 'vintage',
  'retro-palette-generator': 'retro',
  'nature-palette-generator': 'nature',
  'ocean-palette-generator': 'ocean',
  'sunset-palette-generator': 'sunset',
  'autumn-palette-generator': 'autumn',
  'spring-palette-generator': 'spring',
  'winter-palette-generator': 'winter',
  'summer-palette-generator': 'summer',
  'monochromatic-palette': 'monochromatic',
  'analogous-palette': 'analogous',
  'complementary-palette': 'complementary',
  'split-complementary-palette': 'split-complementary',
  'triadic-palette': 'triadic',
  'tetradic-palette': 'tetradic',
  'square-palette': 'square',
  'rainbow-palette': 'rainbow',
  'earth-tone-palette': 'earth-tone',
  'flat-ui-palette': 'flat-ui',
  'corporate-palette': 'corporate',
  'luxury-palette': 'luxury',
  'gaming-palette': 'gaming',
  'ecommerce-palette': 'ecommerce',
  'dashboard-palette': 'dashboard',
  'mobile-app-palette': 'mobile-app',
  'saas-palette': 'saas',
  'logo-palette': 'logo',
  'fashion-palette': 'fashion',
  'food-palette': 'food',
}

const gradientTypeMap = {
  'linear-gradient-generator': 'linear',
  'radial-gradient-generator': 'radial',
  'conic-gradient-generator': 'conic',
  'mesh-gradient-generator': 'mesh',
  'css-gradient-generator': 'css',
  'svg-gradient-generator': 'svg',
  'animated-gradient-generator': 'animated',
  'text-gradient-generator': 'text',
  'button-gradient-generator': 'button',
  'background-gradient-generator': 'background',
  'gradient-border-generator': 'border',
  'gradient-shadow-generator': 'shadow',
  'multi-stop-gradient': 'multi-stop',
  'three-color-gradient': 'three-color',
  'four-color-gradient': 'four-color',
  'gradient-mixer': 'mixer',
  'gradient-reverser': 'reverser',
  'gradient-angle-generator': 'angle',
  'gradient-preview': 'preview',
  'gradient-exporter': 'exporter',
  'tailwind-gradient-generator': 'tailwind',
  'bootstrap-gradient-generator': 'bootstrap',
  'glass-gradient-generator': 'glass',
  'aurora-gradient-generator': 'aurora',
  'metallic-gradient-generator': 'metallic',
  'neon-gradient-generator': 'neon',
  'pastel-gradient-generator': 'pastel',
  'instagram-gradient-generator': 'instagram',
  'gradient-noise-generator': 'noise',
  'grain-gradient-generator': 'grain',
  'svg-mesh-generator': 'svg-mesh',
  'gradient-animation-builder': 'animation',
  'gradient-overlay-generator': 'overlay',
  'gradient-code-generator': 'code-generator',
  'gradient-library': 'library',
}

const contrastCheckerMap = {
  'wcag-contrast-checker': 'wcag',
  'apca-contrast-checker': 'apca',
  'aaa-contrast-checker': 'aaa',
  'aa-contrast-checker': 'aa',
}

const accessibilityToolTypeMap = {
  'color-blindness-simulator': 'color-blindness-simulator',
  'protanopia-simulator': 'protanopia',
  'deuteranopia-simulator': 'deuteranopia',
  'tritanopia-simulator': 'tritanopia',
  'monochrome-preview': 'monochrome',
  'readability-checker': 'readability',
  'accessible-palette-generator': 'accessible-palette',
  'accessible-gradient-generator': 'accessible-gradient',
  'text-contrast-generator': 'text-contrast',
  'background-contrast-generator': 'background-contrast',
  'button-accessibility-checker': 'button-accessibility',
  'link-accessibility-checker': 'link-accessibility',
  'ui-accessibility-tester': 'ui-tester',
  'dashboard-accessibility-checker': 'dashboard-checker',
  'accessibility-report-generator': 'report-generator',
  'contrast-matrix-generator': 'contrast-matrix',
  'color-vision-test': 'color-vision',
  'accessibility-heatmap': 'heatmap',
  'contrast-fix-generator': 'contrast-fix',
  'dark-mode-contrast-checker': 'dark-mode',
  'light-mode-contrast-checker': 'light-mode',
  'font-color-recommender': 'font-recommender',
  'background-color-recommender': 'bg-recommender',
  'color-compliance-checker': 'compliance',
  'wcag-report-exporter': 'wcag-export',
  'accessibility-palette-optimizer': 'palette-optimizer',
}

const imageToolTypeMap = {
  'image-palette-extractor': 'palette-extractor',
  'dominant-color-extractor': 'dominant-color',
  'average-color-finder': 'average-color',
  'logo-color-extractor': 'logo-color',
  'website-screenshot-color-extractor': 'website-screenshot',
  'image-gradient-generator': 'gradient-from-image',
  'image-to-css-gradient': 'image-to-css',
  'image-color-histogram': 'histogram',
  'color-cluster-analyzer': 'cluster-analyzer',
  'background-color-detector': 'bg-color-detector',
  'transparent-color-detector': 'transparent-detector',
  'photo-palette-generator': 'photo-palette',
  'pixel-analyzer': 'pixel-analyzer',
  'image-color-counter': 'color-counter',
  'brand-color-finder': 'brand-color-finder',
  'image-theme-generator': 'theme-generator',
  'color-balance-analyzer': 'balance-analyzer',
  'saturation-analyzer': 'saturation-analyzer',
  'brightness-analyzer': 'brightness-analyzer',
  'vibrance-analyzer': 'vibrance-analyzer',
  'color-temperature-detector': 'temperature-detector',
  'shadow-detector': 'shadow-detector',
  'highlight-detector': 'highlight-detector',
  'image-mood-generator': 'mood-generator',
  'image-accent-color-finder': 'accent-color-finder',
  'ui-screenshot-palette': 'screenshot-palette',
  'icon-palette-extractor': 'icon-palette',
  'artwork-palette-generator': 'artwork-palette',
  'wallpaper-palette-extractor': 'wallpaper-palette',
  'batch-image-color-extractor': 'batch-extractor',
}

const adjustmentTypeMap = {
  'tint-generator': 'tint',
  'shade-generator': 'shade',
  'tone-generator': 'tone',
  'saturation-adjuster': 'saturation',
  'brightness-adjuster': 'brightness',
  'contrast-adjuster': 'contrast',
  'hue-rotator': 'hue-rotate',
  'vibrance-adjuster': 'vibrance',
  'gamma-adjuster': 'gamma',
  'opacity-generator': 'opacity',
  'alpha-adjuster': 'alpha',
  'lighten-color': 'lighten',
  'darken-color': 'darken',
  'desaturate-color': 'desaturate',
  'invert-color': 'invert',
  'grayscale-generator': 'grayscale',
  'sepia-generator': 'sepia',
  'temperature-adjuster': 'temperature',
  'color-mixer': 'mixer',
  'blend-mode-simulator': 'blend',
  'overlay-color-generator': 'overlay',
  'multiply-blend-generator': 'multiply',
  'screen-blend-generator': 'screen',
  'soft-light-generator': 'soft-light',
  'hard-light-generator': 'hard-light',
  'color-dodge-generator': 'color-dodge',
  'burn-generator': 'burn',
  'color-harmonizer': 'harmonizer',
  'dynamic-theme-generator': 'dynamic-theme',
  'color-equalizer': 'equalizer',
}

const referenceTypeMap = {
  'css-named-colors': 'css-named',
  'html-named-colors': 'html-named',
  'tailwind-colors': 'tailwind',
  'material-colors': 'material',
  'bootstrap-colors': 'bootstrap',
  'brand-colors-database': 'brands',
  'country-flag-colors': 'country-flags',
  'google-colors': 'google',
  'apple-colors': 'apple',
  'microsoft-colors': 'microsoft',
  'discord-colors': 'discord',
  'youtube-colors': 'youtube',
  'x-brand-colors': 'x-brand',
  'instagram-colors': 'instagram',
  'spotify-colors': 'spotify',
  'netflix-colors': 'netflix',
  'fifa-team-colors': 'fifa',
  'nba-team-colors': 'nba',
  'premier-league-colors': 'premier-league',
  'national-flag-colors': 'national-flags',
  'web-safe-colors': 'web-safe',
  'pantone-finder': 'pantone',
  'ral-color-finder': 'ral',
  'ncs-color-finder': 'ncs',
  'css-color-names-search': 'css-search',
  'color-meaning-guide': 'meaning',
  'psychological-colors-guide': 'psychological',
  'ui-color-library': 'ui-library',
  'seasonal-color-library': 'seasonal',
  'color-trends': 'trends',
  'design-tokens-library': 'design-tokens',
  'semantic-color-library': 'semantic',
  'status-color-library': 'status',
  'neutral-color-library': 'neutral',
  'pastel-library': 'pastel-library',
}

const utilityTypeMap = {
  'color-name-finder': 'color-name',
  'color-similarity-checker': 'similarity',
  'duplicate-color-finder': 'duplicate',
  'color-difference-calculator': 'delta-e',
  'random-color-generator': 'random',
  'color-wheel': 'color-wheel',
  'palette-exporter': 'exporter',
  'palette-importer': 'importer',
  'css-variable-generator': 'css-variables',
  'tailwind-theme-generator': 'tailwind-theme',
  'figma-color-export': 'figma',
  'adobe-ase-export': 'ase',
  'scss-variables-generator': 'scss',
  'json-palette-generator': 'json-palette',
  'android-colors-xml-generator': 'android-xml',
  'swift-color-assets-generator': 'swift-assets',
  'flutter-theme-generator': 'flutter-theme',
  'react-theme-generator': 'react-theme',
  'design-token-generator': 'design-tokens',
  'color-playground': 'playground',
}

function slugToId(slug) {
  return slug.replace(/^\//, '').replace(/\/$/, '')
}

function generateFileContent(toolId, name, description, category) {
  const lines = [`'use client'`]

  switch (category) {
    case 'picker': {
      const mode = pickerModeMap[toolId] || 'hex'
      const showAlpha = toolId === 'alpha-color-picker' ? ' showAlpha={true}' : ''
      lines.push(`import ColorPickerTool from '@/components/tools/ColorPickerTool'`)
      lines.push('')
      lines.push('export default function ToolPageClient() {')
      lines.push('  return (')
      lines.push(`    <ColorPickerTool title="${name}" description="${description}" mode="${mode}"${showAlpha} />`)
      lines.push('  )')
      lines.push('}')
      break
    }
    case 'converter': {
      const info = converterFnMap[toolId]
      if (!info) {
        console.warn(`No converter mapping for ${toolId}, using ColorConverterTool with generic props`)
        lines.push(`import ColorConverterTool from '@/components/tools/ColorConverterTool'`)
        lines.push('')
        lines.push('export default function ToolPageClient() {')
        lines.push('  return (')
        lines.push(`    <ColorConverterTool title="${name}" description="${description}" />`)
        lines.push('  )')
        lines.push('}')
        break
      }
      const { fn, example, colorPreview } = info
      lines.push(`import ColorConverterTool from '@/components/tools/ColorConverterTool'`)
      lines.push(`import { ${fn} } from '@/lib/converters'`)
      if (example) {
        lines.push('')
        lines.push(`const example = '${example}'`)
      }
      lines.push('')
      lines.push('export default function ToolPageClient() {')
      lines.push('  return (')
      const props = [`title="${name}"`, `description="${description}"`, `convertFn={${fn}}`]
      if (example) props.push(`exampleInput={example}`)
      if (colorPreview) props.push(`colorPreview="${colorPreview}"`)
      lines.push(`    <ColorConverterTool ${props.join(' ')} />`)
      lines.push('  )')
      lines.push('}')
      break
    }
    case 'palette': {
      const paletteType = paletteTypeMap[toolId] || toolId
      lines.push(`import PaletteGeneratorTool from '@/components/tools/PaletteGeneratorTool'`)
      lines.push('')
      lines.push('export default function ToolPageClient() {')
      lines.push('  return (')
      lines.push(`    <PaletteGeneratorTool title="${name}" description="${description}" paletteType="${paletteType}" />`)
      lines.push('  )')
      lines.push('}')
      break
    }
    case 'gradient': {
      const gradientType = gradientTypeMap[toolId] || toolId
      lines.push(`import GradientGeneratorTool from '@/components/tools/GradientGeneratorTool'`)
      lines.push('')
      lines.push('export default function ToolPageClient() {')
      lines.push('  return (')
      lines.push(`    <GradientGeneratorTool title="${name}" description="${description}" gradientType="${gradientType}" />`)
      lines.push('  )')
      lines.push('}')
      break
    }
    case 'accessibility': {
      if (contrastCheckerMap[toolId]) {
        const checkerType = contrastCheckerMap[toolId]
        lines.push(`import ContrastCheckerTool from '@/components/tools/ContrastCheckerTool'`)
        lines.push('')
        lines.push('export default function ToolPageClient() {')
        lines.push('  return (')
        lines.push(`    <ContrastCheckerTool title="${name}" description="${description}" checkerType="${checkerType}" />`)
        lines.push('  )')
        lines.push('}')
      } else {
        const toolType = accessibilityToolTypeMap[toolId] || toolId
        lines.push(`import AccessibilityTool from '@/components/tools/AccessibilityTool'`)
        lines.push('')
        lines.push('export default function ToolPageClient() {')
        lines.push('  return (')
        lines.push(`    <AccessibilityTool title="${name}" description="${description}" toolType="${toolType}" />`)
        lines.push('  )')
        lines.push('}')
      }
      break
    }
    case 'image': {
      const toolType = imageToolTypeMap[toolId] || toolId
      lines.push(`import ImageColorTool from '@/components/tools/ImageColorTool'`)
      lines.push('')
      lines.push('export default function ToolPageClient() {')
      lines.push('  return (')
      lines.push(`    <ImageColorTool title="${name}" description="${description}" toolType="${toolType}" />`)
      lines.push('  )')
      lines.push('}')
      break
    }
    case 'adjustment': {
      const adjustmentType = adjustmentTypeMap[toolId] || toolId
      lines.push(`import ColorAdjusterTool from '@/components/tools/ColorAdjusterTool'`)
      lines.push('')
      lines.push('export default function ToolPageClient() {')
      lines.push('  return (')
      lines.push(`    <ColorAdjusterTool title="${name}" description="${description}" adjustmentType="${adjustmentType}" />`)
      lines.push('  )')
      lines.push('}')
      break
    }
    case 'reference': {
      const referenceType = referenceTypeMap[toolId] || toolId
      lines.push(`import ColorReferenceTool from '@/components/tools/ColorReferenceTool'`)
      lines.push('')
      lines.push('export default function ToolPageClient() {')
      lines.push('  return (')
      lines.push(`    <ColorReferenceTool title="${name}" description="${description}" referenceType="${referenceType}" />`)
      lines.push('  )')
      lines.push('}')
      break
    }
    case 'utility': {
      const utilityType = utilityTypeMap[toolId] || toolId
      lines.push(`import UtilityTool from '@/components/tools/UtilityTool'`)
      lines.push('')
      lines.push('export default function ToolPageClient() {')
      lines.push('  return (')
      lines.push(`    <UtilityTool title="${name}" description="${description}" utilityType="${utilityType}" />`)
      lines.push('  )')
      lines.push('}')
      break
    }
  }

  return lines.join('\n') + '\n'
}

function escapeJs(s) {
  return s.replace(/"/g, '\\"')
}

function main() {
  let count = 0

  for (const section of navJson) {
    if (!section.children) continue
    const category = categoryFromLabel[section.label]
    if (!category) continue

    for (const item of section.children) {
      if (!item.href || item.href === '#') continue
      const slug = item.href.replace(/^\//, '').replace(/\/$/, '')
      const toolDir = path.join(APP_DIR, slug)
      const filePath = path.join(toolDir, 'ToolPageClient.tsx')

      if (!fs.existsSync(toolDir)) {
        console.warn(`Directory not found: ${toolDir}, skipping`)
        continue
      }

      const name = escapeJs(item.label)
      const descSuffix = category === 'converter'
        ? `Free online color converter tool for developers.`
        : `Free online color tool for developers and designers.`
      const description = `${item.label}. ${descSuffix}`

      const content = generateFileContent(slug, name, description, category)
      fs.writeFileSync(filePath, content, 'utf-8')
      count++
      console.log(`Updated: ${filePath}`)
    }
  }

  console.log(`\nDone! Updated ${count} ToolPageClient.tsx files.`)
}

main()
