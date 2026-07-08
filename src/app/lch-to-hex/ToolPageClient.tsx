'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { lchToHex } from '@/lib/converters'

const example = 'lch(50%, 76, 23)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="LCH to HEX" description="LCH to HEX. Free online color converter tool for developers." convertFn={lchToHex} exampleInput={example} colorPreview="#ff0044" />
  )
}
