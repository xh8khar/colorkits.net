'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { cmykToRgb } from '@/lib/converters'

const example = 'cmyk(0, 100%, 73%, 0%)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="CMYK to RGB" description="CMYK to RGB. Free online color converter tool for developers." convertFn={cmykToRgb} exampleInput={example} colorPreview="#ff0044" />
  )
}
