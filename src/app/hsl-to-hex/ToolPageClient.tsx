'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hslToHex } from '@/lib/converters'

const example = 'hsl(348, 100%, 50%)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HSL to HEX"
      description="HSL to HEX. Free online color tool for developers and designers."
      onConvert={hslToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
