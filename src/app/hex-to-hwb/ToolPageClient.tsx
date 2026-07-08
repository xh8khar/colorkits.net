'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hexToHwb } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HEX to HWB" description="HEX to HWB. Free online color converter tool for developers." convertFn={hexToHwb} exampleInput={example} colorPreview="#ff0044" />
  )
}
