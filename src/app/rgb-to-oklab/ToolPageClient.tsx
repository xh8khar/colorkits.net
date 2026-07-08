'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { rgbToOklab } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="RGB to OKLab"
      description="RGB to OKLab. Free online color tool for developers and designers."
      onConvert={rgbToOklab}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
