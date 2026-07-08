'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { rgbaToHex } from '@/lib/converters'

const example = 'rgba(255, 0, 68, 0.8)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="RGBA to HEX" description="RGBA to HEX. Free online color converter tool for developers." convertFn={rgbaToHex} exampleInput={example} colorPreview="#ff0044" />
  )
}
