'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { oklchToHex } from '@/lib/converters'

const example = 'oklch(0.5, 0.3, 23)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="OKLCH to HEX" description="OKLCH to HEX. Free online color converter tool for developers." convertFn={oklchToHex} exampleInput={example} colorPreview="#ff0044" />
  )
}
