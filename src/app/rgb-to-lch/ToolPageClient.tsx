'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { rgbToLch } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="RGB to LCH" description="RGB to LCH. Free online color converter tool for developers." convertFn={rgbToLch} exampleInput={example} colorPreview="#ff0044" />
  )
}
