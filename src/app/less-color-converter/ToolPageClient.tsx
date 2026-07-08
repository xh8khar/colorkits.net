'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { cssColorConverter } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="LESS Color Converter" description="LESS Color Converter. Free online color converter tool for developers." convertFn={cssColorConverter} exampleInput={example} colorPreview="#ff0044" />
  )
}
