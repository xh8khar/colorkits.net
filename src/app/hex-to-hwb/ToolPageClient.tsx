'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToHwb } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HEX to HWB"
      description="HEX to HWB. Free online color tool for developers and designers."
      onConvert={hexToHwb}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
