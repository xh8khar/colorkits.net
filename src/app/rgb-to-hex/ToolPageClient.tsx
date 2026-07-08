'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { rgbToHex } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="RGB to HEX"
      description="RGB to HEX. Free online color tool for developers and designers."
      onConvert={rgbToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
