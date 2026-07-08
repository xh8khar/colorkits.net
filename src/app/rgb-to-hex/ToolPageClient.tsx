'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { rgbToHex } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="RGB to HEX" description="RGB to HEX. Free online color converter tool for developers." convertFn={rgbToHex} exampleInput={example} colorPreview="#ff0044" />
  )
}
