'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { labToRgb } from '@/lib/converters'

const example = 'lab(50, 70, 30)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="LAB to RGB"
      description="LAB to RGB. Free online color tool for developers and designers."
      onConvert={labToRgb}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
