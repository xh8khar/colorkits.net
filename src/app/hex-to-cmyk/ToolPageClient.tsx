'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToCmyk } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HEX to CMYK"
      description="HEX to CMYK. Free online color tool for developers and designers."
      onConvert={hexToCmyk}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
