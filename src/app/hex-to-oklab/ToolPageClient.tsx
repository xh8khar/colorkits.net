'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToOklab } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to OKLab" description="HEX to OKLab. Free online color converter tool for developers." convertFn={hexToOklab} exampleInput={example} colorPreview="#ff0044" />
  )
}
