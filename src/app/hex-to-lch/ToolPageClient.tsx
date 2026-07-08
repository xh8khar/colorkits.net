'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToLch } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HEX to LCH"
      description="HEX to LCH. Free online color tool for developers and designers."
      onConvert={hexToLch}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
