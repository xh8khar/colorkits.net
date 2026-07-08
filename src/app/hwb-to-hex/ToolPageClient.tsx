'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hwbToHex } from '@/lib/converters'

const example = 'hwb(348, 0%, 0%)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HWB to HEX"
      description="HWB to HEX. Free online color tool for developers and designers."
      onConvert={hwbToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
