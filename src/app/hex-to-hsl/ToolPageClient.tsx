'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToHsl } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to HSL" description="HEX to HSL. Free online color converter tool for developers." convertFn={hexToHsl} exampleInput={example} colorPreview="#ff0044" />
  )
}
