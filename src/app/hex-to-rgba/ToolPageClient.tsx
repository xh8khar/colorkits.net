'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToRgba } from '@/lib/converters'

const example = '#ff0044cc'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HEX to RGBA"
      description="HEX to RGBA. Free online color tool for developers and designers."
      onConvert={hexToRgba}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
