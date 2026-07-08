'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToRgb } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to RGB" description="HEX to RGB. Free online color converter tool for developers." convertFn={hexToRgb} exampleInput={example} colorPreview="#ff0044" />
  )
}
