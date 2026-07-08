'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { rgbToOklch } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="RGB to OKLCH"
      description="RGB to OKLCH. Free online color tool for developers and designers."
      onConvert={rgbToOklch}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
