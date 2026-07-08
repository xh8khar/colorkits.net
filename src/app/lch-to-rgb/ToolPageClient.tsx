'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { lchToRgb } from '@/lib/converters'

const example = 'lch(50%, 76, 23)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="LCH to RGB" description="LCH to RGB. Free online color converter tool for developers." convertFn={lchToRgb} exampleInput={example} colorPreview="#ff0044" />
  )
}
