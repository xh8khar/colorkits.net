'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { cssColorConverter } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="JSON Color Converter" description="JSON Color Converter. Free online color converter tool for developers." convertFn={cssColorConverter} exampleInput={example} colorPreview="#ff0044" />
  )
}
