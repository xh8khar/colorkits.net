'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToOklab } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HEX to OKLab"
      description="HEX to OKLab. Free online color tool for developers and designers."
      onConvert={hexToOklab}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
