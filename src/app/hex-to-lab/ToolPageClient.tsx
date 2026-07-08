'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToLab } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HEX to LAB"
      description="HEX to LAB. Free online color tool for developers and designers."
      onConvert={hexToLab}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
