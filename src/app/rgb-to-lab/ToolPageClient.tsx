'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { rgbToLab } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="RGB to LAB" description="RGB to LAB. Free online color converter tool for developers." convertFn={rgbToLab} exampleInput={example} colorPreview="#ff0044" />
  )
}
