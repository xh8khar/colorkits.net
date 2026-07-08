'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { cmykToHex } from '@/lib/converters'

const example = 'cmyk(0, 100%, 73%, 0%)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="CMYK to HEX" description="CMYK to HEX. Free online color converter tool for developers." convertFn={cmykToHex} exampleInput={example} colorPreview="#ff0044" />
  )
}
