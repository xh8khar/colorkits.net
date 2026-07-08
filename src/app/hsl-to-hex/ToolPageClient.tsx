'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hslToHex } from '@/lib/converters'

const example = 'hsl(348, 100%, 50%)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HSL to HEX" description="HSL to HEX. Free online color converter tool for developers." convertFn={hslToHex} exampleInput={example} colorPreview="#ff0044" />
  )
}
