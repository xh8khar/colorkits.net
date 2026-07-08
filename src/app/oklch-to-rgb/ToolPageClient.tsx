'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { oklchToRgb } from '@/lib/converters'

const example = 'oklch(0.5, 0.3, 23)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="OKLCH to RGB"
      description="OKLCH to RGB. Free online color tool for developers and designers."
      onConvert={oklchToRgb}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
