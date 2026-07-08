'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToRgb } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Shadow Detector"
      description="Shadow Detector. Free online color tool for developers and designers."
      onConvert={hexToRgb}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
