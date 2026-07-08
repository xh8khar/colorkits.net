'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { rgbToHsv } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="RGB to HSV" description="RGB to HSV. Free online color converter tool for developers." convertFn={rgbToHsv} exampleInput={example} colorPreview="#ff0044" />
  )
}
