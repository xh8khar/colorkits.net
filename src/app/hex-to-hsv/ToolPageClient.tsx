'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToHsv } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HEX to HSV"
      description="HEX to HSV. Free online color tool for developers and designers."
      onConvert={hexToHsv}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
