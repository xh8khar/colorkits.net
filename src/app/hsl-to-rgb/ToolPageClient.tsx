'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hslToRgb } from '@/lib/converters'

const example = 'hsl(348, 100%, 50%)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HSL to RGB" description="HSL to RGB. Free online color converter tool for developers." convertFn={hslToRgb} exampleInput={example} colorPreview="#ff0044" />
  )
}
