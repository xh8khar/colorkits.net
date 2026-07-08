'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { lchToRgb } from '@/lib/converters'

const example = 'lch(50, 76, 23)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="LCH to RGB"
      description="LCH to RGB. Free online color tool for developers and designers."
      onConvert={lchToRgb}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
