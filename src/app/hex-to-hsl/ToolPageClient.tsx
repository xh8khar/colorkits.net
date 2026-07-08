'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToHsl } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HEX to HSL"
      description="HEX to HSL. Free online color tool for developers and designers."
      onConvert={hexToHsl}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
