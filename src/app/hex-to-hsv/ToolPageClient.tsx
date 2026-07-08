'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToHsv } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to HSV" description="HEX to HSV. Free online color converter tool for developers." convertFn={hexToHsv} exampleInput={example} colorPreview="#ff0044" />
  )
}
