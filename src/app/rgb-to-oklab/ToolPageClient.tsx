'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { rgbToOklab } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="RGB to OKLab" description="RGB to OKLab. Free online color converter tool for developers." convertFn={rgbToOklab} exampleInput={example} colorPreview="#ff0044" />
  )
}
