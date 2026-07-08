'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hsvToRgb } from '@/lib/converters'

const example = 'hsv(348, 100%, 100%)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HSV to RGB" description="HSV to RGB. Free online color converter tool for developers." convertFn={hsvToRgb} exampleInput={example} colorPreview="#ff0044" />
  )
}
