'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { oklabToRgb } from '@/lib/converters'

const example = 'oklab(0.5, 0.3, 0.1)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="OKLab to RGB" description="OKLab to RGB. Free online color converter tool for developers." convertFn={oklabToRgb} exampleInput={example} colorPreview="#ff0044" />
  )
}
