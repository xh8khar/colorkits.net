'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { oklchToRgb } from '@/lib/converters'

const example = 'oklch(0.5, 0.3, 23)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="OKLCH to RGB" description="OKLCH to RGB. Free online color converter tool for developers." convertFn={oklchToRgb} exampleInput={example} colorPreview="#ff0044" />
  )
}
