'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { rgbaToHex } from '@/lib/converters'

const example = 'rgba(255, 0, 68, 0.8)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="RGBA to HEX"
      description="RGBA to HEX. Free online color tool for developers and designers."
      onConvert={rgbaToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
