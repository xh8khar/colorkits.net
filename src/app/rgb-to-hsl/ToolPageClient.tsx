'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { rgbToHsl } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="RGB to HSL" description="RGB to HSL. Free online color converter tool for developers." convertFn={rgbToHsl} exampleInput={example} colorPreview="#ff0044" />
  )
}
