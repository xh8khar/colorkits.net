'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hwbToRgb } from '@/lib/converters'

const example = 'hwb(348, 0%, 0%)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HWB to RGB" description="HWB to RGB. Free online color converter tool for developers." convertFn={hwbToRgb} exampleInput={example} colorPreview="#ff0044" />
  )
}
