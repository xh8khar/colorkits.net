'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { oklchToHex } from '@/lib/converters'

const example = 'oklch(0.5, 0.3, 23)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="OKLCH to HEX"
      description="OKLCH to HEX. Free online color tool for developers and designers."
      onConvert={oklchToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
