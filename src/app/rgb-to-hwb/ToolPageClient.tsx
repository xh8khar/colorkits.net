'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { rgbToHwb } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="RGB to HWB" description="RGB to HWB. Free online color converter tool for developers." convertFn={rgbToHwb} exampleInput={example} colorPreview="#ff0044" />
  )
}
