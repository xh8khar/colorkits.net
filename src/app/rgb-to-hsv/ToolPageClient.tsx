'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { rgbToHsv } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="RGB to HSV"
      description="RGB to HSV. Free online color tool for developers and designers."
      onConvert={rgbToHsv}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
