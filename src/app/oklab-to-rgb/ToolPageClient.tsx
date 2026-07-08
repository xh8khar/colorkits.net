'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { oklabToRgb } from '@/lib/converters'

const example = 'oklab(0.5, 0.3, 0.1)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="OKLab to RGB"
      description="OKLab to RGB. Free online color tool for developers and designers."
      onConvert={oklabToRgb}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
