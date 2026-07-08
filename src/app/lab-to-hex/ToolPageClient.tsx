'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { labToHex } from '@/lib/converters'

const example = 'lab(50%, 70, 30)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="LAB to HEX" description="LAB to HEX. Free online color converter tool for developers." convertFn={labToHex} exampleInput={example} colorPreview="#ff0044" />
  )
}
