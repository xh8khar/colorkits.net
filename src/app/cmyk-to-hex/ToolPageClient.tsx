'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cmykToHex } from '@/lib/converters'

const example = 'cmyk(0, 100%, 73%, 0%)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="CMYK to HEX"
      description="CMYK to HEX. Free online color tool for developers and designers."
      onConvert={cmykToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
