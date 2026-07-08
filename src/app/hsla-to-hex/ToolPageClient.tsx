'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hslaToHex } from '@/lib/converters'

const example = 'hsla(348, 100%, 50%, 0.8)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HSLA to HEX"
      description="HSLA to HEX. Free online color tool for developers and designers."
      onConvert={hslaToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
