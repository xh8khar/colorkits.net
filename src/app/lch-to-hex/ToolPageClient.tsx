'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { lchToHex } from '@/lib/converters'

const example = 'lch(50, 76, 23)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="LCH to HEX"
      description="LCH to HEX. Free online color tool for developers and designers."
      onConvert={lchToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
