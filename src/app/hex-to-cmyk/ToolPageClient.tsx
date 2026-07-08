'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToCmyk } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to CMYK" description="HEX to CMYK. Free online color converter tool for developers." convertFn={hexToCmyk} exampleInput={example} colorPreview="#ff0044" />
  )
}
