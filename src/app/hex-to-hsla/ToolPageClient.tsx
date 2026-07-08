'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToHsla } from '@/lib/converters'

const example = '#ff0044cc'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HEX to HSLA"
      description="HEX to HSLA. Free online color tool for developers and designers."
      onConvert={hexToHsla}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
