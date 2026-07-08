'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToRgba } from '@/lib/converters'

const example = '#ff0044cc'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to RGBA" description="HEX to RGBA. Free online color converter tool for developers." convertFn={hexToRgba} exampleInput={example} colorPreview="#ff0044" />
  )
}
