'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hslaToHex } from '@/lib/converters'

const example = 'hsla(348, 100%, 50%, 0.8)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HSLA to HEX" description="HSLA to HEX. Free online color converter tool for developers." convertFn={hslaToHex} exampleInput={example} colorPreview="#ff0044" />
  )
}
