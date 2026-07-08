'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { hsvToHex } from '@/lib/converters'

const example = 'hsv(348, 100%, 100%)'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="HSV to HEX" description="HSV to HEX. Free online color converter tool for developers." convertFn={hsvToHex} exampleInput={example} colorPreview="#ff0044" />
  )
}
