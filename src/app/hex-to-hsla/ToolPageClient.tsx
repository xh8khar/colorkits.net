'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToHsla } from '@/lib/converters'

const example = '#ff0044cc'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to HSLA" description="HEX to HSLA. Free online color converter tool for developers." convertFn={hexToHsla} exampleInput={example} colorPreview="#ff0044" />
  )
}
