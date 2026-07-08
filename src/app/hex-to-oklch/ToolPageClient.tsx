'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToOklch } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to OKLCH" description="HEX to OKLCH. Free online color converter tool for developers." convertFn={hexToOklch} exampleInput={example} colorPreview="#ff0044" />
  )
}
