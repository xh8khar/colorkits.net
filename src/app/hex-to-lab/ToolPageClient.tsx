'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToLab } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to LAB" description="HEX to LAB. Free online color converter tool for developers." convertFn={hexToLab} exampleInput={example} colorPreview="#ff0044" />
  )
}
