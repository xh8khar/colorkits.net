'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { labToHex } from '@/lib/converters'

const example = 'lab(50, 70, 30)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="LAB to HEX"
      description="LAB to HEX. Free online color tool for developers and designers."
      onConvert={labToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
