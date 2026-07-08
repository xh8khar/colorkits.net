'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hwbToHex } from '@/lib/converters'

const example = 'hwb(348, 0%, 0%)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HWB to HEX" description="HWB to HEX. Free online color converter tool for developers." convertFn={hwbToHex} exampleInput={example} colorPreview="#ff0044" />
  )
}
