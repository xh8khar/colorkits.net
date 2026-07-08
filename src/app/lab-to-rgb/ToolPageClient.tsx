'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { labToRgb } from '@/lib/converters'

const example = 'lab(50%, 70, 30)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="LAB to RGB" description="LAB to RGB. Free online color converter tool for developers." convertFn={labToRgb} exampleInput={example} colorPreview="#ff0044" />
  )
}
