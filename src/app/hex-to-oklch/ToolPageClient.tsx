'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToOklch } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HEX to OKLCH"
      description="HEX to OKLCH. Free online color tool for developers and designers."
      onConvert={hexToOklch}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
