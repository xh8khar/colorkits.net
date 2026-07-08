'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { rgbToCmyk } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="RGB to CMYK" description="RGB to CMYK. Free online color converter tool for developers." convertFn={rgbToCmyk} exampleInput={example} colorPreview="#ff0044" />
  )
}
