'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToLch } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to LCH" description="HEX to LCH. Free online color converter tool for developers." convertFn={hexToLch} exampleInput={example} colorPreview="#ff0044" />
  )
}
