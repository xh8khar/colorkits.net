'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { rgbToOklch } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="RGB to OKLCH" description="RGB to OKLCH. Free online color converter tool for developers." convertFn={rgbToOklch} exampleInput={example} colorPreview="#ff0044" />
  )
}
